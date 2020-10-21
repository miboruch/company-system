import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Title } from '../../../styles/sharedStyles';
import { Header } from '../LandingPageContent/LandingPageContent.styles';
import ListBox from '../../molecules/ListBox/ListBox';
import gsap from 'gsap';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';

const List = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: list;
    border-right: 1px solid ${({ theme }) => theme.colors.impactGray};
  }
`;

const Content = styled.section`
  width: 100%;
  height: 100%;
  background-color: #ccc;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
  }
`;

interface Props {}

const EmployeesPageContent: React.FC<Props> = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const list: HTMLDivElement | null = listRef.current;

    if (list) {
      gsap.set([...list.children], { autoAlpha: 0 });

      tl.fromTo(list.children, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.2 });
    }
  }, []);
  return (
    <GridWrapper mobilePadding={false}>
      <Title>Pracownicy</Title>
      <Header />
      <List ref={listRef}>
        <ListBox
          name={'Roman Boruch'}
          topDescription={'09-10-1987'}
          bottomDescription={'roman.boruch@gmail.com'}
          callback={() => console.log('roman')}
          isEmpty={true}
          isCompanyBox={false}
        />
        <ListBox
          name={'Roman Boruch'}
          topDescription={'09-10-1987'}
          bottomDescription={'roman.boruch@gmail.com'}
          callback={() => console.log('roman')}
          isEmpty={true}
          isCompanyBox={false}
        />
        <ListBox
          name={'Roman Boruch'}
          topDescription={'09-10-1987'}
          bottomDescription={'roman.boruch@gmail.com'}
          callback={() => console.log('roman')}
          isEmpty={true}
          isCompanyBox={false}
        />
      </List>
      <ContentTemplate isOpen={false} setOpen={(isOpen: boolean) => console.log(isOpen)}>
        <p>hello bro</p>
      </ContentTemplate>
    </GridWrapper>
  );
};

export default EmployeesPageContent;
