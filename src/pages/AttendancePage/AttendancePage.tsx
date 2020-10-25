import React from 'react';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import AttendancePageContent from '../../components/organisms/AttendancePageContent/AttendancePageContent';

interface Props {}

const AttendancePage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <AttendancePageContent />
    </MenuTemplate>
  );
};

export default AttendancePage;
