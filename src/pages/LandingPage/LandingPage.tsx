import React from 'react';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import LandingPageContent from '../../components/organisms/LandingPageContent/LandingPageContent';

interface Props {}

const LandingPage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <LandingPageContent />
    </MenuTemplate>
  );
};

export default LandingPage;
