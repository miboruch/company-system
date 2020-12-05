import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import ArrowButton from '../../components/atoms/ArrowButton/ArrowButton';
import { Direction } from '../../types/globalTypes';
import { changeUserRoleTo } from '../../ducks/auth/roles/roles-creators';
import { UserRole } from '../../types/actionTypes/authenticationActionTypes';
import { Wrapper, Heading, Header, StyledHeading, ContentWrapper, Paragraph, ContentBox, ArrowWrapper, StyledCompanyName } from './SelectPage.styles';

const SelectPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <Wrapper>
      <Header>
        <StyledCompanyName>Company management</StyledCompanyName>
        <Heading>Wybierz panel</Heading>
      </Header>
      <ContentWrapper>
        <ContentBox onClick={() => dispatch(changeUserRoleTo(UserRole.Admin, () => history.push('/admin/companies')))}>
          <div>
            <StyledHeading>Panel administratora</StyledHeading>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate itaque natus perspiciatis tempore!</Paragraph>
          </div>
          <ArrowWrapper>
            <ArrowButton direction={Direction.Right} />
          </ArrowWrapper>
        </ContentBox>
        <ContentBox onClick={() => dispatch(changeUserRoleTo(UserRole.User, () => history.push('/user/companies')))}>
          <div>
            <StyledHeading>Panel użytkownika</StyledHeading>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate itaque natus perspiciatis tempore!</Paragraph>
          </div>
          <ArrowWrapper>
            <ArrowButton direction={Direction.Right} />
          </ArrowWrapper>
        </ContentBox>
      </ContentWrapper>
    </Wrapper>
  );
};

export default SelectPage;
