import styled from 'styled-components';

interface GridProps {
  onlyHeader?: boolean;
  mobilePadding: boolean;
  isSettingsPage: boolean;
}

const StyledWrapper = styled.div<GridProps>`
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: ${({ mobilePadding }) => (mobilePadding ? '0 2rem' : 0)};
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  //background: rgb(247,247,249);
  //background: linear-gradient(60deg, rgba(247,247,249,1) 0%, rgba(255,255,255,1) 100%);

  ${({ theme }) => theme.mq.hdReady} {
    height: 100vh;
    place-items: center;
    justify-content: flex-start;
    display: grid;
    background-color: ${({ theme }) => theme.colors.borderBottomLight};
    padding: 0;
    grid-template-columns: ${({isSettingsPage}) => isSettingsPage ? '25% 75%' : '35% 65%'};
    grid-gap: ${({ onlyHeader }) => !onlyHeader && '1px'};
    grid-template-rows: 100px auto;
    grid-template-areas: ${({ onlyHeader }) => (onlyHeader ? `'name header' 'content content'` : `'name header' 'list content'`)};
  }
`;

const TitleWrapper = styled.div`
  align-self: flex-start;
  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
`;

export { TitleWrapper, StyledWrapper };
