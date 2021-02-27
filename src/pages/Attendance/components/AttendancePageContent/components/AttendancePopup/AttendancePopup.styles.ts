import styled from 'styled-components';
import { Form } from 'formik';

import { Paragraph } from 'styles';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledParagraph = styled(Paragraph)`
  margin-right: 2rem;
  margin-bottom: 0;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledFlexWrapper = styled(FlexWrapper)`
  margin-top: 2rem;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
`;

const InputWrapper = styled.div`
  width: 40%;
  margin: auto;
  margin-top: 3rem;
`;

export { FlexWrapper, StyledForm, StyledParagraph, StyledFlexWrapper, StyledWrapper, InputWrapper };
