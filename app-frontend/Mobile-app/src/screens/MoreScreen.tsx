// MoreScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MoreItem = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export default function MoreScreen({ navigation }: any) {
  const items: MoreItem[] = [
    {
      id: "feedback",
      title: "Feedback",
      icon: "chatbubble-ellipses-outline",
      onPress: () => navigation.navigate("FeedbackScreen"),
    },
    {
      id: "faqs",
      title: "FAQs",
      icon: "information-circle-outline",
      onPress: () => navigation.navigate("FAQScreen"),
    },
    {
      id: "about",
      title: "About FoodExpress",
      icon: "information-circle-outline",
      onPress: () => navigation.navigate("AboutFoodExpressScreen"),
    },
    {
      id: "delivery",
      title: "Delivery Charge",
      icon: "cash-outline",
      onPress: () => navigation.navigate("DeliveryChargeScreen"),
    },
    {
      id: "terms",
      title: "Terms and Conditions",
      icon: "document-text-outline",
      onPress: () => navigation.navigate("TermsScreen"),
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "shield-checkmark-outline",
      onPress: () => navigation.navigate("PrivacyPolicyScreen"),
    },
  ];

  const openPhone = () => {
    const phone = "+9779800000000"; // change
    Linking.openURL(`tel:${phone}`);
  };

  const openChat = () => {
    // navigate to your chat screen OR open WhatsApp/Messenger
    navigation?.navigate?.("SupportChat");
  };

  const socials = [
    { id: "facebook", icon: "logo-facebook", url: "https://facebook.com" },
    { id: "x", icon: "logo-twitter", url: "https://x.com" },
    { id: "instagram", icon: "logo-instagram", url: "https://instagram.com" },
    { id: "linkedin", icon: "logo-linkedin", url: "https://linkedin.com" },
    { id: "tiktok", icon: "logo-tiktok", url: "https://tiktok.com" },
    { id: "youtube", icon: "logo-youtube", url: "https://youtube.com" },
  ] as const;

  const renderItem = ({ item }: { item: MoreItem }) => (
    <TouchableOpacity style={styles.row} onPress={item.onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <Ionicons name={item.icon} size={22} color="#222" />
        <Text style={styles.rowText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>


      {/* List */}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={styles.listContent}
      />

      {/* Bottom Area (buttons + socials + version) */}
      <View style={styles.bottomArea}>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.outlineBtn} onPress={openPhone} activeOpacity={0.8}>
            <Ionicons name="call-outline" size={18} color="#222" />
            <Text style={styles.btnText}>Call Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn} onPress={openChat} activeOpacity={0.8}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#222" />
            <Text style={styles.btnText}>Chat With Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialRow}>
          {socials.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.socialBtn}
              onPress={() => Linking.openURL(s.url)}
              activeOpacity={0.8}
            >
              <Ionicons name={s.icon} size={26} color="#111" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>Version 1.0.0 © FoodExpress Pvt. Ltd.</Text>

        {/* Extra spacing so it doesn't touch bottom tabs */}
        <View style={{ height: Platform.OS === "ios" ? 10 : 6 }} />
      </View>
    </SafeAreaView>
  );
}

const YELLOW = "#f2b705";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", letterSpacing: 1, color: "#111" },

  listContent: {
    paddingTop: 4,
    paddingBottom: 220, // leaves space for bottomArea (like screenshot)
  },

  row: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { fontSize: 16, color: "#111", fontWeight: "500" },

  sep: { height: 1, backgroundColor: "#eeeeee" },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  btnRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 12,
  },
  outlineBtn: {
    flex: 1,
    maxWidth: 190,
    height: 46,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: YELLOW,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#fff",
  },
  btnText: { fontSize: 15, fontWeight: "700", color: "#111" },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  socialBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  version: {
    textAlign: "center",
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },
});
