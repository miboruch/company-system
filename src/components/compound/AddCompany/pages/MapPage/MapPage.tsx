import React, { useContext, useEffect, useState } from 'react';
import * as Leaflet from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { BackParagraph, SpinnerWrapper } from '../../../../../styles/sharedStyles';
import Spinner from '../../../../atoms/Spinner/Spinner';
import { markerCustomIcon } from '../../components/MapIcons/customMapIcons';
import Button from '../../../../atoms/Button/Button';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ButtonWrapper, CenterBox, MapWrapper, StyledCompoundTitle } from './MapPage.styles';

import 'leaflet/dist/leaflet.css';

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
  const [mapPositionLat, setMapPositionLat] = useState<number | null>(null);
  const [mapPositionLong, setMapPositionLong] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(true);
      console.log(position);
      setMapPositionLong(position.coords.longitude);
      setMapPositionLat(position.coords.latitude);
      setLoading(false);
    });
  }, []);

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
          center={[mapPositionLat ? mapPositionLat : 52, mapPositionLong ? mapPositionLong : 20]}
          whenReady={() => setLoading(false)}
          zoom={mapPositionLat && mapPositionLong ? 11 : 5}
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
          <BackParagraph onClick={() => setCurrentPage(PageSettingEnum.First)}>Wstecz</BackParagraph>
          <Button onClick={() => setCurrentPage(PageSettingEnum.Third)} type={'button'} text={'Dalej'} disabled={!coords.lat || !coords.long} />
        </ButtonWrapper>
      </MapWrapper>
    </>
  );
};

export default MapPage;
