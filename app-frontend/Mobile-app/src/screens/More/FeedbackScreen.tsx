import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const FeedbackScreen = () => {
    const [message, setMessage] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback</Text>

            <TextInput
                style={styles.input}
                placeholder="Write your feedback here..."
                multiline
                value={message}
                onChangeText={setMessage}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        height: 120,
        padding: 10,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#ff6b00",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
