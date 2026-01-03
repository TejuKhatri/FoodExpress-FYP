import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useCart, FoodItem } from "../Context/CartContext";

const DELIVERY_FEE = 2;

type RootStackParamList = {
  Cart: undefined;
  Order: undefined;
};

type CartItemWithQty = FoodItem & { quantity: number };

const CartScreen: React.FC = () => {
  const { cartItems, foodList, removeFromCart, addToCart, getTotalCartAmount } =
    useCart();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [promoCode, setPromoCode] = useState<string>("");

  const cartList: CartItemWithQty[] = useMemo(() => {
    return foodList
      .map((item) => ({
        ...item,
        quantity: Number(cartItems[item._id] ?? 0),
      }))
      .filter((i) => i.quantity > 0);
  }, [foodList, cartItems]);

  const subtotal = Number(getTotalCartAmount());
  const deliveryFee = subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>

        <FlatList
          data={cartList}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
          contentContainerStyle={cartList.length === 0 ? styles.emptyContainer : undefined}
          renderItem={({ item }) => {
            const lineTotal = item.price * item.quantity;

            return (
              <View style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  <View style={styles.metaRow}>
                    <Text style={styles.itemMeta}>${item.price}</Text>
                    <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
                  </View>

                  <Text style={styles.itemTotal}>Total: ${lineTotal.toFixed(2)}</Text>

                  <View style={styles.qtyRow}>
                    <Pressable style={styles.qtyBtn} onPress={() => removeFromCart(item._id)}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </Pressable>
                    <Pressable style={styles.qtyBtn} onPress={() => addToCart(item._id)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable onPress={() => removeFromCart(item._id)} style={styles.removeBtn}>
                  <Text style={styles.removeBtnText}>x</Text>
                </Pressable>
              </View>
            );
          }}
        />

        <View style={styles.bottomCard}>
          <Text style={styles.sectionTitle}>Cart Totals</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Delivery Fee</Text>
            <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

          <Pressable
            style={[styles.checkoutBtn, subtotal === 0 ? styles.checkoutBtnDisabled : null]}
            onPress={() => navigation.navigate("Order")}
            disabled={subtotal === 0}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          </Pressable>

          <View style={styles.promoBox}>
            <Text style={styles.promoText}>
              If you have a promo code, enter it here to apply.
            </Text>

            <View style={styles.promoRow}>
              <TextInput
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="Promo code"
                style={styles.promoInput}
              />
              <Pressable style={styles.promoBtn}>
                <Text style={styles.promoBtnText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },

  emptyContainer: { flexGrow: 1, justifyContent: "center" },
  empty: { textAlign: "center", fontSize: 16, opacity: 0.6 },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 12,
  },
  itemImage: { width: 60, height: 60, borderRadius: 10, backgroundColor: "#f2f2f2" },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  itemMeta: { fontSize: 13, opacity: 0.7 },
  itemTotal: { marginTop: 6, fontSize: 14, fontWeight: "600" },

  qtyRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "800" },

  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: { fontSize: 18, fontWeight: "700" },

  bottomCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fafafa",
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  label: { fontSize: 14, opacity: 0.75 },
  value: { fontSize: 14, fontWeight: "600" },

  divider: { height: 1, backgroundColor: "#e6e6e6", marginVertical: 10 },

  totalLabel: { fontSize: 16, fontWeight: "800" },
  totalValue: { fontSize: 16, fontWeight: "800" },

  checkoutBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#111",
  },
  checkoutBtnDisabled: { opacity: 0.45 },
  checkoutBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },

  promoBox: { marginTop: 14 },
  promoText: { fontSize: 13, opacity: 0.7, marginBottom: 10 },
  promoRow: { flexDirection: "row", gap: 10 },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  promoBtn: {
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  promoBtnText: { color: "#fff", fontWeight: "700" },
});
