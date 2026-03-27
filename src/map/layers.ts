import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

import { pointStyle, polygonStyle, lineStyle } from "./styles";

export const createBaseLayers = () => {
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

  return { osmLayer, topoLayer };
};

export const createPointLayer = () => {
  const feature = new Feature({
    geometry: new Point(fromLonLat([85.3123, 27.7049])),
    name: "Dharahara",
  });

  return new VectorLayer({
    source: new VectorSource({ features: [feature] }),
    style: pointStyle,
  });
};

export const createPolygonLayer = () => {
  return new VectorLayer({
    source: new VectorSource({
      url: "/data/kathmandu.geojson",
      format: new GeoJSON(),
    }),
    style: polygonStyle,
  });
};

export const createLineLayer = () => {
  return new VectorLayer({
    source: new VectorSource({
      url: "/data/route.geojson",
      format: new GeoJSON(),
    }),
    style: lineStyle,
  });
};