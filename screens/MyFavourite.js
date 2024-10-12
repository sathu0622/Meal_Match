import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';


export default function UserProfile({ route, navigation }) {
  const [userDetails, setUserDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [favoriteReviews, setFavoriteReviews] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://172.20.10.12:5000/api/user/getuser");
      const users = response.data.data;
      const loggedInUserEmail = await AsyncStorage.getItem("userEmail");
      console.log("Logged In User Email:", loggedInUserEmail);

      const currentUser = users.find((user) => user.email === loggedInUserEmail);
      console.log("Current User:", currentUser);
      setUserDetails(currentUser);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://172.20.10.12:5000/api/review/getreviews");
      const allReviews = response.data.data;
      setReviews(allReviews);

      // Filter favorite reviews with star rating greater than 4
      const filteredFavorites = allReviews.filter(review => review.stars > 4);
      setFavoriteReviews(filteredFavorites);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchReviews();
  }, []);

  // Function to render star ratings
  const renderStars = (stars) => {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      starElements.push(
        <Text key={i} style={i <= stars ? styles.filledStar : styles.emptyStar}>★</Text>
      );
    }
    return <View style={styles.starContainer}>{starElements}</View>;
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userSession");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>Favorite Reviews</Text>
        {favoriteReviews.length > 0 ? (
          favoriteReviews.map((review) => (
            <View key={review._id} style={styles.reviewCard}>
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewText}>
                  {review.description || "No content available."}
                </Text>
                {renderStars(review.stars)}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No favorite reviews yet.</Text>
        )}

        <Text style={styles.sectionTitle}>All Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <View key={review._id} style={styles.reviewCard}>
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewText}>
                  {review.description || "No content available."}
                </Text>
                {renderStars(review.stars)}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews available.</Text>
        )}
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('UserScreen')} style={styles.navButton}>
          <Icon name="home-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyFavourite')} style={styles.navButton}>
          <Icon name="heart-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.navButton}>
          <Icon name="person-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  reviewsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  reviewCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewText: {
    fontSize: 16,
  },
  noReviewsText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  starContainer: {
    flexDirection: "row",
  },
  filledStar: {
    fontSize: 24,
    color: "#FFD700",
  },
  emptyStar: {
    fontSize: 24,
    color: "#ccc",
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
