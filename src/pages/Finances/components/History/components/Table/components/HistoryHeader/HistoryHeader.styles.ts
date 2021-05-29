import styled from 'styled-components';

const TableHeader = styled.header`
  width: 100%;
  height: 59px;
  background-color: #fff6f6;
  display: grid;
  grid-template-columns: 20% 40% 20% 20%;
  align-items: center;
  padding: 0 2rem;
`;

const HeaderText = styled.p`
  font-weight: 600;
  color: #8f8e9e;
  font-size: 12px;
`;


export { TableHeader, HeaderText };
