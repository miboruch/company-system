import React from 'react';
import Button from '../../atoms/Button/Button';
import { StyledWrapper, FormWrapper, ImageBackground, ImageContent, Heading, StyledParagraph } from './LoginTemplate.styles';

interface Props {
  children: React.ReactNode;
  current: 'login' | 'register';
}

const LoginTemplate: React.FC<Props> = ({ children, current }) => {
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
          <Button type={'button'} text={current === 'login' ? 'Zarejestruj się' : 'Zaloguj się'} />
        </ImageContent>
      </ImageBackground>
    </StyledWrapper>
  );
};

export default LoginTemplate;
