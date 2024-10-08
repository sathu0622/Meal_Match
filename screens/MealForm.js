import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import the Picker

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

  // Handle the date and time picker changes
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

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !description || !price || !category || !expiryTime) {
      alert("Please fill in all the fields, including selecting a date and time.");
      return;
    }

    const mealData = {
      itemName: name,
      description,
      price: parseFloat(price),
      category,
      discount: parseInt(discount),
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
      });
  };

  return (
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
        {/* Add more categories as needed */}
      </Picker>

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price, e.g., '120.00'"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Discount</Text>
      <TextInput
        style={styles.input}
        placeholder="Discount percentage, e.g., '10%'"
        value={discount}
        keyboardType="numeric"
        onChangeText={setDiscount}
      />

      {/* Date and Time picker for expiryTime */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FBE6B9',
    flexGrow: 1,
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
});

export default MealForm;
