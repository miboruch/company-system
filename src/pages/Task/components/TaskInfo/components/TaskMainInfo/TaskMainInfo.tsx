import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

import { putTaskCompleted, TaskValues } from 'api';
import { useQuery, useCall } from 'components/hooks';
import { setNotification } from 'ducks/popup/popup';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';

import { EmployeeInfoBox } from 'styles/contentStyles';
import { Paragraph } from 'styles';
import { ColoredParagraph } from './TaskMainInfo.styles';

interface Props {
  refresh: () => void;
}

const TaskMainInfo: React.FC<Props> = ({ refresh }) => {
  const dispatch = useAppDispatch();
  const { query } = useQuery();
  const { values } = useFormikContext<TaskValues>();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const { submit, onCallSuccess, onCallError } = useCall<typeof putTaskCompleted>(putTaskCompleted);
  onCallSuccess(refresh);
  onCallError(({ message }) => dispatch(setNotification({ message })));

  const handleTaskStateChange = (isCompleted: boolean) => () => submit(query.task, { isCompleted });

  return (
    <EmployeeInfoBox>
      <Paragraph type={'subparagraph'}>Data zadania do wykonania: {new Date(values.date).toLocaleDateString()}</Paragraph>
      <Paragraph type={'subparagraph'}>{values.description}</Paragraph>
      {role === UserRole.Admin && (
        <ColoredParagraph isCompleted={values.isCompleted || false} onClick={handleTaskStateChange(!values.isCompleted)}>
          Oznacz jako {values.isCompleted ? 'niewykonane' : 'wykonane'}
        </ColoredParagraph>
      )}
    </EmployeeInfoBox>
  );
};

export default TaskMainInfo;
