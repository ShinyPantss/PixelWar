import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Account from "@/components/Account";
import { getCurrentUser, signOut } from "@/lib/supabaseFunctions";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { supabase } from "@/lib/supabase";
import useSignOut from "@/lib/useSignOut";
import { User } from "@supabase/supabase-js";
import { useGlobalContext } from "@/context/GlobalProvider";
import Profile from "@/components/Profile";
import { Image } from "react-native";
import icons from "@/constants/icons";

const ProfilePage = () => {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();

  const onPress = async () => {
    try {
      await signOut(setUser, setIsLoggedIn);
      router.push("/(tabs)/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary   ">
      {isLoggedIn ? (
        <View className="p-8 ">
          <TouchableOpacity onPress={onPress} className="w-full justify-end items-end">
            <Image source={icons.logout} className="h-6 w-6 text-white"/>
          </TouchableOpacity>

          <Profile />
        </View>
      ) : (
        <View className="h-full bg-primary text-white p-8">
          <Text className="text-white text-xl font-pmedium">
            You are not logged in.
            {"   "}
            Please log in to use wonderful features and compete with others.
          </Text>
          <View className="h-full mt-10">
            <CustomButton
              title="Sign In"
              onPress={async () => router.push("/(auth)/sign-in")}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilePage;
