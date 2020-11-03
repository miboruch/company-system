import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { ButtonWrapper, ContentWrapper, InfoParagraph, Paragraph } from '../../../styles/popupStyles';
import { CheckedIcon, NotCheckedIcon, EmptyIcon } from '../../../styles/iconStyles';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import Input from '../../atoms/Input/Input';
import Checkbox from '../../atoms/Checkbox/Checkbox';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledParagraph = styled(Paragraph)`
  margin-right: 2rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  min-height: calc(400px - 80px);
`;

const StyledFlexWrapper = styled(FlexWrapper)`
  margin-top: 2rem;
`;

interface Props {
  attendance: AttendanceInterface | null;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface DefaultValues {
  wasPresent: boolean | null;
  hours: number;
}

const AttendancePopup: React.FC<Props> = ({ attendance, isOpen, setOpen }) => {
  console.log(attendance);
  const initialValues: DefaultValues = {
    wasPresent: !attendance?.attendance ? null : attendance.attendance.wasPresent,
    hours: !attendance?.attendance ? 0 : attendance.attendance.hours
  };

  const handleSubmit = (values: DefaultValues) => {
    console.log(values);
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={`Obecność z dnia ${new Date().toLocaleDateString()}`}>
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values, setFieldValue }) =>
            !!attendance && (
              <StyledForm>
                <ContentWrapper>
                  <FlexWrapper>
                    <StyledParagraph>
                      {attendance.user.name} {attendance.user.lastName}
                    </StyledParagraph>
                    {values.wasPresent === null ? <EmptyIcon /> : values.wasPresent ? <CheckedIcon /> : <NotCheckedIcon />}
                  </FlexWrapper>
                  <StyledFlexWrapper>
                    <InfoParagraph>Obecność</InfoParagraph>
                    <Checkbox onChange={() => setFieldValue('wasPresent', true)} name={'wasPresent'} labelText={'TAK'} checked={values.wasPresent !== null && values.wasPresent} />
                    <Checkbox onChange={() => setFieldValue('wasPresent', false)} name={'wasPresent'} labelText={'NIE'} checked={!values.wasPresent} />
                    <Input
                      onChange={handleChange}
                      name={'hours'}
                      required={false}
                      type={'number'}
                      labelText={'Ilość godzin'}
                      disabled={!values.wasPresent}
                      value={!values.wasPresent ? 0 : values.hours}
                    />
                  </StyledFlexWrapper>
                  {/*<InfoParagraph>W razie pomyłki nie będzie możliwości cofnięcia tej akcji</InfoParagraph>*/}
                </ContentWrapper>
                <ButtonWrapper>
                  <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                  <ModalButton onClick={() => setOpen(false)} submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
                </ButtonWrapper>
              </StyledForm>
            )
          }
        </Formik>
      </div>
    </PopupTemplate>
  );
};

export default AttendancePopup;
