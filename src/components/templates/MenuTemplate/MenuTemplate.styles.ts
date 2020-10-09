import styled from 'styled-components';

const MenuTemplateWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;

  ${({ theme }) => theme.mq.desktop} {
    display: flex;
    flex-direction: row;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 60px;
  background-color: white;
  position: relative;

  ${({ theme }) => theme.mq.desktop} {
    display: none;
  }
`;

export { MenuTemplateWrapper, Header };
