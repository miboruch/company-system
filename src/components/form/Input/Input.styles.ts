import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 7px;
  left: 0;
  transition: transform 0.5s ease;
  transform-origin: left;
  font-size: 12px;

  ${({ theme }) => theme.mq.standard} {
    color: #1d1d1d;
  }
`;

const StyledInput = styled.input<{ spacing: boolean }>`
  width: 100%;
  font-size: 13px;
  font-family: ${({ theme }) => theme.font.family.avantGarde};
  color: rgba(0, 0, 0, 0.6);
  height: 36px;
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #ccc;
  transition: border-bottom-color 1s ease, text-decoration 1s ease, opacity 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 1px solid #8d8d8d;
  }

  &:focus ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-25px);
  }

  &:valid ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-25px);
  }

  &:valid {
    border-bottom-color: rgba(93, 129, 55, 0.92);
  }

  &:invalid {
    text-decoration: line-through;
    border-bottom-color: rgba(255, 70, 92, 0.5);
  }

  &:disabled ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-25px);
  }

  &:disabled {
    opacity: 0.5;
  }

  ${({ theme }) => theme.mq.standard} {
    color: ${({ theme }) => theme.colors.inputColorStandard};
  }

  ${({ spacing }) =>
    spacing &&
    css`
      margin-bottom: 5rem;
    `}
`;

export { InputWrapper, StyledLabel, StyledInput };
