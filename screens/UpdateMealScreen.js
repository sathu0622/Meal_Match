// import React, { useEffect, useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const UpdateMealScreen = ({ route }) => {
//     const { meal } = route.params; // Get the meal object from the route params
  
//     const [name, setName] = useState(meal.name);
//     const [description, setDescription] = useState(meal.description);
//     const [price, setPrice] = useState(meal.price.toString()); // Convert to string for TextInput
//     const [quantity, setQuantity] = useState(meal.quantity?.toString() || ''); // Handle null case
  
//     useEffect(() => {
//       if (meal) {
//         setName(meal.name);
//         setDescription(meal.description);
//         setPrice(meal.price.toString());
//         setQuantity(meal.quantity?.toString() || ''); // Handle null case
//       }
//     }, [meal]);
//   const handleUpdate = () => {
//     const updatedMealData = {
//       name,
//       description,
//       price: parseFloat(price),
//       quantity: parseInt(quantity),
//       discount: parseInt(discount),
//       expiryTime,
//       isVegetarian,
//     };

//     axios.put(`http://192.168.8.159:5000/meals/${meal._id}`, updatedMealData)
//       .then(response => {
//         alert('Meal updated successfully!');
//         navigation.navigate("MealListScreen"); // Navigate back to MealListScreen
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Update Meal</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="ex. rice"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="ex. 120.00"
//         value={price}
//         keyboardType="numeric"
//         onChangeText={setPrice}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="ex. 10%"
//         value={discount}
//         keyboardType="numeric"
//         onChangeText={setDiscount}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="ex. 05:00 PM"
//         value={expiryTime}
//         onChangeText={setExpiryTime}
//       />
//       <View style={styles.toggleContainer}>
//         <Text>Vegetarian</Text>
//         <TouchableOpacity style={[styles.toggle, isVegetarian && styles.activeToggle]} onPress={() => setIsVegetarian(true)}>
//           <Text style={styles.toggleText}>Yes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.toggle, !isVegetarian && styles.activeToggle]} onPress={() => setIsVegetarian(false)}>
//           <Text style={styles.toggleText}>No</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.postButton} onPress={handleUpdate}>
//         <Text style={styles.postButtonText}>UPDATE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#FBE6B9', // Light yellow background
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#D55A00', // Dark orange color
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#FFF', // White background for inputs
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   toggle: {
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'gray',
//   },
//   activeToggle: {
//     backgroundColor: '#FFDF88', // Light yellow when active
//   },
//   toggleText: {
//     color: '#D55A00', // Dark orange color
//   },
//   postButton: {
//     backgroundColor: '#D55A00', // Dark orange background
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   postButtonText: {
//     color: '#FFF', // White text
//     fontSize: 16,
//   },
// });

// export default UpdateMealScreen;


import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UpdateMealScreen = ({ route }) => {
  const { meal } = route.params; // Get the meal object from the route params
  const navigation = useNavigation(); // Added navigation for screen transition
  
  const [name, setName] = useState(meal.name);
  const [description, setDescription] = useState(meal.description);
  const [price, setPrice] = useState(meal.price.toString()); // Convert to string for TextInput
  const [quantity, setQuantity] = useState(meal.quantity?.toString() || ''); // Handle null case
  const [discount, setDiscount] = useState(meal.discount?.toString() || ''); // Handle discount field
  const [expiryTime, setExpiryTime] = useState(meal.expiryTime || ''); // Handle expiry time
  const [isVegetarian, setIsVegetarian] = useState(meal.isVegetarian || false); // Handle vegetarian toggle
  
  useEffect(() => {
    if (meal) {
      setName(meal.name);
      setDescription(meal.description);
      setPrice(meal.price.toString());
      setQuantity(meal.quantity?.toString() || '');
      setDiscount(meal.discount?.toString() || '');
      setExpiryTime(meal.expiryTime || '');
      setIsVegetarian(meal.isVegetarian || false);
    }
  }, [meal]);

  const handleUpdate = () => {
    const updatedMealData = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      discount: parseInt(discount),
      expiryTime,
      isVegetarian,
    };

    axios.put(`http://192.168.8.159:5000/api/meals/${meal._id}`, updatedMealData)
      .then(response => {
        alert('Meal updated successfully!');
        navigation.navigate("MealListScreen"); // Navigate back to MealListScreen
      })
      .catch(error => {
        console.log('Meal ID:', meal._id);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Meal</Text>
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., 120.00)"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Discount (e.g., 10%)"
        value={discount}
        keyboardType="numeric"
        onChangeText={setDiscount}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Time (e.g., 05:00 PM)"
        value={expiryTime}
        onChangeText={setExpiryTime}
      />
      <View style={styles.toggleContainer}>
        <Text>Vegetarian</Text>
        <TouchableOpacity
          style={[styles.toggle, isVegetarian && styles.activeToggle]}
          onPress={() => setIsVegetarian(true)}
        >
          <Text style={styles.toggleText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggle, !isVegetarian && styles.activeToggle]}
          onPress={() => setIsVegetarian(false)}
        >
          <Text style={styles.toggleText}>No</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.postButton} onPress={handleUpdate}>
        <Text style={styles.postButtonText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FBE6B9', // Light yellow background
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#D55A00', // Dark orange color
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF', // White background for inputs
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  toggle: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  activeToggle: {
    backgroundColor: '#FFDF88', // Light yellow when active
  },
  toggleText: {
    color: '#D55A00', // Dark orange color
  },
  postButton: {
    backgroundColor: '#D55A00', // Dark orange background
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF', // White text
    fontSize: 16,
  },
});

export default UpdateMealScreen;
