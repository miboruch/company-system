import React, { useState } from 'react';

import ClientsList from './components/ClientsList/ClientsList';
import ClientInfo from './components/ClientInfo/ClientInfo';
import AddClientController from './components/AddClient/AddClientController';
import { ContentTemplate, DeletePopup, GridWrapper, MenuTemplate, notifications } from 'components';
import { deleteClient } from 'api';
import { useCall, useQuery } from 'components/hooks';

const Clients: React.FC = () => {
  const { query, removeQuery } = useQuery();
  const [filterText, setFilterText] = useState<string>('');
  const [refreshDate, setRefreshDate] = useState<Date>(new Date());
  const [isAddClientOpen, setAddClientOpen] = useState<boolean>(false);

  const { submit, onCallSuccess, onCallError } = useCall(deleteClient);
  onCallSuccess(() => {
    removeQuery('client');
    setRefreshDate(new Date());
  });
  onCallError(({ message }) => notifications.error(message));

  const handleDeleteClient = () => submit(query.client);
  const handleClientClose = () => removeQuery('client');
  const handleAddClientOpen = (isOpen: boolean) => () => setAddClientOpen(isOpen);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Klienci'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) => (
          <>
            <ClientsList filterText={filterText} refreshDate={refreshDate} handleAddClientOpen={handleAddClientOpen(true)} />
            <ContentTemplate isOpen={!!query.client} close={handleClientClose}>
              <ClientInfo isEditToggled={isEditToggled} setEditToggled={setEditToggled} setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <AddClientController
              isOpen={isAddClientOpen}
              handleClose={handleAddClientOpen(false)}
              setRefreshDate={setRefreshDate}
            />
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
