import { useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MinimapBounds from "./MinimapBounds";
import { POSITION_CLASSES } from "../../../../utils/constant";
import PropTypes from "prop-types";

const MinimapControl = ({ position, zoom }) => {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{
          height: 32,
          width: 32,
          borderRadius: "8px",
          border: "2px solid #FFFFFF",
          boxShadow: "0px 2px 4px 0px #0000002E",
        }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    []
  );

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}

MinimapControl.propTypes = {
  position: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default MinimapControl