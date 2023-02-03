import styled from 'styled-components';
import { colors } from './utils';

const AnchorDownloadStyled = styled.a`
  font-family: sans-serif;
  background: ${colors.accent};
  border: 1px solid ${colors.accent};
  border-radius: 4px;
  padding: 8px 16px;
  display: block;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: ${colors.colorOnAccent};
  font-size: 18px;
`;

AnchorDownloadStyled.defaultProps = {
  download: true,
};

export default AnchorDownloadStyled;
