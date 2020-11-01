import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { HeadingWrapper, MobileCompoundTitle, StyledForm, Subheading, Wrapper } from '../../../../../styles/compoundStyles';
import { DoubleFlexWrapper } from '../../../../../styles/shared';
import {ButtonWrapper} from '../../../../../styles/contentStyles';
import Button from '../../../../atoms/Button/Button';
import { Formik } from 'formik';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { UserDataInterface } from '../../../../../types/modelsTypes';
import { AppState } from '../../../../../reducers/rootReducer';
import UserBox from '../../../../molecules/UserBox/UserBox';

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

const SelectEmployee: React.FC<ConnectedProps> = ({ allAppUsers }) => {
  const { data, setData } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const [allUsers, setAllUsers] = useState<UserDataInterface[]>([]);

  const initialValues: DefaultValues = {
    userId: '',
    registerWithMail: undefined
  };

  const handleSubmit = (values: DefaultValues) => {
    console.log(values);
    setData({...data, ...values});
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
              {allAppUsers.map((user) => (
                <UserBox
                  name={`${user.name} ${user.lastName}`}
                  topDescription={new Date(user.dateOfBirth).toLocaleDateString()}
                  bottomDescription={user.email}
                  callback={() => {
                    setFieldValue('userId', user._id);
                    setData({...data, userId: user._id});
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
}

const mapStateToProps = ({ authenticationReducer: { allAppUsers } }: AppState): LinkStateProps => {
  return { allAppUsers };
};

export default connect(mapStateToProps)(SelectEmployee);
