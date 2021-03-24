import React from 'react';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import { Button } from 'components';
import { UserRole } from 'ducks/auth/roles/roles';
import { AppState } from 'store/store';
import { TaskValues } from 'api';

import { ButtonWrapper } from 'styles/contentStyles';

const TaskButtons: React.FC = () => {
  const { isSubmitting } = useFormikContext<TaskValues>();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  // TODO: react-casl roles

  return (
    <div>
      {role === UserRole.Admin && (
        <ButtonWrapper>
          <Button type={'submit'} disabled={isSubmitting}>
            Zapisz
          </Button>
        </ButtonWrapper>
      )}
    </div>
  );
};

export default TaskButtons;
