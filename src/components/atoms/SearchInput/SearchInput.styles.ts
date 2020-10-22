import styled from 'styled-components';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(Search)`
  width: 15px;
  height: 15px;
  fill: #767676;
  position: absolute;
  top: 8px;
  left: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family.avantGarde};
  color: ${({ theme }) => theme.colors.inputColorStandard};
  height: 36px;
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #ccc;
  transition: border-bottom-color 1s ease, text-decoration 1s ease, opacity 0.5s ease;
  padding-left: 3rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #8d8d8d;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 12px;
    padding-left: 1rem;
  }

  ${({ theme }) => theme.mq.standard} {
    color: ${({ theme }) => theme.colors.inputColorStandard};
  }

  ${({ theme }) => theme.mq.hdReady} {
    width: 360px;
  }
`;

export { SearchWrapper, SearchIcon, StyledInput };
