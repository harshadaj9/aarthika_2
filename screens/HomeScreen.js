import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLanguage,
} from "../context/LanguageContext";

export default function HomeScreen({
  navigation,
}) {

  const {
    language,
    setLanguage,
  } = useLanguage();

  return (

    <SafeAreaView
      style={styles.safeContainer}
    >

      <StatusBar
        barStyle="light-content"
      />

      <View style={styles.container}>

        {/* LANGUAGE */}

        <View style={styles.languageRow}>

          <TouchableOpacity

            style={styles.languageButton}

            onPress={() =>
              setLanguage(
                "English"
              )
            }

          >

            <Text style={styles.languageText}>
              EN
            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.languageButton}

            onPress={() =>
              setLanguage(
                "Hindi"
              )
            }

          >

            <Text style={styles.languageText}>
              हिं
            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.languageButton}

            onPress={() =>
              setLanguage(
                "Marathi"
              )
            }

          >

            <Text style={styles.languageText}>
              म
            </Text>

          </TouchableOpacity>

        </View>

        {/* LOGO */}

        <View style={styles.logoContainer}>

          <View style={styles.logoCircle}>

            <Ionicons

              name="wallet"

              size={65}

              color="white"

            />

          </View>

        </View>

        {/* TITLE */}

        <Text style={styles.title}>
          Aarthika
        </Text>

        <Text style={styles.subtitle}>

          {

            language === "Hindi"

              ? "स्मार्ट वित्तीय सीखने वाला सहायक"

              : language === "Marathi"

              ? "स्मार्ट आर्थिक शिक्षण सहाय्यक"

              : "Smart Financial Learning Assistant"

          }

        </Text>

        {/* CARD */}

        <View style={styles.infoCard}>

          <View style={styles.featureRow}>

            <Ionicons
              name="wallet"
              size={24}
              color="#4CAF50"
            />

            <Text style={styles.featureText}>

              {

                language === "Hindi"

                  ? "खर्च प्रबंधन"

                  : language === "Marathi"

                  ? "खर्च व्यवस्थापन"

                  : "Expense Management"

              }

            </Text>

          </View>

          <View style={styles.featureRow}>

            <Ionicons
              name="shield-checkmark"
              size={24}
              color="#4CAF50"
            />

            <Text style={styles.featureText}>

              {

                language === "Hindi"

                  ? "सुरक्षित बैंकिंग"

                  : language === "Marathi"

                  ? "सुरक्षित बँकिंग"

                  : "Secure Banking"

              }

            </Text>

          </View>

          <View style={styles.featureRow}>

            <Ionicons
              name="analytics"
              size={24}
              color="#4CAF50"
            />

            <Text style={styles.featureText}>

              {

                language === "Hindi"

                  ? "AI वित्तीय सहायता"

                  : language === "Marathi"

                  ? "AI आर्थिक सहाय्य"

                  : "AI Financial Guidance"

              }

            </Text>

          </View>

        </View>

        {/* LOGIN BUTTON */}

        <TouchableOpacity

          style={styles.loginButton}

          onPress={() =>
            navigation.navigate(
              "Login"
            )
          }

        >

          <Text style={styles.loginText}>

            {

              language === "Hindi"

                ? "लॉगिन करें"

                : language === "Marathi"

                ? "लॉगिन करा"

                : "Login"

            }

          </Text>

        </TouchableOpacity>

        {/* REGISTER BUTTON */}

        <TouchableOpacity

          style={styles.registerButton}

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

                : "Create Account"

            }

          </Text>

        </TouchableOpacity>

      </View>

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
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  languageRow: {
    position: "absolute",
    top: 60,
    right: 20,
    flexDirection: "row",
  },

  languageButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#2E7D32",
  },

  languageText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 15,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoCircle: {
    backgroundColor: "#2E7D32",
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  title: {
    textAlign: "center",
    fontSize: 44,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 18,
    color: "#AAAAAA",
    marginBottom: 40,
    lineHeight: 28,
  },

  infoCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 25,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  featureText: {
    color: "white",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
  },

  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  registerButton: {
    borderWidth: 2,
    borderColor: "#2E7D32",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },

  registerText: {
    color: "#4CAF50",
    fontSize: 20,
    fontWeight: "bold",
  },

});