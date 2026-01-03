import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
} from "react-native";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/MainStack";

WebBrowser.maybeCompleteAuthSession();

type LoginNav = NativeStackNavigationProp<RootStackParamList, "Login">;
type Props = { navigation: LoginNav };

const API_BASE = "http://192.168.1.70:8000";

// 🔴 PUT REAL IDS HERE
const GOOGLE_EXPO_CLIENT_ID =
  "YOUR_GOOGLE_EXPO_CLIENT_ID.apps.googleusercontent.com";
const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const API_LOGIN = `${API_BASE}/api/login/`;
  const API_GOOGLE = `${API_BASE}/api/oauth/google/`;
  const API_FACEBOOK = `${API_BASE}/api/oauth/facebook/`;

  /* ---------------- NORMAL LOGIN ---------------- */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter username and password");
      return;
    }

    try {
      const res = await axios.post(API_LOGIN, {
        username: email,
        password,
      });
      routeByRole(res.data);
    } catch (e: any) {
      Alert.alert("Login failed", e?.response?.data?.error || e.message);
    }
  };

  /* ---------------- GOOGLE LOGIN (FIXED) ---------------- */
  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      expoClientId: GOOGLE_EXPO_CLIENT_ID, // ✅ correct for Expo Go
      scopes: ["profile", "email"],
    });

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const accessToken = googleResponse.authentication?.accessToken;

      if (!accessToken) {
        Alert.alert("Error", "Google token missing");
        return;
      }

      axios
        .post(API_GOOGLE, { access_token: accessToken })
        .then((res) => routeByRole(res.data))
        .catch((e) =>
          Alert.alert(
            "Google login failed",
            e?.response?.data?.error || e.message
          )
        );
    }
  }, [googleResponse]);

  /* ---------------- FACEBOOK LOGIN (FIXED) ---------------- */
  const handleFacebookLogin = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const authUrl =
        "https://www.facebook.com/v18.0/dialog/oauth" +
        `?client_id=${FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=token` +
        `&scope=email,public_profile`;

      // ✅ use promptAsync, NOT startAsync
      const result = await AuthSession.promptAsync({ authUrl });

      if (result.type !== "success") {
        Alert.alert("Cancelled", "Facebook login cancelled");
        return;
      }

      const accessToken = (result as any)?.params?.access_token;
      if (!accessToken) {
        Alert.alert("Error", "Facebook token missing");
        return;
      }

      const res = await axios.post(API_FACEBOOK, {
        access_token: accessToken,
      });
      routeByRole(res.data);
    } catch (e: any) {
      Alert.alert("Facebook login failed", e.message);
    }
  };

  /* ---------------- ROLE ROUTING ---------------- */
  const routeByRole = (data: any) => {
    Alert.alert("Success", data?.message || "Login successful");

    if (data.role === "customer") navigation.replace("CustomerDashboard");
    else if (data.role === "vendor") navigation.replace("RestaurantDashboard");
    else if (data.role === "delivery") navigation.replace("DeliveryDashboard");
    else if (data.role === "admin")
      Alert.alert("Admin", "Login from web admin panel");
    else Alert.alert("Error", "Unknown role");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.rowBetween}>
          <View style={styles.rememberRow}>
            <Switch value={remember} onValueChange={setRemember} />
            <Text>Remember me</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.or}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialBtn}
            disabled={!googleRequest}
            onPress={() => googlePromptAsync()}
          >
            <Text>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={handleFacebookLogin}
          >
            <Text>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { width: "90%", padding: 28, backgroundColor: "#fff", borderRadius: 25 },
  logo: { width: 70, height: 70, alignSelf: "center", marginBottom: 20 },
  title: { fontSize: 28, textAlign: "center", fontWeight: "bold" },
  subtitle: { textAlign: "center", marginBottom: 20, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between" },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: { color: "white", textAlign: "center", fontWeight: "600" },
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: "#ccc" },
  or: { marginHorizontal: 10 },
  socialRow: { flexDirection: "row", justifyContent: "space-between" },
  socialBtn: {
    width: "48%",
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
  },
});
