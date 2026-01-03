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

// ✅ 15 RESTAURANTS + MENUS (you can edit names/prices)
const restaurants = [
  {
    id: "r1",
    name: "Mo:Mo Corner",
    categories: ["Mo:Mo", "Nepali"],
    tags: ["HAPPY_HOUR", "COMBO"],
    isNew: false,
    menu: [
      { id: "m1", name: "Buff Mo:Mo", price: 180, category: "Mo:Mo" },
      { id: "m2", name: "Chicken Mo:Mo", price: 220, category: "Mo:Mo" },
      { id: "m3", name: "Thukpa", price: 190, category: "Nepali" },
    ],
  },
  {
    id: "r2",
    name: "Everest Mo:Mo Hub",
    categories: ["Mo:Mo"],
    tags: ["NEW"],
    isNew: true,
    menu: [
      { id: "m4", name: "Jhol Mo:Mo", price: 230, category: "Mo:Mo" },
      { id: "m5", name: "Fried Mo:Mo", price: 210, category: "Mo:Mo" },
    ],
  },
  {
    id: "r3",
    name: "Indian Spice House",
    categories: ["Indian"],
    tags: ["COMBO"],
    isNew: false,
    menu: [
      { id: "m6", name: "Butter Chicken", price: 420, category: "Indian" },
      { id: "m7", name: "Paneer Masala", price: 380, category: "Indian" },
      { id: "m8", name: "Naan", price: 60, category: "Indian" },
    ],
  },
  {
    id: "r4",
    name: "Bombay Biryani",
    categories: ["Indian", "Biryani"],
    tags: ["HAPPY_HOUR"],
    isNew: false,
    menu: [
      { id: "m9", name: "Chicken Biryani", price: 350, category: "Biryani" },
      { id: "m10", name: "Veg Biryani", price: 280, category: "Biryani" },
    ],
  },
  {
    id: "r5",
    name: "KFC Lakeside",
    categories: ["Burger", "Fried Chicken"],
    tags: ["TIME_LIMITED", "COMBO"],
    isNew: false,
    menu: [
      { id: "m11", name: "Zinger Burger", price: 450, category: "Burger" },
      { id: "m12", name: "Chicken Bucket", price: 980, category: "Fried Chicken" },
    ],
  },
  {
    id: "r6",
    name: "Pizza Palace",
    categories: ["Pizza", "Italian"],
    tags: ["NEW", "COMBO"],
    isNew: true,
    menu: [
      { id: "m13", name: "Margherita Pizza", price: 420, category: "Pizza" },
      { id: "m14", name: "Pepperoni Pizza", price: 520, category: "Pizza" },
    ],
  },
  {
    id: "r7",
    name: "Burger Hub",
    categories: ["Burger"],
    tags: ["HAPPY_HOUR"],
    isNew: false,
    menu: [
      { id: "m15", name: "Classic Burger", price: 280, category: "Burger" },
      { id: "m16", name: "Cheese Burger", price: 320, category: "Burger" },
    ],
  },
  {
    id: "r8",
    name: "Chinese Wok",
    categories: ["Chinese"],
    tags: ["COMBO"],
    isNew: false,
    menu: [
      { id: "m17", name: "Chicken Chowmein", price: 200, category: "Chinese" },
      { id: "m18", name: "Veg Fried Rice", price: 180, category: "Chinese" },
    ],
  },
  {
    id: "r9",
    name: "Thakali Kitchen",
    categories: ["Thakali", "Nepali"],
    tags: ["NEW"],
    isNew: true,
    menu: [{ id: "m19", name: "Thakali Set", price: 450, category: "Thakali" }],
  },
  {
    id: "r10",
    name: "Newari Bhoj",
    categories: ["Newari"],
    tags: [],
    isNew: false,
    menu: [{ id: "m20", name: "Choila Set", price: 380, category: "Newari" }],
  },
  {
    id: "r11",
    name: "Cafe Coffee Spot",
    categories: ["Cafe"],
    tags: ["HAPPY_HOUR"],
    isNew: true,
    menu: [
      { id: "m21", name: "Cappuccino", price: 180, category: "Cafe" },
      { id: "m22", name: "Latte", price: 200, category: "Cafe" },
    ],
  },
  {
    id: "r12",
    name: "Dessert Heaven",
    categories: ["Dessert"],
    tags: ["COMBO"],
    isNew: false,
    menu: [
      { id: "m23", name: "Chocolate Cake", price: 250, category: "Dessert" },
      { id: "m24", name: "Ice Cream Sundae", price: 220, category: "Dessert" },
    ],
  },
  {
    id: "r13",
    name: "BBQ Nation Express",
    categories: ["BBQ"],
    tags: ["NEW", "COMBO"],
    isNew: true,
    menu: [{ id: "m25", name: "BBQ Chicken", price: 520, category: "BBQ" }],
  },
  {
    id: "r14",
    name: "Healthy Bites",
    categories: ["Healthy"],
    tags: ["NEW"],
    isNew: true,
    menu: [{ id: "m26", name: "Grilled Chicken Salad", price: 340, category: "Healthy" }],
  },
  {
    id: "r15",
    name: "Street Snacks Nepal",
    categories: ["Snacks"],
    tags: ["HAPPY_HOUR"],
    isNew: false,
    menu: [
      { id: "m27", name: "Pani Puri", price: 120, category: "Snacks" },
      { id: "m28", name: "Chatpate", price: 100, category: "Snacks" },
    ],
  },
];

