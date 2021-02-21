import React from 'react';
import { useHistory } from 'react-router-dom';

import { ArrowButton } from 'components';
import { UserRole } from 'ducks/auth/roles/roles';
import { Direction } from 'types/globalTypes';
import { useAppDispatch } from 'store/store';
import { changeUserRoleTo } from 'ducks/auth/roles/roles-creators';
import {
  ArrowWrapper,
  ContentBox,
  ContentWrapper,
  Header,
  Heading,
  Paragraph,
  StyledCompanyName,
  StyledHeading,
  Wrapper
} from 'pages/Select/Select.styles';

const Select: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleAdminRole = () => dispatch(changeUserRoleTo(UserRole.Admin, () => history.push('/admin/companies')));
  const handleUserRole = () => dispatch(changeUserRoleTo(UserRole.User, () => history.push('/user/companies')));

  return (
    <Wrapper>
      <Header>
        <StyledCompanyName>Company management</StyledCompanyName>
        <Heading>Wybierz panel</Heading>
      </Header>
      <ContentWrapper>
        <ContentBox onClick={handleAdminRole}>
          <div>
            <StyledHeading>Panel administratora</StyledHeading>
            <Paragraph>Przejdź do panelu administratora, aby zarządzać i optymalizować pracę swojej firmy.</Paragraph>
          </div>
          <ArrowWrapper>
            <ArrowButton direction={Direction.Right} />
          </ArrowWrapper>
        </ContentBox>
        <ContentBox onClick={handleUserRole}>
          <div>
            <StyledHeading>Panel pracownika</StyledHeading>
            <Paragraph>Przejdź do panelu pracownika, aby przeglądać swoje dane, wyniki oraz osiągnięcia w firmie.</Paragraph>
          </div>
          <ArrowWrapper>
            <ArrowButton direction={Direction.Right} />
          </ArrowWrapper>
        </ContentBox>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Select;
