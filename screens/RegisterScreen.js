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
  StatusBar,
} from "react-native";

import BackButton from "../components/BackButton";

export default function RegisterScreen({
  navigation,
}) {

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    mobile,
    setMobile,
  ] = useState("");

  // REGISTER

  const handleRegister =
    async () => {

      if (
        !fullName ||
        !mobile
      ) {

        alert(
          "Please fill all details"
        );

        return;

      }

      if (
        mobile.length < 10
      ) {

        alert(
          "Enter valid mobile number"
        );

        return;

      }

      alert(
        "Account Created Successfully"
      );

      navigation.navigate(
        "PhoneLogin"
      );

    };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >

      <StatusBar
        barStyle="light-content"
      />

      {/* BACK */}

      <BackButton
        navigation={navigation}
      />

      {/* HEADER */}

      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Start your smart financial journey
      </Text>

      {/* CARD */}

      <View style={styles.card}>

        {/* NAME */}

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput

          placeholder="Enter your full name"

          placeholderTextColor="#999"

          style={styles.input}

          value={fullName}

          onChangeText={
            setFullName
          }

        />

        {/* MOBILE */}

        <Text style={styles.label}>
          Mobile Number
        </Text>

        <TextInput

          placeholder="Enter mobile number"

          placeholderTextColor="#999"

          style={styles.input}

          value={mobile}

          onChangeText={
            setMobile
          }

          keyboardType="phone-pad"

          maxLength={10}

        />

        {/* BUTTON */}

        <TouchableOpacity

          style={styles.button}

          onPress={
            handleRegister
          }

        >

          <Text style={styles.buttonText}>
            Continue
          </Text>

        </TouchableOpacity>

        {/* LOGIN */}

        <TouchableOpacity

          onPress={() =>
            navigation.navigate(
              "PhoneLogin"
            )
          }

        >

          <Text style={styles.loginText}>

            Already have an account?
            Login

          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      "#121212",

    padding: 20,

  },

  title: {

    fontSize: 38,

    fontWeight: "bold",

    color: "#4CAF50",

    marginTop: 20,

  },

  subtitle: {

    fontSize: 16,

    color: "#AAAAAA",

    marginTop: 10,

    marginBottom: 35,

  },

  card: {

    backgroundColor:
      "#1E1E1E",

    borderRadius: 28,

    padding: 25,

    marginBottom: 40,

  },

  label: {

    fontSize: 16,

    fontWeight: "600",

    marginBottom: 10,

    color: "white",

  },

  input: {

    backgroundColor:
      "#2A2A2A",

    padding: 18,

    borderRadius: 16,

    marginBottom: 22,

    color: "white",

    borderWidth: 1,

    borderColor: "#333",

    fontSize: 16,

  },

  button: {

    backgroundColor:
      "#4CAF50",

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

  loginText: {

    marginTop: 22,

    textAlign: "center",

    color: "#4CAF50",

    fontWeight: "bold",

    fontSize: 16,

  },

});