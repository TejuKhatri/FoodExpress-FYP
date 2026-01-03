import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
    const navigation = useNavigation();

    // Temporary local state (later you can connect API / Context)
    const [name, setName] = useState("Teju Khatri");
    const [email, setEmail] = useState("Teju@email.com");
    const [phone, setPhone] = useState("98XXXXXXXX");
    const [address, setAddress] = useState("Pokhara, Nepal");

    const handleSave = () => {
        // TODO: API call / Context update
        console.log({ name, email, phone, address });
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
                multiline
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 15,
    },
    saveBtn: {
        backgroundColor: "#ff6347",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 10,
    },
    saveText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});
