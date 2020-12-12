import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import AttendancePageContent from '../../components/organisms/AttendancePageContent/AttendancePageContent';

const AttendancePage: React.FC = () => {
  return (
    <MenuTemplate>
      <AttendancePageContent />
    </MenuTemplate>
  );
};

export default AttendancePage;
