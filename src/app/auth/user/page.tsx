'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import userData from "../../../data/liftuser_credentials.json";

export default function LiftUserAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const userExists = userData.users.some(
        (user) => user.username === username && user.password === password
      );
      if (userExists) {
        router.push("/roles/liftuser"); // redirect to lift user dashboard
      } else {
        setError("Invalid username or password");
      }
    } else {
      alert("Signup successful! Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">
        {isLogin ? "Lift User Login" : "Lift User Signup"}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
          required
        />
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 p-2 rounded text-white"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-teal-400 cursor-pointer hover:underline"
      >
        {isLogin ? "New here? Signup" : "Already have an account? Login"}
      </p>
    </div>
  );
}
