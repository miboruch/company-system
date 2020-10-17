import React, { useState } from 'react';
import styled from 'styled-components';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { SpinnerWrapper } from '../../../../styles/sharedStyles';
import Spinner from '../../../atoms/Spinner/Spinner';

import 'leaflet/dist/leaflet.css';

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  overflow: hidden;
  margin-top: 0;
  z-index: 5;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
  }
`;

interface Props {}

const MapPage: React.FC<Props> = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  return (
    <MapWrapper>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Map
          center={[52, 20]}
          whenReady={() => setLoading(false)}
          zoom={11}
          minZoom={4}
          zoomControl={false}
          onClick={(e: any) => console.log(e)}
          // onMove={(e) => {
          //   console.log(e);
          //   const { lat, lng } = e.target.getCenter();
          //   // setCenterLat(lat);
          //   // setCenterLong(lng);
          // }}
        >
          <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {/*{isNotificationPage && centerLat && centerLong && <Marker icon={markerCustomIcon} position={[centerLat, centerLong]} />}*/}
        </Map>
      )}
    </MapWrapper>
  );
};

export default MapPage;
