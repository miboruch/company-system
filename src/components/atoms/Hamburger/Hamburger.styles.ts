import styled, { css } from 'styled-components';

interface IHamburger {
  isOpen: boolean;
}

const StyledHamburger = styled.button`
  cursor: pointer;
  width: 70px;
  height: 60px;
  background: transparent;
  border: none;
  z-index: 901;
  position: absolute;
  top: 3rem;
  left: 1.7rem;
  transform: translateY(-50%);

  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mq.desktop} {
    display: none;
  }
`;

const InnerHamburger = styled.div<IHamburger>`
  position: relative;
  ${({ isOpen }) =>
    isOpen &&
    css`
      background: transparent;
    `}
  &::before,
  &::after {
    content: '';
    height: 1px;
    background: #000;
    position: absolute;
    left: 0;
    transition: all 0.5s ease;
  }
  ::before {
    width: ${({ isOpen }) => (isOpen ? '32px' : '26px')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-2px')};
    transform: rotate(${({ isOpen }) => (isOpen ? '40deg' : '0deg')});
  }
  ::after {
    width: 32px;
    top: ${({ isOpen }) => (isOpen ? '0' : '2px')};
    transform: rotate(${({ isOpen }) => (isOpen ? '-40deg' : '0deg')});
  }
  ${StyledHamburger}:hover & {
    background: transparent;
    &::before {
      top: 0;
    }
    &::after {
      top: 0;
    }
  }
`;

export { StyledHamburger, InnerHamburger };
