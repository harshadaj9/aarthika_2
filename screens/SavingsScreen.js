import React, {
  useState,
  useEffect,
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

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useLanguage,
} from "../context/LanguageContext";

import BackButton from "../components/BackButton";

export default function SavingsGoalScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const [
    goalName,
    setGoalName,
  ] = useState("");

  const [
    targetAmount,
    setTargetAmount,
  ] = useState("");

  const [
    savedAmount,
    setSavedAmount,
  ] = useState("");

  // LOAD GOAL

  useEffect(() => {

    loadGoal();

  }, []);

  const loadGoal =
    async () => {

      try {

        const goal =

          await AsyncStorage.getItem(
            "savingsGoal"
          );

        if (goal) {

          const parsedGoal =
            JSON.parse(goal);

          setGoalName(
            parsedGoal.goalName
          );

          setTargetAmount(
            parsedGoal.targetAmount
          );

          setSavedAmount(
            parsedGoal.savedAmount
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // SAVE GOAL

  const saveGoal =
    async () => {

      if (

        !goalName ||

        !targetAmount ||

        !savedAmount

      ) {

        alert(

          language === "Hindi"

            ? "सभी जानकारी भरें"

            : language === "Marathi"

            ? "सर्व माहिती भरा"

            : "Please fill all fields"

        );

        return;

      }

      const goalData = {

        goalName,

        targetAmount,

        savedAmount,

      };

      await AsyncStorage.setItem(

        "savingsGoal",

        JSON.stringify(
          goalData
        )

      );

      alert(

        language === "Hindi"

          ? "लक्ष्य सेव हो गया"

          : language === "Marathi"

          ? "ध्येय सेव झाले"

          : "Goal Saved"

      );

    };

  // PROGRESS

  const progress =

    targetAmount > 0

      ? (

          (savedAmount /
            targetAmount) *

          100

        ).toFixed(0)

      : 0;

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

          <View style={styles.iconCircle}>

            <Ionicons

              name="wallet"

              size={48}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "बचत लक्ष्य"

                : language === "Marathi"

                ? "बचत ध्येय"

                : "Savings Goal"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने भविष्य के लिए बचत करें"

                : language === "Marathi"

                ? "तुमच्या भविष्यासाठी बचत करा"

                : "Save money for your future"

            }

          </Text>

        </View>

        {/* MAIN CARD */}

        <View style={styles.goalCard}>

          <Text style={styles.goalCardText}>

            {

              language === "Hindi"

                ? "आपकी बचत प्रगति"

                : language === "Marathi"

                ? "तुमची बचत प्रगती"

                : "Your Savings Progress"

            }

          </Text>

          <Text style={styles.goalPercentage}>
            {progress}%
          </Text>

          {/* BAR */}

          <View style={styles.progressBar}>

            <View

              style={[

                styles.progressFill,

                {

                  width:
                    `${progress}%`,

                },

              ]}

            />

          </View>

        </View>

        {/* FORM */}

        <View style={styles.formCard}>

          {/* GOAL NAME */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "लक्ष्य नाम"

                : language === "Marathi"

                ? "ध्येय नाव"

                : "Goal Name"

            }

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="flag"

              size={22}

              color="#4CAF50"

              style={styles.icon}

            />

            <TextInput

              placeholder={

                language === "Hindi"

                  ? "उदाहरण: नया फोन"

                  : language === "Marathi"

                  ? "उदाहरण: नवीन फोन"

                  : "Example: New Phone"

              }

              placeholderTextColor="#888"

              style={styles.input}

              value={goalName}

              onChangeText={
                setGoalName
              }

            />

          </View>

          {/* TARGET */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "लक्ष्य राशि"

                : language === "Marathi"

                ? "ध्येय रक्कम"

                : "Target Amount"

            }

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="cash"

              size={22}

              color="#4CAF50"

              style={styles.icon}

            />

            <TextInput

              placeholder="₹ 50000"

              placeholderTextColor="#888"

              style={styles.input}

              value={targetAmount}

              onChangeText={
                setTargetAmount
              }

              keyboardType="numeric"

            />

          </View>

          {/* SAVED */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "बचाई गई राशि"

                : language === "Marathi"

                ? "वाचवलेली रक्कम"

                : "Saved Amount"

            }

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="wallet"

              size={22}

              color="#4CAF50"

              style={styles.icon}

            />

            <TextInput

              placeholder="₹ 10000"

              placeholderTextColor="#888"

              style={styles.input}

              value={savedAmount}

              onChangeText={
                setSavedAmount
              }

              keyboardType="numeric"

            />

          </View>

          {/* BUTTON */}

          <TouchableOpacity

            style={styles.button}

            onPress={saveGoal}

          >

            <Ionicons

              name="save"

              size={22}

              color="white"

              style={{
                marginRight: 10,
              }}

            />

            <Text style={styles.buttonText}>

              {

                language === "Hindi"

                  ? "सेव करें"

                  : language === "Marathi"

                  ? "सेव करा"

                  : "Save Goal"

              }

            </Text>

          </TouchableOpacity>

        </View>

        {/* SUMMARY */}

        <View style={styles.summaryCard}>

          <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>

              {

                language === "Hindi"

                  ? "लक्ष्य राशि"

                  : language === "Marathi"

                  ? "ध्येय रक्कम"

                  : "Target"

              }

            </Text>

            <Text style={styles.summaryValue}>
              ₹{targetAmount || 0}
            </Text>

          </View>

          <View style={styles.summaryRow}>

            <Text style={styles.summaryLabel}>

              {

                language === "Hindi"

                  ? "बचाई गई राशि"

                  : language === "Marathi"

                  ? "वाचवलेली रक्कम"

                  : "Saved"

              }

            </Text>

            <Text style={styles.summaryValue}>
              ₹{savedAmount || 0}
            </Text>

          </View>

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
    paddingBottom: 100,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  iconCircle: {
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
    color: "#AAAAAA",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },

  goalCard: {
    backgroundColor: "#1E1E1E",
    padding: 28,
    borderRadius: 28,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  goalCardText: {
    color: "#AAAAAA",
    fontSize: 17,
  },

  goalPercentage: {
    color: "#4CAF50",
    fontSize: 46,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 20,
  },

  progressBar: {
    height: 22,
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },

  formCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    marginBottom: 30,
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
    marginBottom: 22,
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
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  summaryCard: {
    backgroundColor: "#1E1E1E",
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    marginBottom: 40,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  summaryLabel: {
    color: "#AAAAAA",
    fontSize: 17,
  },

  summaryValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});