import React, { useState } from 'react';

import ClientsList from './components/ClientsList/ClientsList';
import ClientInfo from './components/ClientInfo/ClientInfo';
import AddClientController from './components/AddClient/AddClientController';
import { ContentTemplate, DeletePopup, GridWrapper, MenuTemplate } from 'components';
import { deleteClient } from 'api';
import { useAppDispatch } from 'store/store';
import { useCall, useQuery } from 'components/hooks';
import { setNotification } from 'ducks/popup/popup';

const Clients: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, removeQuery } = useQuery();
  const [filterText, setFilterText] = useState<string>('');
  const [refreshDate, setRefreshDate] = useState<Date>(new Date());

  const { submit, onCallSuccess, onCallError } = useCall<typeof deleteClient>(deleteClient);
  onCallSuccess(() => {
    removeQuery('client');
    setRefreshDate(new Date());
  });
  onCallError(({ message }) => dispatch(setNotification({ message })));

  const handleDeleteClient = () => submit(query.client);
  const handleClientClose = () => removeQuery('client');

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Klienci'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) => (
          <>
            <ClientsList filterText={filterText} refreshDate={refreshDate} />
            <ContentTemplate isOpen={!!query.client} close={handleClientClose}>
              <ClientInfo isEditToggled={isEditToggled} setEditToggled={setEditToggled} setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <AddClientController />
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń klienta'}
              text={`klienta`}
              handleDelete={handleDeleteClient}
            />
          </>
        )}
      />
    </MenuTemplate>
  );
};

export default Clients;
