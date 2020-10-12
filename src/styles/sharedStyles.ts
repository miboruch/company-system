import styled, { css } from 'styled-components';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Payment } from '../assets/icons/payment.svg';
import { ReactComponent as List } from '../assets/icons/list.svg';
import { ReactComponent as Support } from '../assets/icons/support.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';

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

const ListIcon = styled(List)`
  ${iconStyles}
`;

const SupportIcon = styled(Support)`
  ${iconStyles}
`;

const UserIcon = styled(User)`
  ${iconStyles}
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 50vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Title = styled.h1`
  grid-area: name;
`;

export { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon, SpinnerWrapper, Title };
