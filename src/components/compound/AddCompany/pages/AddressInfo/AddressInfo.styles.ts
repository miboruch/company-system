import styled from 'styled-components';
import Input from '../../../../atoms/Input/Input';
import { Form } from 'formik';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: grid;
  place-items: center;
  padding: 0 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    grid-area: content;
  }
`;

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 0 2rem;
`;

export { Wrapper, StyledInput, StyledForm };
