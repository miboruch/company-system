import styled from 'styled-components';
import Input from '../components/atoms/Input/Input';
import { Form } from 'formik';
import { BackParagraph } from './shared';

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
  width: 100%;
  grid-area: list;
  display: none;
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.impactGray};

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: column;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  overflow: hidden;
  margin-top: 0;
  z-index: 5;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    grid-area: content;
    height: 100%;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 30px;
  }
`;

const MapHeadingWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 2.5rem;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

const CenterBox = styled.div`
  width: 100px;
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.dark};
  display: grid;
  place-items: center;
  background-color: white;
  position: absolute;
  bottom: 120px;
  right: 2rem;
  z-index: 50;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 110px;
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
  }
`;

export {
  Wrapper,
  StyledForm,
  StyledInput,
  MobileCompoundTitle,
  StandardCompoundTitle,
  HeadingWrapper,
  Subheading,
  StyledBackParagraph,
  ListWrapper,
  MapWrapper,
  MapHeadingWrapper,
  CenterBox,
  ButtonWrapper
};
