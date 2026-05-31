import React from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLanguage,
} from "../context/LanguageContext";

import BackButton from "../components/BackButton";

export default function FraudAlertScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const alerts = [

    {

      icon: "shield-checkmark",

      title:

        language === "Hindi"

          ? "OTP साझा न करें"

          : language === "Marathi"

          ? "OTP शेअर करू नका"

          : "Never Share OTP",

      content:

        language === "Hindi"

          ? "कोई भी बैंक आपसे OTP नहीं मांगता।"

          : language === "Marathi"

          ? "कोणतीही बँक OTP विचारत नाही."

          : "No bank ever asks for OTP.",

    },

    {

      icon: "call",

      title:

        language === "Hindi"

          ? "फर्जी कॉल से सावधान"

          : language === "Marathi"

          ? "फसव्या कॉलपासून सावध"

          : "Beware of Fake Calls",

      content:

        language === "Hindi"

          ? "अज्ञात नंबर पर बैंक जानकारी न दें।"

          : language === "Marathi"

          ? "अनोळखी नंबरवर बँक माहिती देऊ नका."

          : "Do not share bank details on unknown calls.",

    },

    {

      icon: "lock-closed",

      title:

        language === "Hindi"

          ? "UPI PIN सुरक्षित रखें"

          : language === "Marathi"

          ? "UPI PIN सुरक्षित ठेवा"

          : "Protect Your UPI PIN",

      content:

        language === "Hindi"

          ? "UPI PIN केवल भुगतान के लिए होता है।"

          : language === "Marathi"

          ? "UPI PIN फक्त पेमेंटसाठी असतो."

          : "UPI PIN is only for payments.",

    },

    {

      icon: "warning",

      title:

        language === "Hindi"

          ? "संदिग्ध लिंक से बचें"

          : language === "Marathi"

          ? "संशयास्पद लिंक टाळा"

          : "Avoid Suspicious Links",

      content:

        language === "Hindi"

          ? "अज्ञात लिंक पर क्लिक न करें।"

          : language === "Marathi"

          ? "अनोळखी लिंकवर क्लिक करू नका."

          : "Never click suspicious links.",

    },

  ];

  return (

    <SafeAreaView
      style={styles.safeContainer}
    >

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

          <View style={styles.headerIcon}>

            <Ionicons

              name="shield-checkmark"

              size={40}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "धोखाधड़ी अलर्ट"

                : language === "Marathi"

                ? "फसवणूक सूचना"

                : "Fraud Alerts"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "ऑनलाइन बैंकिंग सुरक्षा टिप्स"

                : language === "Marathi"

                ? "ऑनलाइन बँकिंग सुरक्षा टिप्स"

                : "Online Banking Safety Tips"

            }

          </Text>

        </View>

        {/* ALERT CARDS */}

        {

          alerts.map(
            (alert, index) => (

              <View

                key={index}

                style={styles.card}

              >

                <View
                  style={
                    styles.iconContainer
                  }
                >

                  <Ionicons

                    name={alert.icon}

                    size={28}

                    color="#FF5252"

                  />

                </View>

                <View
                  style={
                    styles.textContainer
                  }
                >

                  <Text
                    style={
                      styles.alertTitle
                    }
                  >
                    {alert.title}
                  </Text>

                  <Text
                    style={
                      styles.alertContent
                    }
                  >
                    {alert.content}
                  </Text>

                </View>

              </View>

            )
          )

        }

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
    marginBottom: 35,
  },

  headerIcon: {
    backgroundColor: "#D32F2F",
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FF5252",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#AAAAAA",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  iconContainer: {
    marginRight: 18,
    marginTop: 5,
  },

  textContainer: {
    flex: 1,
  },

  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5252",
    marginBottom: 10,
  },

  alertContent: {
    fontSize: 16,
    lineHeight: 26,
    color: "#DDDDDD",
  },

});