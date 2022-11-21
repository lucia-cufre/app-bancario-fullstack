import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  font-size: 1.5em;
  text-align: left;
  h1 {
    width: 40%;
    margin: 0
  }
  h1:nth-child(1) {
    color: #B8B8B8;
    font-weight: 400;
  }
  h1:nth-child(2) {
    color: #5CB646;
    margin-top: -15px;
  }
`;