import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";

export const pointStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({ color: "#ef4444" }),
    stroke: new Stroke({ color: "#fff", width: 3 }),
  }),
});

export const polygonStyle = new Style({
  fill: new Fill({ color: "rgba(34, 197, 94, 0.3)" }),
  stroke: new Stroke({ color: "#15803d", width: 3 }),
});

export const lineStyle = new Style({
  stroke: new Stroke({
    color: "#1d4ed8",
    width: 4,
    lineDash: [6, 6],
    lineCap: "round",
  }),
});