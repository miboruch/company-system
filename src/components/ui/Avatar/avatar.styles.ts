import styled from 'styled-components';

const Wrapper = styled.div<{ color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ color }) => color};
  margin: 0 1rem;
  border: 2px solid #fff;
  font-family: ${({ theme }) => theme.font.family.avantGarde};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 13px;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  line-height: 36px;
`;

export { Wrapper };
