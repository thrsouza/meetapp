import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  justify-content: center;
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 900px;
  width: 100%;
  margin-top: 100px;

  img {
    display: flex;
    margin: 20px 0;
    width: 100%;
  }
`;

export const Content = styled.div`
  max-width: 300px;
  width: 100%;
  color: #ffffff;

  h2 {
    padding: 15px 0 0 0;
  }

  small {
    display: flex;
    font-size: 14px;
    color: #999;
    padding: 5px 0;
  }

  p {
    opacity: 0.8;
    font-size: 14px;
    line-height: 28px;
    text-align: left;
    padding: 5px 0 15px 0;

    :first-child {
      font-size: 16px;
    }
  }
`;

export const Form = styled.form`
  margin: 25px 0;
`;
