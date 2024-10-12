import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RequestListScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  // Fetch all orphanage requests from the server
  useEffect(() => {
    fetchRequests();
  }, []);
  // const fetchRequests = async () => {
  //   try {
  //     const response = await axios.get('http://192.168.8.159:5000/api/orp');
  //     setRequests(response.data);
  //     fetchRequests();
  //   } catch (error) {
  //     console.error(error);
  //     alert('Error fetching requests. Please try again.');
  //   }
  // };

  const fetchRequests = async () => {
    try {
      // Retrieve logged-in user's email
      const userEmail = await AsyncStorage.getItem('userEmail');
      
      if (!userEmail) {
        console.error('No user email found');
        return;
      }
  
      // Fetch meals for this email only
      const response = await axios.get(`http://172.20.10.12:5000/api/orpmail?email=${userEmail}`);
      setRequests(response.data);
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle delete request
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://172.20.10.12:5000/api/orp/${id}`);
      fetchRequests(); // Refresh the list after deletion
      alert('Request deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error deleting request. Please try again.');
    }
  };

  // Handle update request
  const handleUpdate = (item) => {
    navigation.navigate('OrphanageRequestForm', { item }); // Pass the item to the form for updating
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      {/* Placeholder for Orphanage Profile Image */}
      <View style={styles.profileSection}>
        <Image 
          source={require("../assets/req.png")}
          style={styles.profileImage} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.requestName}>{item.name}</Text>
          <Text style={styles.requestLocation}>{item.address}</Text>
          <Text style={styles.requestStatus}>Online</Text>
        </View>
      </View>
  
      <View style={styles.detailsSection}>
        <Text style={styles.requestDetail}>Contact: {item.contectNo}</Text>
        <Text style={styles.requestDetail}>Count: {item.count}</Text>
        <Text style={styles.requestDetail}>Items Needed: {item.items}</Text>
        <Text style={styles.requestDetail}>Date: {new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.requestDetail}>Meal Time: {item.mealTime}</Text>
      </View>
  
      <View style={styles.buttonContainer}>
        {item.status ? (
          // Show 'Accepted' if status is true
          <TouchableOpacity style={[styles.acceptedButton, { backgroundColor: 'green' }]} disabled={true}>
            <Text style={styles.buttonText}>Accepted</Text>
          </TouchableOpacity>
        ) : (
          // Show 'Remove' button if status is false
          <TouchableOpacity style={styles.deleteButton} onPress={() => {
            Alert.alert(
              "Delete Request",
              "Are you sure you want to delete this request?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => handleDelete(item._id) },
              ]
            );
          }}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
<Text style={styles.title}>Your Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
            <View style={styles.bottomNav}>
        
        <TouchableOpacity onPress={() => navigation.navigate('OrphanageRequestForm')}>
          <Icon name="add-circle-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RequestListScreen')}>
          <Icon name="document-text-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Requste</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  requestItem: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#f45d22',
  },
  
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  requestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requestLocation: {
    color: '#666',
    fontSize: 14,
  },
  requestStatus: {
    color: 'green',
    fontSize: 12,
    marginTop: 2,
  },
  detailsSection: {
    marginTop: 10,
  },
  requestDetail: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  updateButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#cc0000',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  navText: {
    textAlign: 'center',
    color: '#D55A00',
    marginTop: 5,
    fontSize: 12,
  },
});

export default RequestListScreen;
