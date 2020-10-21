import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { ContentWrapper, ArrowAbsoluteWrapper } from './ContentTemplate.styles';
import { setEmployeeInfoOpen } from '../../../actions/employeeActions';
import { AppTypes } from '../../../types/appActionTypes';
import { AppState } from '../../../reducers/rootReducer';
import { Direction } from '../../../types/globalTypes';

interface Props {
  children: React.ReactNode;
}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const ContentTemplate: React.FC<ConnectedProps> = ({ children, isEmployeeInfoOpen, setEmployeeInfoOpen }) => {
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const contentWrapper: HTMLDivElement | null = contentWrapperRef.current;

    if (contentWrapper) {
      gsap.set(contentWrapper, { x: '100%' });
      gsap.set([...contentWrapper.children], { autoAlpha: 0 });

      tl.fromTo(contentWrapper, { x: '100%' }, { x: 0, duration: 0.3 }).fromTo(contentWrapper.children, { y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.4 });
    }
  }, []);

  useEffect(() => {
    isEmployeeInfoOpen ? tl.play() : tl.reverse();
  }, [isEmployeeInfoOpen]);

  return (
    <ContentWrapper ref={contentWrapperRef}>
      <ArrowAbsoluteWrapper>
        <ArrowButton onClick={() => setEmployeeInfoOpen(false)} direction={Direction.Left} />
      </ArrowAbsoluteWrapper>
      {children}
    </ContentWrapper>
  );
};

interface LinkStateProps {
  isEmployeeInfoOpen: boolean;
}

interface LinkDispatchProps {
  setEmployeeInfoOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ employeeReducer: { isEmployeeInfoOpen } }: AppState): LinkStateProps => {
  return { isEmployeeInfoOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setEmployeeInfoOpen: bindActionCreators(setEmployeeInfoOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentTemplate);
