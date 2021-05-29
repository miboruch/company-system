import React from 'react';
import { Formik } from 'formik';

import Input from 'components/form/Input/Input';
import { FormField, PopupTemplate, ModalButton, Spinner } from 'components';
import { AttendanceModel, ButtonType } from 'types';
import { useAppDispatch } from 'store/store';
import { useQuery, useSubmit, useShowContent, useFetch } from 'components/hooks';
import { addAttendance, updateAttendance } from 'ducks/attendance/attendance-creators';
import { AttendanceSchema } from 'validation/modelsValidation';

import { ButtonWrapper, ContentWrapper } from 'styles/popupStyles';
import { CheckedIcon, NotCheckedIcon, EmptyIcon } from 'styles/iconStyles';
import { FlexWrapper, StyledForm, StyledParagraph, StyledFlexWrapper, InputWrapper } from './AttendancePopup.styles';
import { fetchDayAttendance, fetchSingleAttendance, putAttendance, UpdateAttendanceData } from 'api';
import { Paragraph } from 'styles';

interface Props {
  attendance?: AttendanceModel | null;
  isOpen: boolean;
  handleClose: () => void;
  date?: Date;
}

interface DefaultValues {
  wasPresent: boolean | null;
  hours: number;
}

const AttendancePopup: React.FC<Props> = ({ isOpen, handleClose, date = new Date() }) => {
  const dispatch = useAppDispatch();
  const { query, removeQuery } = useQuery();

  const attendanceData = useFetch(fetchSingleAttendance(query.attendance));
  const { showContent, showNoContent, showError, showLoader } = useShowContent(attendanceData);
  const { payload: attendance } = attendanceData;

  const initialValues: DefaultValues = {
    wasPresent: !attendance?.attendance ? null : attendance.attendance.wasPresent,
    hours: !attendance?.attendance ? 0 : attendance.attendance.hours
  };

  // const {onSubmit} = useSubmit(attendance?.attendance?._id && putAttendance(attendance.attendance._id))

  const handleSubmit = ({ wasPresent, hours }: DefaultValues) => {
    handleClose();
    if (attendance) {
      if (attendance?.attendance) {
        wasPresent !== null &&
          dispatch(updateAttendance({ attendanceId: attendance.attendance._id, wasPresent: wasPresent, hours }));
      } else {
        wasPresent !== null && dispatch(addAttendance({ userId: attendance.userId._id, date, wasPresent: wasPresent, hours }));
      }
    }
  };

  const close = () => {
    handleClose();
    removeQuery('attendance');
  };

  return (
    <PopupTemplate isOpen={isOpen} headerText={`Obecność z dnia ${date.toLocaleDateString()}`} isHigher={false}>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={AttendanceSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleChange, values, setFieldValue, errors }) => (
            <>
              {showLoader && <Spinner />}
              {showNoContent && <Paragraph>Brak danych</Paragraph>}
              {showError && <Paragraph>Problem podczas ładowania danych</Paragraph>}
              {showContent && attendance && (
                <StyledForm>
                  <ContentWrapper>
                    <FlexWrapper>
                      {values.wasPresent === null ? <EmptyIcon /> : values.wasPresent ? <CheckedIcon /> : <NotCheckedIcon />}
                      <StyledParagraph type={'text'}>
                        {attendance.userId.name} {attendance.userId.lastName}
                      </StyledParagraph>
                    </FlexWrapper>
                    <StyledFlexWrapper>
                      <StyledParagraph type={'info'}>Obecność</StyledParagraph>
                      <FormField type={'checkbox'} label={'TAK'} name={'wasPresent'} />
                      <FormField type={'checkbox'} label={'NIE'} name={'wasPresent'} />
                    </StyledFlexWrapper>
                    <InputWrapper>
                      <FormField
                        name={'hours'}
                        type={'number'}
                        label={'Ilość godzin'}
                        value={!values.wasPresent ? 0 : values.hours}
                        disabled={!values.wasPresent}
                      />
                      {/*<Input*/}
                      {/*  onChange={handleChange}*/}
                      {/*  name={'hours'}*/}
                      {/*  required={false}*/}
                      {/*  type={'number'}*/}
                      {/*  labelText={errors.hours || 'Ilość godzin'}*/}
                      {/*  disabled={!values.wasPresent}*/}
                      {/*  value={!values.wasPresent ? 0 : values.hours}*/}
                      {/*/>*/}
                    </InputWrapper>
                  </ContentWrapper>
                  <ButtonWrapper>
                    <ModalButton onClick={close} buttonType={ButtonType.Cancel} text={'Zamknij'} />
                    <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
                  </ButtonWrapper>
                </StyledForm>
              )}
            </>
          )}
        </Formik>
      </div>
    </PopupTemplate>
  );
};

export default AttendancePopup;
