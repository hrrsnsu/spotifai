import React from 'react'
import styled from 'styled-components'
import logo from '../../../images/spotify.png';
import { loginUrl } from '../../../secret';

type Props = {}

const WelcomePage = (props: Props) => {

  console.log(loginUrl);

  return (
    <WelcomeContainer>
      <Logo>
        <img style={{height: '64px', width: '64px'}} src={logo}/>
        <Title>Spotifai</Title>
      </Logo>
      <Description>
        Using your top artists, songs, and vibes, we create an AI image that describes what you listen to.
      </Description>
      <Button href={loginUrl}>Login</Button>

    </WelcomeContainer>
  )
}

const WelcomeContainer = styled.div`
  position: absolute;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 100%;
  background-color:  #1a181aff;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.8);

`

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  margin: 2rem;
`

const Title = styled.h1`
  margin: 1rem;
  color: white;
`

const Description = styled.p`
  margin:2rem;
  color: white;

`

const Button = styled.a`
  margin: 2rem;
  font-size: 1rem;
  border-radius: 2rem;
  width: 10rem;
  height: 4rem;
  background-color: white;
  text-align: center;
  line-height: 4rem;
  font-weight: 700;
  transition:  background-color 0.1s ease;
  text-decoration: none;
  color: inherit;

  &:hover{
    background-color: black;
    color: white;
    
  }
`
export default WelcomePage;