import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { mealsData } from "../data/data";  // Import meal data from data.js
import Icon from "react-native-vector-icons/Ionicons"; // For icons

export default function HotelMenu({ navigation }) { // Make sure to get navigation prop
  const [cart, setCart] = useState([]);  // State to store cart items

  // Function to handle adding items to the cart
const addToCart = (item) => {
  setCart((prevCart) => {
    // Check if the item is already in the cart
    const existingItem = prevCart.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
      // If it exists, update the quantity
      return prevCart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      );
    } else {
      // If not, add the item with a quantity of 1
      return [...prevCart, { ...item, quantity: 1 }];
    }
  });
  
  Alert.alert("Added to Cart", `${item.itemName} has been added to your cart.`);
};


  // Render each meal in the list
  const renderMeal = ({ item }) => (
    <View style={styles.mealCard}>
      {/* Navigate to IngredientsScreen when the image is clicked */}
      
 {/* Navigate to IngredientsScreen when the image is clicked */}
 <TouchableOpacity onPress={() => navigation.navigate('IngredientsScreen', {
        itemName: item.itemName,
        ingredients: item.ingredients,
        allergens: item.allergens,  // Pass allergens
        contactNumber: item.contactNumber,  // Pass contact number
      })}>
        <Image source={getCategoryImage(item.category)} style={styles.mealImage} />
      </TouchableOpacity>



      <View style={styles.mealDetails}>
        <Text style={styles.mealName}>{item.itemName}</Text>
        <Text style={styles.mealPrice}>Rs. {item.price}</Text>
        <Text style={styles.mealDesc}>{item.description}</Text>
        <Text style={styles.mealDiscount}>{item.discount}% Discount</Text>
        <Text style={styles.mealTime}>Expiry: {new Date(item.expiryTime).toLocaleString()}</Text>
        
        {/* Add to Cart button */}
        <TouchableOpacity style={styles.cartButton} onPress={() => addToCart(item)}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );



  // Return the correct image for each category
  const getCategoryImage = (category) => {
    switch (category) {
      case "Kottu":
        return require("../assets/kottu.png");
      case "Rice":
        return require("../assets/rice and curry.jpg");
      // Add more categories and images as needed
      default:
        return require("../assets/other.jpg");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mealsData}  // Using mealsData from the data.js file
        keyExtractor={(item) => item._id}
        renderItem={renderMeal}
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
          onPress={() => navigation.navigate("RequestScreen")}
          style={styles.navButton}
        >
          <Icon name="person-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
  onPress={() => navigation.navigate("CartScreen", { cartItems: cart, setCart })} // Pass setCart to update cart
  style={styles.navButton}
>
  <Icon name="cart-outline" size={30} color="#D55A00" />
  <Text style={styles.navText}>Cart</Text>
  {cart.length > 0 && (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{cart.length}</Text>
    </View>
  )}
</TouchableOpacity>



      </View>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  badge: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#D55A00',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  mealDiscount: {
    fontSize: 12,
    color: "#999",
  },
  mealTime: {
    fontSize: 12,
    color: "#999",
  },
  cartButton: {
    backgroundColor: "#f45d22",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartInfo: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#f45d22",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f5f5f5",
    position: "absolute", // Makes the nav bar stick to the bottom
    bottom: 0,            // Aligns it to the bottom of the screen
    width: "100%",         // Stretches the nav bar across the full width
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    textAlign: "center",
    color: "#D55A00",
    marginTop: 5,
    fontSize: 12,
  },
});
