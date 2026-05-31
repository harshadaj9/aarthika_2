import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

import AsyncStorage from
"@react-native-async-storage/async-storage";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  db,
} from "../firebase/firebaseConfig";

import {
  useLanguage,
} from "../context/LanguageContext";

import translations from "../constants/translations";

import BackButton from "../components/BackButton";

export default function BudgetScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const t =
    translations[language];

  const [
    currentUser,
    setCurrentUser,
  ] = useState("");

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [
    expenses,
    setExpenses,
  ] = useState([]);

  // LOAD USER

  useEffect(() => {

    loadCurrentUser();

  }, []);

  // GET CURRENT USER

  const loadCurrentUser =
    async () => {

      try {

        const user =

          await AsyncStorage.getItem(
            "currentUser"
          );

        if (user) {

          setCurrentUser(user);

          loadExpenses(user);

        }

      } catch (error) {

        console.log(error);

      }

    };

  // LOAD EXPENSES

  const loadExpenses =
    (user) => {

      const q = query(

        collection(
          db,
          "expenses"
        ),

        where(
          "userId",
          "==",
          user
        )

      );

      const unsubscribe =
        onSnapshot(

          q,

          (snapshot) => {

            const expenseList =

              snapshot.docs.map(
                (doc) => ({

                  id: doc.id,

                  ...doc.data(),

                })
              );

            setExpenses(
              expenseList
            );

          }

        );

      return unsubscribe;

    };

  // ADD EXPENSE

 const addExpense = async () => {

  if (!currentUser) {

    alert("User not found. Please login again.");

    console.log(
      "CURRENT USER IS NULL"
    );

    return;

  }

  if (
    !title ||
    !amount ||
    !category
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

  try {

    console.log(
      "Saving expense for:",
      currentUser
    );

    await addDoc(

      collection(
        db,
        "expenses"
      ),

      {

        title,

        amount:
          Number(amount),

        category,

        userId:
          currentUser,

        createdAt:
          new Date(),

      }

    );

    alert(
      language === "Hindi"
        ? "खर्च जोड़ा गया"
        : language === "Marathi"
        ? "खर्च जोडला"
        : "Expense Added"
    );

    setTitle("");
    setAmount("");
    setCategory("");

  } catch (error) {

    console.log(error);

    alert(
      language === "Hindi"
        ? "खर्च सेव करने में त्रुटि"
        : language === "Marathi"
        ? "खर्च सेव करण्यात त्रुटी"
        : "Error saving expense"
    );

  }

};

  // TOTAL EXPENSE

  const totalExpense =
    expenses.reduce(

      (sum, item) =>

        sum +
        Number(item.amount),

      0

    );

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

          <Text style={styles.title}>
            {t.budgetTracker}
          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने खर्चों को ट्रैक करें"

                : language === "Marathi"

                ? "तुमचे खर्च ट्रॅक करा"

                : "Track your daily expenses"

            }

          </Text>

        </View>

        {/* TOTAL CARD */}

        <View style={styles.totalCard}>

          <View>

            <Text style={styles.totalLabel}>

              {

                language === "Hindi"

                  ? "कुल खर्च"

                  : language === "Marathi"

                  ? "एकूण खर्च"

                  : "Total Expense"

              }

            </Text>

            <Text style={styles.totalAmount}>
              ₹{totalExpense}
            </Text>

          </View>

          <Ionicons

            name="wallet"

            size={50}

            color="white"

          />

        </View>

        {/* INPUT CARD */}

        <View style={styles.inputCard}>

          {/* TITLE */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "खर्च का नाम"

                : language === "Marathi"

                ? "खर्चाचे नाव"

                : "Expense Title"

            }

          </Text>

          <TextInput

            placeholder={

              language === "Hindi"

                ? "उदाहरण: खाना"

                : language === "Marathi"

                ? "उदाहरण: अन्न"

                : "Example: Food"

            }

            placeholderTextColor="#888"

            style={styles.input}

            value={title}

            onChangeText={
              setTitle
            }

          />

          {/* AMOUNT */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "राशि"

                : language === "Marathi"

                ? "रक्कम"

                : "Amount"

            }

          </Text>

          <TextInput

            placeholder="₹ 500"

            placeholderTextColor="#888"

            style={styles.input}

            value={amount}

            onChangeText={
              setAmount
            }

            keyboardType="numeric"

          />

          {/* CATEGORY */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "श्रेणी"

                : language === "Marathi"

                ? "प्रकार"

                : "Category"

            }

          </Text>

          <TextInput

            placeholder={

              language === "Hindi"

                ? "उदाहरण: भोजन"

                : language === "Marathi"

                ? "उदाहरण: प्रवास"

                : "Example: Food"

            }

            placeholderTextColor="#888"

            style={styles.input}

            value={category}

            onChangeText={
              setCategory
            }

          />

          {/* BUTTON */}

          <TouchableOpacity

            style={styles.button}

            onPress={addExpense}

          >

            <Text style={styles.buttonText}>

              {

                language === "Hindi"

                  ? "खर्च जोड़ें"

                  : language === "Marathi"

                  ? "खर्च जोडा"

                  : "Add Expense"

              }

            </Text>

          </TouchableOpacity>

        </View>

        {/* RECENT EXPENSES */}

        <Text style={styles.sectionTitle}>

          {

            language === "Hindi"

              ? "हाल के खर्च"

              : language === "Marathi"

              ? "अलीकडील खर्च"

              : "Recent Expenses"

          }

        </Text>

        {

          expenses.length === 0 ? (

            <View style={styles.emptyCard}>

              <Text style={styles.emptyText}>

                {

                  language === "Hindi"

                    ? "अभी तक कोई खर्च नहीं जोड़ा गया"

                    : language === "Marathi"

                    ? "अद्याप कोणताही खर्च जोडलेला नाही"

                    : "No expenses added yet"

                }

              </Text>

            </View>

          ) : (

            <FlatList

              data={expenses}

              keyExtractor={(item) =>
                item.id
              }

              scrollEnabled={false}

              renderItem={({ item }) => (

                <View
                  style={
                    styles.expenseCard
                  }
                >

                  <View>

                    <Text
                      style={
                        styles.expenseTitle
                      }
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={
                        styles.categoryText
                      }
                    >
                      {item.category}
                    </Text>

                  </View>

                  <Text
                    style={
                      styles.expenseAmount
                    }
                  >
                    ₹{item.amount}
                  </Text>

                </View>

              )}

            />

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
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  subtitle: {
    fontSize: 16,
    color: "#AAAAAA",
    marginTop: 8,
  },

  totalCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 25,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2E7D32",
  },

  totalLabel: {
    color: "#AAAAAA",
    fontSize: 16,
  },

  totalAmount: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 10,
  },

  inputCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 22,
    padding: 20,
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    marginBottom: 8,
    color: "#CCCCCC",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#2A2A2A",
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "#333",
  },

  button: {
    backgroundColor: "#2E7D32",
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

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 18,
  },

  expenseCard: {
    backgroundColor: "#1E1E1E",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  expenseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  categoryText: {
    marginTop: 6,
    color: "#AAAAAA",
  },

  expenseAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  emptyCard: {
    backgroundColor: "#1E1E1E",
    padding: 30,
    borderRadius: 18,
    alignItems: "center",
  },

  emptyText: {
    color: "#AAAAAA",
    fontSize: 16,
  },

});