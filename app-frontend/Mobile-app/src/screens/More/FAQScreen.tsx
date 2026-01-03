import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FAQScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>FAQs</Text>

      <Text style={styles.question}>Q. How to place order?</Text>
      <Text style={styles.answer}>Select food, add to cart and checkout.</Text>

      <Text style={styles.question}>Q. How to track order?</Text>
      <Text style={styles.answer}>You can track order from Orders section.</Text>
    </ScrollView>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  question: { fontWeight: "bold", marginTop: 10 },
  answer: { color: "#555", marginTop: 5 },
});
