import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, Polyline } from 'react-native-maps';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const MapScreen = () => {
    const [restaurantLocation, setRestaurantLocation] = useState(null);
    const [deliveryLocation, setDeliveryLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [vehicleLocation, setVehicleLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deliveryCompleted, setDeliveryCompleted] = useState(false);
    const [deliveryPersonDetails, setDeliveryPersonDetails] = useState({
        name: 'John Doe',
        phone: '123-456-7890',
        vehicle: 'Bicycle',
    });
    const mapRef = useRef(null);
    const socket = io('http://172.20.10.12:5000'); // Replace with your backend URL
    const navigation = useNavigation(); // Use useNavigation

    useEffect(() => {
        axios.get('http://172.20.10.12:5000/restaurant-location') // Replace with your backend URL
            .then(response => {
                setRestaurantLocation(response.data);
                setVehicleLocation(response.data); // Initialize the vehicle at the restaurant
            })
            .catch(error => console.error(error));

        const handleLocationUpdate = (location) => {
            setDeliveryLocation(location);
        };

        socket.on('locationUpdate', handleLocationUpdate);

        return () => {
            socket.off('locationUpdate', handleLocationUpdate);
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (restaurantLocation && deliveryLocation) {
            const fetchRoute = async () => {
                try {
                    const response = await axios.get(
                        `https://router.project-osrm.org/route/v1/driving/${restaurantLocation.longitude},${restaurantLocation.latitude};${deliveryLocation.longitude},${deliveryLocation.latitude}?overview=full&geometries=geojson`
                    );
                    const { coordinates } = response.data.routes[0].geometry;
                    const routeCoords = coordinates.map(coord => ({
                        latitude: coord[1],
                        longitude: coord[0],
                    }));
                    setRouteCoordinates(routeCoords);
                } catch (error) {
                    console.error('Error fetching route:', error);
                }
            };

            fetchRoute();
        }
    }, [restaurantLocation, deliveryLocation]);

    useEffect(() => {
        if (routeCoordinates.length > 0) {
            const duration = 10000; // Total duration in milliseconds (10 seconds)
            const intervalTime = duration / routeCoordinates.length; // Calculate the interval duration

            let index = 0;
            const interval = setInterval(() => {
                if (index < routeCoordinates.length) {
                    setVehicleLocation(routeCoordinates[index]);
                    index += 1;
                } else {
                    clearInterval(interval);
                }
            }, intervalTime);

            return () => clearInterval(interval);
        }
    }, [routeCoordinates]);

    // Check for delivery completion
    useEffect(() => {
        const threshold = 0.0001; // Adjust threshold as needed

        if (
            vehicleLocation &&
            deliveryLocation &&
            Math.abs(vehicleLocation.latitude - deliveryLocation.latitude) < threshold &&
            Math.abs(vehicleLocation.longitude - deliveryLocation.longitude) < threshold
        ) {
            setDeliveryCompleted(true);
        }
    }, [vehicleLocation, deliveryLocation]);

    // Separate useEffect for navigation after delivery completion
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("VolunteerConfirm");
        }, 15000);
    
        return () => clearTimeout(timer); // Cleanup the timer
    }, []);
    

    const displayedRouteCoordinates = routeCoordinates.slice(
        routeCoordinates.findIndex(
            coord => coord.latitude === vehicleLocation?.latitude && coord.longitude === vehicleLocation?.longitude
        )
    );

    const initialRegion = restaurantLocation
        ? {
            latitude: restaurantLocation.latitude,
            longitude: restaurantLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }
        : {
            latitude: 6.9271,  // Latitude for Colombo, Sri Lanka
            longitude: 79.8612, // Longitude for Colombo, Sri Lanka
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
            >
                {restaurantLocation && (
                    <Marker
                        coordinate={restaurantLocation}
                        title="Restaurant"
                        pinColor="red"
                    />
                )}
                {deliveryLocation && (
                    <Marker
                        coordinate={deliveryLocation}
                        title="Delivery Location"
                        pinColor="blue"
                    />
                )}
                {vehicleLocation && (
                    <Marker
                        coordinate={vehicleLocation}
                        title="Vehicle"
                    >
                        <Image
                            source={require('../assets/bicycle.png')} // Path to your icon image
                            style={{ width: 40, height: 40 }} // Adjust size as needed
                        />
                    </Marker>
                )}
                {displayedRouteCoordinates.length > 0 && (
                    <Polyline
                        coordinates={displayedRouteCoordinates}
                        strokeColor="#0000FF"
                        strokeWidth={3}
                    />
                )}
            </MapView>

            <TouchableOpacity 
                style={styles.deliveryButton} 
                onPress={() => setModalVisible(true)}
            >
                <Icon name="user" size={24} color="white" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Delivery Person Details</Text>
                        <Text>Name: {deliveryPersonDetails.name}</Text>
                        <Text>Phone: {deliveryPersonDetails.phone}</Text>
                        <Text>Vehicle: {deliveryPersonDetails.vehicle}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    deliveryButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#E95322',
        padding: 10,
        borderRadius: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#E95322',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
});

export default MapScreen;
