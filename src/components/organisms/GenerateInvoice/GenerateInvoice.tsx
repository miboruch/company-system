import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import gsap from 'gsap';
import { Formik, Form } from 'formik';
import { modalOpenAnimation } from '../../../animations/animations';
import { StyledInput } from '../../../styles/compoundStyles';
import { Heading, Paragraph } from '../../../styles/typography/typography';
import InvoiceItem from '../../molecules/InvoiceItemForm/InvoiceItemForm';
import Button from '../../atoms/Button/Button';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../../store/store';
import { generateInvoice } from '../../../ducks/invoice/invoice-creators';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.blurBackground};
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 4rem 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80%;
    padding: 6rem 2rem;
    border-radius: 30px;
  }
`;

const StyledForm = styled(Form)`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const FormContentWrapper = styled.div`
  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ColumnWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    padding: 4rem;
  }
`;

const CloseButtonWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
`;

const StyledHeading = styled(Heading)`
  margin: 4rem 0;
`;

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
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
  const { token } = useSelector((state: AppState) => state.auth.tokens);
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
