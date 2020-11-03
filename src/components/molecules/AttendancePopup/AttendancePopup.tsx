import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { ButtonWrapper, ContentWrapper, InfoParagraph, Paragraph } from '../../../styles/popupStyles';
import { CheckedIcon, NotCheckedIcon, EmptyIcon } from '../../../styles/iconStyles';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import Input from '../../atoms/Input/Input';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
`;

interface Props {
  attendance: AttendanceInterface | null;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface DefaultValues {
  wasPresent: boolean;
  hours: number;
}

const AttendancePopup: React.FC<Props> = ({ attendance, isOpen, setOpen }) => {
  console.log(attendance);
  const initialValues: DefaultValues = {
    wasPresent: !attendance?.attendance ? false : attendance.attendance.wasPresent,
    hours: !attendance?.attendance ? 0 : attendance.attendance.hours
  };

  const handleSubmit = (values: DefaultValues) => {
    console.log(values);
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={`Obecność z dnia ${new Date().toLocaleDateString()}`}>
      {!!attendance && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
          {({ handleChange, values }) => (
            <StyledForm>
              <ContentWrapper>
                <Paragraph>
                  {attendance.user.name} {attendance.user.lastName}
                </Paragraph>
                <FlexWrapper>
                  Aktualnie:
                  {!attendance.attendance ? <EmptyIcon /> : attendance.attendance.wasPresent ? <CheckedIcon /> : <NotCheckedIcon />}
                  {!attendance.attendance ? 'Brak danych' : attendance.attendance.wasPresent ? 'Obecny' : 'Nieobecny'}
                </FlexWrapper>
                <FlexWrapper>
                  Edycja:
                  {values.wasPresent ? <CheckedIcon /> : <NotCheckedIcon />}
                  <input type={'checkbox'} checked={values.wasPresent} />
                  <Input onChange={handleChange} name={'hours'} required={false} type={'number'} labelText={'Ilość godzin'} disabled={!values.wasPresent} />
                </FlexWrapper>
                {/*<InfoParagraph>W razie pomyłki nie będzie możliwości cofnięcia tej akcji</InfoParagraph>*/}
              </ContentWrapper>
              <ButtonWrapper>
                <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Add} text={'Akceptuj'} />
              </ButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      )}
    </PopupTemplate>
  );
};

export default AttendancePopup;
