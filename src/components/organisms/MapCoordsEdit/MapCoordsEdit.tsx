import React, { useEffect, useRef, useState } from 'react';
import * as Leaflet from 'leaflet';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Button from 'components/atoms/Button/Button';
import Spinner from 'components/atoms/Spinner/Spinner';
import CloseButton from 'components/atoms/CloseButton/CloseButton';

import { AppState, useAppDispatch } from 'store/store';
import { modalOpenAnimation } from 'animations/animations';
import { ButtonWrapper, CenterBox } from 'styles/compoundStyles';
import { markerCustomIcon } from 'pages/Companies/components/AddCompany/utils/customMapIcons';
import { SpinnerWrapper } from 'styles/shared';
import { CloseButtonWrapper } from 'styles/compoundControllerStyles';
import { editCompanyCoords } from 'ducks/company/current-company/current-company-creators';
import { editClientCoords } from 'ducks/client/client-creators';
import { StyledWrapper, Box, StyledMapWrapper } from './MapCoordsEdit.styles';

export enum CoordsEditType {
  Company = 'company',
  Client = 'client',
  View = 'view'
}

interface Props {
  isOpen: boolean;
  closeMap: () => void;
  lat: number;
  long: number;
  type: CoordsEditType;
}

const MapCoordsEdit: React.FC<Props> = ({ isOpen, closeMap, lat, long, type }) => {
  const dispatch = useAppDispatch();
  const { selectedClient } = useSelector((state: AppState) => state.client.clientToggle);

  const [updatedLat, setUpdatedLat] = useState<number>(lat);
  const [updatedLong, setUpdatedLong] = useState<number>(long);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [mapPositionLat, setMapPositionLat] = useState<number | null>(null);
  const [mapPositionLong, setMapPositionLong] = useState<number | null>(null);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const handleCenterMap = () => {
    setMapPositionLat(updatedLat);
    setMapPositionLong(updatedLong);
  };

  const handleSubmit = () => {
    if (type !== CoordsEditType.View) {
      if (type === CoordsEditType.Client) {
        selectedClient && dispatch(editClientCoords({ clientId: selectedClient._id, lat: updatedLat, long: updatedLong }));
        closeMap();
      }

      if (type === CoordsEditType.Company) {
        dispatch(editCompanyCoords({ lat: updatedLat, long: updatedLong }));
        closeMap();
      }
    }
  };

  useEffect(() => {
    setUpdatedLat(lat);
    setUpdatedLong(long);
  }, [lat, long, isOpen]);

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, boxRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <StyledWrapper ref={mainWrapperRef}>
      <Box ref={boxRef}>
        <CloseButtonWrapper>
          <CloseButton close={() => closeMap()} />
        </CloseButtonWrapper>
        <StyledMapWrapper>
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <>
              {updatedLat && updatedLong && <CenterBox onClick={handleCenterMap}>Wyśrodkuj</CenterBox>}
              <Map
                center={[mapPositionLat ? mapPositionLat : updatedLat, mapPositionLong ? mapPositionLong : updatedLong]}
                whenReady={() => setLoading(false)}
                zoom={13}
                zoomControl={false}
                onClick={(e: Leaflet.LeafletMouseEvent) => {
                  if (type !== CoordsEditType.View) {
                    setUpdatedLat(e.latlng.lat);
                    setUpdatedLong(e.latlng.lng);
                  }
                }}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {updatedLat && updatedLong && <Marker icon={markerCustomIcon} position={[updatedLat, updatedLong]} />}
              </Map>
              {type !== CoordsEditType.View && (
                <ButtonWrapper>
                  <Button onClick={handleSubmit} type={'button'} text={'Dalej'} />
                </ButtonWrapper>
              )}
            </>
          )}
        </StyledMapWrapper>
      </Box>
    </StyledWrapper>
  );
};

export default MapCoordsEdit;
