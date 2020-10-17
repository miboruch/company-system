import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import * as Leaflet from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { SpinnerWrapper, MobileCompoundTitle } from '../../../../styles/sharedStyles';
import Spinner from '../../../atoms/Spinner/Spinner';
import { markerCustomIcon } from '../components/MapIcons/customMapIcons';

import 'leaflet/dist/leaflet.css';
import Button from '../../../atoms/Button/Button';
import { CompanyDataContext } from '../context/CompanyDataContext';
import { PageContext } from '../context/PageContext';

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  overflow: hidden;
  margin-top: 0;
  z-index: 5;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    grid-area: content;
    height: 100%;
    border-bottom-right-radius: 30px;
  }
`;

const StyledCompoundTitle = styled(MobileCompoundTitle)`
  padding: 0 2rem;
  justify-self: flex-start;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: heading;
    align-self: center;
    margin: 0;
  }
`;

const SubheadingWrapper = styled.div`
  width: 100%;
  height: 50px;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: heading;
  }
`;

const CenterBox = styled.div`
  width: 50px;
  height: 15px;
  background-color: white;
  position: absolute;
  top: 50%;
  right: 5rem;
  z-index: 50;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 110px;
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;
`;

interface Props {}

interface Coords {
  lat: number | null;
  long: number | null;
}

const MapPage: React.FC<Props> = () => {
  const { data, setData } = useContext(CompanyDataContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [coords, setCoords] = useState<Coords>({ lat: data.lat || null, long: data.long || null });
  return isLoading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <>
      {/*<SubheadingWrapper>*/}
      <StyledCompoundTitle>Lokalizacja twojej firmy</StyledCompoundTitle>
      {/*</SubheadingWrapper>*/}

      <MapWrapper>
        <CenterBox>test</CenterBox>
        <Map
          center={[52, 20]}
          whenReady={() => setLoading(false)}
          zoom={11}
          minZoom={4}
          zoomControl={false}
          onClick={(e: Leaflet.LeafletMouseEvent) => {
            setCoords({ lat: e.latlng.lat, long: e.latlng.lng });
            setData({ ...data, lat: e.latlng.lat, long: e.latlng.lng });
          }}
        >
          <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {coords.lat && coords.long && <Marker icon={markerCustomIcon} position={[coords.lat, coords.long]} />}
        </Map>
        <ButtonWrapper>
          <Button onClick={() => setCurrentPage(currentPage + 1)} type={'button'} text={'Dalej'} disabled={!coords.lat || !coords.long} />
        </ButtonWrapper>
      </MapWrapper>
    </>
  );
};

export default MapPage;
