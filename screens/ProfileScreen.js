import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLanguage,
} from "../context/LanguageContext";

import BackButton from "../components/BackButton";

export default function ProfileScreen({
  navigation,
}) {

  const {
    language,
    setLanguage,
  } = useLanguage();

  // LOGOUT

  const logout =
    async () => {

      await AsyncStorage.removeItem(
        "isLoggedIn"
      );

      navigation.replace(
        "Home"
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

          <View style={styles.profileCircle}>

            <Ionicons

              name="person"

              size={70}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "प्रोफाइल"

                : language === "Marathi"

                ? "प्रोफाइल"

                : "Profile"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "आपकी वित्तीय प्रोफ़ाइल"

                : language === "Marathi"

                ? "तुमची आर्थिक प्रोफाइल"

                : "Your Financial Profile"

            }

          </Text>

        </View>

        {/* USER CARD */}

        <View style={styles.profileCard}>

          <Ionicons

            name="person-circle"

            size={110}

            color="#4CAF50"

          />

          <Text style={styles.userName}>
            Aarthika User
          </Text>

          <Text style={styles.userSubtitle}>

            {

              language === "Hindi"

                ? "स्मार्ट वित्तीय शिक्षार्थी"

                : language === "Marathi"

                ? "स्मार्ट आर्थिक शिकणारा"

                : "Smart Financial Learner"

            }

          </Text>

        </View>

        {/* LANGUAGE SECTION */}

        <View style={styles.sectionCard}>

          <View style={styles.sectionHeader}>

            <Ionicons

              name="language"

              size={24}

              color="#4CAF50"

            />

            <Text style={styles.sectionTitle}>

              {

                language === "Hindi"

                  ? "भाषा"

                  : language === "Marathi"

                  ? "भाषा"

                  : "Language"

              }

            </Text>

          </View>

          <View style={styles.languageRow}>

            <TouchableOpacity

              style={styles.languageButton}

              onPress={() =>
                setLanguage(
                  "English"
                )
              }

            >

              <Text
                style={
                  styles.languageText
                }
              >
                English
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

              <Text
                style={
                  styles.languageText
                }
              >
                हिंदी
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

              <Text
                style={
                  styles.languageText
                }
              >
                मराठी
              </Text>

            </TouchableOpacity>

          </View>

        </View>

        {/* ABOUT APP */}

        <View style={styles.sectionCard}>

          <View style={styles.sectionHeader}>

            <Ionicons

              name="information-circle"

              size={24}

              color="#4CAF50"

            />

            <Text style={styles.sectionTitle}>

              {

                language === "Hindi"

                  ? "ऐप जानकारी"

                  : language === "Marathi"

                  ? "अॅप माहिती"

                  : "About App"

              }

            </Text>

          </View>

          <Text style={styles.infoText}>

            {

              language === "Hindi"

                ? "Aarthika उपयोगकर्ताओं को AI आधारित वित्तीय शिक्षा, बजट प्रबंधन, बचत और बैंकिंग सहायता प्रदान करता है।"

                : language === "Marathi"

                ? "Aarthika वापरकर्त्यांना AI आधारित आर्थिक शिक्षण, बजेट व्यवस्थापन, बचत आणि बँकिंग सहाय्य प्रदान करते."

                : "Aarthika helps users improve financial literacy using AI-powered tools, budgeting, savings tracking, and banking support."

            }

          </Text>

        </View>

        {/* SETTINGS */}

        <View style={styles.sectionCard}>

          <View style={styles.sectionHeader}>

            <Ionicons

              name="settings"

              size={24}

              color="#4CAF50"

            />

            <Text style={styles.sectionTitle}>

              {

                language === "Hindi"

                  ? "सेटिंग्स"

                  : language === "Marathi"

                  ? "सेटिंग्ज"

                  : "Settings"

              }

            </Text>

          </View>

          <View style={styles.settingRow}>

            <Ionicons
              name="moon"
              size={22}
              color="#AAAAAA"
            />

            <Text style={styles.settingText}>

              {

                language === "Hindi"

                  ? "डार्क मोड सक्षम"

                  : language === "Marathi"

                  ? "डार्क मोड सक्षम"

                  : "Dark Mode Enabled"

              }

            </Text>

          </View>

          <View style={styles.settingRow}>

            <Ionicons
              name="shield-checkmark"
              size={22}
              color="#AAAAAA"
            />

            <Text style={styles.settingText}>

              {

                language === "Hindi"

                  ? "सुरक्षित लॉगिन"

                  : language === "Marathi"

                  ? "सुरक्षित लॉगिन"

                  : "Secure Login"

              }

            </Text>

          </View>

        </View>

        {/* LOGOUT */}

        <TouchableOpacity

          style={styles.logoutButton}

          onPress={logout}

        >

          <Ionicons

            name="log-out"

            size={24}

            color="white"

            style={{
              marginRight: 10,
            }}

          />

          <Text style={styles.logoutText}>

            {

              language === "Hindi"

                ? "लॉगआउट"

                : language === "Marathi"

                ? "लॉगआउट"

                : "Logout"

            }

          </Text>

        </TouchableOpacity>

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
    paddingBottom: 100,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  profileCircle: {
    backgroundColor: "#2E7D32",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  subtitle: {
    marginTop: 10,
    color: "#AAAAAA",
    fontSize: 16,
  },

  profileCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  userName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
  },

  userSubtitle: {
    color: "#AAAAAA",
    marginTop: 8,
    fontSize: 16,
  },

  sectionCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginLeft: 12,
  },

  infoText: {
    fontSize: 16,
    lineHeight: 28,
    color: "#DDDDDD",
  },

  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  languageButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
  },

  languageText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  settingText: {
    color: "#DDDDDD",
    fontSize: 16,
    marginLeft: 14,
  },

  logoutButton: {
    backgroundColor: "#D32F2F",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },

  logoutText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },

});