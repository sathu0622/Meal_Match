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
import axios from "axios"; // For MongoDB request

export default function HotelDetails({ route, navigation }) {
  const { email } = route.params; // Get the email from route params
  const [hotelName, setHotelName] = useState("");
  const [hotelPhone, setHotelPhone] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelType, setHotelType] = useState(""); // New state for hotel type

  const handleRegister = async () => {
    if (!hotelName || !hotelPhone || !hotelLocation || !hotelType) {
      Alert.alert("All fields are required.");
      return;
    }

    try {
      // MongoDB registration (update the endpoint accordingly)
      const response = await axios.post(
        "http://172.20.10.12:5000/api/hotel/register",
        {
          hotelName,
          hotelPhone,
          hotelLocation,
          hotelType,
          email, // Include email in registration
        }
      );

      // Log API response for debugging
      console.log("MongoDB Response:", response.data);

      if (response.data.success) {
        Alert.alert("Hotel registered successfully: " + hotelName);
        navigation.navigate("Login"); // Navigate to another screen after registration
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
        <Text style={styles.title}>Hotel Registration</Text>

        <TextInput
          onChangeText={setHotelName}
          placeholder="Hotel Name"
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        <TextInput
          onChangeText={setHotelPhone}
          placeholder="Hotel Phone Number"
          style={styles.textInput}
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        <TextInput
          onChangeText={setHotelLocation}
          placeholder="Hotel Location"
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        {/* Dropdown for hotel types */}
        <Picker
          selectedValue={hotelType}
          onValueChange={(itemValue) => setHotelType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Hotel Type" value="" />
          <Picker.Item label="Luxury" value="luxury" />
          <Picker.Item label="Budget" value="budget" />
          <Picker.Item label="Boutique" value="boutique" />
        </Picker>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register Hotel</Text>
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
    borderColor: "#ccc",
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
    borderColor: "#ccc",
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
});
