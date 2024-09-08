import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const OnBoardingPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="min-h-[85px]   justify-center w-full items-center space-y-5 mt-10 px-4">
          <Text className=" text-4xl font-psemibold  text-white ">
            PixelWar
          </Text>
          <Image
            source={require("../assets/images/OnboardingPhoto.webp")}
            className="h-80 mt-10"
            resizeMode="contain"
          />
          <View className="text-center w-full">
            <Text className="text-3xl text-white  font-psemibold  text-center">
              Create, compete, and win with{" "}
              <Text className="text-secondary ">AI visuals!</Text>
            </Text>
            <Text className="text-white font-pregular text-center ">
              Let AI speak, you create the art! It's time to clash!
            </Text>
          </View>
          <CustomButton
            title="Continue to Home Page"
            onPress={async () => router.push("/(tabs)/home")}
            containerStyle="mt-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoardingPage;
