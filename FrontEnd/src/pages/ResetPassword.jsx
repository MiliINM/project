import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest, verifyResetTokenRequest } from "../api/auth"; 

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token inválido");
      setValidatingToken(false);
      return;
    }

    const verifyToken = async () => {
      try {
        await verifyResetTokenRequest(token);
        setTokenValid(true);
      } catch (error) {
        setError("El enlace ha expirado o no es válido");
        setTokenValid(false);
      } finally {
        setValidatingToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      await resetPasswordRequest(token, data.newPassword);
      setMessage("Contraseña actualizada correctamente");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(
        error.response?.data?.message 
          ? (Array.isArray(error.response.data.message) 
              ? error.response.data.message[0] 
              : error.response.data.message)
          : error.message || "Error al restablecer la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return <div className="text-white text-center min-h-screen flex items-center justify-center">Verificando enlace...</div>;
  }

  if (!tokenValid) {
    return <div className="text-red-500 text-center min-h-screen flex items-center justify-center">El enlace ha expirado o no es válido.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-500 via-fuchsia-600 to-black">
      <div className="max-w-md w-full space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-pink-500/50 shadow-lg shadow-pink-500/20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600 cyberpunk-text glow-text tracking-wider">
            NUEVA CONTRASEÑA
          </h2>
          <p className="mt-2 text-sm text-gray-300 digital-text">
            Ingresa tu nueva contraseña
          </p>
        </div>

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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="newPassword" className="sr-only">Nueva Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="newPassword"
                  type="password"
                  {...register("newPassword", { required: true, minLength: 6 })}
                  className="metallic-input pl-10 pr-3 py-2 w-full bg-zinc-800/70 border border-pink-500/30 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Ingresa tu nueva contraseña"
                />
              </div>
              {errors.newPassword?.type === "required" && (
                <p className="mt-1 text-xs text-pink-400">Este campo es requerido</p>
              )}
              {errors.newPassword?.type === "minLength" && (
                <p className="mt-1 text-xs text-pink-400">La contraseña debe tener al menos 6 caracteres</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { 
                    required: true,
                    validate: value => value === watch('newPassword') || "Las contraseñas no coinciden"
                  })}
                  className="metallic-input pl-10 pr-3 py-2 w-full bg-zinc-800/70 border border-pink-500/30 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Confirma tu nueva contraseña"
                />
              </div>
              {errors.confirmPassword?.type === "required" && (
                <p className="mt-1 text-xs text-pink-400">Este campo es requerido</p>
              )}
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-xs text-pink-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 bg-black border border-pink-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Cargando..." : "RESTABLECER CONTRASEÑA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;


