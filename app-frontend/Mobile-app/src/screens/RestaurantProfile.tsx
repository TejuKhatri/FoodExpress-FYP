import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainStack";

export default function RestaurantProfile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ Top Bar – same structure as Home */}
      <View style={styles.topBar}>
        <View style={styles.brandContainer}>
          <Ionicons name="storefront-outline" size={26} color="#111" />
          <Text style={styles.brandText}>Restaurant Profile</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Food Express Pokhara</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>9898546238</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>Lakeside, Pokhara</Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutBtn}
          activeOpacity={0.85}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* ✅ Home-like top bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop:
      Platform.OS === "android"
        ? (StatusBar.currentHeight || 0) + 10
        : 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  brandText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
  },

  content: {
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  row: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#777",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  signOutBtn: {
    marginTop: "auto",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
  },

  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
