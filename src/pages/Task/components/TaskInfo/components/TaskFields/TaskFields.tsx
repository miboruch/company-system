import React from 'react';
import { Paragraph } from 'styles';

import { FormField } from 'components';
import { taskInfoFields } from '../../task-info.fields';

import { InputWrapper } from 'styles/contentStyles';

const TaskFields: React.FC = () => {
  return (
    <div>
      <InputWrapper>
        <FormField name={'date'} type={'date'} label={'Data wykonania zadania'} required={true} />
      </InputWrapper>
      <Paragraph type={'text'}>
        Jeżeli chcesz edytować zadanie, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich pól oraz
        edycję danych.
      </Paragraph>
      <InputWrapper>
        {taskInfoFields.map((field) => (
          <FormField key={field.name} {...field} spacing={true} />
        ))}
      </InputWrapper>
    </div>
  );
};

export default TaskFields;
