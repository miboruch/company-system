import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import FinancesPageContent from '../../components/organisms/FinancesPageContent/FinancesPageContent';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { fetchAllFinancesData } from '../../actions/financeActions';

interface Props {}

type ConnectedProps = Props & LinkDispatchProps;

const FinancesPage: React.FC<ConnectedProps> = ({ fetchAllFinancesData }) => {
  useEffect(() => {
    fetchAllFinancesData();
  }, []);
  return (
    <MenuTemplate>
      <FinancesPageContent />
    </MenuTemplate>
  );
};

interface LinkDispatchProps {
  fetchAllFinancesData: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    fetchAllFinancesData: bindActionCreators(fetchAllFinancesData, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(FinancesPage);
