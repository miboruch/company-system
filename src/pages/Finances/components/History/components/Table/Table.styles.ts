import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: -2px 11px 8px 6px rgba(0, 0, 0, 0.02);
`;

const Controller = styled.div`
  width: 100%;
  height: 59px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
`;


export { Wrapper, Controller };
