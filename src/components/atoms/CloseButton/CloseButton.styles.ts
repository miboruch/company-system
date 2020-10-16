import styled from 'styled-components';

const ButtonWrapper = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  margin: 0;

  :focus {
    outline: none;
  }
`;

const InnerButton = styled.div`
  position: relative;
  ::before,
  ::after {
    content: '';
    width: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.black};
    position: absolute;
    right: 0;
    transition: all 0.5s ease;
    top: 0;
  }
  ::before {
    transform: rotate(40deg);
  }
  ::after {
    transform: rotate(-40deg);
  }
`;

export { ButtonWrapper, InnerButton };
