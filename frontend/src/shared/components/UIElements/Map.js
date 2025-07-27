import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

const OpenLayersMap = ({ center, zoom, className, style }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(null);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className || ''}`}
      style={style || { height: '400px', width: '100%' }}
    />
  );
};

export default OpenLayersMap;
