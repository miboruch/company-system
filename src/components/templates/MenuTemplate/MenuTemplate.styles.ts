import styled from 'styled-components';

const MenuTemplateWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  //margin-top: 60px;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: row;
    margin-left: 300px;
    //this is required because menu has 300px and is position fixed
  }
`;

export { MenuTemplateWrapper };
