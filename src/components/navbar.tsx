"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import LogoPNG from "../../public/images/Vector.jpg";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  // Construct full name from firstName and lastName
  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image src={LogoPNG} alt="Logo" width={100} height={40} />
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Image
              src={user.profileImage || "/default-profile.png"}
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-gray-800 font-medium">
              {fullName || user.email || "User"}
            </span>
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
