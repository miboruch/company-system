import React, { useEffect, useRef, useState } from 'react';

import { ContentTemplate, DeletePopup, GridWrapper, MenuTemplate } from 'components';
import ClientsList from 'pages/Clients/components/ClientsList/ClientsList';
import { setClientInfoOpen, setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import ClientInfo from 'pages/Clients/components/ClientInfo/ClientInfo';
import AddClientController from 'pages/Clients/components/ClientsPageContent/components/AddClient/AddClientController';
// import { deleteClient } from 'ducks/client/client-creators';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import {deleteClient} from 'api';
import { AppState, useAppDispatch } from 'store/store';
import { useSelector } from 'react-redux';
import { useCall, useQuery } from 'components/hooks';
import { setNotification } from 'ducks/popup/popup';

const Clients: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, resetQueries } = useQuery();
  const { isEditClientCoordsOpen, selectedClient } = useSelector(
    (state: AppState) => state.client.clientToggle
  );
  const [filterText, setFilterText] = useState<string>('');
  const [refreshDate, setRefreshDate] = useState<Date>( new Date());

  const { submit, onCallSuccess, onCallError } = useCall<typeof deleteClient>(deleteClient);
  onCallSuccess(() => {
    resetQueries();
    setRefreshDate(new Date());
  });
  onCallError(({ message }) => dispatch(setNotification({ message })));

  const handleDeleteClient = () => submit(query.client);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Klienci'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) => (
          <>
            <ClientsList filterText={filterText} />
            <ContentTemplate isOpen={!!query.client} close={resetQueries}>
              <ClientInfo isEditToggled={isEditToggled} setEditToggled={setEditToggled} setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <AddClientController />
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń klienta'}
              text={`${selectedClient?.name}`}
              handleDelete={handleDeleteClient}
            />
          </>
        )}
      />
    </MenuTemplate>
  );
};

export default Clients;
