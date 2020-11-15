import styled from 'styled-components';
import { Wrapper, Name } from '../ListBox/ListBox.styles';

const StyledWrapper = styled(Wrapper)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderBottomDark};

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

const StyledName = styled(Name)`
  color: ${({ theme }) => theme.colors.white};
`;

export { StyledWrapper, StyledName };
