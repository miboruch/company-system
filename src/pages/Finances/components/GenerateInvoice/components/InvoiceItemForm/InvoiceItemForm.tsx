import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';

import { Button, FormField } from 'components';
import { InvoiceItem as InvoiceItemInterface } from 'types';

import { Heading, FlexWrapper } from 'styles';

const StyledHeading = styled(Heading)`
  margin: 4rem 0;
`;

interface Props {
  items: InvoiceItemInterface[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItemInterface[]>>;
}

const InvoiceItem: React.FC<Props> = ({ items, setItems }) => {
  const initialValues: InvoiceItemInterface = {
    item: '',
    description: '',
    amount: 0,
    quantity: 1
  };

  const handleSubmit = ({ item, description, amount, quantity }: InvoiceItemInterface) => {
    setItems((prevState) => [...prevState, { item, description, amount, quantity }]);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <StyledHeading>Produkty/usługi</StyledHeading>
          <FlexWrapper>
            <FormField name={'item'} type={'text'} label={'Nazwa'} required={true} spacing={true} />
            <FormField name={'description'} type={'text'} label={'Opis'} required={true} spacing={true} />
          </FlexWrapper>
          <FormField name={'quantity'} type={'number'} label={'Ilość'} required={true} spacing={true} />
          <FormField name={'amount'} type={'number'} label={'Cena'} required={true} spacing={true} />
          <Button type={'submit'} disabled={isSubmitting}>
            Dodaj
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceItem;
