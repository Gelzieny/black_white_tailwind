import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "./context";


type GitHubUser = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
};

export function Hero() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch("https://api.github.com/users/gelzieny")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return null;
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="max-w-7xl mx-auto text-center">
        <img src={user.avatar_url} alt="Avatar" className="w-30 h-30 rounded-full mx-auto mb-1" />

        <h3 className="text-2xl sm:text-3xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            {user.name}
          </span>
        </h3> 
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
        {user.bio}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <span className="text-gray-800 dark:text-gray-200">👥 {user.followers} seguidores</span>
          <span className="text-gray-800 dark:text-gray-200">📁 {user.public_repos} repositórios</span>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden ">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl
            opacity-70 dark:opacity-30 dark:bg-purple-600"/>

          <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl
            opacity-70 dark:opacity-30 dark:bg-blue-600"/>
          
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl
            opacity-70 dark:opacity-30 dark:bg-indigo-600"/>
        </div>
      </div>
    </section>
  )
} 