export default function LayerSwitcher({ osmRef, topoRef }: any) {
  return (
    <div className="absolute top-4 left-4 z-10">
      <select
        onChange={(e) => {
          const isOSM = e.target.value === "osm";
          osmRef.current?.setVisible(isOSM);
          topoRef.current?.setVisible(!isOSM);
        }}
        className="bg-white/90 border border-gray-200 text-sm rounded-lg shadow-md px-3 py-2 cursor-pointer"
      >
        <option value="osm">Map</option>
        <option value="topo">Terrain</option>
      </select>
    </div>
  );
}