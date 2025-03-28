// client/src/components/ui/Button.jsx
import { forwardRef } from "react";

export const Button = forwardRef((props, ref) => (
  <button
    {...props}
    ref={ref}
    className={`bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center justify-center ${props.className || ""}`}
  >
    {props.children}
  </button>
));


