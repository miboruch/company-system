import React, { useContext } from 'react';
import { Formik } from 'formik';
import {
  HeadingWrapper,
  MobileCompoundTitle,
  StyledForm,
  StyledInput,
  Subheading,
  Wrapper
} from '../../../../../styles/compoundStyles';
import { BackParagraph, FlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { ClientDataContext } from '../../context/ClientDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';

type defaultValues = {
  address: string;
  city: string;
  country: string;
};

interface Props{

}

const AddressPage: React.FC<Props> = () => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: defaultValues = {
    address: data.address ? data.address : '',
    city: data.city ? data.city : '',
    country: data.country ? data.country : ''
  };

  const handleSubmit = (values: defaultValues): void => {
    setData({ ...data, ...values });
    console.log(data);
    console.log('add client request');
  };

 return (
   <Formik onSubmit={handleSubmit} initialValues={initialValues}>
     {({ handleChange, values }) => (
       <Wrapper>
         <StyledForm>
           <HeadingWrapper>
             <MobileCompoundTitle>Informacje adresowe</MobileCompoundTitle>
             <Subheading>Wszystkie pola są wymagane</Subheading>
           </HeadingWrapper>
           <StyledInput onChange={handleChange} name={'address'} value={values.address} required={true} type={'text'} labelText={'Adres'} />
           <StyledInput onChange={handleChange} name={'city'} value={values.city} required={true} type={'text'} labelText={'Miasto'} />
           <StyledInput onChange={handleChange} name={'country'} value={values.country} required={true} type={'text'} labelText={'Kraj'} />
           <FlexWrapper>
             <BackParagraph onClick={() => setCurrentPage(PageSettingEnum.Second)}>Wstecz</BackParagraph>
             <Button type={'submit'} text={'Dalej'} />
           </FlexWrapper>
         </StyledForm>
       </Wrapper>
     )}
   </Formik>
 );
};

export default AddressPage;
