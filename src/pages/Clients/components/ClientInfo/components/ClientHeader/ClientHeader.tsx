import React from 'react';
import { useFormikContext } from 'formik';

import { setEditClientCoordsOpen } from 'ducks/client/client-toggle/client-toggle';
import { useAppDispatch } from 'store/store';
import { ClientModel } from 'types';
import { PutClientInfo } from 'api';

import { Paragraph } from 'styles';
import { HeaderWrapper, RowIconWrapper, Title } from 'styles/contentStyles';
import { DeleteIcon, EditIcon, LocationIcon } from 'styles/iconStyles';

interface Props {
  client: ClientModel;
  handleEditToggle: () => void;
  handleDeleteOpen: () => void;
}

const ClientHeader: React.FC<Props> = ({ client, handleEditToggle, handleDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<PutClientInfo>();

  const handleEditCoordsOpen = () => dispatch(setEditClientCoordsOpen(true));

  return (
    <div>
      <Paragraph>Data dodania: {new Date(client.createdDate).toLocaleDateString()}</Paragraph>
      <HeaderWrapper>
        <Title>{values.name}</Title>
        <RowIconWrapper>
          <LocationIcon onClick={handleEditCoordsOpen} />
          <EditIcon onClick={handleEditToggle} />
          <DeleteIcon onClick={handleDeleteOpen} />
        </RowIconWrapper>
      </HeaderWrapper>
    </div>
  );
};

export default ClientHeader;
