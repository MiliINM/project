// client/src/components/TaskManager.jsx
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { FiPlus, FiList, FiUser } from "react-icons/fi";
import { RiRobotLine } from "react-icons/ri";

export function TaskManager({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="task-manager-container">
      {/* Welcome Header with Robot Theme */}
      <div className="welcome-panel bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 
                      rounded-lg shadow-lg mb-6 p-6 border border-pink-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20">
          <RiRobotLine className="text-9xl text-white" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 font-['Orbitron']">
            Welcome to Your Command Center
          </h1>
          <p className="text-white/90 text-lg font-['Share_Tech_Mono'] mb-4">
            <span className="bg-black/30 px-2 py-1 rounded">User: {user?.username}</span>
          </p>
          <div className="user-stats flex gap-3 text-sm">
            <div className="stat bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
              <span className="font-bold">Status:</span> Online
            </div>
            <div className="stat bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
              <span className="font-bold">Access Level:</span> Authorized
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Panel */}
      <div className="navigation-panel grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Link to="/tasks" className="nav-card bg-zinc-800 hover:bg-zinc-700 border-l-4 border-pink-500 
                                    rounded-lg p-5 flex items-center transition-all duration-300 
                                    shadow-md hover:shadow-pink-500/20">
          <div className="icon-container bg-pink-500/20 p-3 rounded-full mr-4">
            <FiList className="text-2xl text-pink-400" />
          </div>
          <div>
            <h3 className="text-white font-bold">My Tasks</h3>
            <p className="text-gray-400 text-sm">View and manage tasks</p>
          </div>
        </Link>

        <Link to="/add-task" className="nav-card bg-zinc-800 hover:bg-zinc-700 border-l-4 border-pink-500 
                                      rounded-lg p-5 flex items-center transition-all duration-300 
                                      shadow-md hover:shadow-pink-500/20">
          <div className="icon-container bg-pink-500/20 p-3 rounded-full mr-4">
            <FiPlus className="text-2xl text-pink-400" />
          </div>
          <div>
            <h3 className="text-white font-bold">Add Task</h3>
            <p className="text-gray-400 text-sm">Create a new task</p>
          </div>
        </Link>

        <Link to="/profile" className="nav-card bg-zinc-800 hover:bg-zinc-700 border-l-4 border-pink-500 
                                     rounded-lg p-5 flex items-center transition-all duration-300 
                                     shadow-md hover:shadow-pink-500/20">
          <div className="icon-container bg-pink-500/20 p-3 rounded-full mr-4">
            <FiUser className="text-2xl text-pink-400" />
          </div>
          <div>
            <h3 className="text-white font-bold">Profile</h3>
            <p className="text-gray-400 text-sm">Manage your account</p>
          </div>
        </Link>

        <button onClick={logout} className="nav-card bg-zinc-800 hover:bg-zinc-700 border-l-4 border-pink-500 
                                          rounded-lg p-5 flex items-center transition-all duration-300 
                                          shadow-md hover:shadow-pink-500/20">
          <div className="icon-container bg-pink-500/20 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-2xl text-pink-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold">Logout</h3>
            <p className="text-gray-400 text-sm">End your session</p>
          </div>
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-pink-500/30 shadow-lg">
        <div className="content-header mb-6 border-b border-pink-500/20 pb-4">
          <h2 className="text-2xl font-['Orbitron'] text-white">
            Task Control Panel
          </h2>
          <p className="text-gray-400 text-sm">
            Manage your tasks efficiently with our advanced system
          </p>
        </div>
        
        {/* This is where the children (task content) will be rendered */}
        <div className="task-content">
          {children}
        </div>
      </div>

      {/* Add some circuit-like decorative elements */}
      <div className="circuit-decoration absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-10">
        <div className="circuit-line absolute top-20 left-10 w-[200px] h-[1px] bg-pink-500"></div>
        <div className="circuit-line absolute top-20 left-10 w-[1px] h-[100px] bg-pink-500"></div>
        <div className="circuit-dot absolute top-20 left-10 w-2 h-2 rounded-full bg-pink-500"></div>
        
        <div className="circuit-line absolute bottom-40 right-20 w-[150px] h-[1px] bg-pink-500"></div>
        <div className="circuit-line absolute bottom-40 right-20 w-[1px] h-[80px] bg-pink-500"></div>
        <div className="circuit-dot absolute bottom-40 right-20 w-2 h-2 rounded-full bg-pink-500"></div>
      </div>
    </div>
  );
}
