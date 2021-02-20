import styled from 'styled-components';
import { Form } from 'formik';

const StyledForm = styled(Form)`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    width: 70%;
  }

  ${({ theme }) => theme.mq.fullHd} {
    width: 50%;
  }
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #212121;
  margin-top: 2rem;
  margin-bottom: 3rem;
  letter-spacing: -1px;
`;

export { StyledForm, Heading };
