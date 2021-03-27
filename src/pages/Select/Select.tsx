import React from 'react';
import { useHistory } from 'react-router-dom';

import SelectBox from './components/SelectBox/SelectBox';
import { useAppDispatch } from 'store/store';
import { changeUserRoleTo } from 'ducks/auth/roles/roles-creators';
import { UserRole } from 'ducks/auth/roles/roles';
import { ContentWrapper, Header, Heading, StyledCompanyName, Wrapper } from 'pages/Select/Select.styles';

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
        <SelectBox
          onClick={handleAdminRole}
          heading={'Panel administratora'}
          text={'Przejdź do panelu administratora, aby zarządzać i optymalizować pracę swojej firmy.'}
        />
        <SelectBox
          onClick={handleUserRole}
          heading={'Panel pracownika'}
          text={'Przejdź do panelu pracownika, aby przeglądać swoje dane, wyniki oraz osiągnięcia w firmie.'}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Select;
