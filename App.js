import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";

import AsyncStorage from
"@react-native-async-storage/async-storage";

import AppNavigator from
"./navigation/AppNavigator";

import {
  LanguageProvider,
} from "./context/LanguageContext";

export default function App() {

  const [
    loggedIn,
    setLoggedIn,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // CHECK LOGIN

  useEffect(() => {

    checkLogin();

  }, []);

  const checkLogin =
    async () => {

      try {

        const value =

          await AsyncStorage.getItem(
            "isLoggedIn"
          );

        if (
          value === "true"
        ) {

          setLoggedIn(true);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // LOADING SCREEN

  if (loading) {

    return (

      <View
        style={styles.loaderContainer}
      >

        <StatusBar
          barStyle="light-content"
        />

        <ActivityIndicator
          size="large"
          color="#4CAF50"
        />

      </View>

    );

  }

  return (

    <LanguageProvider>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#121212"
      />

      <AppNavigator
        loggedIn={loggedIn}
      />

    </LanguageProvider>

  );

}

const styles = StyleSheet.create({

  loaderContainer: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#121212",

  },

});