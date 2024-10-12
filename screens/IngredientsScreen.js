// IngredientsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

export default function IngredientsScreen({ route }) {
  const { itemName, ingredients, allergens, contactNumber } = route.params;  // Destructure passed data

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemName} Ingredients</Text>

      {/* Ingredients Section */}
      {ingredients.length > 0 ? (
        <FlatList
          data={ingredients}
          keyExtractor={(ingredient, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.ingredientItem}>• {item}</Text>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No ingredients available.</Text>
      )}

      {/* Allergens Section */}
      {allergens && allergens.length > 0 && (
        <>
          <Text style={styles.allergyTitle}>Allergens Warning</Text>
          <FlatList
            data={allergens}
            keyExtractor={(allergen, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.allergenItem}>⚠️ {item}</Text>
            )}
          />
        </>
      )}

      {/* Contact Section */}
      {contactNumber && (
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>For more allergy-related details, call us at:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${contactNumber}`)}>
            <Text style={styles.contactNumber}>{contactNumber}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ingredientItem: {
    fontSize: 18,
    paddingVertical: 5,
  },
  emptyMessage: {
    fontSize: 16,
    color: 'gray',
  },
  allergyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'red',
  },
  allergenItem: {
    fontSize: 16,
    color: 'red',
  },
  contactContainer: {
    marginTop: 30,
  },
  contactText: {
    fontSize: 16,
    color: 'gray',
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
});
