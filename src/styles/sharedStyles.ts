import styled, { css } from 'styled-components';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Payment } from '../assets/icons/payment.svg';
import { ReactComponent as List } from '../assets/icons/list.svg';
import { ReactComponent as Support } from '../assets/icons/support.svg';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { ReactComponent as Add } from '../assets/icons/add.svg';

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

const AddIcon = styled(Add)`
  width: 28px;
  height: 28px;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Title = styled.h1`
  grid-area: name;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  align-self: flex-start;
  padding: 0 2rem;
  font-size: 30px;
  letter-spacing: -1px;

  ${({ theme }) => theme.mq.hdReady} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
    align-self: center;
    justify-self: flex-start;
    margin-left: 5rem;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 21px;
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

const BackParagraph = styled.p`
  color: ${({ theme }) => theme.colors.landingGray};
  font-size: 14px;
  cursor: pointer;
`;

interface ErrorParagraphInterface {
  isVisible: boolean;
}

const ErrorParagraph = styled.p<ErrorParagraphInterface>`
  margin-top: 2rem;
  color: tomato;
  font-size: 12px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const EmptyParagraph = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.emptyText};
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

export {
  HomeIcon,
  PaymentIcon,
  ListIcon,
  SupportIcon,
  UserIcon,
  AddIcon,
  SpinnerWrapper,
  Title,
  Paragraph,
  FlexWrapper,
  StyledLabel,
  BackParagraph,
  DoubleFlexWrapper,
  ErrorParagraph,
  EmptyParagraph,
  CompoundListWrapper
};
