// screens/RestaurantDetailsScreen.tsx
import React, { useMemo } from "react";
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

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type Restaurant = {
  id: string;
  name: string;
  categories: string[];
  menu: MenuItem[];
};

export default function RestaurantDetailsScreen({ navigation, route }: any) {
  const { restaurant, category } = route.params || {};

  const menuItems: MenuItem[] = useMemo(() => {
    if (!restaurant) return [];
    if (!category) return restaurant.menu;
    return restaurant.menu.filter((m: MenuItem) => m.category === category);
  }, [restaurant, category]);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Restaurant</Text>
        </View>

        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Restaurant not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {restaurant.name}
          </Text>
          <Text numberOfLines={1} style={styles.headerSub}>
            {restaurant.categories.join(" • ")}
          </Text>
        </View>
      </View>

      {/* ✅ MENU LIST */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No menu items found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.menuCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <Text style={styles.price}>Rs. {item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: Platform.OS === "android"
      ? (StatusBar.currentHeight || 12)
      : 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  backBtn: {
    padding: 6,
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111",
  },

  headerSub: {
    marginTop: 2,
    fontSize: 12,
    color: "#666",
  },

  listContent: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },

  itemName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111",
  },

  itemCategory: {
    marginTop: 4,
    fontSize: 12,
    color: "#777",
  },

  price: {
    fontSize: 14,
    fontWeight: "900",
    color: "#ff6347",
  },

  emptyWrap: {
    padding: 30,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
});
