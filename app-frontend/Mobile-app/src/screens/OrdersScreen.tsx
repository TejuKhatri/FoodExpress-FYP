import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type TabType = "All" | "General" | "Order" | "Offers";

export default function CartScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("Order");

  const tabs: { key: TabType; icon: string }[] = [
    { key: "All", icon: "notifications-outline" },
    { key: "General", icon: "mail-outline" },
    { key: "Order", icon: "cube-outline" },
    { key: "Offers", icon: "pricetag-outline" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconCircle,
                  isActive && styles.iconCircleActive,
                ]}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={22}
                  color={isActive ? "#fff" : "#999"}
                />
              </View>
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                ]}
              >
                {tab.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="mail-outline" size={36} color="#bbb" />
        </View>

        <Text style={styles.emptyTitle}>No notification found</Text>
        <Text style={styles.emptySubtitle}>
          You have currently no notification.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    letterSpacing: 0.6,
  },

  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tabItem: { alignItems: "center" },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  iconCircleActive: {
    backgroundColor: "#1e88e5",
  },

  tabText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#111",
    fontWeight: "700",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
