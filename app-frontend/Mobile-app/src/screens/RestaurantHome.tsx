import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

type Order = {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: "Pending" | "Completed" | "Preparing";
  time: string;
};

export default function RestaurantHome() {
  // ✅ Replace these with API later
  const stats = {
    totalOrders: 120,
    pending: 12,
    completed: 108,
    salesToday: 18,
    revenueToday: 8450,
    customersToday: 14,
    avgOrderValue: 470,
  };

  const weeklyOrders = [
    { day: "Sun", value: 12 },
    { day: "Mon", value: 9 },
    { day: "Tue", value: 16 },
    { day: "Wed", value: 14 },
    { day: "Thu", value: 20 },
    { day: "Fri", value: 22 },
    { day: "Sat", value: 18 },
  ];

  const weeklyRevenue = [5200, 4300, 6800, 6100, 7900, 8800, 7400];

  const recentOrders: Order[] = [
    { id: "#1042", customer: "Aashish", items: 3, total: 520, status: "Pending", time: "10:10 AM" },
    { id: "#1041", customer: "Sita", items: 2, total: 350, status: "Preparing", time: "09:55 AM" },
    { id: "#1040", customer: "Ramesh", items: 4, total: 860, status: "Completed", time: "09:40 AM" },
    { id: "#1039", customer: "Nisha", items: 1, total: 220, status: "Completed", time: "09:15 AM" },
  ];

  const maxOrders = useMemo(
    () => Math.max(...weeklyOrders.map((x) => x.value), 1),
    [weeklyOrders]
  );

  const revMinMax = useMemo(() => {
    const min = Math.min(...weeklyRevenue);
    const max = Math.max(...weeklyRevenue);
    return { min, max: Math.max(max, min + 1) };
  }, [weeklyRevenue]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.title}>Restaurant Dashboard</Text>

      {/* Quick Stats */}
      <View style={styles.grid}>
        <StatCard label="Sales Today" value={`${stats.salesToday}`} sub="orders" />
        <StatCard label="Revenue Today" value={`Rs. ${stats.revenueToday}`} sub="today" />
        <StatCard label="Customers" value={`${stats.customersToday}`} sub="today" />
        <StatCard label="Avg Order" value={`Rs. ${stats.avgOrderValue}`} sub="value" />
      </View>

      {/* Core Orders Box */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Orders Summary</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.stat}>Total Orders</Text>
          <Text style={styles.statValue}>{stats.totalOrders}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.stat}>Pending</Text>
          <Text style={[styles.statValue, styles.pending]}>{stats.pending}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.stat}>Completed</Text>
          <Text style={[styles.statValue, styles.completed]}>{stats.completed}</Text>
        </View>
      </View>

      {/* Weekly Orders Bar Chart */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Weekly Orders</Text>

        <View style={styles.chartWrap}>
          {weeklyOrders.map((d) => {
            const h = Math.round((d.value / maxOrders) * 120);
            return (
              <View key={d.day} style={styles.barCol}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: h }]} />
                </View>
                <Text style={styles.barLabel}>{d.day}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.miniHint}>Bars show number of orders per day.</Text>
      </View>

      {/* Weekly Revenue Trend (simple line-like blocks) */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Revenue Trend</Text>

        <View style={styles.lineWrap}>
          {weeklyRevenue.map((v, idx) => {
            const normalized = (v - revMinMax.min) / (revMinMax.max - revMinMax.min);
            const y = 70 - normalized * 60; // 10..70
            return (
              <View key={`${v}-${idx}`} style={styles.pointCol}>
                <View style={[styles.point, { marginTop: y }]} />
                <View style={styles.pointStem} />
              </View>
            );
          })}
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.miniHint}>Min: Rs. {revMinMax.min}</Text>
          <Text style={styles.miniHint}>Max: Rs. {revMinMax.max}</Text>
        </View>
      </View>

      {/* Recent Orders */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>

        {recentOrders.map((o) => (
          <View key={o.id} style={styles.orderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.orderId}>
                {o.id} <Text style={styles.orderSub}>• {o.time}</Text>
              </Text>
              <Text style={styles.orderSub}>
                {o.customer} • {o.items} items
              </Text>
            </View>

            <View style={styles.orderRight}>
              <Text style={styles.orderTotal}>Rs. {o.total}</Text>
              <StatusPill status={o.status} />
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 18 }} />
    </ScrollView>
  );
}

/* ---------- Small components ---------- */

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </View>
  );
}

function StatusPill({ status }: { status: "Pending" | "Completed" | "Preparing" }) {
  const style =
    status === "Completed"
      ? styles.pillCompleted
      : status === "Preparing"
        ? styles.pillPreparing
        : styles.pillPending;

  return (
    <View style={[styles.pill, style]}>
      <Text style={styles.pillText}>{status}</Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingHorizontal: 16, paddingTop: 55 },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    letterSpacing: 0.6,
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  cardLabel: { fontSize: 12, color: "#666", fontWeight: "700" },
  cardValue: { fontSize: 18, color: "#111", fontWeight: "900", marginTop: 6 },
  cardSub: { fontSize: 12, color: "#999", marginTop: 2, fontWeight: "600" },

  box: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 14, fontWeight: "800", color: "#111", marginBottom: 10 },

  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 6 },
  stat: { fontSize: 14, color: "#444", fontWeight: "600" },
  statValue: { fontSize: 14, color: "#111", fontWeight: "900" },
  pending: { color: "#e67e22" },
  completed: { color: "#27ae60" },

  chartWrap: {
    height: 150,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  barCol: { alignItems: "center", width: 30 },
  barTrack: {
    width: 16,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#111",
  },
  barLabel: { fontSize: 11, color: "#777", marginTop: 8, fontWeight: "600" },

  lineWrap: {
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 6,
  },
  pointCol: { width: 12, alignItems: "center" },
  point: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#111" },
  pointStem: { width: 2, flex: 1, backgroundColor: "#f0f0f0", marginTop: 2 },

  miniHint: { fontSize: 12, color: "#888", marginTop: 8, fontWeight: "600" },

  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  orderId: { fontSize: 13, fontWeight: "900", color: "#111" },
  orderSub: { fontSize: 12, color: "#777", fontWeight: "600", marginTop: 2 },
  orderRight: { alignItems: "flex-end" },
  orderTotal: { fontSize: 13, fontWeight: "900", color: "#111", marginBottom: 6 },

  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pillText: { fontSize: 11, fontWeight: "800", color: "#fff" },
  pillPending: { backgroundColor: "#e67e22" },
  pillPreparing: { backgroundColor: "#2980b9" },
  pillCompleted: { backgroundColor: "#27ae60" },
});
