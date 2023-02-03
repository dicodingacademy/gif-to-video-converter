import styled from 'styled-components';

const FileInputStyled = styled.input`
  &::-webkit-file-upload-button {
    display: none;
  }
  padding: 8px 0;
`;

export default FileInputStyled;
