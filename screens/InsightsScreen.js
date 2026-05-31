import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  db,
} from "../firebase/firebaseConfig";

import {
  askGemini,
} from "../api/gemini";

import {
  useLanguage,
} from "../context/LanguageContext";

import BackButton from "../components/BackButton";

export default function InsightsScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const [
    expenses,
    setExpenses,
  ] = useState([]);

  const [
    insights,
    setInsights,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  // LOAD EXPENSES

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "expenses"
        ),

        (snapshot) => {

          const expenseList =
            snapshot.docs.map(
              (doc) => ({

                ...doc.data(),

              })
            );

          setExpenses(
            expenseList
          );

        }

      );

    return () =>
      unsubscribe();

  }, []);

  // GENERATE INSIGHTS

  const generateInsights =
    async () => {

      if (
        expenses.length === 0
      ) {

        alert(

          language === "Hindi"

            ? "कोई खर्च नहीं मिला"

            : language === "Marathi"

            ? "कोणताही खर्च सापडला नाही"

            : "No expenses found"

        );

        return;

      }

      setLoading(true);

      try {

        const summary =
          expenses

            .map(

              (item) =>

                `${item.title}
                ₹${item.amount}
                ${item.category}`

            )

            .join("\n");

        const prompt =

          `Analyze these expenses and give financial advice in ${language}:

          ${summary}

          Give short and smart financial advice for budgeting and saving money.`;

        const result =
          await askGemini(
            prompt,
            language
          );

        setInsights(
          result
        );

      } catch (error) {

        alert(

          language === "Hindi"

            ? "AI त्रुटि"

            : language === "Marathi"

            ? "AI त्रुटी"

            : "AI Error"

        );

      }

      setLoading(false);

    };

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

          <View style={styles.iconCircle}>

            <Ionicons

              name="analytics"

              size={45}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "AI वित्तीय विश्लेषण"

                : language === "Marathi"

                ? "AI आर्थिक विश्लेषण"

                : "AI Financial Insights"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने खर्चों का स्मार्ट विश्लेषण प्राप्त करें"

                : language === "Marathi"

                ? "तुमच्या खर्चाचे स्मार्ट विश्लेषण मिळवा"

                : "Get smart analysis of your expenses"

            }

          </Text>

        </View>

        {/* SUMMARY CARD */}

        <View style={styles.summaryCard}>

          <Text style={styles.summaryLabel}>

            {

              language === "Hindi"

                ? "कुल खर्च रिकॉर्ड"

                : language === "Marathi"

                ? "एकूण खर्च नोंदी"

                : "Total Expense Records"

            }

          </Text>

          <Text style={styles.summaryValue}>
            {expenses.length}
          </Text>

        </View>

        {/* BUTTON */}

        <TouchableOpacity

          style={styles.button}

          onPress={
            generateInsights
          }

        >

          <Ionicons

            name="sparkles"

            size={22}

            color="white"

            style={{
              marginRight: 10,
            }}

          />

          <Text style={styles.buttonText}>

            {

              language === "Hindi"

                ? "AI विश्लेषण बनाएं"

                : language === "Marathi"

                ? "AI विश्लेषण तयार करा"

                : "Generate AI Insights"

            }

          </Text>

        </TouchableOpacity>

        {/* LOADING */}

        {

          loading && (

            <ActivityIndicator

              size="large"

              color="#4CAF50"

              style={{
                marginTop: 20,
              }}

            />

          )

        }

        {/* INSIGHTS */}

        {

          insights ? (

            <View style={styles.card}>

              <View
                style={
                  styles.insightHeader
                }
              >

                <Ionicons

                  name="bulb"

                  size={28}

                  color="#4CAF50"

                />

                <Text
                  style={
                    styles.insightTitle
                  }
                >

                  {

                    language === "Hindi"

                      ? "AI सुझाव"

                      : language === "Marathi"

                      ? "AI सूचना"

                      : "AI Suggestions"

                  }

                </Text>

              </View>

              <Text
                style={
                  styles.insightText
                }
              >
                {insights}
              </Text>

            </View>

          ) : null

        }

      </ScrollView>

    </SafeAreaView>

  );

}

const styles =
  StyleSheet.create({

    safeContainer: {
      flex: 1,
      backgroundColor:
        "#121212",
    },

    container: {
      flex: 1,
      backgroundColor:
        "#121212",
      paddingHorizontal: 20,
      paddingBottom: 100,
    },

    header: {
      alignItems: "center",
      marginBottom: 35,
    },

    iconCircle: {
      backgroundColor:
        "#2E7D32",
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent:
        "center",
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

    summaryCard: {
      backgroundColor:
        "#1E1E1E",
      borderRadius: 24,
      padding: 25,
      marginBottom: 30,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#2A2A2A",
    },

    summaryLabel: {
      color: "#AAAAAA",
      fontSize: 16,
    },

    summaryValue: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      marginTop: 12,
    },

    button: {
      backgroundColor:
        "#2E7D32",
      padding: 18,
      borderRadius: 18,
      alignItems: "center",
      marginBottom: 30,
      flexDirection: "row",
      justifyContent: "center",
    },

    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },

    card: {
      backgroundColor:
        "#1E1E1E",
      padding: 24,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: "#2A2A2A",
      marginBottom: 40,
    },

    insightHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },

    insightTitle: {
      color: "#4CAF50",
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 12,
    },

    insightText: {
      fontSize: 17,
      lineHeight: 30,
      color: "#DDDDDD",
    },

});