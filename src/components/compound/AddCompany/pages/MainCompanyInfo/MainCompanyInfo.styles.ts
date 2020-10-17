import styled from 'styled-components';
import Input from '../../../../atoms/Input/Input';
import { Form } from 'formik';
import { MobileCompoundTitle } from '../../../../../styles/sharedStyles';

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

const StyledInput = styled(Input)`
  margin-bottom: 5rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  padding: 0 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 60%;
  }
`;

const MobileCompoundTitleNoneStandard = styled(MobileCompoundTitle)`
  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

const StyledCompoundTitle = styled(MobileCompoundTitle)`
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    padding-left: 5rem;
    justify-self: flex-start;
    display: block;
    grid-area: heading;
    align-self: center;
    margin: 0;
  }
`;

export { Wrapper, StyledInput, StyledForm, StyledCompoundTitle, MobileCompoundTitleNoneStandard };
