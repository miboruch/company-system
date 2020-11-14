import styled from 'styled-components';

const StyledButton = styled.button`
  width: 180px;
  height: 38px;
  padding-top: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  //border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.buttonColor};
  font-family: ${({ theme }) => theme.font.family.avantGarde};
  color: ${({ theme }) => theme.colors.buttonColor};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 14px;
  z-index: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.05s ease;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #fff;
    transition: color 0.14s ease;
  }
  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: ${({ theme }) => theme.colors.green};
    transition: all 0.25s ease;
    z-index: -1;
  }
  &:hover::before {
    height: 100%;
    transition: all 0.25s ease;
  }

  &:disabled {
    opacity: 0.6;
    cursor: auto;
  }
`;

export { StyledButton };
