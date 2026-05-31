import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";

import AsyncStorage from
"@react-native-async-storage/async-storage";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
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

import BackButton from "../components/BackButton";

export default function BankingScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const [
    currentUser,
    setCurrentUser,
  ] = useState("");

  const [
    receiver,
    setReceiver,
  ] = useState("");

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    balance,
    setBalance,
  ] = useState(50000);

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  // LOAD USER

  useEffect(() => {

    loadCurrentUser();

  }, []);

  // GET CURRENT USER

  const loadCurrentUser =
    async () => {

      const user =

        await AsyncStorage.getItem(
          "currentUser"
        );

      if (user) {

        setCurrentUser(user);

        loadBankData(user);

        loadTransactions(user);

      }

    };

  // LOAD BALANCE

  const loadBankData =
    async (user) => {

      const bankRef = doc(
        db,
        "banking",
        user
      );

      const bankSnap =
        await getDoc(bankRef);

      if (
        bankSnap.exists()
      ) {

        setBalance(
          bankSnap.data()
            .balance
        );

      } else {

        await setDoc(
          bankRef,
          {
            balance: 50000,
          }
        );

        setBalance(50000);

      }

    };

  // LOAD TRANSACTIONS

  const loadTransactions =
    (user) => {

      const q = query(

        collection(
          db,
          "transactions"
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

            const txns =

              snapshot.docs.map(
                (doc) => ({

                  id: doc.id,

                  ...doc.data(),

                })
              );

            setTransactions(
              txns
            );

          }
        );

      return unsubscribe;

    };

  // SEND MONEY

  const sendMoney =
    async () => {

      if (
        !receiver ||
        !amount
      ) {

        Alert.alert(
          "Error",
          "Fill all details"
        );

        return;

      }

      if (
        Number(amount) >
        balance
      ) {

        Alert.alert(
          "Insufficient Balance"
        );

        return;

      }

      const newBalance =
        balance -
        Number(amount);

      // UPDATE BALANCE

      await updateDoc(

        doc(
          db,
          "banking",
          currentUser
        ),

        {
          balance:
            newBalance,
        }

      );

      setBalance(
        newBalance
      );

      // SAVE TRANSACTION

      await addDoc(

        collection(
          db,
          "transactions"
        ),

        {

          userId:
            currentUser,

          receiver,

          amount:
            Number(amount),

          createdAt:
            new Date(),

        }

      );

      setReceiver("");
      setAmount("");

      Alert.alert(
        "Success",
        "Money Sent"
      );

    };

  return (

    <SafeAreaView
      style={styles.safeContainer}
    >

      <ScrollView
        style={styles.container}
      >

        <BackButton
          navigation={navigation}
        />

        <Text style={styles.title}>
          Banking
        </Text>

        {/* BALANCE */}

        <View style={styles.balanceCard}>

          <View>

            <Text
              style={
                styles.balanceLabel
              }
            >
              Available Balance
            </Text>

            <Text
              style={
                styles.balanceAmount
              }
            >
              ₹ {balance}
            </Text>

          </View>

          <Ionicons
            name="wallet"
            size={50}
            color="white"
          />

        </View>

        {/* SEND MONEY */}

        <TextInput
          placeholder="Receiver Name"
          placeholderTextColor="#888"
          style={styles.input}
          value={receiver}
          onChangeText={
            setReceiver
          }
        />

        <TextInput
          placeholder="Amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={
            setAmount
          }
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMoney}
        >

          <Text
            style={styles.sendText}
          >
            Send Money
          </Text>

        </TouchableOpacity>

        {/* HISTORY */}

        <Text style={styles.sectionTitle}>
          Transactions
        </Text>

        <FlatList

          data={transactions}

          scrollEnabled={false}

          keyExtractor={(item) =>
            item.id
          }

          renderItem={({ item }) => (

            <View
              style={
                styles.transactionCard
              }
            >

              <View>

                <Text
                  style={
                    styles.transactionName
                  }
                >
                  Sent to{" "}
                  {
                    item.receiver
                  }
                </Text>

              </View>

              <Text
                style={
                  styles.transactionAmount
                }
              >
                ₹ {item.amount}
              </Text>

            </View>

          )}

        />

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
    padding: 20,
  },

  title: {
    color: "#4CAF50",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 25,
  },

  balanceCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 24,
    padding: 25,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#AAAAAA",
    fontSize: 16,
  },

  balanceAmount: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 10,
  },

  input: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "#333",
  },

  sendButton: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 18,
    marginBottom: 30,
    alignItems: "center",
  },

  sendText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
  },

  transactionCard: {
    backgroundColor: "#1E1E1E",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  transactionName: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  transactionAmount: {
    color: "#FF5252",
    fontSize: 18,
    fontWeight: "bold",
  },

});