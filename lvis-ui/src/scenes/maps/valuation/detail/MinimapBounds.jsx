import { useEventHandlers } from '@react-leaflet/core';
import { useCallback, useMemo, useState } from 'react'
import { Rectangle, useMap, useMapEvent } from 'react-leaflet';
import { BOUNDS_STYLE } from '../common';
import PropTypes from 'prop-types';

const MinimapBounds = ({ parentMap, zoom }) => {
  const minimap = useMap();
  
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

MinimapBounds.propTypes = {
  parentMap: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default MinimapBounds