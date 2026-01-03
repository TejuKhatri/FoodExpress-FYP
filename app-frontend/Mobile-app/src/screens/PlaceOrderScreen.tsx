import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useCart } from "../Context/CartContext";

const DELIVERY_FEE = 2;

type DeliveryForm = {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
};

const PlaceOrderScreen: React.FC = () => {
    const { getTotalCartAmount } = useCart();

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    const [form, setForm] = useState<DeliveryForm>({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
    });

    const setField = (key: keyof DeliveryForm, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const canProceed = useMemo(() => {
        return subtotal > 0 && form.firstName.trim().length > 0 && form.phone.trim().length > 0;
    }, [subtotal, form.firstName, form.phone]);

    const handlePayment = () => {
        console.log("Proceed payment with:", { form, subtotal, total });
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Delivery Information</Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <TextInput
                            value={form.firstName}
                            onChangeText={(t) => setField("firstName", t)}
                            placeholder="First-name"
                            style={[styles.input, styles.half]}
                        />
                        <TextInput
                            value={form.lastName}
                            onChangeText={(t) => setField("lastName", t)}
                            placeholder="Last-name"
                            style={[styles.input, styles.half]}
                        />
                    </View>

                    <TextInput
                        value={form.email}
                        onChangeText={(t) => setField("email", t)}
                        placeholder="Email address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <TextInput
                        value={form.street}
                        onChangeText={(t) => setField("street", t)}
                        placeholder="Street"
                        style={styles.input}
                    />

                    <View style={styles.row}>
                        <TextInput
                            value={form.city}
                            onChangeText={(t) => setField("city", t)}
                            placeholder="City"
                            style={[styles.input, styles.half]}
                        />
                        <TextInput
                            value={form.state}
                            onChangeText={(t) => setField("state", t)}
                            placeholder="State"
                            style={[styles.input, styles.half]}
                        />
                    </View>

                    <View style={styles.row}>
                        <TextInput
                            value={form.zip}
                            onChangeText={(t) => setField("zip", t)}
                            placeholder="Zip code"
                            style={[styles.input, styles.half]}
                        />
                        <TextInput
                            value={form.country}
                            onChangeText={(t) => setField("country", t)}
                            placeholder="Country"
                            style={[styles.input, styles.half]}
                        />
                    </View>

                    <TextInput
                        value={form.phone}
                        onChangeText={(t) => setField("phone", t)}
                        placeholder="Phone No."
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Cart Totals</Text>

                    <View style={styles.totalRow}>
                        <Text style={styles.label}>Subtotal</Text>
                        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.label}>Delivery fee</Text>
                        <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>

                    <Pressable
                        style={[styles.payBtn, !canProceed && styles.payBtnDisabled]}
                        onPress={handlePayment}
                        disabled={!canProceed}
                    >
                        <Text style={styles.payBtnText}>Proceed to Payment</Text>
                    </Pressable>

                    {!canProceed ? (
                        <Text style={styles.helper}>
                            Enter First-name and Phone No. (and make sure cart is not empty).
                        </Text>
                    ) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { padding: 16, paddingBottom: 24 },
    title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },

    card: {
        borderWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#fafafa",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

    row: { flexDirection: "row", gap: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    half: { flex: 1 },

    totalRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
    label: { fontSize: 14, opacity: 0.75 },
    value: { fontSize: 14, fontWeight: "600" },

    divider: { height: 1, backgroundColor: "#e6e6e6", marginVertical: 10 },

    totalLabel: { fontSize: 16, fontWeight: "800" },
    totalValue: { fontSize: 16, fontWeight: "800" },

    payBtn: {
        marginTop: 12,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "#111",
    },
    payBtnDisabled: { opacity: 0.45 },
    payBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },

    helper: { marginTop: 10, fontSize: 12, opacity: 0.65 },
});
