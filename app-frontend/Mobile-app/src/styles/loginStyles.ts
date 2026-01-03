import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 12
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f26b21"
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12
  },
  button: {
    width: "100%",
    backgroundColor: "#f26b21",
    padding: 14,
    alignItems: "center",
    borderRadius: 10
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
