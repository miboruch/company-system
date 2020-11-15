import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { useOutsideClick } from '../../../utils/customHooks';
import { AppState } from '../../../reducers/rootReducer';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { notificationsAnimation } from '../../../animations/animations';
import { userLogout } from '../../../actions/authenticationActions';
import { LogoutIcon } from '../../../styles/iconStyles';
import { StyledWrapper, SliderItem, Content, Text } from './HeaderSlider.styles';

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
