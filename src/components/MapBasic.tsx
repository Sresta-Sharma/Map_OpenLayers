import { useEffect, useRef } from "react";
import "ol/ol.css";

import { fromLonLat } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { defaults as defaultControls, FullScreen } from "ol/control";

export default function MapBasic() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const osmLayerRef = useRef<TileLayer | null>(null);
  const topoLayerRef = useRef<TileLayer | null>(null);

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: true,
    });

    const topoLayer = new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
      }),
      visible: false,
    });

     // store references
    osmLayerRef.current = osmLayer;
    topoLayerRef.current = topoLayer;
    
    const map = new Map({
      target: mapRef.current!,
      layers: [
        osmLayer,
        topoLayer,
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
  <div className="w-full h-screen relative">

    {/* Selector (Top Left) */}
    <div className="absolute top-4 left-4 z-10">
        <select
          onChange={(e) => {
            if (e.target.value === "osm") {
              osmLayerRef.current?.setVisible(true);
              topoLayerRef.current?.setVisible(false);
            } else {
              osmLayerRef.current?.setVisible(false);
              topoLayerRef.current?.setVisible(true);
            }
          }}
          className="bg-white/90 border border-gray-200 
                     text-gray-700 text-sm rounded-lg shadow-md 
                     px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-400 
                     cursor-pointer"
        >
          <option value="osm">Map</option>
          <option value="topo">Terrain</option>
        </select>
    </div>

    {/* Map */}
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl overflow-hidden shadow-lg"
    />
  </div>
);
}