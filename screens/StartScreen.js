import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const LogoPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("StartTwo")}>
        <Image
          source={require("../assets/logo2.jpg")} // Replace with your logo path
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // You can change background color if needed
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100, // Adjust the size of the logo
    height: 100,
    resizeMode: "contain", // Makes sure the logo doesn't get stretched
  },
});

export default LogoPage;
