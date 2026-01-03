// Mobile-app/src/screens/CustomerHome.tsx
import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
} from "react-native";

const { width } = Dimensions.get("window");

// ------------------ DATA ------------------
const highlights = [
  { id: "h1", title: "All\nRestaurant", icon: require("../assets/food_1.png") },
  { id: "h2", title: "Happy Hour", icon: require("../assets/food_2.png") },
  { id: "h3", title: "Combo Pack", icon: require("../assets/food_3.png") },
  { id: "h4", title: "New Arrivals", icon: require("../assets/food_4.png") },
];

const bannerSlides = [
  {
    id: "b1",
    img: require("../assets/food_1.png"),
    title: "Indulge in flavors",
    cta: "ORDER NOW",
  },
  {
    id: "b2",
    img: require("../assets/food_2.png"),
    title: "Combo deals today",
    cta: "ORDER NOW",
  },
  {
    id: "b3",
    img: require("../assets/food_3.png"),
    title: "Fresh & fast delivery",
    cta: "ORDER NOW",
  },
];

const mindCategories = [
  { id: "c1", title: "Mo:Mo", img: require("../assets/food_1.png") },
  { id: "c2", title: "Indian", img: require("../assets/food_2.png") },
  { id: "c3", title: "Fried Chicken", img: require("../assets/food_3.png") },
  { id: "c4", title: "Chowmein", img: require("../assets/food_4.png") },
  { id: "c5", title: "Burger", img: require("../assets/food_5.png") },
  { id: "c6", title: "Pizza", img: require("../assets/food_6.png") },
  { id: "c7", title: "Sushi", img: require("../assets/food_7.png") },
  { id: "c8", title: "Desserts", img: require("../assets/food_1.png") },
  { id: "c9", title: "Drinks", img: require("../assets/food_2.png") },
];

const spotlight = {
  left: { title: "ENCHILADAS", img: require("../assets/food_6.png") },
  right: { title: "AGLIO E OLIO", img: require("../assets/food_7.png") },
  restaurant: {
    name: "The Agave Mexican Restaurant & Bar",
    cuisine: "Mexican",
    location: "Lakeside Pokhara",
    logo: require("../assets/food_1.png"),
  },
};

const brands = [
  {
    id: "m1",
    name: "Byanjan",
    cuisine: "Multicuisine",
    location: "Lakeside Pokhara",
    img: require("../assets/food_2.png"),
    logo: require("../assets/food_3.png"),
  },
  {
    id: "m2",
    name: "Phewa Chicken Point",
    cuisine: "Fast Food",
    location: "Pardi",
    img: require("../assets/food_4.png"),
    logo: require("../assets/food_5.png"),
  },
  {
    id: "m3",
    name: "Hakku Choila",
    cuisine: "Nepali",
    location: "Lakeside",
    img: require("../assets/food_6.png"),
    logo: require("../assets/food_7.png"),
  },
  {
    id: "m4",
    name: "The Pizza House",
    cuisine: "Italian",
    location: "New Road",
    img: require("../assets/food_8.png"),
    logo: require("../assets/food_2.png"),
  },
];

// ✅ Flavors of the World
const flavorsOfWorld = [
  {
    id: "f1",
    title: "Scenarios Restaurant",
    cuisine: "Multi Cuisine",
    location: "Pokhara - 6 Lake Side",
    img: require("../assets/food_1.png"),
    logo: require("../assets/food_2.png"),
  },
  {
    id: "f2",
    title: "Swallow Chinese Restaurant",
    cuisine: "Chinese",
    location: "Baidam road, Lakeside",
    img: require("../assets/food_3.png"),
    logo: require("../assets/food_4.png"),
  },
  {
    id: "f3",
    title: "Emilio’s Pizza at Courtyard",
    cuisine: "Pizza",
    location: "Lakeside",
    img: require("../assets/food_5.png"),
    logo: require("../assets/food_6.png"),
  },
  {
    id: "f4",
    title: "Pokhara Pizza House",
    cuisine: "Italian",
    location: "Lakeside",
    img: require("../assets/food_7.png"),
    logo: require("../assets/food_1.png"),
  },
  {
    id: "f5",
    title: "The Agave Mexican Restaurant & Bar",
    cuisine: "Mexican",
    location: "Lakeside Pokhara",
    img: require("../assets/food_2.png"),
    logo: require("../assets/food_3.png"),
  },
  {
    id: "f6",
    title: "Mo:Mo Corner",
    cuisine: "Nepali",
    location: "Baidam, Lakeside",
    img: require("../assets/food_4.png"),
    logo: require("../assets/food_5.png"),
  },
  {
    id: "f7",
    title: "Thakali Kitchen",
    cuisine: "Thakali",
    location: "Srijana Chowk",
    img: require("../assets/food_6.png"),
    logo: require("../assets/food_7.png"),
  },
  {
    id: "f8",
    title: "Burger Hub",
    cuisine: "Fast Food",
    location: "Chipledhunga",
    img: require("../assets/food_1.png"),
    logo: require("../assets/food_2.png"),
  },
  {
    id: "f9",
    title: "Chowmein Station",
    cuisine: "Chinese",
    location: "New Road",
    img: require("../assets/food_3.png"),
    logo: require("../assets/food_4.png"),
  },
  {
    id: "f10",
    title: "Indian Spice House",
    cuisine: "Indian",
    location: "Lakeside",
    img: require("../assets/food_5.png"),
    logo: require("../assets/food_6.png"),
  },
  {
    id: "f11",
    title: "Sekuwa King",
    cuisine: "BBQ",
    location: "Lakeside",
    img: require("../assets/food_7.png"),
    logo: require("../assets/food_1.png"),
  },
  {
    id: "f12",
    title: "Uncle’s Cafe",
    cuisine: "Cafe",
    location: "Baidam",
    img: require("../assets/food_2.png"),
    logo: require("../assets/food_3.png"),
  },
  {
    id: "f13",
    title: "Pan-Asian Bites",
    cuisine: "Pan-Asian",
    location: "Lakeside",
    img: require("../assets/food_4.png"),
    logo: require("../assets/food_5.png"),
  },
  {
    id: "f14",
    title: "Korean Street Food",
    cuisine: "Korean",
    location: "Lakeside",
    img: require("../assets/food_6.png"),
    logo: require("../assets/food_7.png"),
  },
  {
    id: "f15",
    title: "Japanese Sushi Bar",
    cuisine: "Japanese",
    location: "Lakeside",
    img: require("../assets/food_1.png"),
    logo: require("../assets/food_2.png"),
  },
  {
    id: "f16",
    title: "Dessert & Shakes",
    cuisine: "Desserts",
    location: "Mahendrapool",
    img: require("../assets/food_3.png"),
    logo: require("../assets/food_4.png"),
  },
];

