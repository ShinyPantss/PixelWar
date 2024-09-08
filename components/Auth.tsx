import React, { useState } from "react";
import { Alert, View, AppState, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import CustomInput from "./CustomInput";
import { Link, router } from "expo-router";
import CustomButton from "./CustomButton";
import { signUp, signInWithEmail, getCurrentUser } from "@/lib/supabaseFunctions";
import { useGlobalContext } from "@/context/GlobalProvider";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const route = useRoute();
  const isSignIn = route.name === "sign-in";

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const submit = async () => {
    try {
      if (isSignIn) {
        await signInWithEmail(email, password);
        const currentUser = await getCurrentUser();
        console.log("calistim");
        if (currentUser) {
          setUser(currentUser);
          setIsLoggedIn(true);

          router.push("/(tabs)/home");
        }
      } else {
        const currentUser = await signUp(email, password, username);

        if (!currentUser.error) {
          setUser(currentUser.user);
          setIsLoggedIn(true);
          router.push("/(tabs)/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="gap-4">
      <View className="h-fit">
        {!isSignIn && (
          <CustomInput
            label="username"
            placeholder="Your username"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
            visible={false}
          />
        )}
        <CustomInput
          label="Email"
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          visible={false}
        />
        <CustomInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          visible={true}
        />
      </View>

      <View>
        <CustomButton
          onPress={submit}
          title={isSignIn ? "Sign In" : "Sign Up"}
        />
      </View>

      <View>
        {isSignIn ? (
          <Link href={"../(auth)/sign-up"} className="text-white text-lg">
            {" "}
            You don't have account ? Create One!!
          </Link>
        ) : (
          <Link href={"../(auth)/sign-in"}> You already have account? Sign In</Link>
        )}
      </View>
    </View>
  );
}
