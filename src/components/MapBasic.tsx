import { useEffect, useRef } from "react";
import "ol/ol.css";

import { fromLonLat } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls, FullScreen } from "ol/control";

export default function MapBasic() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([85.3240, 27.7172]), // Kathmandu
        zoom: 12,
      }),
      controls: defaultControls().extend([
        new FullScreen()
      ]),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="w-full h-screen">
      <div
        ref={mapRef}
        className="w-full h-full rounded-xl overflow-hidden shadow-lg"
      />
    </div>
  );
}