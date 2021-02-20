import styled from 'styled-components';
import { List } from 'styles';

const StyledList = styled(List)`
  display: flex;
  flex-direction: row;
  ${({ theme }) => theme.mq.hdReady} {
    flex-direction: column;
  }
`;

interface ListItemsInterface {
  listLength: number;
  isActive: boolean;
}

const ListItems = styled.div<ListItemsInterface>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark : theme.colors.gray)};
  transition: color 0.5s ease, background-color 0.5s ease;
  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    background-color: ${({ theme, isActive }) => isActive && theme.colors.backgroundHover};
    height: ${({ listLength }) => listLength && `calc(100% / ${listLength})`};
    display: grid;
    place-items: center;
    flex-direction: column;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.font.weight.book};
  color: inherit;
  ${({ theme }) => theme.mq.hdReady} {
    font-size: 22px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    padding: 2rem 4rem;
    overflow-y: scroll;
    grid-area: content;
  }
`;

export { StyledList, ListItems, Paragraph, ContentWrapper };
