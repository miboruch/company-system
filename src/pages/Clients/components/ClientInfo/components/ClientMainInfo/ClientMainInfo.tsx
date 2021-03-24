import React from 'react';
import { useFormikContext } from 'formik';

import { PutClientInfo } from 'api';

import { EmployeeInfoBox, InputWrapper } from 'styles/contentStyles';
import { Paragraph } from 'styles';
import { clientInfoFields } from 'pages/Clients/components/ClientInfo/client-info.fields';
import { FormField } from 'components';

interface Props {
  isEditToggled: boolean;
}

const ClientMainInfo: React.FC<Props> = ({ isEditToggled }) => {
  const { values } = useFormikContext<PutClientInfo>();

  return (
    <div>
      <EmployeeInfoBox>
        <Paragraph type={'subparagraph'}>Email: {values.email}</Paragraph>
        <Paragraph type={'subparagraph'}>
          Adres: {values.address}, {values.city}
        </Paragraph>
      </EmployeeInfoBox>
      <Paragraph type={'text'}>
        Jeżeli chcesz edytować dane klienta, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich pól
        oraz edycję danych.
      </Paragraph>
      <InputWrapper>
        {clientInfoFields(isEditToggled).map((field) => (
          <FormField key={field.name} {...field} />
        ))}
      </InputWrapper>
    </div>
  );
};

export default ClientMainInfo;
