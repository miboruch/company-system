import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/appActionTypes';
import { bindActionCreators } from 'redux';
import { getCompanyTasks, selectTask } from '../../../actions/taskActions';
import { DEFAULT_COMPANY_ID } from '../../../utils/config';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const TaskPageContent: React.FC<ConnectedProps> = ({ token, isLoading, allCompanyTasks, getCompanyTasks, selectTask }) => {
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    token && getCompanyTasks(token, DEFAULT_COMPANY_ID);
  }, []);

  return (
    <GridWrapper mobilePadding={false} pageName={'Zadania'} setFilterText={setFilterText}>
      <p>Hello</p>
    </GridWrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  isLoading: boolean;
  allCompanyTasks: TaskInterface[];
}

interface LinkDispatchProps {
  getCompanyTasks: (token: string, companyId: string) => void;
  selectTask: (task: TaskInterface) => void;
}

const mapStateToProps = ({ authenticationReducer: { token }, taskReducer: { isLoading, allCompanyTasks } }: AppState): LinkStateProps => {
  return { token, isLoading, allCompanyTasks };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getCompanyTasks: bindActionCreators(getCompanyTasks, dispatch),
    selectTask: bindActionCreators(selectTask, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPageContent);
