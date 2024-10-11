import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const RestReqList = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  // Fetch all orphanage requests from the server
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://172.20.10.12:5000/api/orp');
      setRequests(response.data);
      fetchRequests(); 
    } catch (error) {
      console.error(error);
      alert('Error fetching requests. Please try again.');
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
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://172.20.10.12:5000/api/orp/${id}/status`);
      fetchRequests(); // Refresh the list after updating the status
      alert('Request status updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating status. Please try again.');
    }
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
        <TouchableOpacity
          style={[styles.updateButton, item.status ? styles.updatedButton : styles.updateButton]}
          onPress={() => !item.status && handleUpdate(item._id)} // Only allow update if not updated
          disabled={item.status} // Disable button if status is true
        >
          <Text style={styles.buttonText}>
            {item.status ? 'Updated' : 'Update'} {/* Change text if status is true */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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
    backgroundColor: '#0066cc', // default blue color
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  updatedButton: {
    backgroundColor: 'red', // red color for updated status
    opacity: 0.6, // Make the button appear disabled
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
    fontSize: 12,}
});

export default RestReqList;
