import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const VolunteerOrder = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  // Fetch all orphanage requests from the server
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://172.20.10.12:5000/api/orp');
      setRequests(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching requests. Please try again.');
    }
  };

  // Handle update request
  const handleUpdate = async (id, request) => {
    try {
      await axios.put(`http://172.20.10.12:5000/api/orp/${id}/order`);
      fetchRequests(); // Refresh the list after updating the status
      alert('Request status updated successfully!');
      // Navigate to VolunteerMap after accepting the request
      navigation.navigate('VolunteerMap', { request });
    } catch (error) {
      console.error(error);
      alert('Error updating status. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.profileSection}>
        <Image 
          source={require("../assets/req.png")}
          style={styles.profileImage} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.requestName}>{item.name}</Text>
          <Text style={styles.requestLocation}>{item.address}</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.requestDetail}>
          <Icon name="call-outline" size={16} color="#4CAF50" /> {item.contectNo}
        </Text>
        <Text style={styles.requestDetail}>
          <Icon name="calendar-outline" size={16} color="#4CAF50" /> {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.requestDetail}>
          <Icon name="time-outline" size={16} color="#4CAF50" /> {item.mealTime}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.updateButton, item.order ? styles.updatedButton : styles.updateButton]}
          onPress={() => !item.order && handleUpdate(item._id, item)}
          disabled={item.order}
        >
          <Text style={styles.buttonText}>
            {item.order ? 'Accepted' : 'Accept'}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
    color: '#757575',
    fontSize: 14,
  },
  detailsSection: {
    marginTop: 10,
  },
  requestDetail: {
    fontSize: 14,
    color: '#388E3C',
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  updateButton: {
    backgroundColor: '#388E3C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  updatedButton: {
    backgroundColor: '#BDBDBD',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    backgroundColor: '#FAFAFA',
  },
  navText: {
    textAlign: 'center',
    color: '#388E3C',
    marginTop: 5,
    fontSize: 12,
  },
});

export default VolunteerOrder;
