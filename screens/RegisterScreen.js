import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/fireBaseAuth"; // Firebase auth setup
import axios from "axios"; 

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // State for role

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword || !role) {
      Alert.alert("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    try {
      // Firebase registration
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Log user details for debugging
      console.log("Firebase User:", user);

      // MongoDB registration
      const response = await axios.post(
        "http://172.20.10.12:5000/api/user/register",
        {
          username,
          email,
          role,
        }
      );

      // Log API response for debugging
      console.log("MongoDB Response:", response.data);

      if (response.data.success) {
        Alert.alert("User registered successfully: " + username);

        // Navigate based on the role
        if (role === "hotel") {
          navigation.navigate("HotelDetailScreen", {
            email: email, // Pass email to HotelDetails
          });
        } else if (role === "orphanage") {
          navigation.navigate("OrphanageDetailScreen", {
            email: email, // Pass email to OrphanageDetails
          });
        } else {
          navigation.navigate("Login", {
            userRegistrationDetails: { username, email, role },
          });
        }
      } else {
        Alert.alert("MongoDB save failed: " + response.data.message);
      }
    } catch (error) {
      // Enhanced error logging
      if (error.response) {
        console.log("MongoDB Error Response:", error.response.data);
        Alert.alert("MongoDB error: " + error.response.data.message);
      } else {
        console.log("Error:", error.message);
        Alert.alert("Registration error: " + error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.textInput}
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        <TextInput
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        {/* Dropdown for user roles */}
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select User Role" value="" />
          <Picker.Item label="Orphanage" value="orphanage" />
          <Picker.Item label="Volunteer" value="volunteer" />
          <Picker.Item label="Hotel" value="hotel" />
          <Picker.Item label="Buyer" value="buyer" />
        </Picker>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? Login Here
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.8
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ff653e",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  picker: {
    height: 50,
    width: 300,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ff653e",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  registerButton: {
    backgroundColor: "black",
    width: 300,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: "black",
  },
});
