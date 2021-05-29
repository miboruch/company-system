import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 59px;
  background-color: #fff6f6;
  display: grid;
  grid-template-columns: 20% 60% 20% 20%;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid #f2eeee;
`;

const Name = styled.p`
  font-size: 13px;
  color: #000;
`;

const Subtext = styled.p`
  font-size: 13px;
  color: #b4b4b7;
`;

const StyledValue = styled.p`
  font-size: 14px;
  color: #000;
`;


export { Wrapper, Name, Subtext, StyledValue };
