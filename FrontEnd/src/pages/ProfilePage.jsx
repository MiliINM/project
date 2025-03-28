// client/src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Card, Input, Label, Button } from "../components/ui";
import { FiUser, FiMail } from "react-icons/fi";

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  // Set initial form values when user data is available
  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [user, setValue]);
  
  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    
    try {
      await updateProfile(data);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setError(Array.isArray(error.response?.data?.message) 
        ? error.response.data.message[0] 
        : error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-zinc-900 p-6 border border-pink-500/30">
        <h2 className="text-2xl font-bold text-white mb-6 font-['Orbitron']">
          Edit Profile
        </h2>
        
        {message && (
          <div className="bg-green-500/20 border border-green-500 text-white p-3 rounded mb-4">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="username" className="text-pink-300 flex items-center gap-2">
              <FiUser /> Username
            </Label>
            <Input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="bg-zinc-800 border-pink-500/30 focus:border-pink-500 focus:ring-pink-500"
            />
            {errors.username && (
              <p className="text-pink-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <Label htmlFor="email" className="text-pink-300 flex items-center gap-2">
              <FiMail /> Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="bg-zinc-800 border-pink-500/30 focus:border-pink-500 focus:ring-pink-500"
            />
            {errors.email && (
              <p className="text-pink-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white w-full py-2"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ProfilePage;


