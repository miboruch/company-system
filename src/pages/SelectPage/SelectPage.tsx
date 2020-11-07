import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types/actionTypes/authenticationActionTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setUserRole } from '../../actions/authenticationActions';

interface Props {}

type ConnectedProps = Props & LinkDispatchProps;

const SelectPage: React.FC<ConnectedProps> = ({ setUserRole }) => {
  return (
    <div>
      <Link to={'/admin/companies'} onClick={() => setUserRole(UserRole.Admin)}>
        Admin
      </Link>
      <Link to={'/admin/settings'} onClick={() => setUserRole(UserRole.Admin)}>
        Admin settings
      </Link>
      <Link to={'/user/companies'} onClick={() => setUserRole(UserRole.User)}>
        Użytkownik
      </Link>
    </div>
  );
};

interface LinkDispatchProps {
  setUserRole: (role: UserRole) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setUserRole: bindActionCreators(setUserRole, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SelectPage);
