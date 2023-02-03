import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap}
`;

Flex.defaultProps = {
  flexDirection: 'row',
  gap: 0,
};

export default Flex;
