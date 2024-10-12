import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const VolunteerConfirm = ({ navigation }) => {
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Handle confirm order
  const handleConfirmOrder = () => {
    if (confirmationNumber.trim() === '') {
      Alert.alert('Error', 'Please enter a confirmation number.');
      return;
    }

    Alert.alert('Success', `Order confirmed with number: ${confirmationNumber}`);
    navigation.navigate("VolunteerOrder");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Order</Text>
      <Text style={styles.label}>Enter Confirmation Number:</Text>
      <TextInput
        style={styles.input}
        value={confirmationNumber}
        onChangeText={setConfirmationNumber}
        placeholder="Confirmation Number"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#388E3C',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VolunteerConfirm;
