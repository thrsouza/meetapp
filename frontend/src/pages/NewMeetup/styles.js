import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  margin: 100px 0;
  max-width: 300px;
  width: 100%;
  color: #ffffff;

  h2 {
    padding: 7px 0;
  }

  p {
    opacity: 0.8;
    font-size: 16px;
    line-height: 28px;
    text-align: left;
  }
`;

export const Form = styled.form`
  margin-top: 30px;

  h4 {
    margin-bottom: 16px;
  }

  button[type='submit'] {
    margin-top: 25px;
  }
`;
