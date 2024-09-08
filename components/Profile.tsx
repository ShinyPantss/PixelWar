import {
  FlatList,
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getPostsById } from "@/lib/supabaseFunctions";

const Profile = () => {
  const { user, isLoggedIn } = useGlobalContext();
  const needed = ["Posts", "Followers", "Events", "Win"];

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [user?.id]);

  const fetchPosts = async () => {
    if (user?.id) {
      setLoading(true);
      const { data, error } = await getPostsById(user.id);
      if (error) {
        setError("Failed to fetch posts");
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const renderPost = ({ item }: { item: any }) => (
    <View className=" w-full  ">
      <TouchableOpacity>
        <Text className="text-white font-psemibold">{item.prompt}</Text>
        <Image
          source={{ uri: item.image_url }}
          className="w-full h-64 rounded-lg border-2 border-white"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  if (error) {
    return <Text className="text-white text-center">{error}</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPost}
      contentContainerStyle={{ gap: 20 }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <Text className="text-white text-center">No posts available</Text>
      }
      getItemLayout={(data, index) => ({
        length: 80,
        offset: 80 * index,
        index,
      })}
      ListHeaderComponent={
        <View className="justify-center items-center space-y-1">
          <View className="w-full items-center justify-center gap-2">
            <Image
              source={require("../assets/images/OnboardingPhoto.webp")}
              className="h-20 w-20 rounded-lg border-2 border-white"
              resizeMode="cover"
            />
            <Text className="text-white text-lg font-psemibold">
              {user?.email}
            </Text>
          </View>

          <View className="flex-row gap-x-5 pt-4">
            {needed.map((item, index) => (
              <View
                key={index}
                className="flex-col justify-center items-center"
              >
                <Text className="text-white text-xl font-pregular">
                  {item === "Posts" ? posts.length : 21}
                </Text>
                <Text className="text-white text-lg font-pregular">{item}</Text>
              </View>
            ))}
          </View>
          <View className="w-full h-1 bg-white" />
          <Text className="text-2xl font-pbold text-white pt-6"> My Posts</Text>
        </View>
      }
    />
  );
};

export default Profile;
