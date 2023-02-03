import styled from 'styled-components';
import { colors } from './utils';

const ButtonConvertStyled = styled.button`
  font-family: sans-serif;
  background: transparent;
  border: 1px solid ${colors.color};
  border-radius: 4px;
  padding: 8px 16px;
  display: block;
  width: 100%;
  cursor: pointer;
  color: ${colors.color};
  font-size: 18px;
  
  &:disabled {
    color: gray;
    border-color: gray;
  }
`;

export default ButtonConvertStyled;
