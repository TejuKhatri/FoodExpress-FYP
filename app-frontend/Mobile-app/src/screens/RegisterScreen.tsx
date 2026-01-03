import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/MainStack";

type RegisterNav = NativeStackNavigationProp<RootStackParamList, "Register">;
type Props = { navigation: RegisterNav };

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ NEW: role state (customer / vendor / delivery)
  const [role, setRole] = useState<"customer" | "vendor" | "delivery">("customer");

  // ✅ You are using Expo on phone, so use your PC IP
  const API_URL = "http://192.168.1.70:8000/api/register/";

  const handleRegister = async () => {
    if (!username || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await axios.post(API_URL, {
        username,
        email,
        phone,
        password,
        role, // ✅ SEND role to backend
      });

      Alert.alert("Success", "Account created", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed. Try again.";
      Alert.alert("Error", msg);
    }
  };

  // 🔁 common props for all inputs (to avoid repeating code)
  const commonInputProps = {
    style: styles.input,
    placeholderTextColor: "#999",
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Register a new account</Text>

        <TextInput
          {...commonInputProps}
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          {...commonInputProps}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          {...commonInputProps}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          {...commonInputProps}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          {...commonInputProps}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* ✅ NEW: Role Selection Frame */}
        <Text style={styles.roleLabel}>Register As</Text>

        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[styles.roleBtn, role === "customer" && styles.roleActive]}
            onPress={() => setRole("customer")}
          >
            <Text
              style={[styles.roleText, role === "customer" && styles.roleTextActive]}
            >
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, role === "vendor" && styles.roleActive]}
            onPress={() => setRole("vendor")}
          >
            <Text style={[styles.roleText, role === "vendor" && styles.roleTextActive]}>
              Restaurant
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, role === "delivery" && styles.roleActive]}
            onPress={() => setRole("delivery")}
          >
            <Text
              style={[styles.roleText, role === "delivery" && styles.roleTextActive]}
            >
              Delivery
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.or}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={require("../assets/google_icon.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={require("../assets/facebook.png.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 28,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 4,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
  },

  // ✅ Role styles
  roleLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  roleActive: {
    backgroundColor: "black",
    borderColor: "black",
  },
  roleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "black",
  },
  roleTextActive: {
    color: "white",
  },

  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  or: {
    marginHorizontal: 10,
    color: "#555",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialBtn: {
    width: "48%",
    padding: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
  },
  signupText: {
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
  link: {
    fontWeight: "bold",
    color: "black",
  },
});
