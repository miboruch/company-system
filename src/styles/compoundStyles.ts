import styled from 'styled-components';
import Input from '../components/atoms/Input/Input';
import { Form } from 'formik';
import { BackParagraph } from './sharedStyles';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: grid;
  place-items: center;
  padding: 0 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    grid-area: content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 3rem;
    background-color: #f9fbfc;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 0 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 60%;
  }
`;

const MobileCompoundTitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StandardCompoundTitle = styled(MobileCompoundTitle)`
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    padding-left: 5rem;
    justify-self: flex-start;
    display: block;
    grid-area: heading;
    align-self: center;
    margin: 0;
    font-weight: ${({ theme }) => theme.font.weight.book};
    letter-spacing: -1px;
    color: ${({ theme }) => theme.colors.dark};
    font-size: 18px;
  }
`;

const HeadingWrapper = styled.div`
  margin-bottom: 5rem;
`;

const Subheading = styled.h3`
  font-weight: ${({ theme }) => theme.font.weight.book};
  color: #555454;
  font-size: 12px;
  margin-top: 0.5rem;
`;

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const StyledBackParagraph = styled(BackParagraph)`
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
  }
`;

const ListWrapper = styled.div`
  grid-area: list;
  display: none;
  overflow: hidden;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: column;
  }
`;

export { Wrapper, StyledForm, StyledInput, MobileCompoundTitle, StandardCompoundTitle, HeadingWrapper, Subheading, StyledBackParagraph, ListWrapper };
