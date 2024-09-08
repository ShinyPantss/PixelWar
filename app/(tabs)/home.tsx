import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/CustomInput";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";

const HomePage = () => {
  const [username, setUsername] = useState(null);
  const [title, setTitle] = useState("lorem lorem lorem");
  const [postId, setPostId] = useState("1");
  // TODO :  user get from auth database
  const { user, isLoggedIn } = useGlobalContext();



  const detailRouteFunction = () => {
    router.push(`/detailed/${postId}`);
  };
  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={[{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={detailRouteFunction}>
            <View className=" w-full items-center">
              <View className="bg-primary rounded-lg p-6 mb-4 w-full mt-auto justify-center ">
                <View className=" flex-row space-x-4 mb-2">
                  <Image
                    className="border-white border h-full w-12 rounded-lg overflow-hidden "
                    source={require("../../assets/images/OnboardingPhoto.webp")}
                    resizeMode="contain"
                  />
                  <View className="w-10/12 ">
                    <Text
                      className="text-lg text-white font-psemibold w-full"
                      numberOfLines={1}
                    >
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Ducimus vel quam saepe.
                    </Text>
                    <Text className="text-sm  text-white font-pmedium">
                      Author
                    </Text>
                  </View>
                </View>

                <Image
                  source={require("../../assets/images/OnboardingPhoto.webp")}
                  className="h-52 w-full rounded-lg"
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => {
          return (
            <View className="mb-4 p-4">
              <View className="h-32 justify-center items-center space-y-1">
                <Text className="text-gray-200 font-pmedium text-lg">
                  Welcome Back
                </Text>
                {/* TODO :  user get from auth database */}
                <Text className="text-white font-psemibold text-xl">
                  {user?.user_metadata.username}
                </Text>
              </View>
              <SearchInput
                onChangeText={(text) => setTitle(text)}
                placeholder="Find your dream photo"
                icons={require("../../assets/icons/search.png")}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomePage;
