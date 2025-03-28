// client/src/components/ui/ButtonLink.jsx
import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children, className, ...props }) => (
  <Link 
    to={to} 
    className={`bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center justify-center ${className || ""}`}
    {...props}
  >
    {children}
  </Link>
);

