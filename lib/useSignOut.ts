import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "./supabase";
import { router } from "expo-router";

export const useSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  router.push("./home")
  console.log(error);
};

export default useSignOut;
