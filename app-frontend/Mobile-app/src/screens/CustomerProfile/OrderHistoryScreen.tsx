import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your past orders will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, color: "#555" },
});
