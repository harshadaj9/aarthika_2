import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

export default function Header({
  title,
  subtitle,
}) {

  return (

    <View style={styles.container}>

      {/* LEFT */}

      <View style={styles.leftSection}>

        <Text style={styles.title}>
          {title}
        </Text>

        {

          subtitle ? (

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>

          ) : null

        }

      </View>

      {/* PROFILE */}

      <View style={styles.profileContainer}>

        <Ionicons

          name="person"

          size={28}

          color="white"

        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginTop: 15,
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flex: 1,
    paddingRight: 15,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#AAAAAA",
    lineHeight: 24,
  },

  profileContainer: {
    backgroundColor: "#2E7D32",
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3FA34D",
  },

});