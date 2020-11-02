import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import { StyledWrapper, FormWrapper, ImageBackground, ImageContent, Heading, StyledParagraph } from './LoginTemplate.styles';
import { lorem } from '../../../utils/config';

export enum TemplatePage {
  Login = 'login',
  Register = 'register'
}

interface Props {
  children: React.ReactNode;
  page: TemplatePage;
  companyName?: string;
}

type ConnectedProps = Props & RouteComponentProps<any>;

const LoginTemplate: React.FC<ConnectedProps> = ({ history, children, page, companyName }) => {
  return (
    <StyledWrapper>
      <FormWrapper>{children}</FormWrapper>
      <ImageBackground>
        <ImageContent>
          {!!companyName ? <Heading>Dołącz do firmy {companyName}</Heading> : <Heading>Przyśpiesz swoją prace</Heading>}
          <StyledParagraph>{!!companyName ? `Zostałeś zaproszony do firmy ${companyName} przez administratora. Wypełnij dane i stań się częścią zespołu.` : lorem}</StyledParagraph>
          <Button
            type={'button'}
            text={page === TemplatePage.Login ? 'Zarejestruj się' : 'Zaloguj się'}
            onClick={() => (page === TemplatePage.Login ? history.push('/register') : history.push('/login'))}
          />
        </ImageContent>
      </ImageBackground>
    </StyledWrapper>
  );
};

export default withRouter(LoginTemplate);
