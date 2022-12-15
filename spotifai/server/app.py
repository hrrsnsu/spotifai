from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import base64
from io import BytesIO

app = Flask(__name__)
CORS(app)

default_prompt = "default music is so lame"
from dalle_model import DalleModel
dalle_model = DalleModel("Mini")

def generate_model_image(prompt, model, seed):
    imgs = model.generate_images(prompt, 1, seed)
    list_of_imgs = []
    for img in imgs:
        buffered = BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        list_of_imgs.append(img_str)

    return list_of_imgs

@app.route("/dalle", methods=["GET"])
@cross_origin()
def gen_images_get():
    request_data = default_prompt
    reqArgs = request.args
    request_data = reqArgs.get("text", default=default_prompt, type=str)
    dalle_seed = "TEST_SEED"

    image = generate_model_image(request_data, dalle_model, dalle_seed)
    return jsonify(image)

@app.route('/')
@cross_origin()
def hello():
    return '<h1>Server is alive!</h1>'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False, threaded=True) 