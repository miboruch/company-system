import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import { StyledWrapper, FormWrapper, ImageBackground, ImageContent, Heading, StyledParagraph } from './LoginTemplate.styles';

export enum TemplatePage {
  Login = 'login',
  Register = 'register'
}

interface Props {
  children: React.ReactNode;
  page: TemplatePage;
}

type ConnectedProps = Props & RouteComponentProps<any>;

const LoginTemplate: React.FC<ConnectedProps> = ({ history, children, page }) => {
  return (
    <StyledWrapper>
      <FormWrapper>{children}</FormWrapper>
      <ImageBackground>
        <ImageContent>
          <Heading>Przyśpiesz swoją prace</Heading>
          <StyledParagraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad asperiores, autem cum deleniti dolorem ea eligendi fuga incidunt inventore itaque
            labore molestias nihil nobis rerum tempore tenetur voluptatem voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut fugit illum
            itaque magnam, minima, natus nesciunt obcaecati praesentium quas quisquam ratione repellendus sint soluta temporibus totam vel velit vero!
          </StyledParagraph>
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
