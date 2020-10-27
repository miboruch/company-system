import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { connect } from 'react-redux';
import { ClientInterface, CompanyInterface } from '../../../types/modelsTypes';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { listAnimation } from '../../../animations/animations';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getCompanyClients, selectClient, setClientInfoOpen } from '../../../actions/clientActions';
import { SpinnerWrapper, List } from '../../../styles/sharedStyles';
import Spinner from '../../atoms/Spinner/Spinner';
import ListBox from '../../molecules/ListBox/ListBox';
import { DEFAULT_COMPANY_ID } from '../../../utils/config';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import ClientInfo from '../ClientInfo/ClientInfo';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const ClientsPageContent: React.FC<ConnectedProps> = ({ isLoading, allCompanyClients, isClientInfoOpen, setClientInfoOpen, selectClient, getCompanyClients }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByClientName = (filterText: string, allClients: ClientInterface[]): ClientInterface[] => {
    return allClients.filter((client) => client.name.toLowerCase().includes(filterText.toLowerCase()));
  };

  useEffect(() => {
    listAnimation(tl, listRef);
  }, []);

  useEffect(() => {
    allCompanyClients.length === 0 && getCompanyClients();
  }, []);

  return (
    <GridWrapper mobilePadding={false} pageName={'Klienci'} setFilterText={setFilterText}>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <List ref={listRef}>
            {filterByClientName(filterText, allCompanyClients).map((client) => (
              <ListBox
                name={client.name}
                topDescription={`${client.address}, ${client.city}`}
                bottomDescription={client.email}
                callback={() => selectClient(client)}
                isCompanyBox={false}
                isEmpty={true}
              />
            ))}
          </List>
          <ContentTemplate isOpen={isClientInfoOpen} setOpen={setClientInfoOpen}>
            <ClientInfo />
          </ContentTemplate>
        </>
      )}
    </GridWrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  isLoading: boolean;
  allCompanyClients: ClientInterface[];
  isClientInfoOpen: boolean;
}

interface LinkDispatchProps {
  getCompanyClients: () => void;
  selectClient: (client: ClientInterface) => void;
  setClientInfoOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ authenticationReducer: { token }, clientReducer: { isLoading, allCompanyClients, isClientInfoOpen } }: AppState): LinkStateProps => {
  return { token, isLoading, allCompanyClients, isClientInfoOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getCompanyClients: bindActionCreators(getCompanyClients, dispatch),
    selectClient: bindActionCreators(selectClient, dispatch),
    setClientInfoOpen: bindActionCreators(setClientInfoOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPageContent);
