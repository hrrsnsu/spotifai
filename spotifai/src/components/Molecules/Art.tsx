import styled from "styled-components";

type Props = {
  albumArt?: string;
  artistArt?: string;
};

const Art = (props: Props) => {
  return (
    <Container>
      <Images>
        <Album src={props.albumArt} />
        <Artist src={props.artistArt} />
      </Images>
      <Info>
        <Title>Are you ready?</Title>
        <Text>
          Press the button below to start generating your image! Give is a bit
          of time because its loading from a Macbook...
        </Text>
      </Info>

    </Container>
  );
};

export default Art;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 600px;
  background-color: #0e1111;
`;

const Images = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: center;
  position: relative;
  width: 33%;
`;

const Album = styled.img`
  position: absolute;
  left: 50px;
  bottom: 0;
  z-index: 2;
  height: 16rem;
  border-radius: 10rem;
`;

const Artist = styled.img`
  position: absolute;
  height: 16rem;
  top: 0;
  right: 50px;
  border-radius: 10rem;
  &:hover {
    z-index: 3;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 3rem;
`;

const Text = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
