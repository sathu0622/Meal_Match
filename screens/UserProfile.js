// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   Image,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function UserProfile({ route, navigation }) {
//   const [userDetails, setUserDetails] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axios.get(
//         "http://172.20.10.12:5000/api/user/getuser"
//       );
//       const users = response.data.data;
//       const loggedInUserEmail = await AsyncStorage.getItem("userEmail");
//       console.log("Logged In User Email:", loggedInUserEmail);

//       const currentUser = users.find(
//         (user) => user.email === loggedInUserEmail
//       );
//       console.log("Current User:", currentUser);
//       setUserDetails(currentUser);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get(
//         "http://172.20.10.12:5000/api/review/getreviews"
//       );
//       setReviews(response.data.data);
//       fetchReviews();
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//     fetchReviews();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("userSession");
//     navigation.navigate("Login");
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       const userId = userDetails._id;
//       await axios.delete(
//         `http://172.20.10.12:5000/api/user/deleteuser/${userId}`
//       );
//       await AsyncStorage.removeItem("userSession");
//       navigation.navigate("Login");
//       Alert.alert(
//         "Account Deleted",
//         "Your account has been deleted successfully."
//       );
//     } catch (error) {
//       Alert.alert("Error", "There was an error deleting the account.");
//     }
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       await axios.delete(
//         `http://172.20.10.12:5000/api/review/deletereview/${reviewId}`
//       );
//       setReviews((prevReviews) =>
//         prevReviews.filter((review) => review._id !== reviewId)
//       ); // Update the state
//       Alert.alert(
//         "Review Deleted",
//         "Your review has been deleted successfully."
//       );
//     } catch (error) {
//       Alert.alert("Error", "There was an error deleting the review.");
//     }
//   };

//   const handleGiveReview = () => {
//     Alert.alert(
//       "Give Review",
//       "Would you like to leave a review for your purchase?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () => navigation.navigate("ReviewForm"),
//         },
//       ]
//     );
//   };

//   const confirmDeletion = () => {
//     Alert.alert("Confirm Deletion❌", "Do you want to Delete your account?", [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Yes",
//         onPress: () => handleDeleteAccount(),
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       {userDetails ? (
//         <>
//           <View style={styles.userInfo}>
//             <Text style={styles.username}>
//               Username: {userDetails.username}
//             </Text>
//             <Text style={styles.email}>Email: {userDetails.email}</Text>
//             <Text style={styles.role}>Role: {userDetails.role}</Text>
//           </View>

//           <TouchableOpacity
//             style={styles.logoutButton}
//             onPress={handleGiveReview}
//           >
//             <Text style={styles.buttonText}>Give Review</Text>
//           </TouchableOpacity>

//           <ScrollView style={styles.reviewsContainer}>
//             {reviews.length > 0 ? (
//               reviews.map((review) => (
//                 <View key={review._id} style={styles.reviewCard}>
//                   <View style={styles.reviewInfo}>
//                     <Text style={styles.reviewText}>
//                       {review.description || "No content available."}
//                     </Text>
//                     <Text style={styles.reviewText}>
//                       Star Rating: {review.stars || "No content available."}
//                     </Text>
//                   </View>
//                   <TouchableOpacity
//                     style={styles.deleteButtonContainer}
//                     onPress={() => handleDeleteReview(review._id)}
//                   >
//                     <Image
//                       source={require("../assets/bin.png")}
//                       style={styles.DeleteImage}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noReviewsText}>No reviews available.</Text>
//             )}
//           </ScrollView>

//           <View style={styles.buttons}>
//             <TouchableOpacity
//               style={styles.logoutButton}
//               onPress={handleLogout}
//             >
//               <Text style={styles.buttonText}>Logout</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.deleteButton}
//               onPress={confirmDeletion}
//             >
//               <Text style={styles.buttonText}>Delete Account</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <Text style={styles.loadingText}>Loading user details...</Text>
//       )}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity onPress={() => navigation.navigate('UserScreen')} style={styles.navButton}>
//           <Icon name="home-outline" size={30} color="#D55A00" />
//           <Text style={styles.navText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('MyFavourite')} style={styles.navButton}>
//           <Icon name="heart-outline" size={30} color="#D55A00" />
//           <Text style={styles.navText}>Like</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.navButton}>
//           <Icon name="person-outline" size={30} color="#D55A00" />
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     backgroundColor: "#f0f0f0",
//   },
//   userInfo: {
//     marginBottom: 30,
//     marginTop: 10,
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   email: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   role: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   reviewsContainer: {
//     marginTop: 20,
//   },
//   reviewCard: {
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//     flexDirection: "row", // Align items in a row
//     justifyContent: "space-between", // Space between text and delete image
//     alignItems: "center",
//   },
//   reviewText: {
//     fontSize: 16,
//   },
//   noReviewsText: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "gray",
//   },
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 5,
//   },
//   logoutButton: {
//     backgroundColor: "black",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   deleteButton: {
//     backgroundColor: "red",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   loadingText: {
//     textAlign: "center",
//     fontSize: 16,
//   },
//   DeleteImage: {
//     width: 25,
//     height: 25,
//   },
//   bottomNav: {
//     marginTop:10,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     backgroundColor: '#f5f5f5',
//   },
//   navText: {
//     textAlign: 'center',
//     color: '#D55A00',
//     marginTop: 5,
//     fontSize: 12,
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function UserProfile({ route }) {
  const [userDetails, setUserDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [deliveryReview, setDeliveryReview] = useState("");
  const [deliveryRating, setDeliveryRating] = useState("");
  const navigation = useNavigation();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.12:5000/api/user/getuser"
      );
      const users = response.data.data;
      const loggedInUserEmail = await AsyncStorage.getItem("userEmail");
      console.log("Logged In User Email:", loggedInUserEmail);

      const currentUser = users.find(
        (user) => user.email === loggedInUserEmail
      );
      console.log("Current User:", currentUser);
      setUserDetails(currentUser);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.12:5000/api/review/getreviews"
      );
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchReviews();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userSession");
    navigation.navigate("Login");
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = userDetails._id;
      await axios.delete(
        `http://192.168.8.138:5000/api/user/deleteuser/${userId}`
      );
      await AsyncStorage.removeItem("userSession");
      navigation.navigate("Login");
      Alert.alert(
        "Account Deleted",
        "Your account has been deleted successfully."
      );
    } catch (error) {
      Alert.alert("Error", "There was an error deleting the account.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://172.20.10.12:5000/api/review/deletereview/${reviewId}`
      );
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
      Alert.alert(
        "Review Deleted",
        "Your review has been deleted successfully."
      );
    } catch (error) {
      Alert.alert("Error", "There was an error deleting the review.");
    }
  };

  const handleGiveReview = () => {
    Alert.alert(
      "Give Review",
      "Would you like to leave a review for your purchase?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate("ReviewForm"),
        },
      ]
    );
  };

  const handleDeliveryReviewSubmit = () => {
    navigation.navigate("ViewDeliveryRating");
  };

  const confirmDeletion = () => {
    Alert.alert("Confirm Deletion❌", "Do you want to Delete your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => handleDeleteAccount(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <View style={styles.userInfo}>
            <Text style={styles.username}>
              Username: {userDetails.username}
            </Text>
            <Text style={styles.email}>Email: {userDetails.email}</Text>
            <Text style={styles.role}>Role: {userDetails.role}</Text>
          </View>

          {userDetails.role === "buyer" && (
            <View style={styles.deliveryReviewContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleDeliveryReviewSubmit}
              >
                <Text style={styles.buttonText}>View Delivery Review</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleGiveReview}
          >
            <Text style={styles.buttonText}>Give Review</Text>
          </TouchableOpacity>

          <ScrollView style={styles.reviewsContainer}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <View key={review._id} style={styles.reviewCard}>
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewText}>
                      {review.description || "No content available."}
                    </Text>
                    <Text style={styles.reviewText}>
                      Star Rating: {review.stars || "No content available."}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButtonContainer}
                    onPress={() => handleDeleteReview(review._id)}
                  >
                    <Image
                      source={require("../assets/bin.png")}
                      style={styles.DeleteImage}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noReviewsText}>No reviews available.</Text>
            )}
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={confirmDeletion}
            >
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading user details...</Text>
      )}
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
  userInfo: {
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    marginBottom: 5,
  },
  deliveryReviewContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  reviewsContainer: {
    marginTop: 20,
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
    color: "#333",
  },
  noReviewsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#f57c00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
  deleteButtonContainer: {
    padding: 8,
  },
  DeleteImage: {
    width: 24,
    height: 24,
    tintColor: "#d32f2f",
  },
});
