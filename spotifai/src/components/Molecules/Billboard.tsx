import styled from "styled-components";
import { loginUrl } from "../../secret";

type Props = {
  loginUrl?: string;
};

const Billboard = (props: Props) => {
  return (
    <Background>
      <Info>
        <Title>What is Spotifai?</Title>
        <Text>
          A web application that utilizes DALL-E models to create images based
          on your top artists, songs, and musical tastes!
        </Text>
        <Text>
          Share your musically generated art with friends or use it as your next
          playlist picture!
        </Text>
      </Info>
      <Info>
        <Title>Interested?</Title>
        <Text>
          Currently, this web application is ran on my 2013 Macbook, but...
          don't let that stop you
        </Text>
        <Text>
          <Button href={loginUrl}>Give it a try</Button>
        </Text>
      </Info>
    </Background>
  );
};

export default Billboard;

const Background = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 50%;
  transition: transform .2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 3rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.a`
  display: inline-block;
  font-weight: bold;
  padding: 1rem;
  border-radius: 3rem;
  color: white;
  text-decoration: none;
  background-color: black;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: white;
    border: solid;
    color: black;
  }
`;
