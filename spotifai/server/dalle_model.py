import os
import random
from functools import partial
from enum import Enum 
import jax
import numpy as np
import jax.numpy as jnp
from PIL import Image
from dalle_mini import DalleBart, DalleBartProcessor
from vqgan_jax.modeling_flax_vqgan import VQModel
from flax.jax_utils import replicate
from flax.training.common_utils import shard_prng_key
import wandb

DEFAULT_SEED = "TEST_SEED"
COND_SCALE = 10.0
DALLE_COMMIT_ID = None
DALLE_MODEL_MINI = "dalle-mini/dalle-mini/mini-1:v0"
GEN_TOP_K = None
GEN_TOP_P = None
TEMPERATURE = None
VQGAN_COMMIT_ID = "e93a26e7707683d349bf5d5c41c5b0ef69b677a9"
VQGAN_REPO = "dalle-mini/vqgan_imagenet_f16_16384"

class ModelSize(Enum):
    MINI = "Mini"
    MEGA = "Mega"
    MEGA_FULL = "Mega_full"

os.environ["XLA_PYTHON_CLIENT_ALLOCATOR"] = "platform" # https://github.com/saharmor/dalle-playground/issues/14#issuecomment-1147849318
os.environ["WANDB_SILENT"] = "true"
wandb.init(anonymous="must")

# model inference
@partial(jax.pmap, axis_name="batch", static_broadcasted_argnums=(3, 4, 5, 6, 7))
def p_generate(
  tokenized_prompt, key, params, top_k, top_p, temperature, condition_scale, model
):
  return model.generate(
    **tokenized_prompt,
    prng_key=key,
    params=params,
    top_k=top_k,
    top_p=top_p,
    temperature=temperature,
    condition_scale=condition_scale,
  )

# decode images
@partial(jax.pmap, axis_name="batch", static_broadcasted_argnums=(0))
def p_decode(vqgan, indices, params):
  return vqgan.decode_code(indices, params=params)

class DalleModel:
  def __init__(self, model_version: ModelSize) -> None:
    dalle_model = DALLE_MODEL_MINI
    dtype = jnp.float32
 
    # Load dalle-mini
    self.model, params = DalleBart.from_pretrained(
      dalle_model, revision=DALLE_COMMIT_ID, dtype=dtype, _do_init=False
    )

    # Load VQGAN
    self.vqgan, vqgan_params = VQModel.from_pretrained(
      VQGAN_REPO, revision=VQGAN_COMMIT_ID, _do_init=False
    )

    self.params = replicate(params)
    self.vqgan_params = replicate(vqgan_params)

    self.processor = DalleBartProcessor.from_pretrained(dalle_model, revision=DALLE_COMMIT_ID)


  def tokenize_prompt(self, prompt: str):
    tokenized_prompt = self.processor([prompt])
    return replicate(tokenized_prompt)


  def generate_images(self, prompt: str, num_predictions: int, gen_seed: str):
    tokenized_prompt = self.tokenize_prompt(prompt)

    seed = random.randint(0, 2 ** 32 - 1)

    if gen_seed != DEFAULT_SEED:
      seed = hash(gen_seed)

    key = jax.random.PRNGKey(seed)

    # generate images
    images = []
    for i in range(max(num_predictions // jax.device_count(), 1)):
      # get a new key
      key, subkey = jax.random.split(key)

      encoded_images = p_generate(
        tokenized_prompt,
        shard_prng_key(subkey),
        self.params,
        GEN_TOP_K,
        GEN_TOP_P,
        TEMPERATURE,
        COND_SCALE,
        self.model
      )

      # remove BOS
      encoded_images = encoded_images.sequences[..., 1:]

      # decode images
      decoded_images = p_decode(self.vqgan, encoded_images, self.vqgan_params)
      decoded_images = decoded_images.clip(0.0, 1.0).reshape((-1, 256, 256, 3))
      for img in decoded_images:
        images.append(Image.fromarray(np.asarray(img * 255, dtype=np.uint8)))

    return images
