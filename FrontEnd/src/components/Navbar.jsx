// client/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { RiRobotLine } from "react-icons/ri";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-900 my-3 flex justify-between items-center py-5 px-10 rounded-lg border border-pink-500/30">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <div className="flex items-center gap-2">
          <RiRobotLine className="text-pink-500 text-3xl" />
          <h1 className="text-2xl font-bold text-white font-['Orbitron']">
            <span className="text-pink-500">MERN</span> Tasks
          </h1>
        </div>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="hidden md:block">
              <span className="text-pink-300 font-['Share_Tech_Mono'] mr-4">
                System User: {user.username}
              </span>
            </li>
            <li>
              <Link to="/tasks" className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1 rounded-md text-white">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="/add-task" className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1 rounded-md text-white">
                Add Task
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                onClick={() => logout()}
                className="bg-pink-600 hover:bg-pink-700 px-4 py-1 rounded-md text-white"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1 rounded-md text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="bg-pink-600 hover:bg-pink-700 px-4 py-1 rounded-md text-white">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
