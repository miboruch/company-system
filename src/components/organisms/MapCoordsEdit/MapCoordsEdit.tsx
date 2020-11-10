import React, { useState } from 'react';
import { ButtonWrapper, CenterBox, MapHeadingWrapper, MapWrapper, MobileCompoundTitle } from '../../../styles/compoundStyles';
import { Map, Marker, TileLayer } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import { markerCustomIcon } from '../../compound/AddCompany/utils/customMapIcons';
import Button from '../../atoms/Button/Button';
import Spinner from '../../atoms/Spinner/Spinner';
import { SpinnerWrapper } from '../../../styles/shared';

interface Props {
  lat: number;
  long: number;
}

const MapCoordsEdit: React.FC<Props> = ({ lat, long }) => {
  const [updatedLat, setUpdatedLat] = useState<number>(lat);
  const [updatedLong, setUpdatedLong] = useState<number>(long);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [mapPositionLat, setMapPositionLat] = useState<number | null>(null);
  const [mapPositionLong, setMapPositionLong] = useState<number | null>(null);

  const handleCenterMap = () => {
    setMapPositionLat(updatedLat);
    setMapPositionLong(updatedLong);
  };

  const handleSubmit = () => {
    console.log(updatedLat, updatedLong);
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
            {updatedLat && updatedLong && <CenterBox onClick={() => handleCenterMap()}>Wyśrodkuj</CenterBox>}
            <Map
              center={[mapPositionLat ? mapPositionLat : updatedLat, mapPositionLong ? mapPositionLong : updatedLong]}
              whenReady={() => setLoading(false)}
              zoom={13}
              zoomControl={false}
              onClick={(e: Leaflet.LeafletMouseEvent) => {
                setUpdatedLat(e.latlng.lat);
                setUpdatedLong(e.latlng.lng);
              }}
            >
              <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              {updatedLat && updatedLong && <Marker icon={markerCustomIcon} position={[updatedLat, updatedLong]} />}
            </Map>
            <ButtonWrapper>
              <Button onClick={() => handleSubmit()} type={'button'} text={'Dalej'} />
            </ButtonWrapper>
          </>
        )}
      </MapWrapper>
    </>
  );
};

export default MapCoordsEdit;
