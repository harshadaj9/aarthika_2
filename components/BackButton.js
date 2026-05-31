import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function BackButton({
  navigation,
}) {

  return (

    <View style={styles.container}>

      <TouchableOpacity

        style={styles.button}

        onPress={() =>
          navigation.goBack()
        }

        activeOpacity={0.8}

      >

        <Ionicons

          name="arrow-back"

          size={22}

          color="white"

          style={styles.icon}

        />

        <Text style={styles.text}>
          Back
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginTop: 15,
    marginBottom: 20,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1E1E1E",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  icon: {
    marginRight: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

});