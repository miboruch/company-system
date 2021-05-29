import styled from 'styled-components';

interface InfoBoxWrapper {
  noPadding?: boolean;
}

const InfoBoxWrapper = styled.div<InfoBoxWrapper>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  margin: 3rem 0;
  ${({ theme }) => theme.mq.hdReady} {
    //display: contents;
    border: 1px solid ${({ theme }) => theme.colors.impactGray};
    margin: 0;
    grid-area: currency;
    border-radius: 30px;
    padding: ${({ noPadding }) => (noPadding ? '0' : '3rem')};
  }
`;

const IncomeExpenseField = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #e7e8e8;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;
  display: grid;
  place-items: center;
  transition: background-color 0.3s ease;
  ${({ theme }) => theme.mq.hdReady} {
    width: 50%;
    margin-bottom: 0;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.menuBackground};
  }
  &:last-child {
    border-right: none;
  }
`;

interface CurrencyBoxInterface {
  isActive: boolean;
}

const CurrencyBox = styled(IncomeExpenseField)<CurrencyBoxInterface>`
  width: calc(100% / 3);
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.menuBackground : theme.colors.white)};
`;

export { InfoBoxWrapper, CurrencyBox };
