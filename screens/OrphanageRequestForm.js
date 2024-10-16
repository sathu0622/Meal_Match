import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrphanageRequestForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [count, setCount] = useState('');
  const [items, setItems] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState(new Date());
  const [mealTime, setMealTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const validateFields = () => {
    if (!name) {
      alert('Please enter the orphanage name.');
      return false;
    }
    if (!address) {
      alert('Please enter the address.');
      return false;
    }
    if (!contactNo || !/^\d{10}$/.test(contactNo)) {
      alert('Please enter a valid 10-digit contact number.');
      return false;
    }
    if (!count || isNaN(count) || parseInt(count) <= 0) {
      alert('Please enter a valid number of people.');
      return false;
    }
    if (!items) {
      alert('Please specify the items needed.');
      return false;
    }
    if (!mealTime) {
      alert('Please select a meal time.');
      return false;
    }
    if (!date || date < new Date()) {
      alert('Please select a valid future date.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    const requestData = {
      name,
      address,
      contactNo,
      count: parseInt(count),
      items,
      email,
      comments,
      date: date.toISOString(),
      mealTime,
    };

    axios.post('http://172.20.10.12:5000/api/orp', requestData)
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
              <Text style={styles.title}>Orphanage Request Form</Text>
      <ScrollView contentContainerStyle={styles.container}>


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
          value={contactNo}
          keyboardType="phone-pad"
          onChangeText={setContactNo}
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
        
        <TouchableOpacity onPress={() => navigation.navigate('OrphanageRequestForm')} style={styles.navButton}>
          <Icon name="add-circle-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RequestListScreen')} style={styles.navButton}>
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
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#f45d22',
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

export default OrphanageRequestForm;
