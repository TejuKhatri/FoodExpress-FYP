import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const notifications = [
    { id: 1, message: "New order received from Pizza Palace." },
    { id: 2, message: "Sushi House menu updated." },
    { id: 3, message: "New customer signed up." },
    { id: 4, message: "Burger King received 5-star rating." },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.content}>
        {notifications.map((n) => (
          <View key={n.id} style={styles.notificationCard}>
            <Text style={styles.notificationText}>{n.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 50,
    backgroundColor: "#ff6600",
  },
  headerTitle: { flex: 1, textAlign: "center", color: "white", fontSize: 20, fontWeight: "bold" },
  closeButton: { width: 28 },

  content: {
    padding: 20,
  },

  notificationCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  notificationText: { fontSize: 16, color: "#333" },
});
