import React from 'react';
import { useSelector } from 'react-redux';

import { useFormikContext } from 'formik';
import { useAppDispatch, AppState } from 'store/store';
import { setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { UserRole } from 'ducks/auth/roles/roles';
import { TaskValues } from 'api';
import { TaskModel } from 'types';

import { Paragraph } from 'styles';
import { HeaderWrapper, RowIconWrapper, Title } from 'styles/contentStyles';
import { CheckedIcon, DeleteIcon, EditIcon, LocationIcon, NotCheckedIcon } from 'styles/iconStyles';

interface Props {
  task: TaskModel;
  handleEditToggle: () => void;
  handleDeleteOpen: () => void;
}

const TaskHeader: React.FC<Props> = ({ task, handleEditToggle, handleDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<TaskValues>();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const handleTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(true));

  return (
    <div>
      <Paragraph>Data dodania: {new Date(task.addedDate).toLocaleDateString()}</Paragraph>
      <HeaderWrapper>
        <Title>{values.name}</Title>
        <RowIconWrapper>
          {values.isCompleted ? <CheckedIcon /> : <NotCheckedIcon />}
          {values?.clientId && <LocationIcon onClick={handleTaskMapPreview} />}
          {role === UserRole.Admin && (
            <>
              <EditIcon onClick={handleEditToggle} />
              <DeleteIcon onClick={handleDeleteOpen} />
            </>
          )}
        </RowIconWrapper>
      </HeaderWrapper>
    </div>
  );
};

export default TaskHeader;
