import styled from 'styled-components';

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

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 150px);

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    flex-direction: row;
  }
`;

const CompanyName = styled.h3`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.dark};
  letter-spacing: -1px;
  margin-top: 4rem;

  ${({ theme }) => theme.mq.tablet} {
    margin-top: 2rem;
  }

  ${({ theme }) => theme.mq.standard} {
    margin-top: 0;
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

export { Wrapper, Heading, Header, ContentWrapper, StyledCompanyName };
