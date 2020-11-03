import styled from 'styled-components';

const StyledCheckbox = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  width: 20px;
  position: relative;
  transition: all 0.25s ease;
  vertical-align: middle;
  margin-right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  &:hover {
    background-color: mix(#007788, white, 25%);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(#007788, 0.75);
  }
  &:checked {
    background-color: ${({ theme }) => theme.colors.landingGray};
    border: 1px ${({ theme }) => theme.colors.black} solid;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

export { StyledCheckbox, Wrapper };
