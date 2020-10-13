import styled from 'styled-components';
import background from '../../../assets/images/background.jpg';
import { LOGIN_IMAGE_BACKGROUND_OPACITY } from '../../../utils/config';
import { Paragraph } from '../../../styles/sharedStyles';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;

  ${({ theme }) => theme.mq.hdReady} {
    width: 60%;
  }
`;

const ImageBackground = styled.div`
  background-image: url(${background});
  background-size: cover;
  //-webkit-filter: brightness(50%);
  width: 40%;
  min-height: 100vh;
  display: none;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    align-items: flex-end;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, ${LOGIN_IMAGE_BACKGROUND_OPACITY});
      z-index: 0;
    }
  }
`;

const ImageContent = styled.section`
  width: 100%;
  height: 50%;
  padding: 0 10rem;
  display: flex;
  flex-direction: column;
  color: #fff;
  z-index: 1;
`;

const Heading = styled.h1`
  font-size: 36px;
  letter-spacing: -2px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledParagraph = styled(Paragraph)`
  margin: 3rem 0;
`;

export { StyledWrapper, FormWrapper, ImageBackground, ImageContent, Heading, StyledParagraph };
