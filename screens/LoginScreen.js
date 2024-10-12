import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from "react-native"; // Import ImageBackground
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/fireBaseAuth";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    // Input validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);  

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem("userEmail", user.email);

      // Save the email in local storage
      await AsyncStorage.setItem("userEmail", user.email);

      alert("Login successful: " + user.email);

      const response = await axios.get(`http://172.20.10.12:5000/api/user/getuser?email=${user.email}`);

      const userData = response.data.data.find((us) => us.email === user.email);

      if (userData) {
        const { role, username } = userData; 
        switch (role.toLowerCase()) {
          case "orphanage":
            navigation.navigate("OrphanageScreen", { username });
            break;
          case "volunteer":
            navigation.navigate("VolunteerScreen", { username });
            break;
          case "hotel":
            navigation.navigate("HotelScreen", { username });
            break;
          case "buyer":
            navigation.navigate("UserScreen", { username });
            break;
          default:
            alert("Role not recognized: " + role);
            break;
        }
      } else {
        alert("User data not found.");
      }
    } catch (error) {
      alert("Login error: " + error.message);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")} // Replace with your background image source
      style={styles.backgroundImage} // Added backgroundImage style
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#E95322" />
        ) : (
          <>
            <Text style={styles.title}>Login</Text>
            <TextInput
              onChangeText={setEmail}
              placeholder="Email"
              value={email}
              style={styles.textInput}
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
            <TextInput
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              value={password}
              style={styles.textInput}
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("WPageOne")}>
              <Text style={styles.signupText}>New to Login? Sign Up Here</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.8,
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
    borderRadius: 10, // Rounded input boxes
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "black", // Orange button
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
    color: "black", // Blue for sign-up text
  },
});
