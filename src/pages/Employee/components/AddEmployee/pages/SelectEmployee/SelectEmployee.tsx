import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { Button } from 'components';
import UserBox from './components/UserBox/UserBox';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchAppUsers } from 'api/app/api.app';
import { removeDuplicates } from 'utils/functions';
import { UserModel } from 'types';
import { AppState } from 'store/store';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { MainEmployeeSchema } from '../../validation/validation';

import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from 'styles/compoundStyles';
import { Paragraph, DoubleFlexWrapper } from 'styles';
const UsersWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 100%;
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

type DefaultValues = SelectUserDefaultValues | SetMailDefaultValues;

const SelectEmployee: React.FC = () => {
  const { allUsers } = useSelector((state: AppState) => state.allUsers);
  const { allCompanyEmployees } = useSelector((state: AppState) => state.employees.employeesData);

  const appUsersData = useFetch<typeof fetchAppUsers>(fetchAppUsers);
  const { showContent, showLoader, showNoContent, showError } = useShowContent(appUsersData);
  const { payload: appUsers } = appUsersData;

  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const [users, setUsers] = useState<UserModel[]>([]);

  const initialValues: DefaultValues = {
    userId: '',
    registerWithMail: undefined
  };

  useEffect(() => {
    if (allCompanyEmployees.length > 0 && allUsers.length > 0) {
      setUsers(removeDuplicates(allUsers, allCompanyEmployees));
    }
  }, [allCompanyEmployees, allUsers]);

  const handleSubmit = (values: DefaultValues) => {
    setData({ ...data, ...values });
    setCurrentPage(PageSettingEnum.Second);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={MainEmployeeSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ setFieldValue }) => (
        <Wrapper>
          <StyledForm>
            <HeadingWrapper>
              <MobileCompoundTitle>Wybierz użytkownika</MobileCompoundTitle>
              <Subheading>
                Wybierz jednego użytkownika lub wyślij zaproszenie jeżeli twój pracownik nie posiada jeszcze konta
              </Subheading>
            </HeadingWrapper>
            <UsersWrapper>
              {users.length === 0 ? (
                <Paragraph type={'empty'}>Brak użytkowników</Paragraph>
              ) : (
                users.map((user) => (
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
                ))
              )}
            </UsersWrapper>
            <DoubleFlexWrapper>
              <Paragraph
                type={'text'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setFieldValue('userId', undefined);
                  setFieldValue('registerWithMail', true);
                  setData({ ...data, userId: undefined, registerWithMail: true });
                  setCurrentPage(PageSettingEnum.Second);
                }}
              >
                Wyślij zaproszenie na maila
              </Paragraph>
              <Button type={'submit'} disabled={!data.userId && !data.registerWithMail}>
                Dalej
              </Button>
            </DoubleFlexWrapper>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default SelectEmployee;
