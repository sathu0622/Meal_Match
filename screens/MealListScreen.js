// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const MealListScreen = () => {
//   const [meals, setMeals] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchMeals();
//   }, []);

//   const fetchMeals = async () => {
//     try {
//       const response = await axios.get('http://192.168.8.159:5000/api/meals');  // Added /api prefix
//       setMeals(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const deleteMeal = async (id) => {
//     try {
//       await axios.delete(`http://192.168.8.159:5000/api/meals/${id}`);  // Added /api prefix
//       fetchMeals();  // Refresh the list after deletion
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   const renderMeal = ({ item }) => (
//     <View style={styles.mealItem}>
//       <Text>{item.name}</Text>
//       <Text>{item.description}</Text>
//       <Text>Price: {item.price}</Text>
//       <Text>Quantity: {item.quantity}</Text>
//       <View style={styles.buttonContainer}>
//         <Button 
//           title="Update" 
//           onPress={() => navigation.navigate('UpdateMealScreen', { meal: item })} 
//         />
//         <Button 
//           title="Delete" 
//           onPress={() => deleteMeal(item._id)} 
//           color="red" 
//         />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={meals}
//         keyExtractor={(item) => item._id}
//         renderItem={renderMeal}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   mealItem: {
//     padding: 10,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
// });

// export default MealListScreen;

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

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://192.168.8.159:5000/api/meals');
      setMeals(response.data);
    } catch (error) {
      console.error(error);
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

  const renderMeal = ({ item }) => (
    <View style={styles.mealCard}>
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <View style={styles.mealDetails}>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealPrice}>₹{item.price}</Text>
        <Text style={styles.mealDesc}>10% Dis | {item.quantity} left</Text>
        <Text style={styles.mealTime}>{new Date(item.expTime).toLocaleDateString()}</Text>
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
      {/* Bottom navigation can be added here */}
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
    elevation: 3, // For shadow in Android
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
