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

export default function LearnScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const lessons = [

    {

      icon: "wallet",

      title:

        language === "Hindi"

          ? "बचत क्या है?"

          : language === "Marathi"

          ? "बचत म्हणजे काय?"

          : "What is Saving?",

      content:

        language === "Hindi"

          ? "हर महीने थोड़े पैसे बचाना भविष्य के लिए महत्वपूर्ण है।"

          : language === "Marathi"

          ? "दर महिन्याला थोडे पैसे वाचवणे महत्त्वाचे आहे."

          : "Saving small money every month is important for the future.",

    },

    {

      icon: "shield-checkmark",

      title:

        language === "Hindi"

          ? "UPI सुरक्षा"

          : language === "Marathi"

          ? "UPI सुरक्षा"

          : "UPI Safety",

      content:

        language === "Hindi"

          ? "अपना OTP किसी के साथ साझा न करें।"

          : language === "Marathi"

          ? "तुमचा OTP कोणालाही सांगू नका."

          : "Never share your OTP with anyone.",

    },

    {

      icon: "analytics",

      title:

        language === "Hindi"

          ? "बजट बनाना"

          : language === "Marathi"

          ? "बजेट तयार करणे"

          : "Budget Planning",

      content:

        language === "Hindi"

          ? "हर महीने खर्च और बचत की योजना बनाएं।"

          : language === "Marathi"

          ? "दर महिन्याला खर्च आणि बचतीचे नियोजन करा."

          : "Plan your expenses and savings every month.",

    },

    {

      icon: "warning",

      title:

        language === "Hindi"

          ? "ऑनलाइन धोखाधड़ी"

          : language === "Marathi"

          ? "ऑनलाइन फसवणूक"

          : "Online Fraud",

      content:

        language === "Hindi"

          ? "अज्ञात लिंक पर क्लिक न करें।"

          : language === "Marathi"

          ? "अनोळखी लिंकवर क्लिक करू नका."

          : "Do not click unknown links.",

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

              name="school"

              size={42}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "वित्तीय शिक्षा"

                : language === "Marathi"

                ? "आर्थिक शिक्षण"

                : "Financial Learning"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने वित्तीय ज्ञान को बढ़ाएं"

                : language === "Marathi"

                ? "तुमचे आर्थिक ज्ञान वाढवा"

                : "Improve your financial knowledge"

            }

          </Text>

        </View>

        {/* LESSONS */}

        {

          lessons.map(
            (lesson, index) => (

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

                    name={lesson.icon}

                    size={30}

                    color="#4CAF50"

                  />

                </View>

                <View
                  style={
                    styles.textContainer
                  }
                >

                  <Text
                    style={
                      styles.lessonTitle
                    }
                  >
                    {lesson.title}
                  </Text>

                  <Text
                    style={
                      styles.lessonContent
                    }
                  >
                    {lesson.content}
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
    backgroundColor: "#2E7D32",
    width: 95,
    height: 95,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#AAAAAA",
    textAlign: "center",
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 22,
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

  lessonTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },

  lessonContent: {
    fontSize: 16,
    lineHeight: 28,
    color: "#DDDDDD",
  },

});