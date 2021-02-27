import styled, { css } from 'styled-components';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Payment } from '../assets/icons/payment.svg';
import { ReactComponent as ImportedListIcon } from '../assets/icons/list.svg';
import { ReactComponent as Support } from '../assets/icons/support.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { ReactComponent as Add } from '../assets/icons/add.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';

const iconStyles = css`
  fill: #212121;
  width: 21px;
  height: 21px;
  margin-right: 2rem;
`;

const homeIconStyles = css`
  fill: #212121;
  width: 17px;
  height: 17px;
  margin-right: 2rem;
`;

const HomeIcon = styled(Home)`
  ${homeIconStyles}
`;

const PaymentIcon = styled(Payment)`
  ${iconStyles}
`;

const ListIcon = styled(ImportedListIcon)`
  ${iconStyles}
`;

const SupportIcon = styled(Support)`
  ${iconStyles}
`;

const UserIcon = styled(User)`
  ${iconStyles}
`;

const AddIcon = styled(Add)`
  width: 28px;
  height: 28px;
`;

const SettingsIcon = styled(Settings)`
  ${iconStyles};
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    grid-area: content;
    position: static;
  }
`;

const MainSpinnerWrapper = styled(SpinnerWrapper)`
  ${({ theme }) => theme.mq.hdReady} {
    height: 100vh;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const DoubleFlexWrapper = styled(FlexWrapper)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
  transition: transform 0.5s ease;
  transform-origin: left;
  font-size: 12px;

  ${({ theme }) => theme.mq.standard} {
    color: #1d1d1d;
  }
`;

const CompoundListWrapper = styled.div`
  grid-area: list;
  display: none;
  overflow: hidden;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: column;
  }
`;

const List = styled.div`
  width: 100%;
  position: relative;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    grid-area: list;
    background-color: #fff;
  }
`;

const AddWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.colors.contentBackground};

  ${({ theme }) => theme.mq.hdReady} {
    position: absolute;
  }
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const AddNewParagraph = styled.p`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  letter-spacing: -1px;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

export {
  HomeIcon,
  PaymentIcon,
  ListIcon,
  SupportIcon,
  UserIcon,
  AddIcon,
  SettingsIcon,
  SpinnerWrapper,
  FlexWrapper,
  StyledLabel,
  DoubleFlexWrapper,
  CompoundListWrapper,
  List,
  AddWrapper,
  EmptyWrapper,
  MainSpinnerWrapper,
  AddNewParagraph,
  StyledHeader
};
