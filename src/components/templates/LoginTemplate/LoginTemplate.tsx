import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'components';
import { StyledWrapper, FormWrapper, ImageBackground, ImageContent, Heading, StyledParagraph } from './LoginTemplate.styles';
import { lorem } from 'utils/config';

export enum TemplatePage {
  Login = 'login',
  Register = 'register'
}

interface Props {
  children: React.ReactNode;
  page: TemplatePage;
  companyName?: string;
}

const LoginTemplate: React.FC<Props> = ({ children, page, companyName }) => {
  const history = useHistory();
  const buttonText = page === TemplatePage.Login ? 'Zarejestruj się' : 'Zaloguj się';

  return (
    <StyledWrapper>
      <FormWrapper>{children}</FormWrapper>
      <ImageBackground>
        <ImageContent>
          {companyName ? <Heading>Dołącz do firmy {companyName}</Heading> : <Heading>Przyśpiesz swoją prace</Heading>}
          <StyledParagraph>
            {companyName
              ? `Zostałeś zaproszony do firmy ${companyName} przez administratora. Wypełnij dane i stań się częścią zespołu.`
              : lorem}
          </StyledParagraph>
          <Button
            type={'button'}
            onClick={() => (page === TemplatePage.Login ? history.push('/register') : history.push('/login'))}
          >
            {buttonText}
          </Button>
        </ImageContent>
      </ImageBackground>
    </StyledWrapper>
  );
};

export default LoginTemplate;
