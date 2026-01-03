import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ManageAddressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Manage your delivery addresses here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, color: "#555" },
});
