import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/fireBaseAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      alert("Login successful: " + user.email);
      // navigation.navigate("UserScreen", { name: user.email });
      navigation.navigate("MealForm"); // Navigate to MealForm.js after login
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textInput}
        placeholderTextColor="#888"
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("WPageOne")}>
        <Text style={styles.signupText}>New to Login? Sign Up Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEA34B", // Yellow background
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Darker text color for better contrast
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10, // Rounded input boxes
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#E95322", // Orange button
    width: 300,
    paddingVertical: 15,
    borderRadius: 20, // Rounded button
    alignItems: "center",
    marginVertical: 10,
  },
  loginButtonText: {
    color: "#fff", // White text on button
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: "#0288D1", // Blue for sign-up text
  },
});
