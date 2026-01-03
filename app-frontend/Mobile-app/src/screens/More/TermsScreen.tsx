import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const TermsScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Terms & Conditions</Text>
            <Text style={styles.text}>
                By using FoodExpress, you agree to follow all rules and regulations
                provided by the company.
            </Text>
        </ScrollView>
    );
};

export default TermsScreen;

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    text: { fontSize: 16, color: "#555" },
});
