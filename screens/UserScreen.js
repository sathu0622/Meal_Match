import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ route, navigation }) {
  const userDetails = route.params || { username: "Guest" };
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.12:5000/api/hotel/getHotels"
      );
      setHotels(response.data.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const RenderHotelCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.hotelName}</Text>
      <Text>{item.hotelLocation}</Text>
      <Text>{item.email}</Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate("HotelMenu", { email: item.email })}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/userjpg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.welcomeText}>
              Welcome, {userDetails.username}!
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Image
                source={require("../assets/profile.png")}
                style={styles.profileImage}
              />
            </TouchableOpacity>

            {/* */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Hotels</Text>
          <FlatList
            data={hotels}
            keyExtractor={(item) => item._id}
            renderItem={RenderHotelCard}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('UserScreen')} style={styles.navButton}>
          <Icon name="home-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TopMeal')} style={styles.navButton}>
          <Icon name="heart-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.navButton}>
          <Icon name="person-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Request</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 0.8,
    resizeMode: "cover",
    opacity: 0.8,
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: 18,
    padding: 20,
  },
  headerRow: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 70,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f2e7e6",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: "#FF9800",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
