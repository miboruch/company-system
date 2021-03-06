import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { ListBox } from 'components';
import { listAnimation } from 'animations/animations';
import { useAppDispatch } from 'store/store';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchClients } from 'api/clients/api.clients';
import { setAddNewClientOpen } from 'ducks/client/client-toggle/client-toggle';
import { ClientModel } from 'types';

import { AddIcon, AddWrapper, List, Paragraph } from 'styles';
import { ClientInterface } from 'types/modelsTypes';
import { selectClient } from 'ducks/client/client-toggle/client-toggle-creators';

interface Props {
  filterText: string;
}

const ClientsList: React.FC<Props> = ({ filterText }) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const clientsData = useFetch<typeof fetchClients>(fetchClients);
  const { showContent, showNoContent, showLoader, showError } = useShowContent(clientsData);
  const { payload } = clientsData;

  useEffect(() => {
    showContent && listAnimation(tl, listRef);
  }, [showContent]);

  const clientFilter = (client: ClientModel) => client.name.toLowerCase().includes(filterText.toLowerCase());
  const handleSelectClient = (client: ClientInterface) => () => dispatch(selectClient(client));

  return (
    <List ref={listRef}>
      {showLoader && <Paragraph>Ładowanie</Paragraph>}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z wyświetleniem danych</Paragraph>}
      {showContent &&
        payload &&
        payload
          .filter(clientFilter)
          .map((client) => (
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
  );
};

export default ClientsList;
