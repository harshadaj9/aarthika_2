import React from "react";

import {
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

// AUTH SCREENS

import HomeScreen from "../screens/HomeScreen";

import LoginScreen from "../screens/LoginScreen";

import RegisterScreen from "../screens/RegisterScreen";

import PhoneLoginScreen from "../screens/PhoneLoginScreen";

// MAIN SCREENS

import DashboardScreen from "../screens/DashboardScreen";

import BudgetScreen from "../screens/BudgetScreen";

import BankingScreen from "../screens/BankingScreen";

import AssistantScreen from "../screens/AssistantScreen";

import SavingsScreen from "../screens/SavingsScreen";

import ReminderScreen from "../screens/ReminderScreen";

import LearnScreen from "../screens/LearnScreen";

import FraudAlertScreen from "../screens/FraudAlertScreen";

import InsightsScreen from "../screens/InsightsScreen";

import ProfileScreen from "../screens/ProfileScreen";

const Stack =
  createNativeStackNavigator();

// DARK THEME

const MyTheme = {

  ...DarkTheme,

  colors: {

    ...DarkTheme.colors,

    background:
      "#121212",

    card: "#1E1E1E",

    text: "white",

    border: "#2A2A2A",

    primary: "#4CAF50",

  },

};

export default function AppNavigator({
  loggedIn,
}) {

  return (

    <NavigationContainer
      theme={MyTheme}
    >

      <Stack.Navigator

        initialRouteName={

          loggedIn
            ? "Dashboard"
            : "Home"

        }

        screenOptions={{

          headerShown: false,

          animation:
            "slide_from_right",

          contentStyle: {

            backgroundColor:
              "#121212",

          },

        }}

      >

        {/* HOME */}

        <Stack.Screen

          name="Home"

          component={HomeScreen}

        />

        {/* LOGIN */}

        <Stack.Screen

          name="Login"

          component={LoginScreen}

        />

        {/* REGISTER */}

        <Stack.Screen

          name="Register"

          component={RegisterScreen}

        />

        {/* OTP LOGIN */}

        <Stack.Screen

          name="PhoneLogin"

          component={
            PhoneLoginScreen
          }

        />

        {/* DASHBOARD */}

        <Stack.Screen

          name="Dashboard"

          component={BottomTabs}

        />

        {/* OTHER SCREENS */}

        <Stack.Screen

          name="Budget"

          component={BudgetScreen}

        />

        <Stack.Screen

          name="Banking"

          component={BankingScreen}

        />

        <Stack.Screen

          name="Assistant"

          component={AssistantScreen}

        />

        <Stack.Screen

          name="Savings"

          component={SavingsScreen}

        />

        <Stack.Screen

          name="Reminder"

          component={ReminderScreen}

        />

        <Stack.Screen

          name="Learn"

          component={LearnScreen}

        />

        <Stack.Screen

          name="FraudAlert"

          component={
            FraudAlertScreen
          }

        />

        <Stack.Screen

          name="Insights"

          component={InsightsScreen}

        />

        <Stack.Screen

          name="Profile"

          component={ProfileScreen}

        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}