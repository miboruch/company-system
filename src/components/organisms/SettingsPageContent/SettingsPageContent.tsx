import React from 'react';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { List } from '../../../styles/shared';
import styled from 'styled-components';

interface Props {}

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
    font-size: 28px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    grid-area: content;
  }
`;

const SettingsPageContent: React.FC<Props> = () => {
  return (
    <GridWrapper pageName={'Ustawienia'} mobilePadding={true}>
      <StyledList>
        <ListItems listLength={2} isActive={false}>
          <Paragraph>Ustawienia konta</Paragraph>
        </ListItems>
        <ListItems listLength={2} isActive={true}>
          <Paragraph>Edycja firmy</Paragraph>
        </ListItems>
        <ListItems listLength={3} isActive={false}>
          <Paragraph>Dodaj administratorów</Paragraph>
        </ListItems>
      </StyledList>
      <ContentWrapper>
        <p>Test</p>
      </ContentWrapper>
    </GridWrapper>
  );
};

export default SettingsPageContent;
