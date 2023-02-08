import styled from 'styled-components';
import { colors } from './utils';

const SelectStyled = styled.select`
  width: 100%;
  padding: 8px;
  margin: 4px 0 16px 0;
  background-color: transparent;
  color: ${colors.color};
  border: 1px solid ${colors.color};
  border-radius: 4px;
`;

export default SelectStyled;
