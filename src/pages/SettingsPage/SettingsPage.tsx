import React from 'react';

import SettingsPageContent from '../../components/organisms/SettingsPageContent/SettingsPageContent';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';

const SettingsPage: React.FC = () => {
  return (
    <MenuTemplate>
      <SettingsPageContent />
    </MenuTemplate>
  );
};

export default SettingsPage;
