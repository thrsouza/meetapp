import styled from 'styled-components';

export const Container = styled.div`
  background-color: #544b57;
  background-image: url('${props => props.backgroundImage}');
  background-size: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 190px;
  width: 290px;
  border-radius: 5px;
  margin: 10px;
`;

export const Footer = styled.div`
  background-color: #ffffff;
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 20px;
  height: 85px;
  width: 100%;
  border-radius: 0 0 5px 5px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h3`
  font-size: 16px;
  padding: 4px;
  color: #222222;
  text-align: left;
`;

export const Subtitle = styled.span`
  font-size: 14px;
  padding: 4px;
  color: #999999;
  text-align: left;
`;

export const Button = styled.button`
  color: #ffffff;
  height: 40px;
  width: 40px;
  min-width: 40px;
  border: none;
  border-radius: 50px;
  background-color: #e5556e;
  cursor: pointer;
`;
