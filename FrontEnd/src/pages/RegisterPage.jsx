import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';

function RegisterPage() {
  const { signup, errors: authErrors } = useAuth();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (values) => {
    try {
      await signup(values);
      // No necesitas navegar aquí, el contexto de autenticación se encargará de eso
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrarse');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="circuit-lines"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10 
                      bg-black/40 backdrop-blur-sm p-8 rounded-lg 
                      border border-pink-500/50 shadow-lg shadow-pink-500/20">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600 
                         cyberpunk-text glow-text tracking-wider">
            REGÍSTRATE
          </h2>
          <p className="mt-2 text-sm text-gray-300 digital-text">
            ¿Ya tienes cuenta? <Link to="/login" className="font-medium text-pink-400 hover:text-pink-300 transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white p-2 rounded text-center">
              {error}
            </div>
          )}
          
          {authErrors && authErrors.length > 0 && (
            <div className="bg-red-500/20 border border-red-500 text-white p-2 rounded text-center">
              {Array.isArray(authErrors) 
                ? authErrors.map((err, i) => <p key={i}>{err}</p>) 
                : authErrors}
            </div>
          )}
          
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Nombre de usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  {...register("username", { required: true })}
                  className="metallic-input pl-10 pr-3 py-2 w-full bg-zinc-800/70 border border-pink-500/30 
                           text-white placeholder-gray-400 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-pink-500 focus:border-transparent
                           transition-all duration-300"
                  placeholder="Nombre de usuario"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-pink-400">Este campo es requerido</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="metallic-input pl-10 pr-3 py-2 w-full bg-zinc-800/70 border border-pink-500/30 
                           text-white placeholder-gray-400 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-pink-500 focus:border-transparent
                           transition-all duration-300"
                  placeholder="Correo electrónico"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-pink-400">Este campo es requerido</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  className="metallic-input pl-10 pr-3 py-2 w-full bg-zinc-800/70 border border-pink-500/30 
                           text-white placeholder-gray-400 rounded-md focus:outline-none 
                           focus:ring-2 focus:ring-pink-500 focus:border-transparent
                           transition-all duration-300"
                  placeholder="Contraseña"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-pink-400">Este campo es requerido</p>
              )}
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 
                       bg-black border border-pink-500 text-white font-bold
                       rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-pink-500 overflow-hidden
                       hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]
                       transition-all duration-300 neon-button"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 opacity-0 
                             group-hover:opacity-20 transition-opacity"></span>
              <span className="relative tracking-widest text-lg">CREAR CUENTA</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;