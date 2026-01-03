import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  { id: "1", title: "Salad", img: require("../assets/food_1.png") },
  { id: "2", title: "Rolls", img: require("../assets/food_2.png") },
  { id: "3", title: "Deserts", img: require("../assets/food_3.png") },
  { id: "4", title: "Sandwich", img: require("../assets/food_4.png") },
  { id: "5", title: "Cake", img: require("../assets/food_5.png") },
];

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = (id: string) => {
    setSelectedCategory(id);
    console.log("Selected Category ID:", id);
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Explore Menu</Text>
      <Text style={styles.sectionSubtitle}>Choose from a wide range of dishes</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id} // ✅ Unique key
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item.id)}
          >
            <Image source={item.img} style={styles.categoryImage} />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.id && { color: "#ff7f00", fontWeight: "bold" },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 26, fontWeight: "bold", marginTop: 20 },
  sectionSubtitle: { fontSize: 15, color: "#555" },
  categoryItem: { alignItems: "center", marginRight: 20 },
  categoryImage: { width: 80, height: 80, borderRadius: 40 },
  categoryText: { marginTop: 5, fontSize: 15 },
});
