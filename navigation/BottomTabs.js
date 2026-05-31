import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLanguage,
} from "../context/LanguageContext";

import translations from "../constants/translations";

// SCREENS

import DashboardScreen from "../screens/DashboardScreen";
import BudgetScreen from "../screens/BudgetScreen";
import AssistantScreen from "../screens/AssistantScreen";
import LearnScreen from "../screens/LearnScreen";
import FraudAlertScreen from "../screens/FraudAlertScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab =
  createBottomTabNavigator();

export default function BottomTabs() {

  const { language } =
    useLanguage();

  const t =
    translations[language];

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor:
          "#4CAF50",

        tabBarInactiveTintColor:
          "#888",

        tabBarStyle: {

          position: "absolute",

          backgroundColor:
            "#1E1E1E",

          borderTopWidth: 0,

          elevation: 0,

          height: 82,

          paddingBottom: 12,

          paddingTop: 12,

          borderTopLeftRadius: 28,

          borderTopRightRadius: 28,

        },

        tabBarLabelStyle: {

          fontSize: 12,

          fontWeight: "bold",

          marginTop: 4,

        },

        tabBarIcon: ({
          color,
          size,
        }) => {

          let iconName =
            "home";

          if (
            route.name === t.budgetTracker
          ) {

            iconName =
              "wallet";

          } else if (
            route.name === t.aiAssistant
          ) {

            iconName =
              "chatbubble-ellipses";

          } else if (
            route.name === "Learn" ||
            route.name === "सीखें" ||
            route.name === "शिका"
          ) {

            iconName =
              "book";

          } else if (
            route.name === "Fraud" ||
            route.name === "धोखाधड़ी" ||
            route.name === "फसवणूक"
          ) {

            iconName =
              "warning";

          } else if (
            route.name === "Profile" ||
            route.name === "प्रोफाइल"
          ) {

            iconName =
              "person";

          }

          return (

            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />

          );

        },

      })}

    >

      {/* HOME */}

      <Tab.Screen

        name={
          language === "Hindi"
            ? "होम"
            : language === "Marathi"
            ? "मुख्य"
            : "Home"
        }

        component={
          DashboardScreen
        }

      />

      {/* BUDGET */}

      <Tab.Screen

        name={
          t.budgetTracker
        }

        component={
          BudgetScreen
        }

      />

      {/* AI */}

      <Tab.Screen

        name={
          t.aiAssistant
        }

        component={
          AssistantScreen
        }

      />

      {/* LEARN */}

      <Tab.Screen

        name={
          language === "Hindi"
            ? "सीखें"
            : language === "Marathi"
            ? "शिका"
            : "Learn"
        }

        component={
          LearnScreen
        }

      />

      {/* FRAUD */}

      <Tab.Screen

        name={
          language === "Hindi"
            ? "धोखाधड़ी"
            : language === "Marathi"
            ? "फसवणूक"
            : "Fraud"
        }

        component={
          FraudAlertScreen
        }

      />

      {/* PROFILE */}

      <Tab.Screen

        name={
          language === "Hindi"
            ? "प्रोफाइल"
            : language === "Marathi"
            ? "प्रोफाइल"
            : "Profile"
        }

        component={
          ProfileScreen
        }

      />

    </Tab.Navigator>

  );

}