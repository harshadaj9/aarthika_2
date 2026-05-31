import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import BackButton from "../components/BackButton";

import {
  useLanguage,
} from "../context/LanguageContext";

import translations from "../constants/translations";

export default function LoginScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const t =
    translations[language];

  const [
    mobile,
    setMobile,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  // LOGIN

  const handleLogin =
    async () => {

      if (
        !mobile ||
        !password
      ) {

        alert(

          language === "Hindi"

            ? "सभी जानकारी भरें"

            : language === "Marathi"

            ? "सर्व माहिती भरा"

            : "Please fill all details"

        );

        return;

      }

      navigation.navigate(
        "Dashboard"
      );

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

        showsVerticalScrollIndicator={
          false
        }

      >

        {/* BACK */}

        <BackButton
          navigation={navigation}
        />

        {/* HEADER */}

        <View style={styles.header}>

          <View style={styles.logoCircle}>

            <Ionicons

              name="wallet"

              size={55}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "स्वागत है"

                : language === "Marathi"

                ? "स्वागत"

                : "Welcome Back"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने खाते में लॉगिन करें"

                : language === "Marathi"

                ? "तुमच्या खात्यात लॉगिन करा"

                : "Login to continue"

            }

          </Text>

        </View>

        {/* CARD */}

        <View style={styles.card}>

          {/* MOBILE */}

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

              style={styles.inputIcon}

            />

            <TextInput

              placeholder={

                language === "Hindi"

                  ? "मोबाइल नंबर दर्ज करें"

                  : language === "Marathi"

                  ? "मोबाइल नंबर टाका"

                  : "Enter Mobile Number"

              }

              placeholderTextColor="#888"

              style={styles.input}

              keyboardType="phone-pad"

              value={mobile}

              onChangeText={setMobile}

            />

          </View>

          {/* PASSWORD */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "पासवर्ड"

                : language === "Marathi"

                ? "पासवर्ड"

                : "Password"

            }

          </Text>

          <View style={styles.passwordContainer}>

            <Ionicons

              name="lock-closed"

              size={22}

              color="#4CAF50"

              style={styles.inputIcon}

            />

            <TextInput

              placeholder={

                language === "Hindi"

                  ? "पासवर्ड दर्ज करें"

                  : language === "Marathi"

                  ? "पासवर्ड टाका"

                  : "Enter Password"

              }

              placeholderTextColor="#888"

              style={styles.passwordInput}

              secureTextEntry={
                !showPassword
              }

              value={password}

              onChangeText={
                setPassword
              }

            />

            <TouchableOpacity

              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }

            >

              <Ionicons

                name={
                  showPassword
                    ? "eye-off"
                    : "eye"
                }

                size={24}

                color="#4CAF50"

              />

            </TouchableOpacity>

          </View>

          {/* LOGIN BUTTON */}

          <TouchableOpacity

            style={styles.button}

            onPress={
              handleLogin
            }

          >

            <Text style={styles.buttonText}>

              {

                language === "Hindi"

                  ? "लॉगिन करें"

                  : language === "Marathi"

                  ? "लॉगिन करा"

                  : "Login"

              }

            </Text>

          </TouchableOpacity>

          {/* REGISTER */}

          <TouchableOpacity

            onPress={() =>
              navigation.navigate(
                "Register"
              )
            }

          >

            <Text style={styles.registerText}>

              {

                language === "Hindi"

                  ? "नया खाता बनाएं"

                  : language === "Marathi"

                  ? "नवीन खाते तयार करा"

                  : "Create New Account"

              }

            </Text>

          </TouchableOpacity>

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
    fontSize: 36,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  subtitle: {
    color: "#AAAAAA",
    marginTop: 12,
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#DDDDDD",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#333",
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "white",
    paddingVertical: 16,
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#333",
  },

  passwordInput: {
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
    elevation: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  registerText: {
    marginTop: 24,
    textAlign: "center",
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 17,
  },

});