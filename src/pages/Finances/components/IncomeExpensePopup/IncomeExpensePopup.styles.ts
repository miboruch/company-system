import styled from 'styled-components';
import { Form } from 'formik';
import Input from 'components/form/Input/Input';

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledInput = styled(Input)`
  margin-bottom: 3rem;
`;

export { StyledForm, StyledInput };
