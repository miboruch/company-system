import React, { useContext, useEffect, useState } from 'react';
import * as Leaflet from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { Spinner, Button } from 'components/index';
import { getLocation } from 'utils/map-location';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { markerCustomIcon } from 'pages/Companies/components/AddCompany/utils/customMapIcons';
import { ClientDataContext } from '../../context/ClientDataContext';

import { SpinnerWrapper } from 'styles/shared';
import {
  ButtonWrapper,
  CenterBox,
  MapHeadingWrapper,
  MapWrapper,
  MobileCompoundTitle,
  StyledBackParagraph
} from 'styles/compoundStyles';

const MapPage: React.FC = () => {
  const { mapData, setMapData } = useContext(ClientDataContext);
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

  const handleSubmit = () => setCurrentPage(PageSettingEnum.Third);
  const handleMapClick = (e: Leaflet.LeafletMouseEvent) => setMapData({ lat: e.latlng.lat, long: e.latlng.lng });

  const handlePreviousPage = () => setCurrentPage(PageSettingEnum.First);

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
              <StyledBackParagraph type={'back'} onClick={handlePreviousPage}>
                Wstecz
              </StyledBackParagraph>
              <Button onClick={handleSubmit} type={'button'} disabled={!mapData?.lat || !mapData?.long}>
                Dodaj
              </Button>
            </ButtonWrapper>
          </>
        )}
      </MapWrapper>
    </>
  );
};

export default MapPage;
