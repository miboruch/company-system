import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { SpinnerWrapper, List, AddIcon, AddParagraph, AddWrapper } from '../../../styles/shared';
import ListBox from '../../molecules/ListBox/ListBox';
import gsap from 'gsap';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getAllCompanyEmployees, selectEmployee, setAddNewEmployeeOpen, setEmployeeInfoOpen } from '../../../actions/employeeActions';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import Spinner from '../../atoms/Spinner/Spinner';
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo';
import { listAnimation } from '../../../animations/animations';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';

type ConnectedProps = LinkStateProps & LinkDispatchProps;

const EmployeesPageContent: React.FC<ConnectedProps> = ({
  getAllCompanyEmployees,
  isLoading,
  allCompanyEmployees,
  selectEmployee,
  isEmployeeInfoOpen,
  setEmployeeInfoOpen,
  selectedEmployee,
  setAddNewEmployeeOpen
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByEmployeeName = (filterText: string, allEmployees: EmployeeDataInterface[]): EmployeeDataInterface[] => {
    return allEmployees.filter((employee) => `${employee.userId.name} ${employee.userId.lastName}`.toLowerCase().includes(filterText.toLowerCase()));
  };

  useEffect(() => {
    listAnimation(tl, listRef, isLoading);
  }, [isLoading]);

  useEffect(() => {
    getAllCompanyEmployees();
    // allCompanyEmployees.length === 0 && getAllCompanyEmployees();
  }, []);

  return (
    <GridWrapper
      mobilePadding={false}
      pageName={'Pracownicy'}
      setFilterText={setFilterText}
      render={(isDeleteOpen, setDeleteOpen) =>
        isLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <>
            <List ref={listRef}>
              {filterByEmployeeName(filterText, allCompanyEmployees).map((employee) => (
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
              <AddWrapper onClick={() => setAddNewEmployeeOpen(true)}>
                <AddIcon />
                <AddParagraph>Dodaj pracownika</AddParagraph>
              </AddWrapper>
            </List>
            <ContentTemplate isOpen={isEmployeeInfoOpen} setOpen={setEmployeeInfoOpen}>
              <EmployeeInfo setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń pracownika'}
              text={`${selectedEmployee?.userId.name} ${selectedEmployee?.userId.lastName}`}
              callback={() => console.log('delete employee')}
            />
          </>
        )
      }
    />
  );
};

interface LinkStateProps {
  isLoading: boolean;
  allCompanyEmployees: EmployeeDataInterface[];
  isEmployeeInfoOpen: boolean;
  selectedEmployee: EmployeeDataInterface | null;
}

interface LinkDispatchProps {
  getAllCompanyEmployees: () => void;
  selectEmployee: (employee: EmployeeDataInterface) => void;
  setEmployeeInfoOpen: (isOpen: boolean) => void;
  setAddNewEmployeeOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ employeeReducer: { isLoading, allCompanyEmployees, isEmployeeInfoOpen, selectedEmployee } }: AppState): LinkStateProps => {
  return { isLoading, allCompanyEmployees, isEmployeeInfoOpen, selectedEmployee };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getAllCompanyEmployees: bindActionCreators(getAllCompanyEmployees, dispatch),
    selectEmployee: bindActionCreators(selectEmployee, dispatch),
    setEmployeeInfoOpen: bindActionCreators(setEmployeeInfoOpen, dispatch),
    setAddNewEmployeeOpen: bindActionCreators(setAddNewEmployeeOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPageContent);
