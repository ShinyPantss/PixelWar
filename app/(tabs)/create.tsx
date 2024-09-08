import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { supabase } from "@/lib/supabase";

const CreatePage = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const { user, isLoggedIn } = useGlobalContext();

  const generateImage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json(); // Parse response as JSON

      if (data) {
        setImage(data[0]);

        if (user?.id) {
          const { error } = await supabase.from("images").insert({
            image_url: data[0], // The generated image URL
            prompt: prompt,
            userId: user?.id, // The prompt used to generate the image
          });

          if (error) {
            console.error("Supabase Insert Error:", error.message);
          } else {
            console.log("Image uploaded successfully");
          }
        } else {
          console.error("User ID is missing");
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  useAuthRedirect("/(tabs)/profile");
  return (
    <SafeAreaView className="bg-primary h-full text-white">
      <ScrollView className="space-y-8 p-6">
        <View>
          <Text className="text-white font-psemibold text-2xl">
            Create Image
          </Text>
        </View>
        <View>
          <Text className="text-xl text-white font-pmedium">Prompt</Text>
          <View className="w-full h-32 px-4 bg-input rounded-2xl mt-4">
            <TextInput
              className="text-base flex-1 bg-input text-white font-pregular"
              keyboardAppearance="default"
              keyboardType="default"
              onChangeText={(text) => setPrompt(text)}
              multiline={true} // Allows text to automatically wrap to next line
              textAlignVertical="top" // Ensures text starts from the top
              placeholder="Enter Your Prompt..."
              placeholderTextColor={"#7b7b8b"} // Correct color format
              value={prompt} // Binds the input value to the state
            />
          </View>
          <View className="h-full items-end align-bottom justify-end -mb-10">
            <CustomButton onPress={generateImage} title={"Generate Image"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePage;
