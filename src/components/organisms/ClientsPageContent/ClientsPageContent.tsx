import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { connect } from 'react-redux';
import { ClientInterface } from '../../../types/modelsTypes';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { listAnimation } from '../../../animations/animations';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { deleteClient, getCompanyClients, selectClient, setAddNewClientOpen, setClientInfoOpen } from '../../../actions/clientActions';
import { AddIcon, AddParagraph, AddWrapper, List, SpinnerWrapper } from '../../../styles/shared';
import Spinner from '../../atoms/Spinner/Spinner';
import ListBox from '../../molecules/ListBox/ListBox';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import ClientInfo from '../ClientInfo/ClientInfo';
import AddClientController from '../../compound/AddClient/AddClientController';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';
import MapCoordsEdit, { CoordsEditType } from '../MapCoordsEdit/MapCoordsEdit';
import { setEditClientCoordsOpen } from '../../../actions/toggleActions';
import Dropdown from '../../atoms/Dropdown/Dropdown';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const ClientsPageContent: React.FC<ConnectedProps> = ({
  isLoading,
  allCompanyClients,
  isClientInfoOpen,
  setClientInfoOpen,
  selectClient,
  getCompanyClients,
  setAddNewClientOpen,
  selectedClient,
  deleteClient,
  isEditClientCoordsOpen,
  setEditClientCoordsOpen
}) => {
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
    <>
      <GridWrapper
        mobilePadding={false}
        pageName={'Klienci'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) =>
          isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <>
              <List ref={listRef}>
                {filterByClientName(filterText, allCompanyClients).map((client) => (
                  <ListBox
                    key={client._id}
                    name={client.name}
                    topDescription={`${client.address}, ${client.city}`}
                    bottomDescription={client.email}
                    callback={() => selectClient(client)}
                    isCompanyBox={false}
                    isEmpty={true}
                  />
                ))}
                <AddWrapper onClick={() => setAddNewClientOpen(true)}>
                  <AddIcon />
                  <AddParagraph>Dodaj klienta</AddParagraph>
                </AddWrapper>
              </List>
              <ContentTemplate isOpen={isClientInfoOpen} setOpen={setClientInfoOpen}>
                <ClientInfo isEditToggled={isEditToggled} setEditToggled={setEditToggled} setDeleteOpen={setDeleteOpen} />
              </ContentTemplate>
              <AddClientController />
              <DeletePopup
                isOpen={isDeleteOpen}
                setOpen={setDeleteOpen}
                headerText={'Usuń klienta'}
                text={`${selectedClient?.name}`}
                callback={() => selectedClient?._id && deleteClient(selectedClient._id)}
              />
            </>
          )
        }
      />
      {selectedClient && <MapCoordsEdit isOpen={isEditClientCoordsOpen} setOpen={setEditClientCoordsOpen} lat={selectedClient.lat} long={selectedClient.long} type={CoordsEditType.Client} />}
    </>
  );
};

interface LinkStateProps {
  token: string | null;
  isLoading: boolean;
  allCompanyClients: ClientInterface[];
  isClientInfoOpen: boolean;
  selectedClient: ClientInterface | null;
  isEditClientCoordsOpen: boolean;
}

interface LinkDispatchProps {
  getCompanyClients: () => void;
  selectClient: (client: ClientInterface) => void;
  setClientInfoOpen: (isOpen: boolean) => void;
  setAddNewClientOpen: (isOpen: boolean) => void;
  deleteClient: (clientId: string) => void;
  setEditClientCoordsOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({
  authenticationReducer: { token },
  clientReducer: { isLoading, allCompanyClients, isClientInfoOpen, selectedClient },
  toggleReducer: { isEditClientCoordsOpen }
}: AppState): LinkStateProps => {
  return { token, isLoading, allCompanyClients, isClientInfoOpen, selectedClient, isEditClientCoordsOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getCompanyClients: bindActionCreators(getCompanyClients, dispatch),
    selectClient: bindActionCreators(selectClient, dispatch),
    setClientInfoOpen: bindActionCreators(setClientInfoOpen, dispatch),
    setAddNewClientOpen: bindActionCreators(setAddNewClientOpen, dispatch),
    deleteClient: bindActionCreators(deleteClient, dispatch),
    setEditClientCoordsOpen: bindActionCreators(setEditClientCoordsOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPageContent);
