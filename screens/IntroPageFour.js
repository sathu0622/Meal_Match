import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const IntroPageFour = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#ff9966', '#ff5e62']} // Gradient colors
      style={styles.container}
    >
      <Image
        source={require("../assets/rotti.jpg")} // Replace with your image source
        style={styles.image}
      />
      <Text style={styles.title}>Be a provider</Text>
      <Text style={styles.description}>
        Game changers are not born, they are made.
      </Text>
      <View style={styles.buttonContainer}>
        {/* Skip Button on the left */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate("Register")} // Replace with your desired navigation destination
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Next Button on the right */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Register")} // Navigates to the Register page
        >
          <Text style={styles.buttonText}>⇒⇨</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '60%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#fff",
  },
  description: {
    textAlign: "center",
    marginHorizontal: 20,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  skipButton: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  skipText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30, // Circular button
  },
  buttonText: {
    fontSize: 30, // Larger font size to make the emoji visible
    color: "white",
  },
});

export default IntroPageFour;
