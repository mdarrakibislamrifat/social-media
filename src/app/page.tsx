"use client";
import Navbar from "@/components/navbar";
import { getInitialUser, setUser } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userFromLocalStorage = getInitialUser();
    if (userFromLocalStorage) {
      dispatch(setUser(userFromLocalStorage));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
    </div>
  );
}
