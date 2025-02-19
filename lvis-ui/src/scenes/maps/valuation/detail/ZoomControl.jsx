import { useMap } from "react-leaflet";

const ZoomControl = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div
      className="leaflet-control-zoom"
      style={{
        position: "absolute",
        top: "50px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      <a
        href="#"
        className="leaflet-control-zoom-in"
        onClick={(e) => {
          e.preventDefault();
          handleZoomIn();
        }}
      >
        <img src="/zoom in.svg" alt="zoomin" />
      </a>
      <a
        href="#"
        className="leaflet-control-zoom-out"
        onClick={(e) => {
          e.preventDefault();
          handleZoomOut();
        }}
      >
        <img src="/zoom out.svg" alt="zoomout" />
      </a>
    </div>
  );
};

export default ZoomControl