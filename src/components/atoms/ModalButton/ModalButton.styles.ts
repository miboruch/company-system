import styled, { css } from 'styled-components';
import { ButtonType } from './ModalButton';

interface ButtonTypeInterface {
  buttonType: ButtonType;
}

const Button = styled.button<ButtonTypeInterface>`
  width: 120px;
  height: 40px;
  text-align: center;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  border-radius: 8px;
  margin: 0 1rem;
  cursor: pointer;
  
  &:focus{
    outline: none;
  }

  ${({ buttonType }) =>
    buttonType === ButtonType.Cancel &&
    css`
      background-color: transparent;
      border: 1px solid #f1f1f7;
      color: ${({ theme }) => theme.colors.dark};
    `}

  ${({ buttonType }) =>
    buttonType === ButtonType.Delete &&
    css`
      background-color: ${({ theme }) => theme.colors.deleteButton};
      border: none;
      color: ${({ theme }) => theme.colors.white};
    `}
  
  ${({ buttonType }) =>
    buttonType === ButtonType.Add &&
    css`
      background-color: ${({ theme }) => theme.colors.green};
      border: none;
      color: ${({ theme }) => theme.colors.white};
    `}
  
  ${({ buttonType }) =>
    buttonType === ButtonType.Submit &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.green};
      color: ${({ theme }) => theme.colors.white};
    `}
`;

export { Button };
