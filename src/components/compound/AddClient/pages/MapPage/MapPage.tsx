import React, { useContext, useEffect, useState } from 'react';
import * as Leaflet from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Spinner from '../../../../atoms/Spinner/Spinner';
import Button from '../../../../atoms/Button/Button';

import { Coords } from '../../../../../types/globalTypes';
import { getLocation } from '../../../../../utils/mapFunctions';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { SpinnerWrapper } from '../../../../../styles/shared';
import { markerCustomIcon } from '../../../AddCompany/utils/customMapIcons';
import { ClientDataContext } from '../../context/ClientDataContext';
import { ButtonWrapper, CenterBox, MapHeadingWrapper, MapWrapper, MobileCompoundTitle, StyledBackParagraph } from '../../../../../styles/compoundStyles';

const MapPage: React.FC = () => {
  const { data, setData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [coords, setCoords] = useState<Coords>({ lat: data.lat || null, long: data.long || null });
  const [mapPositionLat, setMapPositionLat] = useState<number | null | undefined>(null);
  const [mapPositionLong, setMapPositionLong] = useState<number | null | undefined>(null);
  const [coordsError, setCoordsError] = useState<boolean>(false);

  useEffect(() => {
    getLocation(setLoading, setMapPositionLat, setMapPositionLong, setCoordsError);
  }, []);

  const handleCenterMap = () => {
    setMapPositionLat(data.lat);
    setMapPositionLong(data.long);
  };

  const handleSubmit = () => {
    setData({ ...data, ...coords });
    setCurrentPage(PageSettingEnum.Third);
  };

  return (
    <>
      <MapHeadingWrapper>
        <MobileCompoundTitle>Zaznacz lokalizacje</MobileCompoundTitle>
      </MapHeadingWrapper>
      <MapWrapper>
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <>
            {data.lat && data.long && <CenterBox onClick={() => handleCenterMap()}>Wyśrodkuj</CenterBox>}
            <Map
              center={[mapPositionLat ? mapPositionLat : 52, mapPositionLong ? mapPositionLong : 20]}
              whenReady={() => setLoading(false)}
              zoom={mapPositionLat && mapPositionLong ? 13 : 5}
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
              <StyledBackParagraph type={'back'} onClick={() => setCurrentPage(PageSettingEnum.First)}>
                Wstecz
              </StyledBackParagraph>
              <Button onClick={() => handleSubmit()} type={'button'} text={'Dodaj'} disabled={!coords.lat || !coords.long} />
            </ButtonWrapper>
          </>
        )}
      </MapWrapper>
    </>
  );
};

export default MapPage;
