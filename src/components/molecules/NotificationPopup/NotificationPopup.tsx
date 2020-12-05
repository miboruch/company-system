import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '../../../store/store';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { NOTIFICATION_VISIBILITY_TIME } from '../../../utils/config';
import { CheckedIcon, NotCheckedIcon } from '../../../styles/iconStyles';
import { NotificationWrapper, NotificationParagraph } from './NotificationPopup.styles';
import { setNotificationMessage } from '../../../ducks/popup/popup';

const NotificationPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isNotificationOpen, notificationMessage } = useSelector((state: AppState) => state.popup);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));
  const [shouldPopupBeOpen, setPopupOpen] = useState<boolean>(false);

  /*
   * This animation has 3 steps:
   * - when notification message and isNotificationOpen boolean changes in redux, we now that we need to start this animation
   * - after the data changes, we set shouldPopupBeOpen to true, and animation starts
   * - after 3 seconds (NOTIFICATION_VISIBILITY_TIME) animations ends, and the finish fade takes like 0.5 second
   * - to prevent background color change on animation end (red, green) we set redux state 1 second after main animation ends,
   *   then we are sure, that colors will not switch*/

  useEffect(() => {
    // * set variable, which controls our animation
    setPopupOpen(!!(notificationMessage && isNotificationOpen));
  }, [notificationMessage, isNotificationOpen]);

  useEffect(() => {
    // * if variable is true, we wait 3 seconds and then animation ends (variable changes to false)
    if (shouldPopupBeOpen) {
      setTimeout(() => {
        setPopupOpen(false);
      }, NOTIFICATION_VISIBILITY_TIME);
    }
  }, [shouldPopupBeOpen]);

  useEffect(() => {
    // * one second after animation end, we set redux state to null
    if (!shouldPopupBeOpen) {
      setTimeout(() => {
        dispatch(setNotificationMessage({ message: '', notificationType: undefined }));
      }, 1000);
    }
  }, [shouldPopupBeOpen]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    gsap.set(wrapper, { autoAlpha: 0 });

    tl.fromTo(wrapper, { autoAlpha: 0, y: '+=20' }, { autoAlpha: 1, y: '0', duration: 0.4 });
  }, []);

  useEffect(() => {
    shouldPopupBeOpen ? tl.play() : tl.reverse();
  }, [shouldPopupBeOpen]);

  return (
    <NotificationWrapper ref={wrapperRef}>
      <NotificationParagraph>{notificationMessage && notificationMessage.message}</NotificationParagraph>
      {notificationMessage && notificationMessage.notificationType === NotificationTypes.Success ? <CheckedIcon /> : <NotCheckedIcon />}
    </NotificationWrapper>
  );
};

export default NotificationPopup;
