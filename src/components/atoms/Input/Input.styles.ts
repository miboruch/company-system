import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
  transform-origin: left;
  ${({ theme }) => theme.mq.standard} {
    color: #fff;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-family: ${({ theme }) => theme.font.family.futura};
  color: rgba(0, 0, 0, 0.6);
  height: 36px;
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #ccc;
  transition: border-bottom-color 1s ease, text-decoration 1s ease;

  &:focus {
    outline: none;
    border-bottom: 1px solid #8d8d8d;
  }

  &:focus ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-20px);
  }

  &:valid ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-20px);
  }

  &:valid {
    border-bottom-color: rgba(173, 255, 178, 0.5);
  }

  &:invalid {
    text-decoration: line-through;
    border-bottom-color: rgba(255, 70, 92, 0.5);
  }

  ${({ theme }) => theme.mq.standard} {
    color: #fff;
  }
`;

export { InputWrapper, StyledLabel, StyledInput };
