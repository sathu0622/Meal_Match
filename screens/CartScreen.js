import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function CartScreen({ route, navigation }) {
  const { cartItems, setCart } = route.params; // Retrieve cart items and setCart function

  const [cartData, setCartData] = useState(cartItems); // Local state for cart items
  
  // Sync local cartData with the parent cart when the data changes
  useEffect(() => {
    setCart(cartData); // Update cart in HotelMenu whenever cartData changes
  }, [cartData]);

  // Function to handle item removal
  const removeFromCart = (itemToRemove) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${itemToRemove.itemName} from your cart?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            // Update local cartData by filtering out the removed item
            const updatedCart = cartData.filter(item => item._id !== itemToRemove._id);
            setCartData(updatedCart); // Update local state
          },
        },
      ]
    );
  };

  // Function to increase item quantity
  const increaseQuantity = (itemToIncrease) => {
    const updatedCart = cartData.map(item => 
      item._id === itemToIncrease._id
        ? { ...item, quantity: (item.quantity || 1) + 1 } // Increase quantity by 1
        : item
    );
    setCartData(updatedCart); // Update local state
  };

  // Function to decrease item quantity (don't let quantity go below 1)
  const decreaseQuantity = (itemToDecrease) => {
    const updatedCart = cartData.map(item => 
      item._id === itemToDecrease._id && item.quantity > 1 // Ensure quantity doesn't drop below 1
        ? { ...item, quantity: item.quantity - 1 } // Decrease quantity by 1
        : item
    );
    setCartData(updatedCart); // Update local state
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemName}>{item.itemName}</Text>
      <Text style={styles.cartItemPrice}>Rs. {item.price * (item.quantity || 1)}</Text>
      <View style={styles.quantityContainer}>
        {/* Decrease Quantity Button */}
        <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        {/* Display Current Quantity */}
        <Text style={styles.quantityText}>{item.quantity || 1}</Text>

        {/* Increase Quantity Button */}
        <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Remove Item from Cart */}
      <TouchableOpacity onPress={() => removeFromCart(item)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  // Calculate total amount
  const totalAmount = cartData.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  // Calculate total calories
  const totalCalories = cartData.reduce((total, item) => total + (item.calories * (item.quantity || 1)), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartData.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(item) => item._id}
            renderItem={renderCartItem}
          />
          <Text style={styles.totalAmount}>Total: Rs. {totalAmount}</Text>
          <Text style={styles.totalCalories}>Total Calories: {totalCalories}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              console.log("cartData:", cartData); // Check cartData
              navigation.navigate('NutritionPlan', { cartData });
            }}
            accessibilityLabel="Proceed to checkout"
          >
            <Text style={styles.checkoutButtonText}>NutritionPlan</Text>
          </TouchableOpacity>


        </>
      )}
    </View>
  );
}

// Styles for CartScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 18,
    color: "gray",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartItemName: {
    fontSize: 18,
    flex: 1,
  },
  cartItemPrice: {
    fontSize: 18,
  },
  removeButton: {
    color: "red",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  totalCalories: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#D55A00",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: "#D55A00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
