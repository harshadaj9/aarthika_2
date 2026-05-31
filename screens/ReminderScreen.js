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
  FlatList,
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

export default function BillReminderScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const [
    billName,
    setBillName,
  ] = useState("");

  const [
    billDate,
    setBillDate,
  ] = useState("");

  const [
    bills,
    setBills,
  ] = useState([]);

  // LOAD BILLS

  useEffect(() => {

    loadBills();

  }, []);

  const loadBills =
    async () => {

      try {

        const savedBills =

          await AsyncStorage.getItem(
            "bills"
          );

        if (savedBills) {

          setBills(
            JSON.parse(
              savedBills
            )
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // ADD BILL

  const addBill =
    async () => {

      if (
        !billName ||
        !billDate
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

      const newBill = {

        id:
          Date.now().toString(),

        billName,

        billDate,

      };

      const updatedBills = [

        ...bills,
        newBill,

      ];

      setBills(
        updatedBills
      );

      await AsyncStorage.setItem(

        "bills",

        JSON.stringify(
          updatedBills
        )

      );

      setBillName("");
      setBillDate("");

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

          <View style={styles.iconCircle}>

            <Ionicons

              name="notifications"

              size={48}

              color="white"

            />

          </View>

          <Text style={styles.title}>

            {

              language === "Hindi"

                ? "बिल रिमाइंडर"

                : language === "Marathi"

                ? "बिल स्मरणपत्र"

                : "Bill Reminder"

            }

          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने बिल भुगतान कभी न भूलें"

                : language === "Marathi"

                ? "तुमचे बिल पेमेंट विसरू नका"

                : "Never miss your bill payments"

            }

          </Text>

        </View>

        {/* CARD */}

        <View style={styles.card}>

          {/* BILL NAME */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "बिल का नाम"

                : language === "Marathi"

                ? "बिलचे नाव"

                : "Bill Name"

            }

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="document-text"

              size={22}

              color="#4CAF50"

              style={styles.icon}

            />

            <TextInput

              placeholder={

                language === "Hindi"

                  ? "उदाहरण: बिजली बिल"

                  : language === "Marathi"

                  ? "उदाहरण: वीज बिल"

                  : "Example: Electricity Bill"

              }

              placeholderTextColor="#888"

              style={styles.input}

              value={billName}

              onChangeText={
                setBillName
              }

            />

          </View>

          {/* DATE */}

          <Text style={styles.label}>

            {

              language === "Hindi"

                ? "बिल तारीख"

                : language === "Marathi"

                ? "बिल तारीख"

                : "Bill Date"

            }

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="calendar"

              size={22}

              color="#4CAF50"

              style={styles.icon}

            />

            <TextInput

              placeholder="DD/MM/YYYY"

              placeholderTextColor="#888"

              style={styles.input}

              value={billDate}

              onChangeText={
                setBillDate
              }

            />

          </View>

          {/* BUTTON */}

          <TouchableOpacity

            style={styles.button}

            onPress={addBill}

          >

            <Ionicons

              name="add-circle"

              size={22}

              color="white"

              style={{
                marginRight: 10,
              }}

            />

            <Text style={styles.buttonText}>

              {

                language === "Hindi"

                  ? "रिमाइंडर जोड़ें"

                  : language === "Marathi"

                  ? "स्मरणपत्र जोडा"

                  : "Add Reminder"

              }

            </Text>

          </TouchableOpacity>

        </View>

        {/* LIST */}

        {

          bills.length === 0 ? (

            <View style={styles.emptyCard}>

              <Ionicons

                name="notifications-off"

                size={70}

                color="#666"

              />

              <Text style={styles.emptyText}>

                {

                  language === "Hindi"

                    ? "अभी तक कोई रिमाइंडर नहीं"

                    : language === "Marathi"

                    ? "अद्याप कोणतेही स्मरणपत्र नाही"

                    : "No reminders added yet"

                }

              </Text>

            </View>

          ) : (

            <FlatList

              data={bills}

              keyExtractor={(item) =>
                item.id
              }

              scrollEnabled={false}

              renderItem={({ item }) => (

                <View
                  style={
                    styles.billCard
                  }
                >

                  <View
                    style={
                      styles.billLeft
                    }
                  >

                    <View
                      style={
                        styles.billIcon
                      }
                    >

                      <Ionicons

                        name="receipt"

                        size={26}

                        color="#4CAF50"

                      />

                    </View>

                    <View>

                      <Text
                        style={
                          styles.billName
                        }
                      >
                        {item.billName}
                      </Text>

                      <Text
                        style={
                          styles.billDate
                        }
                      >
                        {item.billDate}
                      </Text>

                    </View>

                  </View>

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

  card: {
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

  billCard: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  billLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  billIcon: {
    backgroundColor: "#2A2A2A",
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  billName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
  },

  billDate: {
    marginTop: 8,
    color: "#AAAAAA",
    fontSize: 15,
  },

  emptyCard: {
    backgroundColor: "#1E1E1E",
    padding: 40,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  emptyText: {
    fontSize: 17,
    color: "#AAAAAA",
    marginTop: 20,
    textAlign: "center",
  },

});