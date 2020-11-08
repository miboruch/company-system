import React from 'react';
import SettingsPageContent from '../../components/organisms/SettingsPageContent/SettingsPageContent';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';

interface Props {}

const SettingsPage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <SettingsPageContent />
    </MenuTemplate>
  );
};

export default SettingsPage;
