import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import EmployeesPageContent from '../../components/organisms/EmployeesPageContent/EmployeesPageContent';

import { AppState, useAppDispatch } from '../../store/store';
import { UserRole } from '../../ducks/auth/roles/roles';
import { getAllAppUsers } from '../../ducks/users/all-users-creators';

const EmployeePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  useEffect(() => {
    role === UserRole.Admin && dispatch(getAllAppUsers());
  }, []);

  return (
    <MenuTemplate>
      <EmployeesPageContent />
    </MenuTemplate>
  );
};

export default EmployeePage;
