import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function OrphanageScreen({ navigation }) {
  const handleGetStarted = () => {
    // Example action for the button, you can navigate to another screen or perform other actions
    navigation.navigate("OrphanageRequestForm"); // Replace "NextScreen" with the screen you want to navigate to
  };

  return (
    <View style={styles.container}>
      {/* Hotel Image */}
      <Image
        source={require("../assets/orphanage.png")} // Replace with your own image path
        style={styles.hotelImage}
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Your Hotel Stay</Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  hotelImage: {
    width: "100%",  // Make the image cover the width of the screen
    height: 250,    // Adjust the height as needed
    resizeMode: "cover",  // Adjust the image scaling to fit
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 20,
  },
  getStartedButton: {
    backgroundColor: "#ff8c00",  // Button background color
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,  // Rounded corners for the button
    marginTop: 30,
  },
  getStartedButtonText: {
    color: "#fff",  // Button text color
    fontSize: 18,
    fontWeight: "bold",
  },
});
