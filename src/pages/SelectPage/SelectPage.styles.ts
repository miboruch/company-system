import styled from 'styled-components';
import { CompanyName } from '../../components/organisms/Menu/Menu.styles';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #e7e8e8;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.mq.standard} {
    display: grid;
    place-items: center;
  }
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.demi};
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black};
  letter-spacing: -1px;

  ${({ theme }) => theme.mq.standard} {
    font-size: 36px;
  }
`;

const StyledHeading = styled(Heading)`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.font.weight.medium};

  ${({ theme }) => theme.mq.standard} {
    font-size: 36px;
    font-weight: ${({ theme }) => theme.font.book};
    text-align: center;
    word-wrap: break-word;
    color: #cacacf;
    transition: color 0.4s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 150px);

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    flex-direction: row;
  }
`;

const Paragraph = styled.p`
  width: 250px;
  font-size: 14px;
  color: #cacacf;
  line-height: 21px;
  margin-top: 3rem;

  ${({ theme }) => theme.mq.standard} {
    width: 400px;
    text-align: center;
    color: #cacacf;
    transition: color 0.4s ease;
  }
`;

const ContentBox = styled.section`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 4rem;
  border-bottom: 1px solid #e7e8e8;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9fbfc;
  }

  ${({ theme }) => theme.mq.standard} {
    display: grid;
    place-items: center;
    padding-left: 0;
    height: 100%;
    border-bottom: 0;
    border-right: 1px solid #e7e8e8;

    &:hover ${Paragraph} {
      color: ${({ theme }) => theme.colors.black};
    }

    &:hover ${StyledHeading} {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const ArrowWrapper = styled.div`
  margin-left: 1.5rem;

  ${({ theme }) => theme.mq.standard} {
    display: none;
  }
`;

const StyledCompanyName = styled(CompanyName)`
  position: absolute;
  top: 50%;
  left: 3rem;
  width: 50px;
  transform: translateY(-50%);
  display: none;
  font-size: 14px;

  ${({ theme }) => theme.mq.standard} {
    display: block;
  }
`;

export { Wrapper, Heading, Header, StyledHeading, ContentWrapper, Paragraph, ContentBox, ArrowWrapper, StyledCompanyName };
