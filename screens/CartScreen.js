import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { CartContext } from '../CartContext'; // Import CartContext
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure Ionicons is correctly imported

const CartScreen = ({ navigation }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    calculateTotalPrice(cartItems);
    calculateTotalCalories(cartItems);
  }, [cartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const calculateTotalCalories = (items) => {
    const totalCalories = items.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    setTotalCalories(totalCalories);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful',
      `You have consumed a total of ${totalCalories} calories today.`,
      [{ text: 'OK' }],
      { cancelable: false }
    );
    navigation.navigate('NutritionPlan', { cartItems });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
              {/* Item details */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{item.name} - {item.calories} calories</Text>
                <Text style={{ fontSize: 16 }}>Price: ${item.price.toFixed(2)} x {item.quantity}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Button title="-" onPress={() => decreaseQuantity(item)} />
                  <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                  <Button title="+" onPress={() => increaseQuantity(item)} />
                </View>
              </View>

              {/* Delete button / trash icon */}
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Icon name="trash-bin-outline" size={24} color="red" /> 
                {/* Ensure the icon is a self-contained element */}
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={{ fontSize: 18 }}>Your cart is empty.</Text>
      )}
      <Text style={{ fontSize: 18, marginTop: 20 }}>Total: ${totalPrice.toFixed(2)}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CartScreen;
