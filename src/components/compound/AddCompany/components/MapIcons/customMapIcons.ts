import L from 'leaflet';

const markerCustomColor = '#454545';

const markerHtmlStyles = `
    background-color: ${markerCustomColor};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF
  `;

export const markerCustomIcon = L.divIcon({
  className: 'my-custom-pin',
  iconAnchor: [0, 24],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
});
