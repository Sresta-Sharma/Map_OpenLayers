# OpenLayers Map (React + Vite)

A simple interactive map built using OpenLayers with React and Vite.
This project demonstrates basic GIS concepts like base layer switching and vector geometries.

---

## Features

* Base map layers:

  * OpenStreetMap (Default)
  * Terrain (OpenTopoMap)

* Map Controls:

  * Zoom In / Zoom Out
  * Fullscreen

* Vector Geometries:

  * Point → Dharahara
  * Line → Boudha → Baneshwor → Patan route
  * Polygon → Kathmandu boundary

* Interactions:

  * Click on features to view popup
  * Pointer cursor on hover

---

## Tech Stack

* React (with Vite)
* TypeScript
* OpenLayers
* Tailwind CSS

---

## Project Structure

```
src/
│
├── components/
│   ├── MapBasic.tsx
│   ├── Popup.tsx
│   └── LayerSwitcher.tsx
│
├── map/
│   ├── layers.ts
│   └── styles.ts
│
public/
└── data/
    ├── kathmandu.geojson
    └── route.geojson
```

---


## Learning Outcome

This project helped understand:

* OpenLayers map setup
* Working with layers (Tile & Vector)
* Map interactions (click, hover, popup)
* Basic UI integration with Tailwind

---


