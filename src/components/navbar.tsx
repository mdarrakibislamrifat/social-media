"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import LogoPNG from "../../public/images/Vector.jpg";
import { AppDispatch, logoutWithPersistence, RootState } from "@/store";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isClient, setIsClient] = useState(false);

  const handleLogout = () => {
    dispatch(logoutWithPersistence());
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const fullName = user?.displayName || user?.email || "User";
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image src={LogoPNG} alt="Logo" width={100} height={40} />
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Image
              src={user.photoURL || "/default-profile.png"}
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-gray-800 font-medium">{fullName}</span>
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="text-black font-bold hover:cursor-pointer hover:text-blue-800"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
