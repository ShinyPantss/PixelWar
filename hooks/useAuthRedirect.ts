import { useFocusEffect } from "@react-navigation/native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Href, router } from "expo-router";
import { useCallback } from "react";

const useAuthRedirect = (href: Href) => {
  const { user, isLoggedIn } = useGlobalContext();

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn || !user) {
        router.push(href);
      }
    }, [isLoggedIn, user])
  );
};

export default useAuthRedirect;
