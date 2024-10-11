import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { CartContext } from '../CartContext';

const IngredientScreen = ({ route }) => {
  const { item } = route.params; // Get the item data from navigation params
  const { increaseQuantity, decreaseQuantity, cartItems } = useContext(CartContext);

  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.calories}>Calories: {item.calories}</Text>
      <Text style={styles.ingredients}>Ingredients: {item.ingredients.join(', ')}</Text>
      <Text style={styles.allergens}>Allergens: {item.allergens.join(', ')}</Text>
      <Text style={styles.contact}>{item.contact}</Text>

      {cartItem && (
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity: {cartItem.quantity}</Text>
          <View style={styles.quantityButtons}>
            <Button title="-" onPress={() => decreaseQuantity(cartItem)} />
            <Button title="+" onPress={() => increaseQuantity(cartItem)} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default IngredientScreen;
