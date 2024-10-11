import React, { useContext } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { menuItems } from '../data/data'; 
import { CartContext } from '../CartContext';

const MenuScreen = () => {
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    addToCart(item); // Call the context function to add item to cart
    Alert.alert('Item added', `${item.name} has been added to the cart.`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('IngredientScreen', { item })}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCalories}>Calories: {item.calories}</Text>
              <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 18,
  },
  itemCalories: {
    fontSize: 16,
  },
});

export default MenuScreen;
