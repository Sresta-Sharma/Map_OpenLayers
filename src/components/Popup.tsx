import { forwardRef } from "react";

const Popup = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="absolute hidden">
      <div className="relative bg-white rounded-xl shadow-xl px-5 py-3 min-w-[160px] border border-gray-100">

        <button
          id="popup-close"
          className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>

        <div id="popup-content" className="font-semibold text-gray-800 text-sm"></div>
      </div>
    </div>
  );
});

export default Popup;