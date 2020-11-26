import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ButtonWrapper, CenterBox, MapWrapper } from '../../../styles/compoundStyles';
import { Map, Marker, TileLayer } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import { markerCustomIcon } from '../../compound/AddCompany/utils/customMapIcons';
import Button from '../../atoms/Button/Button';
import Spinner from '../../atoms/Spinner/Spinner';
import { SpinnerWrapper } from '../../../styles/shared';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { CloseButtonWrapper } from '../../../styles/compoundControllerStyles';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { editCompanyCoords } from '../../../ducks/company/current-company/current-company-creators';
import { editClientCoords } from '../../../actions/clientActions';
import { ClientInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/test-store';

const StyledWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  z-index: 1500;
  background-color: ${({ theme }) => theme.colors.blurBackground};
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80%;
    border-radius: 30px;
  }
`;

const StyledMapWrapper = styled(MapWrapper)`
  height: 100%;
`;

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

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const MapCoordsEdit: React.FC<ConnectedProps> = ({ isOpen, closeMap, lat, long, type, selectedClient, editClientCoords }) => {
  const dispatch = useAppDispatch();
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
        selectedClient && editClientCoords(selectedClient._id, updatedLat, updatedLong);
        closeMap();
      }

      if (type === CoordsEditType.Company) {
        dispatch(editCompanyCoords({ lat: updatedLat, long: updatedLong }));
        closeMap();
      }
    }
  };

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
              {updatedLat && updatedLong && <CenterBox onClick={() => handleCenterMap()}>Wyśrodkuj</CenterBox>}
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
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {updatedLat && updatedLong && <Marker icon={markerCustomIcon} position={[updatedLat, updatedLong]} />}
              </Map>
              {type !== CoordsEditType.View && (
                <ButtonWrapper>
                  <Button onClick={() => handleSubmit()} type={'button'} text={'Dalej'} />
                </ButtonWrapper>
              )}
            </>
          )}
        </StyledMapWrapper>
      </Box>
    </StyledWrapper>
  );
};

interface LinkStateProps {
  selectedClient: ClientInterface | null;
}

const mapStateToProps = ({ clientReducer: { selectedClient } }: AppState): LinkStateProps => {
  return { selectedClient };
};

interface LinkDispatchProps {
  editClientCoords: (clientId: string, lat: number, long: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    editClientCoords: bindActionCreators(editClientCoords, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapCoordsEdit);
