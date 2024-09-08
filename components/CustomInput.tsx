import {
  Alert,
  Image,
  ImageSourcePropType,
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import icons from "@/constants/icons";

type CustomInputType = {
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  icons?: ImageSourcePropType;
  containerStyle?: string;
  label?: string;
  labelStyle?: string;
  keyboardType?: KeyboardTypeOptions;
  visible?: boolean;
};

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  icons,
  containerStyle,
  label,
  labelStyle,
  keyboardType,
  visible,
}: CustomInputType) => {
  const pathname = usePathname();

  const handleSearch = () => {
    if (!value) {
      Alert.alert("ERROR", "Please enter a your dream photo");
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query: value });
    } else {
      router.push(`/search/${value}`);
    }
  };

  return (
    <View className="flex-col">
      {label && (
        <Text className={`${labelStyle} text-white text-lg font-pmedium ml-2`}>
          {label}
        </Text>
      )}
      <View
        className={`w-full h-16 border px-4 bg-input rounded-2xl border-black-100 focus:border-secondary-100 flex flex-row items-center mx-auto overflow-hidden ${containerStyle}`}
      >
        <TextInput
          secureTextEntry={visible}
          className="text-base mt-0.5 w-full h-full text-gray-50 flex-1"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={"#CDCDE0"}
          keyboardType={keyboardType || "default"}
          autoCapitalize="none"
        />
        {icons && (
          <TouchableOpacity onPress={handleSearch}>
            <Image source={icons} className="h-6 w-6 px" resizeMode="cover" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
