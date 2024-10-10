import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const OrphanageRequestForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contectNo, setContectNo] = useState('');
  const [count, setCount] = useState('');
  const [items, setItems] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState(new Date());
  const [mealTime, setMealTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmit = () => {
    if (!name || !address || !contectNo || !count || !items || !mealTime || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const requestData = {
      name,
      address,
      contectNo,
      count: parseInt(count),
      items,
      comments,
      date: date.toISOString(),
      mealTime,
    };

    axios.post('http://192.168.8.159:5000/api/orp', requestData)
      .then(response => {
        alert('Orphanage request submitted successfully!');
        navigation.navigate("RequestListScreen");
      })
      .catch(error => {
        console.error(error);
        alert('Error submitting request. Please try again.');
      });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Orphanage Request Form</Text>

        <Text style={styles.label}>Orphanage Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter orphanage name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter orphanage address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          value={contectNo}
          keyboardType="phone-pad"
          onChangeText={setContectNo}
        />

        <Text style={styles.label}>People Count</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of people"
          value={count}
          keyboardType="numeric"
          onChangeText={setCount}
        />

        <Text style={styles.label}>Items Needed</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter items needed"
          value={items}
          onChangeText={setItems}
        />

        <Text style={styles.label}>Comments</Text>
        <TextInput
          style={styles.input}
          placeholder="Additional comments"
          value={comments}
          onChangeText={setComments}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Meal Time</Text>
        <Picker
          selectedValue={mealTime}
          style={styles.picker}
          onValueChange={(itemValue) => setMealTime(itemValue)}
        >
          <Picker.Item label="Select Meal Time" value="" />
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
        </Picker>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>

            {/* Bottom Navigation Bar */}
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
          <Icon name="person-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Profile</Text>
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
  submitButton: {
    backgroundColor: '#D55A00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default OrphanageRequestForm;
