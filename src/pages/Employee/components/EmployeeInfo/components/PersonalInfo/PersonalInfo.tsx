import React from 'react';

import { EmployeeModel } from 'types';

import { Paragraph } from 'styles';
import { EmployeeInfoBox } from 'styles/contentStyles';

interface Props {
  employee: EmployeeModel;
}

const PersonalInfo: React.FC<Props> = ({ employee }) => {
  return (
    <>
      <EmployeeInfoBox>
        <Paragraph type={'subparagraph'}>Data urodzenia: {new Date(employee.userId.dateOfBirth).toLocaleDateString()}</Paragraph>
        <Paragraph type={'subparagraph'}>{employee.userId.email}</Paragraph>
        <Paragraph type={'subparagraph'}>{employee.userId.phoneNumber}</Paragraph>
      </EmployeeInfoBox>
      <Paragraph type={'text'}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto beatae cum distinctio doloribus expedita magni nobis officiis, provident quisquam
        repellat temporibus voluptates. Aliquam, eum, quasi. Eos nisi, sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, animi culpa eum in ipsum maxime
        molestiae mollitia nemo perspiciatis, porro quam, quasi quos vitae. Blanditiis deleniti et illum inventore ipsum?
      </Paragraph>
    </>
  );
};

export default PersonalInfo;
