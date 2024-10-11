import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryTime, setExpiryTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [email, setEmail] = useState(null); // State to hold the email

  useEffect(() => {
  
          // Retrieve the email from AsyncStorage when the component mounts
          AsyncStorage.getItem("userEmail")
              .then((storedEmail) => {
                  if (storedEmail !== null) {
                      console.log("User Email:", storedEmail);
                      setEmail(storedEmail); // Store email in state if needed
                  }
              })
              .catch((error) => {
                  console.error("Error retrieving user email:", error);
            });
},[]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expiryTime;
    setShowDatePicker(Platform.OS === 'ios');
    setExpiryTime(currentDate);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || expiryTime;
    setShowTimePicker(Platform.OS === 'ios');
    const updatedExpiryTime = new Date(expiryTime);
    updatedExpiryTime.setHours(currentTime.getHours());
    updatedExpiryTime.setMinutes(currentTime.getMinutes());
    setExpiryTime(updatedExpiryTime);
  };

  const handleSubmit = () => {
    if (!name || !description || !price || !category || !expiryTime) {
      alert("Please fill in all fields, including selecting a date and time.");
      return;
    }

    const mealData = {
      itemName: name,
      description,
      price: parseFloat(price),
      category,
      email: email,
      discount: discount ? parseInt(discount) : 0,
      expiryTime: expiryTime.toISOString(),
      isVegetarian
    };

    axios.post('http://192.168.8.159:5000/api/meals', mealData)
      .then(response => {
        alert('Meal added successfully!');
        navigation.navigate("MealListScreen");
      })
      .catch(error => {
        console.error(error);
        alert('Error adding meal. Please try again.');
      });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
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

        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Kottu" value="Kottu" />
          <Picker.Item label="Rice" value="Rice" />
          <Picker.Item label="Parotta" value="Parotta" />
          <Picker.Item label="String Hoppers" value="String Hoppers" />
          <Picker.Item label="Hoppers" value="Hoppers" />
          <Picker.Item label="Shorteats" value="Shorteats" />
        </Picker>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price, e.g., '120.00'"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Discount (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Discount percentage, e.g., '10'"
          value={discount}
          keyboardType="numeric"
          onChangeText={setDiscount}
        />

        <Text style={styles.label}>Expiry Date and Time</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>
            {expiryTime.toLocaleDateString()} {expiryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={expiryTime}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('MealListScreen')} style={styles.navButton}>
          <Icon name="home-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MealForm')} style={styles.navButton}>
          <Icon name="add-circle-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TopMeal')} style={styles.navButton}>
          <Icon name="heart-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RestReqList')} style={styles.navButton}>
          <Icon name="document-text-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#FBE6B9',
    paddingBottom: 100,
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
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
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
bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    textAlign: 'center',
    color: '#D55A00',
    marginTop: 5,
    fontSize: 12,
  },
});


export default MealForm;
