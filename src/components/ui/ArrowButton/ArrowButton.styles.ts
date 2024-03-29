import styled, { css } from 'styled-components';

import { ArrowDirections } from './ArrowButton';

interface ArrowButtonInterface {
  direction: ArrowDirections;
  isHidden: boolean;
  isSmaller: boolean;
}

const StyledArrowButton = styled.div<ArrowButtonInterface>`
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;
  padding: 2rem;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  //visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};

  ${({ direction }) =>
    direction === 'right' &&
    css`
      transform: rotate(180deg);
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      transform: rotate(0);
    `}
   
  ${({ direction }) =>
    direction === 'bottom' &&
    css`
      transform: rotate(-90deg);
    `}

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: ${({ isSmaller }) => (isSmaller ? '7px' : '14px')};
    height: 1px;
    background-color: ${({ theme }) => theme.colors.black};
    transition: all 0.5s ease;
    transform-origin: 50% 50%;
  }
  &::after {
    top: 50%;
    left: 50%;
    transform-origin: bottom left;
    transform: translateX(-50%) rotate(-40deg);
  }

  &::before {
    top: 50%;
    left: 50%;
    transform-origin: top left;
    transform: translateX(-50%) rotate(40deg);
  }
`;

export { StyledArrowButton };
