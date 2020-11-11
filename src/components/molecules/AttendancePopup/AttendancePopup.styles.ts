import styled from 'styled-components';
import { Paragraph } from '../../../styles/popupStyles';
import { Form } from 'formik';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledParagraph = styled(Paragraph)`
  margin-right: 2rem;
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

export { FlexWrapper, StyledForm, StyledParagraph, StyledFlexWrapper, StyledWrapper };
