import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons (if you want to use icons)
//import { CartContext } from "../CartContext";

const HotelMenu = ({ route }) => {
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  
  const { email } = route.params;
  useEffect(() => {
    fetchMeals();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  

  const fetchMeals = async () => {
    try {
      // Retrieve logged-in user's email
      //   const userEmail = await AsyncStorage.getItem('userEmail');
      const userEmail = email;

      if (!userEmail) {
        console.error("No user email found");
        return;
      }

      // Fetch meals for this email only
      const response = await axios.get(
        `http://172.20.10.12:5000/api/meals?email=${userEmail}`
      );
      setMeals(response.data);
      fetchMeals();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryImage = (category) => {
    switch (category) {
      case "Kottu":
        return require("../assets/kottu.png");
      case "Rice":
        return require("../assets/rice and curry.jpg");
      case "Parotta":
        return require("../assets/kottu.png");
      case "String Hoppers":
        return require("../assets/string hoppers.jpg");
      case "Hoppers":
        return require("../assets/hoppers.jpg");
      case "Shorteats":
        return require("../assets/shorteats.jpg");
      default:
        return require("../assets/other.jpg");
    }
  };

  const renderMeal = ({ item }) => (
    <View style={styles.mealCard}>
      <Image
        source={getCategoryImage(item.category)}
        style={styles.mealImage}
      />
      <View style={styles.mealDetails}>
        <Text style={styles.mealName}>{item.itemName}</Text>
        <Text style={styles.mealPrice}>Rs.{item.price}</Text>
        <Text style={styles.mealDesc}>{item.discount}% Discount</Text>
        <Text style={styles.mealTime}>
          Expiry: {new Date(item.expiryTime).toLocaleString()}
        </Text>
        <Text style={styles.mealCategory}>Category: {item.category}</Text>
        <Text style={styles.mealVegetarian}>
          Vegetarian: {item.isVegetarian ? "Yes" : "No"}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
           
          >
            <Text style={styles.buttonText}>Place order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item._id}
        renderItem={renderMeal}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserScreen")}
          style={styles.navButton}
        >
          <Icon name="home-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TopMeal")}
          style={styles.navButton}
        >
          <Icon name="heart-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile")}
          style={styles.navButton}
        >
          <Icon name="person-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  mealCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  mealImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  mealDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  mealPrice: {
    fontSize: 16,
    color: "#f45d22",
    fontWeight: "bold",
  },
  mealDesc: {
    fontSize: 12,
    color: "#999",
    marginVertical: 2,
  },
  mealTime: {
    fontSize: 12,
    color: "#999",
  },
  mealCategory: {
    fontSize: 12,
    color: "#999",
  },
  mealVegetarian: {
    fontSize: 12,
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  updateButton: {
    backgroundColor: "#ff7d3b",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: "#ff5b5b",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  navText: {
    textAlign: "center",
    color: "#D55A00",
    marginTop: 5,
    fontSize: 12,
  },
});

export default HotelMenu;
