import styled from 'styled-components';
import { Form } from 'formik';

import { Heading } from 'styles';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.blurBackground};
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 4rem 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80%;
    padding: 6rem 2rem;
    border-radius: 30px;
  }
`;

const StyledForm = styled(Form)`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const FormContentWrapper = styled.div`
  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ColumnWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    padding: 4rem;
  }
`;

const CloseButtonWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
`;

const StyledHeading = styled(Heading)`
  margin: 4rem 0;
`;

export { Wrapper, Box, StyledForm, FormContentWrapper, ColumnWrapper, CloseButtonWrapper, StyledHeading };
