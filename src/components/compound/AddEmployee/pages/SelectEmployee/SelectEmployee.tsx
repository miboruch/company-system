import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import Button from '../../../../atoms/Button/Button';
import { Formik } from 'formik';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { EmployeeDataInterface, UserDataInterface } from '../../../../../types/modelsTypes';
import { AppState } from '../../../../../reducers/rootReducer';
import UserBox from '../../../../molecules/UserBox/UserBox';
import { removeDuplicates } from '../../../../../utils/functions';

const UsersWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

type SelectUserDefaultValues = {
  userId: string;
  registerWithMail?: never;
};

type SetMailDefaultValues = {
  userId?: never;
  registerWithMail: boolean;
};

interface Props {}

type DefaultValues = SelectUserDefaultValues | SetMailDefaultValues;

type ConnectedProps = Props & LinkStateProps;

const SelectEmployee: React.FC<ConnectedProps> = ({ allAppUsers, allCompanyEmployees }) => {
  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const initialValues: DefaultValues = {
    userId: '',
    registerWithMail: undefined
  };

  if(allCompanyEmployees.length > 0 && allAppUsers.length > 0){
    const result = removeDuplicates(allAppUsers, allCompanyEmployees);
    console.log(result);
  }

  const handleSubmit = (values: DefaultValues) => {
    console.log(values);
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ handleChange, values, setFieldValue }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Wybierz użytkownika</MobileCompoundTitle>
              <Subheading>Wybierz jednego użytkownika lub wyślij zaproszenie jeżeli twój pracownik nie posiada jeszcze konta</Subheading>
            </HeadingWrapper>
            <UsersWrapper>
              {removeDuplicates(allAppUsers, allCompanyEmployees).map((user) => (
                <UserBox
                  key={user._id}
                  name={`${user.name} ${user.lastName}`}
                  topDescription={new Date(user.dateOfBirth).toLocaleDateString()}
                  bottomDescription={user.email}
                  callback={() => {
                    setFieldValue('userId', user._id);
                    setData({ ...data, userId: user._id });
                    setFieldValue('registerWithMail', undefined);
                  }}
                  isActive={data.userId === user._id}
                />
              ))}
            </UsersWrapper>
            <DoubleFlexWrapper>
              <p
                onClick={() => {
                  setFieldValue('userId', undefined);
                  setFieldValue('registerWithMail', true);
                  setData({ ...data, userId: undefined, registerWithMail: true });
                  setCurrentPage(PageSettingEnum.Second);
                }}
              >
                Wyślij zaproszenie na maila
              </p>
              <Button type={'submit'} text={'Dalej'} />
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

interface LinkStateProps {
  allAppUsers: UserDataInterface[];
  allCompanyEmployees: EmployeeDataInterface[];
}

const mapStateToProps = ({ authenticationReducer: { allAppUsers }, employeeReducer: { allCompanyEmployees } }: AppState): LinkStateProps => {
  return { allAppUsers, allCompanyEmployees };
};

export default connect(mapStateToProps)(SelectEmployee);
