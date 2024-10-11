import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RatingScreen = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
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

  const submitRating = async () => {
    try {
      await axios.post('http://192.168.8.138:5000/api/rating/ratings', {
        driverName: 'David Wayne',
        rating,
        review,
        userEmail: email
      });
      alert('Rating submitted successfully!');
    } catch (error) {
      alert('Failed to submit rating');
    }
  };

  // Custom star rendering
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={[styles.star, { color: i <= rating ? 'orange' : 'gray' }]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Driver Rating</Text>
      <Text style={styles.subtitle}>Rate your driver's delivery service.</Text>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://example.com/avatar.jpg' }} // Update with actual avatar URL
      />
      <Text style={styles.driverName}>David Wayne</Text>
      <View style={styles.starContainer}>
        {renderStars()}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type your review ..."
        value={review}
        onChangeText={setReview}
      />
      <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  driverName: {
    fontSize: 18,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RatingScreen;
