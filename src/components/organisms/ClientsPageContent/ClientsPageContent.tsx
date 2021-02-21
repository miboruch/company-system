import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import { Spinner, ListBox, GridWrapper } from 'components/index';
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate';
import ClientInfo from 'components/organisms/ClientInfo/ClientInfo';
import AddClientController from 'components/compound/AddClient/AddClientController';
import DeletePopup from 'components/molecules/DeletePopup/DeletePopup';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';

import { ClientInterface } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { listAnimation } from 'animations/animations';
import { selectClient } from 'ducks/client/client-toggle/client-toggle-creators';
import { setAddNewClientOpen, setClientInfoOpen } from 'ducks/client/client-toggle/client-toggle';
import { setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import { deleteClient } from 'ducks/client/client-creators';
import { getCompanyClients } from 'ducks/client/client-data/client-data-creators';
import { Paragraph } from 'styles/typography/typography';
import { AddIcon, AddWrapper, List, SpinnerWrapper } from 'styles/shared';

const ClientsPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isEditClientCoordsOpen, isClientInfoOpen, selectedClient } = useSelector(
    (state: AppState) => state.client.clientToggle
  );
  const { allCompanyClients, areClientsLoading } = useSelector((state: AppState) => state.client.clientData);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByClientName = (filterText: string, allClients: ClientInterface[]): ClientInterface[] => {
    return allClients.filter((client) => client.name.toLowerCase().includes(filterText.toLowerCase()));
  };

  const handleSelectClient = (client: ClientInterface) => () => dispatch(selectClient(client));

  useEffect(() => {
    listAnimation(tl, listRef);
  }, []);

  useEffect(() => {
    dispatch(getCompanyClients());
  }, []);

  return (
    <>
      <GridWrapper
        mobilePadding={false}
        pageName={'Klienci'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) =>
          areClientsLoading ? (
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
                    callback={handleSelectClient(client)}
                    isCompanyBox={false}
                    isEmpty={true}
                  />
                ))}
                <AddWrapper onClick={() => dispatch(setAddNewClientOpen(true))}>
                  <AddIcon />
                  <Paragraph type={'add'}>Dodaj klienta</Paragraph>
                </AddWrapper>
              </List>
              <ContentTemplate isOpen={isClientInfoOpen} close={() => dispatch(setClientInfoOpen(false))}>
                <ClientInfo isEditToggled={isEditToggled} setEditToggled={setEditToggled} setDeleteOpen={setDeleteOpen} />
              </ContentTemplate>
              <AddClientController />
              <DeletePopup
                isOpen={isDeleteOpen}
                setOpen={setDeleteOpen}
                headerText={'Usuń klienta'}
                text={`${selectedClient?.name}`}
                callback={() => selectedClient?._id && dispatch(deleteClient(selectedClient._id))}
              />
            </>
          )
        }
      />
      {selectedClient && (
        <MapCoordsEdit
          isOpen={isEditClientCoordsOpen}
          closeMap={() => dispatch(setEditClientCoordsOpen(false))}
          lat={selectedClient.lat}
          long={selectedClient.long}
          type={CoordsEditType.Client}
        />
      )}
    </>
  );
};

export default ClientsPageContent;
