import styled from 'styled-components';

interface ProgressionProps {
  page: number;
  allPages: number;
}

const ProgressionBarDiv = styled.div<ProgressionProps>`
  width: 100%;
  height: 2px;
  
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 2px;
  left: 0;
  margin: 2rem 0 3rem 0;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ page, allPages }) => `calc((100% / ${allPages}) * ${page})`};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.green};
    transition: width 0.4s ease;
  }
`;

export { ProgressionBarDiv };
