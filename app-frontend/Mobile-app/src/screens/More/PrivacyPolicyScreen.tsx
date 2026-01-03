import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.text}>
                FoodExpress respects your privacy and protects your personal data.
            </Text>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    text: { fontSize: 16, color: "#555" },
});
