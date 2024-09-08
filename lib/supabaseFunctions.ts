import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";
import { useGlobalContext } from "@/context/GlobalProvider";

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
  }
  return data.user;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error signing in:", error);
  }
  return data.user;
};

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (error) {
    console.error("Error signing up:", error);
    return { error }; // Return the error to handle it properly
  } else {
    return { user: data.user }; // Return the user object if successful
  }
};

export const signOut = async (setUser: Function, setIsLoggedIn: Function) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
  setUser(null);
  setIsLoggedIn(false);
};

export const getPostsById = async (userId: string) => {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("userId", userId);

  return { data, error };
};
