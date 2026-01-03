import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutFoodExpressScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About FoodExpress</Text>
            <Text style={styles.text}>
                FoodExpress is a fast and reliable food delivery app connecting customers,
                restaurants, and delivery partners.
            </Text>
        </View>
    );
};

export default AboutFoodExpressScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    text: { fontSize: 16, color: "#555" },
});
