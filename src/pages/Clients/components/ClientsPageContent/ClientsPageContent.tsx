import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import ClientInfo from '../ClientInfo/ClientInfo';
import ClientsList from '../ClientsList/ClientsList';
import AddClientController from './components/AddClient/AddClientController';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import { GridWrapper, ContentTemplate, DeletePopup } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { listAnimation } from 'animations/animations';
import { setClientInfoOpen } from 'ducks/client/client-toggle/client-toggle';
import { setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import { deleteClient } from 'ducks/client/client-creators';

const ClientsPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isEditClientCoordsOpen, isClientInfoOpen, selectedClient } = useSelector(
    (state: AppState) => state.client.clientToggle
  );

  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    listAnimation(tl, listRef);
  }, []);

  return (
    <>
      <GridWrapper
        mobilePadding={false}
        pageName={'Klienci'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) => (
          <>
            <ClientsList filterText={filterText} />
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
        )}
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
