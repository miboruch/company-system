import styled from 'styled-components';
import { Direction } from '../../../types/globalTypes';

interface ArrowButtonInterface {
  direction: Direction;
}

const StyledArrowButton = styled.div<ArrowButtonInterface>`
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;
  padding: 2rem;
  transform: rotate(${({ direction }) => (direction === Direction.Right ? '180deg' : '0')});

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
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
