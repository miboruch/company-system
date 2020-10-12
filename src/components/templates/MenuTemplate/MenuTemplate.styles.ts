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

export { MenuTemplateWrapper };