type Props = {
  navigation: any;
  route: any;
};

export default function RestaurantListScreen({ navigation, route }: Props) {
  // You will send these from CustomerHome when clicking highlights / mind items
  const { filter, category } = route.params || {}; 
  // filter: "ALL" | "HAPPY_HOUR" | "NEW" | "COMBO" | "TIME_LIMITED" | "CATEGORY"
  // category: "Mo:Mo" | "Indian" | "Pizza" ...

  const screenTitle = useMemo(() => {
    if (filter === "ALL") return "All Restaurants";
    if (filter === "HAPPY_HOUR") return "Happy Hours";
    if (filter === "NEW") return "New Arrivals";
    if (filter === "COMBO") return "Combo Packs";
    if (filter === "TIME_LIMITED") return "Limited Time";
    if (filter === "CATEGORY" && category) return category;
    return "Restaurants";
  }, [filter, category]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      if (!filter || filter === "ALL") return true;

      if (filter === "HAPPY_HOUR") return r.tags.includes("HAPPY_HOUR");
      if (filter === "NEW") return r.isNew || r.tags.includes("NEW");
      if (filter === "COMBO") return r.tags.includes("COMBO");
      if (filter === "TIME_LIMITED") return r.tags.includes("TIME_LIMITED");

      if (filter === "CATEGORY" && category) {
        // show restaurants that provide that category
        return r.categories.includes(category);
      }
      return true;
    });
  }, [filter, category]);

  const renderMenuItem = (item: any) => (
    <View style={styles.menuRow}>
      <Text style={styles.menuName}>{item.name}</Text>
      <Text style={styles.menuPrice}>Rs. {item.price}</Text>
    </View>
  );

  const renderRestaurantCard = ({ item }: any) => {
    // If user clicks category (Mo:Mo/Indian), show only that category menu inside restaurant
    const menuToShow =
      filter === "CATEGORY" && category
        ? item.menu.filter((m: any) => m.category === category)
        : item.menu;

    return (
      <View style={styles.restaurantCard}>
        {/* Restaurant Header Row */}
        <TouchableOpacity
          style={styles.restaurantTop}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("RestaurantDetails", {
              restaurant: item,
              category: filter === "CATEGORY" ? category : undefined,
            })
          }
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantCuisine}>{item.categories.join(" • ")}</Text>

            {/* small chips */}
            <View style={styles.chipRow}>
              {item.tags?.includes("HAPPY_HOUR") ? <Text style={styles.chip}>Happy Hour</Text> : null}
              {item.tags?.includes("COMBO") ? <Text style={styles.chip}>Combo</Text> : null}
              {item.tags?.includes("TIME_LIMITED") ? <Text style={styles.chip}>Limited</Text> : null}
              {item.isNew ? <Text style={styles.chip}>New</Text> : null}
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Menu Preview inside restaurant card */}
        <View style={styles.menuBox}>
          <Text style={styles.menuTitle}>Menu</Text>

          {menuToShow.length === 0 ? (
            <Text style={styles.noMenuText}>No items for this category</Text>
          ) : (
            menuToShow.slice(0, 4).map((m: any) => (
              <View key={m.id}>{renderMenuItem(m)}</View>
            ))
          )}

          {menuToShow.length > 4 ? (
            <Text style={styles.moreText}>+ {menuToShow.length - 4} more items</Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ CUSTOM HEADER (All Restaurant UI) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{screenTitle}</Text>
      </View>

      {/* ✅ LIST */}
      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderRestaurantCard}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="restaurant-outline" size={40} color="#999" />
            <Text style={styles.emptyTitle}>No restaurants found</Text>
            <Text style={styles.emptySub}>Try a different category or filter.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 12 : 12,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  backBtn: { marginRight: 12, padding: 6 },

  headerTitle: { fontSize: 18, fontWeight: "800", color: "#111" },

  listContent: { paddingTop: 16, paddingHorizontal: 16, paddingBottom: 24 },

  restaurantCard: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    backgroundColor: "#fff",
    marginBottom: 14,
    overflow: "hidden",
  },

  restaurantTop: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  restaurantName: { fontSize: 16, fontWeight: "800", color: "#111" },
  restaurantCuisine: { marginTop: 4, fontSize: 12, color: "#666" },

  chipRow: { flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" },
  chip: {
    fontSize: 11,
    color: "#111",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },

  menuBox: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 10,
    backgroundColor: "#fafafa",
  },

  menuTitle: { fontSize: 13, fontWeight: "900", color: "#111", marginBottom: 8 },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  menuName: { fontSize: 13, color: "#111", fontWeight: "600" },
  menuPrice: { fontSize: 13, color: "#ff6347", fontWeight: "800" },

  moreText: { marginTop: 8, fontSize: 12, color: "#666", fontWeight: "700" },
  noMenuText: { fontSize: 12, color: "#777" },

  emptyWrap: { padding: 30, alignItems: "center" },
  emptyTitle: { marginTop: 10, fontSize: 16, fontWeight: "900", color: "#111" },
  emptySub: { marginTop: 6, fontSize: 13, color: "#666", textAlign: "center" },
});
