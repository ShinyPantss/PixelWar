import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const SearchPage = () => {
  const {query} = useLocalSearchParams();

  return (
    <View>
      <Text>{query}</Text>
    </View>
  );
};

export default SearchPage;
