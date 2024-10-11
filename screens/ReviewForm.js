import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const ReviewForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [starCount, setStarCount] = useState(0);

  const handleSubmit = async () => {
    console.log('Email:', email);
    console.log('Review:', review);
    console.log('Stars:', starCount);

    try {
      const response = await axios.post('http://172.20.10.12:5000/api/review/review', {
        email,
        description: review,
        stars: starCount,
      });

      // Handle response
      if (response.data.success) {
        console.log('Review submitted successfully');
        // Reset form
        setEmail('');
        setReview('');
        setStarCount(0);
        // Navigate to another screen if needed
        navigation.navigate('UserProfile');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setStarCount(i)}>
          <Text style={i <= starCount ? styles.filledStar : styles.emptyStar}>★</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Thank You for Your Purchase!</Text>
      <Text style={styles.subtitle}>Please leave a review</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Review"
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={4}
      />

      <View style={styles.starContainer}>
        {renderStars()}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:20
  },
  backText: {
    color: 'black',
    fontSize: 16,
  },
  skipText: {
    color: 'black',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filledStar: {
    fontSize: 40,
    color: '#FFD700',
  },
  emptyStar: {
    fontSize: 40,
    color: '#ccc',
  },
  button: {
    backgroundColor: '#ff5e62',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ReviewForm;
