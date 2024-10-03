import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const IntroPageThree = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/noodles.jpg")} // Replace with your image source
        style={styles.image}
      />
      <Text style={styles.title}>
        Order For Food
      </Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna.
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
          onPress={() => navigation.navigate("WPageFour")} // Replace with your Sign Up page
        >
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
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
    backgroundColor: "yellow",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default IntroPageThree;
