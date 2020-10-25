import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ClientInterface } from '../../../types/modelsTypes';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { listAnimation } from '../../../animations/animations';

interface Props {}

const ClientsPageContent: React.FC<Props> = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByClientName = (filterText: string, allClients: ClientInterface[]): ClientInterface[] => {
    return allClients.filter((client) => client.name.toLowerCase().includes(filterText.toLowerCase()));
  };

  useEffect(() => {
    listAnimation(tl, listRef);
  }, []);

  return (
    <GridWrapper mobilePadding={false} pageName={'Klienci'} setFilterText={setFilterText}>
      <p>Content</p>
    </GridWrapper>
  );
};

export default ClientsPageContent;
