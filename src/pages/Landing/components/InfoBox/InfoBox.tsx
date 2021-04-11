import React from 'react';
import { useSelector } from 'react-redux';

import InformationBox from '../InformationBox/InformationBox';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchCompletedTasks, fetchEmployees } from 'api';
import { AppState } from 'store/store';

import { InfoBoxWrapper } from './InfoBox.styles';

const InfoBox: React.FC = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const employeeData = useFetch<typeof fetchEmployees>(fetchEmployees(role));
  const { showContent } = useShowContent(employeeData);
  const { payload: employeesCounter } = employeeData;

  const completedTasksData = useFetch<typeof fetchCompletedTasks>(fetchCompletedTasks({ daysBack: 30 }));
  const { showContent: showTasksCounter } = useShowContent(employeeData);
  const { payload: completedTasks } = completedTasksData;

  return (
    <InfoBoxWrapper>
      {showContent && employeesCounter && (
        <InformationBox
          title={'Pracownicy'}
          value={employeesCounter.employeesCounter}
          areaName={'employees'}
          chartAnimationDelay={0}
        />
      )}
      {showTasksCounter && completedTasks && (
        <InformationBox
          title={'Wykonane zadania (30d)'}
          value={completedTasks.completedTasks}
          areaName={'attendance'}
          chartAnimationDelay={800}
        />
      )}
    </InfoBoxWrapper>
  );
};

export default InfoBox;
