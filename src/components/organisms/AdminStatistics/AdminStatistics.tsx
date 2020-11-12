import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AttendanceInterface, EmployeeDataInterface, TaskInterface } from '../../../types/modelsTypes';
import { History } from 'history';
import { AppState } from '../../../reducers/rootReducer';
import ListBox from '../../molecules/ListBox/ListBox';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.blurBackground};
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const Box = styled.div`
  width: 90%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 1000px;
    height: 500px;
    display: flex;
    flex-direction: row;
  }
`;

const ListWrapper = styled.div`
  width: 300px;
  height: 100%;
  padding: 2rem 0;
  border-right: 1px solid ${({ theme }) => theme.colors.impactGray};
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

const Heading = styled.h2`
  font-weight: ${({theme}) => theme.mq.demi};
  padding: 3rem;
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

type ConnectedProps = Props & LinkStateProps;

const AdminStatistics: React.FC<ConnectedProps> = ({ allCompanyEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDataInterface | null>(null);
  return (
    <StyledWrapper>
      <Box>
        <ListWrapper>
          <Heading>Pracownicy</Heading>
          {allCompanyEmployees.map((employee) => (
            <ListBox
              name={employee.userId.name}
              topDescription={new Date(employee.userId.dateOfBirth).toLocaleDateString()}
              bottomDescription={employee.userId.email}
              callback={() => console.log('set selected')}
              isCompanyBox={false}
              isEmpty={true}
            />
          ))}
        </ListWrapper>
        <ContentWrapper>
          <p>Hello friend</p>
        </ContentWrapper>
      </Box>
    </StyledWrapper>
  );
};

interface LinkStateProps {
  allCompanyEmployees: EmployeeDataInterface[];
}

const mapStateToProps = ({ employeeReducer: { allCompanyEmployees } }: AppState): LinkStateProps => {
  return { allCompanyEmployees };
};

export default connect(mapStateToProps)(AdminStatistics);
