import styled from 'styled-components';
import { Form } from 'formik';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  flex-direction: column;
  margin-top: 5rem;

  ${({ theme }) => theme.mq.hdReady} {
    padding: 5rem;
    margin-top: 0;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EmployeeInfoBox = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  letter-spacing: -1px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 4rem;

  ${({ theme }) => theme.mq.tablet} {
    width: 70%;
  }

  ${({ theme }) => theme.mq.standard} {
    width: 60%;
  }

  ${({ theme }) => theme.mq.hdReady} {
    width: 70%;
  }

  ${({ theme }) => theme.mq.fullHd} {
    width: 50%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding-bottom: 3rem;
`;

const RowIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  row-gap: 2rem;
`;

export { Wrapper, StyledForm, HeaderWrapper, EmployeeInfoBox, Title, InputWrapper, ButtonWrapper, RowIconWrapper };
