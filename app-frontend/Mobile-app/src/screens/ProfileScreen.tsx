// ProfileScreen.tsx (UI like your figure: MY PROFILE + avatar + email/phone + EDIT PROFILE + menu list)
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainStack";

type MenuItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  onPress?: () => void;
};

const YELLOW = "#f2b705";

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const menu: MenuItem[] = [
    {
      id: "fav",
      title: "My Favorites",
      icon: "heart",
      iconColor: "#ff6b6b",
      onPress: () => navigation.navigate("Favorites" as never),
    },
    {
      id: "orders",
      title: "Order History",
      icon: "receipt",
      iconColor: "#37b4ff",
      onPress: () => navigation.navigate("OrderHistory" as never),
    },
    {
      id: "address",
      title: "Manage Delivery Address",
      icon: "location",
      iconColor: "#f5b041",
      onPress: () => navigation.navigate("ManageAddress" as never),
    },
    {
      id: "voucher",
      title: "Voucher Vault",
      icon: "ticket",
      iconColor: "#ff9966",
      onPress: () => navigation.navigate("VoucherVault" as never),
    },
  ];

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.row} onPress={item.onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconCircle, { backgroundColor: `${item.iconColor}22` }]}>
          <Ionicons name={item.icon} size={22} color={item.iconColor} />
        </View>
        <Text style={styles.rowText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>


      <TouchableOpacity
        style={styles.logoutIconBtn}
        onPress={() => {
          // If you want logout:
          // navigation.reset({ index: 0, routes: [{ name: "Login" as never }] });
          // Or open settings:
          navigation.navigate("Login" as never);
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={22} color="#111" />
      </TouchableOpacity>

      {/* Profile info block */}
      <View style={styles.profileBlock}>
        <View style={styles.avatarWrap}>
          <Image
            source={require("../assets/profile_image.png")}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.name}>Teju Khatri</Text>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={18} color="#444" />
          <Text style={styles.infoText}>biduthkhatri33@gmail.com</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={18} color="#444" />
          <Text style={styles.infoText}>9803782949</Text>
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("EditProfile" as never)}
          activeOpacity={0.85}
        >
          <Text style={styles.editBtnText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>

      {/* Menu list */}
      <FlatList
        data={menu}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    letterSpacing: 0.5,
  },
  logoutIconBtn: {
    position: "absolute",
    right: 16,
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 14 : 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    
  },

  profileBlock: {
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  avatarWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.9,
  },

  name: { fontSize: 20, fontWeight: "800", color: "#111", marginBottom: 8 },

  infoRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  infoText: { color: "#444", fontSize: 15 },

  editBtn: {
    marginTop: 18,
    width: "78%",
    height: 46,
    borderRadius: 23,
    backgroundColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtnText: { fontWeight: "900", color: "#111", letterSpacing: 0.5 },

  listContent: {
    paddingTop: 8,
    paddingBottom: 24, // keeps space above bottom tabs
    backgroundColor: "#fff",
  },

  row: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: { fontSize: 16, color: "#333", fontWeight: "500" },

  sep: { height: 1, backgroundColor: "#eeeeee", marginLeft: 70 },
});
