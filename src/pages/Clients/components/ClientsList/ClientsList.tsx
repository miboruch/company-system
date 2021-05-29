import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { ListBox } from 'components';
import { listAnimation } from 'animations/animations';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { fetchClients } from 'api';
import { ClientModel, ParamsId } from 'types';

import { AddIcon, AddWrapper, List, Paragraph } from 'styles';

interface Props {
  filterText: string;
  refreshDate: Date;
  handleAddClientOpen: () => void;
}

const ClientsList: React.FC<Props> = ({ filterText, refreshDate, handleAddClientOpen }) => {
  const { setQuery } = useQuery();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const clientsData = useFetch(fetchClients, { dependencies: [refreshDate] });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(clientsData);
  const { payload } = clientsData;

  const clientFilter = (client: ClientModel) => client.name.toLowerCase().includes(filterText.toLowerCase());
  const handleClientClick = (clientId: ParamsId) => () => setQuery('client', clientId);

  useEffect(() => {
    listAnimation(tl, listRef);
  }, [showContent]);

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
              callback={handleClientClick(client._id)}
              isCompanyBox={false}
              isEmpty={true}
            />
          ))}
      <AddWrapper onClick={handleAddClientOpen}>
        <AddIcon />
        <Paragraph type={'add'}>Dodaj klienta</Paragraph>
      </AddWrapper>
    </List>
  );
};

export default ClientsList;
