import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GlobalContext, GlobalProvider } from "@/context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "SpectralSC-Bold": require("../assets/fonts/SpectralSC-Bold.ttf"),
    "SpectralSC-ExtraBold": require("../assets/fonts/SpectralSC-ExtraBold.ttf"),
    "SpectralSC-ExtraLight": require("../assets/fonts/SpectralSC-ExtraLight.ttf"),
    "SpectralSC-Light": require("../assets/fonts/SpectralSC-Light.ttf"),
    "SpectralSC-Medium": require("../assets/fonts/SpectralSC-Medium.ttf"),
    "SpectralSC-Regular": require("../assets/fonts/SpectralSC-Regular.ttf"),
    "SpectralSC-SemiBold": require("../assets/fonts/SpectralSC-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}
