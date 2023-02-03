import styled from 'styled-components';
import { colors } from './utils';

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  padding: 16px;
  border: solid ${colors.color} 1px;
  border-radius: 8px;
  margin: 8px 0;
`;

export default FileInputContainer;
