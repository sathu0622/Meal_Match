import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/fireBaseAuth"; // Adjust the path if needed

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("User registered successfully: " + user.email);
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Login Here</Text>
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
  registerButton: {
    backgroundColor: "#E95322", // Orange button
    width: 300,
    paddingVertical: 15,
    borderRadius: 20, // Rounded button
    alignItems: "center",
    marginVertical: 10,
  },
  registerButtonText: {
    color: "#fff", // White text on button
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: "#0288D1", // Blue for login text
  },
});
