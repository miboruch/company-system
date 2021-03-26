import styled from 'styled-components';
import { Heading } from '../../Select.styles';

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

export { StyledHeading, Paragraph, ContentBox, ArrowWrapper };
