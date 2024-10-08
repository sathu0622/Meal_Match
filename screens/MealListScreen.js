import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MealListScreen = () => {
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMeals();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://192.168.8.159:5000/api/meals');
      setMeals(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`http://192.168.8.159:5000/api/meals/${id}`);
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to dynamically require images based on the category
  const getCategoryImage = (category) => {
    switch (category) {
      case 'Kottu':
        return require('../assets/kottu.png');  // Ensure these images exist
      case 'Rice':
        return require('../assets/rice and curry.jpg');
      case 'Parotta':
        return require('../assets/kottu.png');  // Ensure these images exist
      case 'String Hoppers':
        return require('../assets/string hoppers.jpg');          
      case 'Hoppers':
          return require('../assets/hoppers.jpg');  // Ensure these images exist
      case 'Shorteats':
          return require('../assets/shorteats.jpg');
      default:
        return require('../assets/other.jpg');  // Fallback image if no category matches
    }
  };

  const renderMeal = ({ item }) => (
    <View style={styles.mealCard}>
      <Image source={getCategoryImage(item.category)} style={styles.mealImage} />
      <View style={styles.mealDetails}>
        <Text style={styles.mealName}>{item.itemName}</Text>
        <Text style={styles.mealPrice}>Rs.{item.price}</Text>
        <Text style={styles.mealDesc}>{item.discount}% Discount</Text>
        <Text style={styles.mealTime}>
          Expiry: {new Date(item.expiryTime).toLocaleString()} 
        </Text>
        <Text style={styles.mealCategory}>Category: {item.category}</Text>
        <Text style={styles.mealVegetarian}>Vegetarian: {item.isVegetarian ? 'Yes' : 'No'}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigation.navigate('UpdateMealScreen', { meal: item })}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteMeal(item._id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  mealDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealPrice: {
    fontSize: 16,
    color: '#f45d22',
    fontWeight: 'bold',
  },
  mealDesc: {
    fontSize: 12,
    color: '#999',
    marginVertical: 2,
  },
  mealTime: {
    fontSize: 12,
    color: '#999',
  },
  mealCategory: {
    fontSize: 12,
    color: '#999',
  },
  mealVegetarian: {
    fontSize: 12,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  updateButton: {
    backgroundColor: '#ff7d3b',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: '#ff5b5b',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MealListScreen;
