import React from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';

import Button from 'components/atoms/Button/Button';

import { ItemInterface } from '../../organisms/GenerateInvoice/GenerateInvoice';
import { FlexWrapper } from 'styles/shared';
import { StyledInput } from 'styles/compoundStyles';
import { Heading } from 'styles/typography/typography';

const StyledHeading = styled(Heading)`
  margin: 4rem 0;
`;

interface Props {
  items: ItemInterface[];
  setItems: React.Dispatch<React.SetStateAction<ItemInterface[]>>;
}

const InvoiceItem: React.FC<Props> = ({ items, setItems }) => {
  const initialValues: ItemInterface = {
    item: '',
    description: '',
    amount: 0,
    quantity: 1
  };

  const handleSubmit = ({ item, description, amount, quantity }: ItemInterface) => {
    setItems((prevState) => [...prevState, { item, description, amount, quantity }]);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, values }) => (
        <Form>
          <StyledHeading>Produkty/usługi</StyledHeading>
          <FlexWrapper>
            <StyledInput type={'text'} name={'item'} value={values.item} onChange={handleChange} labelText={'Nazwa'} required={true} />
            <StyledInput type={'text'} name={'description'} value={values.description} onChange={handleChange} labelText={'Opis'} required={true} />
          </FlexWrapper>
          <StyledInput type={'number'} name={'quantity'} value={values.quantity} onChange={handleChange} labelText={'Ilość'} required={true} />
          <StyledInput type={'number'} name={'amount'} value={values.amount} onChange={handleChange} labelText={'Cena'} required={true} />
          <Button type={'submit'} text={'Dodaj'} />
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceItem;
