import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantOrders() {
  const orders = [
    { id: "1", customer: "John", item: "Burger", status: "Pending" },
    { id: "2", customer: "Sita", item: "Pizza", status: "Preparing" },
    { id: "3", customer: "Ram", item: "Momo", status: "Completed" },
  ];

  const renderItem = ({
    item,
  }: {
    item: { id: string; customer: string; item: string; status: string };
  }) => {
    const pillStyle =
      item.status === "Completed"
        ? styles.pillCompleted
        : item.status === "Preparing"
          ? styles.pillPreparing
          : styles.pillPending;

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.leftInfo}>
            <Ionicons name="person-circle-outline" size={30} color="#111" />
            <View>
              <Text style={styles.customer}>{item.customer}</Text>
              <Text style={styles.orderItem}>{item.item}</Text>
            </View>
          </View>

          <View style={[styles.pill, pillStyle]}>
            <Text style={styles.pillText}>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ Top Bar like Home screen style (logo/text left, icon right) */}
      <View style={styles.topBar}>
        <View style={styles.brandContainer}>
          <Ionicons name="restaurant-outline" size={26} color="#111" />
          <Text style={styles.brandText}>Restaurant Orders</Text>
        </View>

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.85}>
          <Ionicons name="refresh" size={20} color="#111" />
        </TouchableOpacity>
      </View>

      {/* ✅ List */}
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyWrap}>
            <Ionicons name="receipt-outline" size={50} color="#bbb" />
            <Text style={styles.emptyTitle}>No incoming orders</Text>
            <Text style={styles.emptySub}>New orders will appear here.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* ✅ Home screen-like top bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  brandContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandText: { fontSize: 18, fontWeight: "900", color: "#111" },

  iconBtn: {
    marginLeft: "auto",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
  },

  listContent: { padding: 16, paddingBottom: 24 },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  leftInfo: { flexDirection: "row", alignItems: "center", gap: 10 },

  customer: { fontSize: 16, fontWeight: "800", color: "#111" },
  orderItem: { fontSize: 13, color: "#777", marginTop: 2, fontWeight: "600" },

  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pillText: { fontSize: 12, fontWeight: "800", color: "#fff" },
  pillPending: { backgroundColor: "#e67e22" },
  pillPreparing: { backgroundColor: "#2980b9" },
  pillCompleted: { backgroundColor: "#27ae60" },

  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyTitle: { fontSize: 18, fontWeight: "900", color: "#222", marginTop: 10 },
  emptySub: { fontSize: 14, color: "#888", marginTop: 6 },
});
