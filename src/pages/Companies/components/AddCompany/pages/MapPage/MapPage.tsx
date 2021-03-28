import React, { useContext, useEffect, useState } from 'react';
import * as Leaflet from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { Button, Spinner } from 'components';
import { getLocation } from 'utils/map-location';
import { markerCustomIcon } from '../../utils/customMapIcons';
import { CompanyDataContext } from '../../context/CompanyDataContext';
import { PageContext, PageSettingEnum } from '../../context/PageContext';

import { SpinnerWrapper } from 'styles/shared';
import {
  ButtonWrapper,
  CenterBox,
  MapHeadingWrapper,
  MapWrapper,
  MobileCompoundTitle,
  StyledBackParagraph
} from 'styles/compoundStyles';

import 'leaflet/dist/leaflet.css';

const MapPage: React.FC = () => {
  const { mapData, setMapData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [mapPositionLat, setMapPositionLat] = useState<number | null | undefined>(null);
  const [mapPositionLong, setMapPositionLong] = useState<number | null | undefined>(null);
  const [coordsError, setCoordsError] = useState<boolean>(false);

  useEffect(() => {
    getLocation(setLoading, setMapPositionLat, setMapPositionLong, setCoordsError);
  }, []);

  const handleCenterMap = () => {
    setMapPositionLat(mapData?.lat);
    setMapPositionLong(mapData?.long);
  };
  const handleMapClick = (e: Leaflet.LeafletMouseEvent) => setMapData({ lat: e.latlng.lat, long: e.latlng.lng });
  const handlePageChange = (page: PageSettingEnum) => () => setCurrentPage(page);

  const displayMarkerCondition = mapData?.lat && mapData?.long;

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
            {displayMarkerCondition && <CenterBox onClick={handleCenterMap}>Wyśrodkuj</CenterBox>}
            <Map
              center={[mapPositionLat ? mapPositionLat : 52, mapPositionLong ? mapPositionLong : 20]}
              whenReady={() => setLoading(false)}
              zoom={mapPositionLat && mapPositionLong ? 13 : 5}
              zoomControl={false}
              onClick={handleMapClick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              {mapData?.lat && mapData?.long && <Marker icon={markerCustomIcon} position={[mapData.lat, mapData.long]} />}
            </Map>
            <ButtonWrapper>
              <StyledBackParagraph type={'back'} onClick={handlePageChange(PageSettingEnum.First)}>
                Wstecz
              </StyledBackParagraph>
              <Button
                onClick={handlePageChange(PageSettingEnum.Third)}
                type={'button'}
                disabled={!mapData?.lat || !mapData?.long}
              >
                Dalej
              </Button>
            </ButtonWrapper>
          </>
        )}
      </MapWrapper>
    </>
  );
};

export default MapPage;
