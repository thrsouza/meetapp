import styled from 'styled-components';

export const Container = styled.div`
  height: 160px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 30px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  font-weight: 600;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  position: relative;
  cursor: pointer;
  background-image: ${props => (props.data ? `url(${props.data.url})` : 'none')};
  background-size: 100% 100%;
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  opacity: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  font-size: 0;
  cursor: pointer;
`;
