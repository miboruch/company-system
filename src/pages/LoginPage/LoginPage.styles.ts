import styled from 'styled-components';
import { Form } from 'formik';
import Input from '../../components/atoms/Input/Input';

const StyledForm = styled(Form)`
  width: 100%;
  padding: 2rem 3rem;
`;

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #212121;
  margin-bottom: 6rem;
  letter-spacing: -1px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 3rem;
`;

const ErrorParagraph = styled.p`
  margin-top: 2rem;
  color: tomato;
  font-size: 12px;
`;

export { StyledInput, StyledForm, Heading, FlexWrapper, ErrorParagraph };
