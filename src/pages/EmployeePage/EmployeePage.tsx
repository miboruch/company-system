import React from 'react';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import EmployeesPageContent from '../../components/organisms/EmployeesPageContent/EmployeesPageContent';

interface Props {}

const EmployeePage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <EmployeesPageContent />
    </MenuTemplate>
  );
};

export default EmployeePage;
