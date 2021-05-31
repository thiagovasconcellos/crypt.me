import styled from 'styled-components/native';
import { Form as FormUn } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000;

  padding: 0 30px;
`;

export const Form = styled(FormUn)`
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 150px;
  height: 85px;
  margin-bottom: 15px;
`;