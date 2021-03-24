import styled from 'styled-components';

interface WrapperInterface {
  isMobile: boolean;
}

const StyledWrapper = styled.div<WrapperInterface>`
  width: 200px;
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? '5rem' : '4rem')};
  right: 0;
  z-index: 1001;

  ${({ theme }) => theme.mq.hdReady} {
    display: ${({ isMobile }) => isMobile && 'none'};
  }
`;

const SliderItem = styled.div`
  width: 100%;
  height: 60px;
  color: #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Text = styled.p`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export { StyledWrapper, SliderItem, Content, Text };
