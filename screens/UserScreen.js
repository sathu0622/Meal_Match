import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfileScreen({ route, navigation }) {
  const { name } = route.params; // Get the name passed from LoginScreen

  const handleLogout = () => {
    navigation.navigate("Login"); // Navigate back to the Login page on logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {name}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEB3B", // Yellow background
    padding: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333", // Darker text color for better contrast
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#FF9800", // Orange button
    width: 200,
    paddingVertical: 15,
    borderRadius: 20, // Rounded button
    alignItems: "center",
    marginVertical: 10,
  },
  logoutButtonText: {
    color: "#fff", // White text on button
    fontSize: 18,
    fontWeight: "bold",
  },
});
