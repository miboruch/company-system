import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  ${({ theme }) => theme.mq.desktop} {
    place-items: center;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 100px auto;
    grid-template-areas: 'name header' 'list content';
  }
`;

export { StyledWrapper };
