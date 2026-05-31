import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../firebase/firebaseConfig";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { useLanguage } from "../context/LanguageContext";

import BackButton from "../components/BackButton";

export default function PhoneLoginScreen({
  navigation,
}) {

  const { language } = useLanguage();

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [confirmation, setConfirmation] =
    useState(null);

  // SEND OTP

  const sendOTP = async () => {

    try {

      if (!phoneNumber) {

        alert(
          language === "Hindi"
            ? "मोबाइल नंबर दर्ज करें"
            : language === "Marathi"
            ? "मोबाइल नंबर टाका"
            : "Enter Mobile Number"
        );

        return;

      }

      if (!window.recaptchaVerifier) {

        window.recaptchaVerifier =
          new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
            }
          );

      }

      const appVerifier =
        window.recaptchaVerifier;

      const confirmationResult =
        await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );

      setConfirmation(
        confirmationResult
      );

      alert(
        language === "Hindi"
          ? "OTP भेजा गया"
          : language === "Marathi"
          ? "OTP पाठवला"
          : "OTP Sent Successfully"
      );

    } catch (error) {

      console.log(error);

      alert(error.message);

    }

  };

  // VERIFY OTP

  const verifyOTP = async () => {

    try {

      if (!confirmation) {

        alert(
          language === "Hindi"
            ? "पहले OTP भेजें"
            : language === "Marathi"
            ? "प्रथम OTP पाठवा"
            : "Please send OTP first"
        );

        return;

      }

      await confirmation.confirm(
        otp
      );

      const userPhone =
        phoneNumber.trim();

      // SAVE LOGIN STATE

      await AsyncStorage.setItem(
        "isLoggedIn",
        "true"
      );

      await AsyncStorage.setItem(
        "currentUser",
        userPhone
      );

      // VERIFY STORAGE

      const savedUser =
        await AsyncStorage.getItem(
          "currentUser"
        );

      console.log(
        "SAVED USER:",
        savedUser
      );

      alert(
        language === "Hindi"
          ? "लॉगिन सफल"
          : language === "Marathi"
          ? "लॉगिन यशस्वी"
          : "Login Successful"
      );

      navigation.replace(
        "Dashboard"
      );

    } catch (error) {

      console.log(error);

      alert(
        language === "Hindi"
          ? "अमान्य OTP"
          : language === "Marathi"
          ? "अवैध OTP"
          : "Invalid OTP"
      );

    }

  };

  return (

    <SafeAreaView
      style={styles.safeContainer}
    >

      <StatusBar
        barStyle="light-content"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <BackButton
          navigation={navigation}
        />

        <View style={styles.header}>

          <View style={styles.logoCircle}>

            <Ionicons
              name="phone-portrait"
              size={50}
              color="white"
            />

          </View>

          <Text style={styles.title}>

            {
              language === "Hindi"
                ? "मोबाइल लॉगिन"
                : language === "Marathi"
                ? "मोबाइल लॉगिन"
                : "Mobile Login"
            }

          </Text>

          <Text style={styles.subtitle}>

            {
              language === "Hindi"
                ? "OTP द्वारा सुरक्षित लॉगिन"
                : language === "Marathi"
                ? "OTP द्वारे सुरक्षित लॉगिन"
                : "Secure Login Using OTP"
            }

          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>

            {
              language === "Hindi"
                ? "मोबाइल नंबर"
                : language === "Marathi"
                ? "मोबाइल नंबर"
                : "Mobile Number"
            }

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="call"
              size={22}
              color="#4CAF50"
              style={styles.icon}
            />

            <TextInput
              placeholder="+91XXXXXXXXXX"
              placeholderTextColor="#888"
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={sendOTP}
          >

            <Text style={styles.buttonText}>

              {
                language === "Hindi"
                  ? "OTP भेजें"
                  : language === "Marathi"
                  ? "OTP पाठवा"
                  : "Send OTP"
              }

            </Text>

          </TouchableOpacity>

          <Text style={styles.label}>
            OTP
          </Text>

          <View style={styles.inputContainer}>

            <Ionicons
              name="key"
              size={22}
              color="#4CAF50"
              style={styles.icon}
            />

            <TextInput
              placeholder={
                language === "Hindi"
                  ? "OTP दर्ज करें"
                  : language === "Marathi"
                  ? "OTP टाका"
                  : "Enter OTP"
              }
              placeholderTextColor="#888"
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
            />

          </View>

          <TouchableOpacity
            style={styles.verifyButton}
            onPress={verifyOTP}
          >

            <Text style={styles.buttonText}>

              {
                language === "Hindi"
                  ? "सत्यापित करें"
                  : language === "Marathi"
                  ? "पडताळा"
                  : "Verify OTP"
              }

            </Text>

          </TouchableOpacity>

          <View
            id="recaptcha-container"
            style={{ marginTop: 20 }}
          />

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },

  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 35,
  },

  logoCircle: {
    backgroundColor: "#2E7D32",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  subtitle: {
    color: "#AAAAAA",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    marginBottom: 50,
  },

  label: {
    color: "#DDDDDD",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "white",
    paddingVertical: 16,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 25,
  },

  verifyButton: {
    backgroundColor: "#1976D2",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});