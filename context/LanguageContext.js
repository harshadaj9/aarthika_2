import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import AsyncStorage from
"@react-native-async-storage/async-storage";

const LanguageContext =
  createContext();

export const LanguageProvider = ({
  children,
}) => {

  const [
    language,
    setLanguageState,
  ] = useState("English");

  // LOAD SAVED LANGUAGE

  useEffect(() => {

    loadLanguage();

  }, []);

  const loadLanguage =
    async () => {

      try {

        const savedLanguage =

          await AsyncStorage.getItem(
            "appLanguage"
          );

        if (savedLanguage) {

          setLanguageState(
            savedLanguage
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // SAVE LANGUAGE

  const setLanguage =
    async (selectedLanguage) => {

      try {

        setLanguageState(
          selectedLanguage
        );

        await AsyncStorage.setItem(

          "appLanguage",

          selectedLanguage

        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <LanguageContext.Provider

      value={{

        language,

        setLanguage,

      }}

    >

      {children}

    </LanguageContext.Provider>

  );

};

export const useLanguage = () =>
  useContext(LanguageContext);