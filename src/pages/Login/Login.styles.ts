import styled from 'styled-components';
import { Form } from 'formik';
import { Link } from 'react-router-dom';

import { Input } from 'components';

const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;

  ${({ theme }) => theme.mq.tablet} {
    width: 80%;
  }

  ${({ theme }) => theme.mq.standard} {
    width: 70%;
  }

  ${({ theme }) => theme.mq.hdReady} {
    width: 60%;
  }
`;

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

const FlexWrapperDefault = styled(FlexWrapper)`
  justify-content: flex-start;
`;

const AccountParagraph = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 14px;

  ${({ theme }) => theme.mq.hdReady} {
    font-size: 16px;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.dark};
`;

export { AuthWrapper, StyledInput, StyledForm, Heading, FlexWrapper, FlexWrapperDefault, AccountParagraph, StyledLink };
