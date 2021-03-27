import styled from 'styled-components';
import { Form } from 'formik';

import { Input } from 'components';

import { ButtonWrapper } from 'styles/popupStyles';
import { Paragraph } from 'styles';

const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const StyledForm = styled(Form)`
  padding: 3rem;
`;

const StyledButtonWrapper = styled(ButtonWrapper)`
  padding-top: 0.5rem;
`;

const StyledInput = styled(Input)`
  padding: 0 1rem;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 4rem;
`;

const InputRowWrapper = styled(RowWrapper)`
  margin-bottom: 1rem;
`;

const StyledInfoParagraph = styled(Paragraph)`
  margin-top: 2rem;
`;

export { ContentWrapper, StyledForm, StyledButtonWrapper, StyledInput, RowWrapper, InputRowWrapper, StyledInfoParagraph };
