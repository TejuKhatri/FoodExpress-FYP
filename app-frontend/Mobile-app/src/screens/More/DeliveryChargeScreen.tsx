import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DeliveryChargeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Charges</Text>
      <Text style={styles.text}>
        Delivery charge depends on distance and restaurant location.
      </Text>
    </View>
  );
};

export default DeliveryChargeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, color: "#555" },
});
