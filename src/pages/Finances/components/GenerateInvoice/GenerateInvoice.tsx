import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Formik } from 'formik';

import { Button, CloseButton, FormField } from 'components';
import InvoiceItem from 'components/molecules/InvoiceItemForm/InvoiceItemForm';
import { useAppDispatch } from 'store/store';
import { modalOpenAnimation } from 'animations/animations';
import { InvoiceItem as InvoiceItemInterface } from 'types';
import { generateInvoice } from 'ducks/invoice/invoice-creators';
import { generateInvoiceFields } from './generate-invoice.fields';

import { Paragraph } from 'styles';
import {
  Wrapper,
  Box,
  StyledForm,
  FormContentWrapper,
  ColumnWrapper,
  CloseButtonWrapper,
  StyledHeading
} from './GenerateInvoice.styles';

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

  const [items, setItems] = useState<InvoiceItemInterface[]>([]);

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
          {({ isSubmitting }) => (
            <StyledForm>
              <FormContentWrapper>
                <ColumnWrapper>
                  <StyledHeading>Dane klienta</StyledHeading>
                  {generateInvoiceFields.map((field) => (
                    <FormField key={field.name} {...field} />
                  ))}
                </ColumnWrapper>
                <ColumnWrapper>
                  <InvoiceItem items={items} setItems={setItems} />
                </ColumnWrapper>
              </FormContentWrapper>
              <Button type={'submit'} disabled={isSubmitting}>
                Generuj
              </Button>
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
