import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types/actionTypes/authenticationActionTypes';
import { setRole } from '../../ducks/auth/roles/roles';
import { useAppDispatch } from '../../store/test-store';

const SelectPage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Link to={'/admin/companies'} onClick={() => dispatch(setRole(UserRole.Admin))}>
        Admin
      </Link>
      <Link to={'/admin/settings'} onClick={() => dispatch(setRole(UserRole.Admin))}>
        Admin settings
      </Link>
      <Link to={'/user/companies'} onClick={() => dispatch(setRole(UserRole.User))}>
        Użytkownik
      </Link>
    </div>
  );
};

export default SelectPage;
