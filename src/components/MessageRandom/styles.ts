import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100px;

  background: #232129;
  border-radius: 10px;
  
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #232129;

  margin-bottom: 35px;
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
  margin-left: 5px;
  margin-right: 20px;
`;

export const NameHolder = styled.View`
  flex-direction: column
`;

export const CircleGreen = styled.View`
  width: 10px;
  height: 10px;
  background-color: #00FF1E;
`;