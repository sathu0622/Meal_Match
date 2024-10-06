// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const MealForm = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [expiryTime, setExpiryTime] = useState('');
//   const [isVegetarian, setIsVegetarian] = useState(false);

//   const handleSubmit = () => {
//     const mealData = { 
//       itemName: name,  // Renamed 'name' to 'itemName'
//       description, 
//       price: parseFloat(price), 
//       quantity: parseInt(quantity), 
//       discount: parseInt(discount), 
//       expiryTime,
//       isVegetarian
//     };
  
//     axios.post('http://192.168.8.159:5000/api/meals', mealData)  // Added /api prefix
//       .then(response => {
//         alert('Meal added successfully!');
//         navigation.navigate("MealListScreen");
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Post Food</Text>
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
//       <View style={styles.photoContainer}>
//         <Text>Add Photo</Text>
//         <TouchableOpacity style={styles.photoButton}>
//           <Text style={styles.photoButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
//         <Text style={styles.postButtonText}>POST</Text>
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
//   photoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   photoButton: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFDF88', // Light yellow background for button
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   photoButtonText: {
//     fontSize: 24,
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

// export default MealForm;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const MealForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryTime, setExpiryTime] = useState(new Date());  // Set default to current date/time
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  // Handling the time picker selection
  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || expiryTime;
    setShowTimePicker(Platform.OS === 'ios'); // For iOS, show picker on subsequent clicks
    setExpiryTime(currentDate);
  };

  // Handle form submission
  const handleSubmit = () => {
    const mealData = { 
      itemName: name,
      description, 
      price: parseFloat(price), 
      quantity: parseInt(quantity), 
      discount: parseInt(discount), 
      expiryTime: expiryTime.toISOString(),  // Send as ISO string
      isVegetarian
    };
  
    axios.post('http://192.168.8.159:5000/api/meals', mealData)
      .then(response => {
        alert('Meal added successfully!');
        navigation.navigate("MealListScreen");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Food</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Meal name, e.g., 'Rice and Curry'"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Brief description of the meal"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price, e.g., '120.00'"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity available, e.g., '10'"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Discount</Text>
      <TextInput
        style={styles.input}
        placeholder="Discount percentage, e.g., '10%'"
        value={discount}
        keyboardType="numeric"
        onChangeText={setDiscount}
      />

      {/* Time picker for expiryTime */}
      <Text style={styles.label}>Expiry Time</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={styles.input}>
          {expiryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={expiryTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Vegetarian</Text>
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

      <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
        <Text style={styles.postButtonText}>POST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FBE6B9',
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#D55A00',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#D55A00',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
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
    backgroundColor: '#FFDF88',
  },
  toggleText: {
    color: '#D55A00',
  },
  postButton: {
    backgroundColor: '#D55A00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default MealForm;
