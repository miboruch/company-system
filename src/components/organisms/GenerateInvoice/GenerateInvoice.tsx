import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import CloseButton from 'components/atoms/CloseButton/CloseButton';
import InvoiceItem from 'components/molecules/InvoiceItemForm/InvoiceItemForm';
import Button from 'components/atoms/Button/Button';

import { AppState, useAppDispatch } from 'store/store';
import { modalOpenAnimation } from 'animations/animations';
import { StyledInput } from 'styles/compoundStyles';
import { Paragraph } from 'styles/typography/typography';
import { generateInvoice } from 'ducks/invoice/invoice-creators';
import { Wrapper, Box, StyledForm, FormContentWrapper, ColumnWrapper, CloseButtonWrapper, StyledHeading } from './GenerateInvoice.styles';

export interface ItemInterface {
  item: string;
  description: string;
  quantity: number;
  amount: number;
}

interface InvoiceInitialValues {
  name: string;
  address: string;
  city: string;
  country: string;
}

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const GenerateInvoice: React.FC<Props> = ({ isOpen, setOpen }) => {
  const dispatch = useAppDispatch();
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const [items, setItems] = useState<ItemInterface[]>([]);

  const initialValues: InvoiceInitialValues = {
    name: '',
    address: '',
    city: '',
    country: ''
  };

  useEffect(() => {
    modalOpenAnimation(tl, backgroundRef, boxRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  const handleSubmit = async ({ name, address, city, country }: InvoiceInitialValues) => {
    dispatch(generateInvoice({ name, address, city, country, items }));
  };

  return (
    <Wrapper ref={backgroundRef}>
      <Box ref={boxRef}>
        <CloseButtonWrapper>
          <CloseButton close={() => setOpen(false)} />
        </CloseButtonWrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, values }) => (
            <StyledForm>
              <FormContentWrapper>
                <ColumnWrapper>
                  <StyledHeading>Dane klienta</StyledHeading>
                  <StyledInput type={'text'} name={'name'} value={values.name} onChange={handleChange} labelText={'Nazwa odbiorcy'} required={true} />
                  <StyledInput type={'text'} name={'address'} value={values.address} onChange={handleChange} labelText={'Adres odbiorcy'} required={true} />
                  <StyledInput type={'text'} name={'city'} value={values.city} onChange={handleChange} labelText={'Miasto'} required={true} />
                  <StyledInput type={'text'} name={'country'} value={values.country} onChange={handleChange} labelText={'Kraj'} required={true} />
                </ColumnWrapper>
                <ColumnWrapper>
                  <InvoiceItem items={items} setItems={setItems} />
                </ColumnWrapper>
              </FormContentWrapper>
              <Button type={'submit'} text={'Generuj'} />
              {items.map((item, index) => (
                <Paragraph key={index}>{item.item}</Paragraph>
              ))}
            </StyledForm>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default GenerateInvoice;