// ------------------ COMPONENT ------------------
export default function CustomerHome({ navigation }: any) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerRef = useRef<FlatList>(null);

  const onBannerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (width - 32));
    setBannerIndex(idx);
  };

  const Banner = useMemo(() => {
    return (
      <View style={{ marginTop: 12 }}>
        <FlatList
          ref={bannerRef}
          data={bannerSlides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 16 }}
          onScroll={onBannerScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={[styles.bannerCard, { width: width - 32 }]}>
              <Image source={item.img} style={styles.bannerImage} />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.bannerBtn}
                  onPress={() => navigation.navigate("Menu")}
                >
                  <Text style={styles.bannerBtnText}>{item.cta}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.dotsRow}>
          {bannerSlides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === bannerIndex ? styles.dotActive : null]}
            />
          ))}
        </View>
      </View>
    );
  }, [bannerIndex, navigation]);

  const renderFlavorCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.flavorCard}
      onPress={() => navigation.navigate("Menu")}
    >
      <Image source={item.img} style={styles.flavorImage} />
      <View style={styles.flavorRow}>
        <Image source={item.logo} style={styles.flavorLogo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.flavorName}>{item.title}</Text>
          <Text style={styles.flavorMeta}>{item.cuisine}</Text>
          <Text style={styles.flavorMeta}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* ✅ Top Bar (Logo + FoodExpress + Search) */}
        <View style={styles.topBar}>
          <View style={styles.brandContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>FoodExpress</Text>
          </View>

          {/* 🔍 SEARCH ICON */}
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() =>
              navigation.navigate("HomeTab", {
                screen: "SearchBarScreen",
              })
            }
          >
            <Image
              source={require("../assets/search_icon.png")}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Top Highlights */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.hTitle}>Top Highlights 🔥</Text>
        </View>

        <FlatList
          data={highlights}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.highlightItem}
              onPress={() => {
                // If you have RestaurantList screen, keep these. Otherwise remove.
                if (item.id === "h1")
                  navigation.navigate("RestaurantList" as never, { filter: "ALL" } as never);
                if (item.id === "h2")
                  navigation.navigate("RestaurantList" as never, { filter: "HAPPY_HOUR" } as never);
                if (item.id === "h3")
                  navigation.navigate("RestaurantList" as never, { filter: "COMBO" } as never);
                if (item.id === "h4")
                  navigation.navigate("RestaurantList" as never, { filter: "NEW" } as never);
              }}
            >
              <View style={styles.highlightCircle}>
                <Image source={item.icon} style={styles.highlightIcon} />
              </View>
              <Text style={styles.highlightText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Banner Carousel */}
        {Banner}

        {/* What’s on your mind */}
        <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
          <Text style={styles.bigTitle}>What’s on your mind today? 👉</Text>
        </View>

        <FlatList
          data={mindCategories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mindItem}
              onPress={() =>
                // If you have RestaurantList screen, keep. Otherwise just go Menu.
                navigation.navigate("RestaurantList" as never, {
                  filter: "CATEGORY",
                  category: item.title,
                } as never)
              }
            >
              <Image source={item.img} style={styles.mindImg} />
              <Text style={styles.mindText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* IN THE SPOTLIGHT */}
        <View style={styles.darkSection}>
          <View style={styles.darkHeader}>
            <Text style={styles.darkTitle}>IN THE SPOTLIGHT</Text>
            <Text style={styles.darkSub}>Chef’s special mentions</Text>
          </View>

          <View style={styles.spotlightRow}>
            <View style={styles.spotlightCard}>
              <Image source={spotlight.left.img} style={styles.spotlightImg} />
              <Text style={styles.spotlightLabel}>{spotlight.left.title}</Text>
            </View>

            <View style={styles.spotlightCard}>
              <Image source={spotlight.right.img} style={styles.spotlightImg} />
              <Text style={styles.spotlightLabel}>{spotlight.right.title}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.restaurantRow}
            onPress={() => navigation.navigate("Menu")}
          >
            <Image source={spotlight.restaurant.logo} style={styles.restaurantLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.restaurantName}>{spotlight.restaurant.name}</Text>
              <Text style={styles.restaurantMeta}>
                {spotlight.restaurant.cuisine}
                {"\n"}
                {spotlight.restaurant.location}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Most-Loved Brands */}
        <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
          <Text style={styles.bigTitle}>Most-Loved Brands</Text>
          <Text style={styles.subText}>
            Ordering your favourites is just a click away!
          </Text>
        </View>

        <FlatList
          data={brands}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.brandCard}
              onPress={() => navigation.navigate("Menu")}
            >
              <Image source={item.img} style={styles.brandImage} />
              <View style={styles.brandInfo}>
                <Image source={item.logo} style={styles.brandLogo} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.brandName}>{item.name}</Text>
                  <Text style={styles.brandMeta}>{item.cuisine}</Text>
                  <Text style={styles.brandMeta}>{item.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Flavors of the World */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <Text style={styles.bigTitle}>Flavors of the World</Text>
          <Text style={styles.subText}>
            Discover international dishes, ready to deliver
          </Text>
        </View>

        <FlatList
          data={flavorsOfWorld}
          keyExtractor={(item) => item.id}
          renderItem={renderFlavorCard}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  // top bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  brandContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 34, height: 34, marginRight: 8 },
  brandText: { fontSize: 20, fontWeight: "900", color: "#111" },

  searchBtn: {
    marginLeft: "auto",
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: { width: 20, height: 20, margin: 8 },

  // headers
  sectionHeaderRow: { paddingHorizontal: 16, marginTop: 10 },
  hTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
  bigTitle: { fontSize: 20, fontWeight: "800", color: "#111" },
  subText: { marginTop: 4, fontSize: 13, color: "#666" },

  // highlights
  highlightItem: { marginRight: 18, alignItems: "center" },
  highlightCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#eef5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  highlightIcon: { width: 34, height: 34, borderRadius: 10 },
  highlightText: {
    marginTop: 8,
    fontSize: 12,
    color: "#444",
    textAlign: "center",
  },

  // banner
  bannerCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
    marginRight: 12,
  },
  bannerImage: { width: "100%", height: 190 },
  bannerOverlay: {
    position: "absolute",
    left: 14,
    bottom: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTitle: { color: "#fff", fontWeight: "900", fontSize: 18, width: "60%" },
  bannerBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  bannerBtnText: { fontWeight: "900", color: "#111", fontSize: 12 },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 8, marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#d7d7d7" },
  dotActive: { backgroundColor: "#f2b705" },

  // mind
  mindItem: { marginRight: 16, alignItems: "center" },
  mindImg: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#eee" },
  mindText: { marginTop: 8, fontSize: 12, color: "#444" },

  // spotlight
  darkSection: { backgroundColor: "#2d2d2d", marginTop: 10, paddingBottom: 14 },
  darkHeader: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 },
  darkTitle: { color: "#fff", fontWeight: "900", fontSize: 18 },
  darkSub: { color: "#cfcfcf", marginTop: 3 },

  spotlightRow: { flexDirection: "row", gap: 12, paddingHorizontal: 16 },
  spotlightCard: { flex: 1, borderRadius: 14, overflow: "hidden", backgroundColor: "#111" },
  spotlightImg: { width: "100%", height: 120 },
  spotlightLabel: {
    position: "absolute",
    left: 10,
    bottom: 10,
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 1,
  },

  restaurantRow: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: "#3a3a3a",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  restaurantLogo: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#eee" },
  restaurantName: { color: "#fff", fontWeight: "900", fontSize: 14 },
  restaurantMeta: { color: "#d1d1d1", marginTop: 4, fontSize: 12 },

  // brands
  brandCard: {
    width: 280,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  brandImage: { width: "100%", height: 140, backgroundColor: "#eee" },
  brandInfo: { flexDirection: "row", gap: 10, padding: 10, alignItems: "center" },
  brandLogo: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#eee" },
  brandName: { fontWeight: "900", fontSize: 14, color: "#111" },
  brandMeta: { fontSize: 12, color: "#666", marginTop: 2 },

  // flavors
  flavorCard: {
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  flavorImage: { width: "100%", height: 190, backgroundColor: "#eee" },
  flavorRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12 },
  flavorLogo: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#eee" },
  flavorName: { fontWeight: "900", fontSize: 15, color: "#111" },
  flavorMeta: { marginTop: 2, fontSize: 12, color: "#666" },
});
