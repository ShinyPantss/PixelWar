import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Auth from "@/components/Auth";

const SignIn = () => {
  return (
    <SafeAreaView className="w-full h-full bg-primary ">
      <View className="w-full h-full  p-4 ">
        <Auth />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
