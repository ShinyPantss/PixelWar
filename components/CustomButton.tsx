import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type CustomButtomType = {
  title: string;
  onPress: (...args : any[]) => Promise<void>;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
};
const CustomButton = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  isLoading,
}: CustomButtomType) => {
  return (
    <TouchableOpacity
      className={`bg-secondary  w-full rounded-xl min-h-[62px] justify-center items-center ${containerStyle}  ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary text-lg font-psemibold ${textStyle}  `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
