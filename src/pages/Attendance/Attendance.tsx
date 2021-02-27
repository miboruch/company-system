import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import AttendancePageContent from './components/AttendancePageContent/AttendancePageContent';

const Attendance: React.FC = () => {
  return (
    <MenuTemplate>
      <AttendancePageContent />
    </MenuTemplate>
  );
};

export default Attendance;
