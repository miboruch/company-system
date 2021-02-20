import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import LandingPageContent from './components/LandingPageContent/LandingPageContent';

const LandingPage: React.FC = () => {
  return (
    <MenuTemplate>
      <LandingPageContent />
    </MenuTemplate>
  );
};

export default LandingPage;
