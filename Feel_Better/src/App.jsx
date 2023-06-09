import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles.js";
import { TiLightbulb } from "react-icons/ti";

function App() {
  const [dark, setDark] = useState(true);
  const [advice, setAdvice] = useState("");
  const [show, setShow] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const audio = new Audio(`/scanner.mp3`);

  useEffect(() => {
    if (clickCount > 0) {
      fetch(`https://api.adviceslip.com/advice`)
        .then((response) => response.json())
        .then((data) => {
          setAdvice(data.slip);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [clickCount]);

  const handleClick = () => {
    audio.play();
    setShow(false);
    setClickCount(clickCount + 1);
  };

  const handleClick2 = () => {
    setDark(!dark);
  };
  return (
    <>
      <GlobalStyles dark={dark} />
      <Main>
        <H1>Scan For Advice</H1>
        <Intro>
          Hey there, I understand that times can be tough, and I wanted to
          remind you that brighter days are ahead. It may not be clear when
          exactly things will improve, but they will. Sometimes the road gets
          bumpy, and it feels like there's no end in sight, but trust me, there
          is.
        </Intro>
        {!advice ? (
          <LoadingDiv>
            <p>Just Breathe</p>
          </LoadingDiv>
        ) : (
          <>
            <P show={show.toString()}>
              {advice.advice.replace(/[^a-zA-Z0-9]/g, " ")}
            </P>
          </>
        )}
        <Button onClick={handleClick} dark={dark.toString()}>
          Scan for Advice
        </Button>
      </Main>
      <Button2 onClick={handleClick2}>
        <LightBulb dark={dark.toString()} />
      </Button2>
    </>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 50px;
`;

const H1 = styled.h1`
  font-size: 100px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 80px;
  }

  @media (max-width: 480px) {
    font-size: 60px;
  }
`;

const Intro = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  max-width: 650px;
  line-height: 1.5;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const LoadingDiv = styled.div`
  display: none;
`;
const P = styled.p`
  display: ${(props) => (props.show === "true" ? "none" : "inline")};
  font-size: 3em;
  text-align: center;
  line-height: 150%;
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: ${(props) => (props.dark === "true" ? "black" : "white")};
  color: ${(props) => (props.dark === "true" ? "white" : "black")};
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const Button2 = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  position: fixed;
  bottom: 0;
  left: 0;

  :hover {
    cursor: pointer;
  }
`;
const LightBulb = styled(TiLightbulb)`
  color: ${(props) => (props.dark === "true" ? "black" : "white")};
`;

export default App;
