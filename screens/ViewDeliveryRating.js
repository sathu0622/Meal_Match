import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewDeliveryRating({ navigation }) {
  const [ratings, setRatings] = useState([]);
  const [editingRating, setEditingRating] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [email, setEmail] = useState(null); // State to hold the email

  useEffect(() => {
    // Retrieve the email from AsyncStorage when the component mounts
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail !== null) {
          console.log("User Email:", storedEmail);
          setEmail(storedEmail); // Store email in state
        }
      } catch (error) {
        console.error("Error retrieving user email:", error);
      }
    };

    getEmail();
  }, []);

  useEffect(() => {
    if (email) {
      fetchRatings();
    }
  }, [email]);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://172.20.10.12:5000/api/rating/ratings');
      // Filter ratings by the logged-in user's email
      const filteredRatings = response.data.filter(rating => rating.userEmail === email); // Use the email state
      setRatings(filteredRatings);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch ratings.');
      console.error('Error fetching ratings:', error);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      await axios.delete(`http://172.20.10.12:5000/api/rating/ratings/${ratingId}`);
      setRatings((prevRatings) =>
        prevRatings.filter((rating) => rating._id !== ratingId)
      );
      Alert.alert('Success', 'Rating deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete rating.');
      console.error('Error deleting rating:', error);
    }
  };

  const handleUpdateRating = async () => {
    if (!editingRating) return;

    try {
      const response = await axios.put(
        `http://172.20.10.12:5000/api/rating/ratings/${editingRating._id}`,
        { review: updatedText }
      );
      setRatings((prevRatings) =>
        prevRatings.map((rating) =>
          rating._id === editingRating._id ? response.data : rating
        )
      );
      setEditingRating(null);
      setUpdatedText('');
      Alert.alert('Success', 'Rating updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update rating.');
      console.error('Error updating rating:', error);
    }
  };

  const startEditing = (rating) => {
    setEditingRating(rating);
    setUpdatedText(rating.review);
  };

  const cancelEditing = () => {
    setEditingRating(null);
    setUpdatedText('');
  };

  const renderRating = ({ item }) => (
    <View style={styles.ratingCard}>
      <Text style={styles.ratingText}>Review: {item.review}</Text>
      <Text style={styles.ratingText}>Stars: {item.rating}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => startEditing(item)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteRating(item._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {editingRating ? (
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>Edit Rating</Text>
          <TextInput
            style={styles.input}
            value={updatedText}
            onChangeText={setUpdatedText}
            placeholder="Update rating description"
          />
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateRating}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={ratings}
          keyExtractor={(item) => item._id}
          renderItem={renderRating}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.noRatingsText}>No ratings available.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  ratingCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  editContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  listContainer: {
    paddingVertical: 10,
  },
  noRatingsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
