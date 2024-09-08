import { View, Text, Image } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import CustomButton from "@/components/CustomButton";
import icons from "constants/icons";

type TabBarIconProps = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabBarIconProps) => {
  const isEventTab = name === "Event";

  return (
    <View
      className={`justify-center items-center gap-2  ${
        isEventTab ? "mb-5 text-lg" : ""
      }`}
    >
      <Image
        source={icon}
        resizeMode="contain"
        className={isEventTab ? "w-10 h-10" : "w-6 h-6 "}
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold " : "font-pregular"} ${
          isEventTab ? "text-sm font-pbold" : "text-xs"
        }`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {

    // TODO : border fix
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",

          tabBarStyle: {
            position: "relative",
            backgroundColor: "#222222",
            borderTopWidth: 3,
            borderTopColor: "#222222",
            height: 100,
            paddingBottom:0
            
            
            
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            title: "Create",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="event"
          options={{
            headerShown: false,
            title: "Event",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.cup}
                color={color}
                name="Event"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            headerShown: false,
            title: "Bookmark",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
