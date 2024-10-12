import React from 'react';
                import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
                import { MaterialIcons } from '@expo/vector-icons';
                
                const PaymentDone = ({navigation}) => {
                  return (
                    <View style={styles.container}>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="check-circle" size={60} color="white" />
                      </View>
                      <Text style={styles.title}>Payment Done</Text>
                      <Text style={styles.subtitle}>A receipt will be sent directly to the email</Text>
                      <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate("Confirmation")}>
                        <Text style={styles.buttonText}>Confirmation</Text>
                      </TouchableOpacity>
                    </View>
                  );
                };
                
                const styles = StyleSheet.create({
                  container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFCC00', // Yellow background
                    padding: 20,
                  },
                  iconContainer: {
                    backgroundColor: '#FFA500', // Orange background for the icon
                    borderRadius: 30,
                    padding: 15,
                    marginBottom: 20,
                  },
                  title: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#000', // Black text
                    marginBottom: 10,
                  },
                  subtitle: {
                    fontSize: 16,
                    color: '#000', // Black text
                    textAlign: 'center',
                    marginBottom: 20,
                  },
                  button: {
                    backgroundColor: '#FF5733', // Red button
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  },
                  buttonText: {
                    color: '#FFF', // White text
                    fontSize: 16,
                  },
                });
                
                export default PaymentDone;
               
                
      
