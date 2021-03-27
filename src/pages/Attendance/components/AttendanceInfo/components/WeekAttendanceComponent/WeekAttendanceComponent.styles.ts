import styled, { css } from 'styled-components';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from 'styles/iconStyles';

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: auto;
  background-color: ${({ theme }) => theme.colors.impactGray};
  grid-gap: 1px;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
  }
`;

interface SingleAttendanceWrapperInterface {
  isCurrentDay: boolean;
}

const SingleAttendanceWrapper = styled.div<SingleAttendanceWrapperInterface>`
  background-color: ${({ theme }) => theme.colors.contentBackground};
  border: ${({ isCurrentDay }) => (isCurrentDay ? '1px solid #85BE9B' : 'none')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  transition: background-color 0.4s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }

  ${({ theme }) => theme.mq.hdReady} {
    background-color: ${({ theme }) => theme.colors.white};
    justify-content: space-between;
    padding: 1rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.contentBackground};
    }
  }
`;

const DateParagraph = styled.p`
  color: ${({ theme }) => theme.colors.emptyText};
  font-size: 13px;
`;

const WeekDayParagraph = styled(DateParagraph)`
  font-size: 11px;
`;

const iconStyles = css`
  margin-right: 0;
  margin-top: 2rem;
`;

const StyledEmptyIcon = styled(EmptyIcon)`
  ${iconStyles};
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  ${iconStyles};
`;

const StyledNotCheckedIcon = styled(NotCheckedIcon)`
  ${iconStyles};
`;

export {
  MainWrapper,
  Header,
  StyledWrapper,
  SingleAttendanceWrapper,
  DateParagraph,
  WeekDayParagraph,
  StyledCheckedIcon,
  StyledEmptyIcon,
  StyledNotCheckedIcon
};
