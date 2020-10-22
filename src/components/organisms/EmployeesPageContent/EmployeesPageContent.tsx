import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Title, SpinnerWrapper } from '../../../styles/sharedStyles';
import { Header } from '../LandingPageContent/LandingPageContent.styles';
import ListBox from '../../molecules/ListBox/ListBox';
import gsap from 'gsap';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/appActionTypes';
import { bindActionCreators } from 'redux';
import { getAllCompanyEmployees, selectEmployee } from '../../../actions/employeeActions';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { DEFAULT_COMPANY_ID } from '../../../utils/config';
import Spinner from '../../atoms/Spinner/Spinner';
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo';

const List = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: list;
    border-right: 1px solid ${({ theme }) => theme.colors.impactGray};
  }
`;

type ConnectedProps = LinkStateProps & LinkDispatchProps;

const EmployeesPageContent: React.FC<ConnectedProps> = ({ token, getAllCompanyEmployees, isLoading, allCompanyEmployees, selectEmployee }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const list: HTMLDivElement | null = listRef.current;

    if (list && !isLoading) {
      gsap.set([...list.children], { autoAlpha: 0 });

      tl.fromTo(list.children, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.2 });
    }
  }, [isLoading]);

  useEffect(() => {
    token && allCompanyEmployees.length === 0 && getAllCompanyEmployees(token, DEFAULT_COMPANY_ID);
  }, []);

  return (
    <GridWrapper mobilePadding={false} pageName={'Pracownicy'}>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <List ref={listRef}>
            {allCompanyEmployees.map((employee) => (
              <ListBox
                key={employee._id}
                name={`${employee.userId.name} ${employee.userId.lastName}`}
                topDescription={new Date(employee.userId.dateOfBirth).toLocaleDateString()}
                bottomDescription={employee.userId.email}
                callback={() => selectEmployee(employee)}
                isEmpty={true}
                isCompanyBox={false}
              />
            ))}
          </List>
          <ContentTemplate>
            <EmployeeInfo />
          </ContentTemplate>
        </>
      )}
    </GridWrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  isLoading: boolean;
  allCompanyEmployees: EmployeeDataInterface[];
}

interface LinkDispatchProps {
  getAllCompanyEmployees: (token: string, companyId: string) => void;
  selectEmployee: (employee: EmployeeDataInterface) => void;
}

const mapStateToProps = ({ authenticationReducer: { token }, employeeReducer: { isLoading, allCompanyEmployees } }: AppState): LinkStateProps => {
  return { token, isLoading, allCompanyEmployees };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getAllCompanyEmployees: bindActionCreators(getAllCompanyEmployees, dispatch),
    selectEmployee: bindActionCreators(selectEmployee, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPageContent);
