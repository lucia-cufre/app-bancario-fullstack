import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5em;
  text-align: left;
  h1 {
    width: 40%;
    margin-top: -20px;
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
    margin-top: 2vh;
    font-size: 1rem;
    margin-bottom: 1rem;
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

export const HeaderBack = styled.div`
  width: 100%;
  border-bottom: 1px solid #B8B8B8;
  height: 6vh;
  margin: 2vh 0 4vh 0;
  padding: 0 0 2vh 3vh;
`