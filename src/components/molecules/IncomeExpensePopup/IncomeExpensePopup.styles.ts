import styled from 'styled-components';
import { Form } from 'formik';
import Input from '../../atoms/Input/Input';

const StyledForm = styled(Form)`
  width: 100%;
  min-height: calc(400px - 80px);
`;

const StyledInput = styled(Input)`
  margin-bottom: 3rem;
`;

export { StyledForm, StyledInput };
