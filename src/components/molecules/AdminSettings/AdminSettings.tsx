import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getAllCompanyEmployees } from '../../../actions/employeeActions';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AdminSettings: React.FC<ConnectedProps> = ({ allCompanyEmployees, getAllCompanyEmployees }) => {
  useEffect(() => {
    allCompanyEmployees.length === 0 && getAllCompanyEmployees();
  }, []);

  return (
    <div>
      <p>Admin settings</p>
    </div>
  );
};

interface LinkStateProps {
  allCompanyEmployees: EmployeeDataInterface[];
}

interface LinkDispatchProps {
  getAllCompanyEmployees: () => void;
}

const mapStateToProps = ({ employeeReducer: { allCompanyEmployees } }: AppState): LinkStateProps => {
  return { allCompanyEmployees };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getAllCompanyEmployees: bindActionCreators(getAllCompanyEmployees, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings);
