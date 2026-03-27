import { useEffect, useRef } from "react";
import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, FullScreen } from "ol/control";

import {
  createBaseLayers,
  createPointLayer,
  createPolygonLayer,
  createLineLayer,
} from "../map/layers";

import LayerSwitcher from "./LayerSwitcher";
import Popup from "./Popup";

export default function MapBasic() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const osmLayerRef = useRef<any>(null);
  const topoLayerRef = useRef<any>(null);

  useEffect(() => {
    const { osmLayer, topoLayer } = createBaseLayers();
    osmLayerRef.current = osmLayer;
    topoLayerRef.current = topoLayer;

    const pointLayer = createPointLayer();
    const polygonLayer = createPolygonLayer();
    const lineLayer = createLineLayer();

    polygonLayer.setZIndex(1);
    lineLayer.setZIndex(2);
    pointLayer.setZIndex(3);

    const map = new Map({
      target: mapRef.current!,
      layers: [osmLayer, topoLayer, polygonLayer, lineLayer, pointLayer],
      view: new View({
        center: fromLonLat([85.3240, 27.7172]),
        zoom: 5,
      }),
      controls: defaultControls().extend([new FullScreen()]),
    });

    const overlay = new Overlay({
      element: popupRef.current!,
      positioning: "bottom-center",
      offset: [0, -25],
      stopEvent: false,
    });

    map.addOverlay(overlay);

    popupRef.current
      ?.querySelector("#popup-close")
      ?.addEventListener("click", () =>
        popupRef.current?.classList.add("hidden")
      );

    map.on("singleclick", (evt) => {
      let selected: any = null;

      map.forEachFeatureAtPixel(evt.pixel, (f) => {
        if (!selected) selected = f;
        if (f.getGeometry()?.getType() === "Point") {
          selected = f;
          return true;
        }
        return false;
      });

      if (selected && popupRef.current) {
        overlay.setPosition(evt.coordinate);
        popupRef.current.querySelector("#popup-content")!.innerHTML =
          selected.get("name") || "Feature";
        popupRef.current.classList.remove("hidden");
      } else {
        popupRef.current?.classList.add("hidden");
      }
    });

    map.on("pointermove", (evt) => {
      map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)
        ? "pointer"
        : "";
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <LayerSwitcher osmRef={osmLayerRef} topoRef={topoLayerRef} />
      <Popup ref={popupRef} />
      <div ref={mapRef} className="w-full h-full rounded-xl shadow-lg" />
    </div>
  );
}