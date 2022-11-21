import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5em;
  text-align: center;
  h1 {
    width: 40%;
    margin: 0;
    text-align: left;
  }
  h1:nth-child(1) {
    color: #000;
    font-weight: 400;
  }
  h1:nth-child(2) {
    color: #5cb646;
    margin-top: -15px;
  }
  p{
    margin-top: 3vh;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 450px;
  align-items: center;
  margin-bottom: 20px;
`
export const ButtonContainer = styled.div`
  width: 80vw;
  max-width: 450px;
`