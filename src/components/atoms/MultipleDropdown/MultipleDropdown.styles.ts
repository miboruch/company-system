import styled from 'styled-components';
import { FlexWrapper } from '../../../styles/shared';

const StyledFlexWrapper = styled(FlexWrapper)`
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserBox = styled.div`
  border: 1px solid #aaa;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
`;

export { StyledFlexWrapper, UserBox };
