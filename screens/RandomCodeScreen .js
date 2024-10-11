import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RandomCodeScreen = ({ navigation }) => {
    // State to hold the random code
    const [code, setCode] = useState('');

    useEffect(() => {
        // Generate a random code when the component is mounted
        generateRandomCode();
    }, []);

    // Function to generate a random 6-digit code
    const generateRandomCode = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCode(randomCode);
    };

    // Function to navigate to the RatingScreen
    const handleContinue = () => {
        navigation.navigate('RatingScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Driver Code</Text>
            <Text style={styles.code}>{code}</Text>
            <Text style={styles.info}>Please show this code to the driver for verification.</Text>
            <Button 
                title="Continue" 
                onPress={handleContinue}
                color="#4CAF50"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E95322', // Orange background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF', // White text color
    },
    code: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF', // White number color
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        color: '#FFFFFF', // White text color
    },
});

export default RandomCodeScreen;
