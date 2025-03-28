import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../api/auth'; 

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

 // En la función onSubmit
const onSubmit = async (data) => {
  setLoading(true);
  setMessage('');
  setError('');
  try {
    const res = await forgotPasswordRequest(data.email);
    setMessage(Array.isArray(res.data.message) ? res.data.message[0] : res.data.message);
  } catch (error) {
    setError(
      Array.isArray(error.response?.data?.message) 
        ? error.response?.data?.message[0] 
        : (error.response?.data?.message || 'Error al solicitar recuperación de contraseña')
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="circuit-lines"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-pink-500/50 shadow-lg shadow-pink-500/20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600 cyberpunk-text glow-text tracking-wider">
            RECUPERAR CONTRASEÑA
          </h2>
          <p className="mt-2 text-sm text-gray-300 digital-text">
            Ingresa tu correo electrónico para recuperar tu contraseña
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white p-2 rounded text-center">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-500/20 border border-green-500 text-white p-2 rounded text-center">
              {message}
            </div>
          )}

          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Correo Electrónico</label>
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
                  className="metallic-input pl-10 pr-3 py-2 w-full bg-zinc-800/70 border border-pink-500/30 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-pink-400">Este campo es requerido</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 bg-black border border-pink-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 overflow-hidden hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300 neon-button ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span className="relative tracking-widest text-lg">{loading ? "Enviando..." : "ENVIAR"}</span>
            </button>
          </div>
        </form>

        <p className="flex justify-between items-center text-sm text-gray-300 mt-4">
          <Link to="/login" className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
            ¿Recordaste tu contraseña?
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;
