import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { useOutsideClick } from '../../../utils/customHooks';
import { notificationsAnimation } from '../../../animations/animations';
import styled from 'styled-components';
import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setUserRole, userLogout } from '../../../actions/authenticationActions';
import { LogoutIcon, SettingsIcon } from '../../../styles/iconStyles';
import Button from '../../atoms/Button/Button';

interface WrapperInterface {
  isMobile: boolean;
}

const StyledWrapper = styled.div<WrapperInterface>`
  width: 200px;
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? '5rem' : '4rem')};
  right: 0;
  z-index: 1001;

  ${({ theme }) => theme.mq.hdReady} {
    display: ${({ isMobile }) => isMobile && 'none'};
  }
`;

const SliderItem = styled.div`
  width: 100%;
  height: 60px;
  color: #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Text = styled.p`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps & RouteComponentProps;

const HeaderSlider: React.FC<ConnectedProps> = ({ history, isOpen, setOpen, isMobile, role, userLogout }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useOutsideClick(contentRef, isOpen, () => setOpen(false));

  useEffect(() => {
    notificationsAnimation(tl, wrapperRef, contentRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <StyledWrapper ref={wrapperRef} isMobile={!!isMobile}>
      <Content ref={contentRef}>
        <SliderItem onClick={() => (role === UserRole.User ? history.push('/user/settings') : history.push('/admin/settings'))}>
          <Text>Ustawienia</Text>
        </SliderItem>
        <SliderItem onClick={() => userLogout(() => history.push('/login'))}>
          <Text>Wyloguj</Text>
          <LogoutIcon />
        </SliderItem>
      </Content>
    </StyledWrapper>
  );
};

interface LinkStateProps {
  role: UserRole;
}

interface LinkDispatchProps {
  userLogout: (successCallback: () => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

const mapStateToProps = ({ authenticationReducer: { role } }: AppState): LinkStateProps => {
  return { role };
};

const HeaderSliderWithRouter = withRouter(HeaderSlider);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSliderWithRouter);
