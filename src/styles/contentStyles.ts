import styled from 'styled-components';
import { Form } from 'formik';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  flex-direction: column;

  ${({ theme }) => theme.mq.hdReady} {
    padding: 5rem;
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

const Paragraph = styled.p`
  font-size: 12px;
  color: #D3D3D4;
  //color: ${({ theme }) => theme.colors.textGray};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 1rem;
  line-height: 2.2;
`;

const EmployeeInfoBox = styled.div`
  margin-bottom: 3rem;
`;

const SubParagraph = styled(Paragraph)`
  color: #78787f;
  margin: 0;
`;

const TextParagraph = styled(SubParagraph)`
  color: #454545;
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
  margin-bottom: 3rem;
`;

const RowIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  row-gap: 2rem;
`;

export { Wrapper, StyledForm, HeaderWrapper, Paragraph, EmployeeInfoBox, SubParagraph, TextParagraph, Title, InputWrapper, ButtonWrapper, RowIconWrapper };
