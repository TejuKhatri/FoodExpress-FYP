import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useCart, FoodItem } from "../Context/CartContext";

const menu: FoodItem[] = [
  { _id: "1", name: "Chicken Burger", price: 250, image: "https://via.placeholder.com/100" },
  { _id: "2", name: "Pizza Slice", price: 150, image: "https://via.placeholder.com/100" },
  { _id: "3", name: "French Fries", price: 100, image: "https://via.placeholder.com/100" },
];

export default function MenuScreen() {
  const { addToCart, removeFromCart, cartItems, setFoodList } = useCart();

  // ✅ VERY IMPORTANT: put menu into global context so Cart can display it
  useEffect(() => {
    setFoodList(menu);
  }, [setFoodList]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Menu Items</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => {
          const qty = cartItems[item._id] ?? 0;

          return (
            <View style={styles.card}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rs. {item.price}</Text>
              </View>

              {qty === 0 ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item._id)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.qtyBox}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => removeFromCart(item._id)}
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyNumber}>{qty}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => addToCart(item._id)}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6600",
    paddingTop: StatusBar.currentHeight || 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 15,
  },
  flatListContent: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPrice: { fontSize: 16, color: "gray", marginTop: 5 },

  addButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#e9e9e9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  qtyBtn: {
    backgroundColor: "green",
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  qtyNumber: { fontSize: 16, fontWeight: "bold", minWidth: 18, textAlign: "center" },
});
