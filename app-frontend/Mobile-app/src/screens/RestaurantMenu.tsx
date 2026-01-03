import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantMenu({ navigation }: any) {
  const menu = [
    { id: "1", name: "Chicken Burger", price: 250 },
    { id: "2", name: "Pizza Slice", price: 150 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ Top Bar like Home (title left, icon right) */}
      <View style={styles.topBar}>
        <View style={styles.brandContainer}>
          <Ionicons name="restaurant-outline" size={26} color="#111" />
          <Text style={styles.brandText}>Your Menu</Text>
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate("RestaurantAddItem")}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#111" />
        </TouchableOpacity>
      </View>

      {/* ✅ Menu List */}
      <FlatList
        data={menu}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>Rs. {item.price}</Text>
            </View>
          </View>
        )}
      />

      {/* ✅ Bottom button (same action as + icon) */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("RestaurantAddItem")}
        activeOpacity={0.85}
      >
        <Text style={styles.addText}>+ Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  /* ✅ Home-like top bar */
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

  listContent: { padding: 16, paddingBottom: 90 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  itemName: { fontSize: 16, fontWeight: "800", color: "#111" },
  price: { marginTop: 6, fontSize: 13, color: "#777", fontWeight: "600" },

  /* ✅ Bottom Add Button */
  addBtn: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
