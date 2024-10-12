import React from 'react';
                import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
                
                const ConfirmationDetails = ({navigation}) => {
                  return (
                    <View style={styles.container}>
                      <Text style={styles.title}>Confirmation Details</Text>
                      <View style={styles.checkIconContainer}>
                        <Text style={styles.checkIcon}>✔</Text>
                      </View>
                      <View style={styles.paymentDetailContainer}>
                        <Text style={styles.paymentDetailTitle}>Payment Detail</Text>
                        <Text style={styles.detailText}>Order No: 1485155821495812</Text>
                        <Text style={styles.detailText}>Total: Rs450.00</Text>
                        <Text style={styles.detailText}>Date & Time: 05.11.2023 - 21:30</Text>
                        <Text style={styles.detailText}>Payment Method: PAYTM</Text>
                        <Text style={styles.detailText}>Name: Kablan</Text>
                        <Text style={styles.detailText}>Email: Kablan@gmail.com</Text>
                      </View>
                      <Text style={styles.supportText}>
                        If you have any questions, please reach out directly to our customer support
                      </Text>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.returnButton}
                        onPress={() => navigation.navigate("MapScreen")}>
                          <Text style={styles.buttonText}>View Delivery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.reviewButton}>
                          <Text style={styles.buttonText}>Review</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                };
                
                const styles = StyleSheet.create({
                  container: {
                    flex: 1,
                    backgroundColor: '#FFFAE3',
                    padding: 20,
                    justifyContent: 'center',
                  },
                  title: {
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#FFB300',
                    textAlign: 'center',
                    marginBottom: 20,
                  },
                  checkIconContainer: {
                    alignItems: 'center',
                    marginBottom: 20,
                  },
                  checkIcon: {
                    fontSize: 50,
                    color: '#FFB300',
                  },
                  paymentDetailContainer: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    padding: 15,
                    marginBottom: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  },
                  paymentDetailTitle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  },
                  detailText: {
                    fontSize: 16,
                    marginBottom: 5,
                  },
                  supportText: {
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 20,
                    color: '#666',
                  },
                  buttonContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  returnButton: {
                    backgroundColor: '#FFB300',
                    padding: 10,
                    borderRadius: 5,
                    flex: 1,
                    marginRight: 5,
                    alignItems: 'center',
                  },
                  reviewButton: {
                    backgroundColor: '#FF5722',
                    padding: 10,
                    borderRadius: 5,
                    flex: 1,
                    marginLeft: 5,
                    alignItems: 'center',
                  },
                  buttonText: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                  },
                });
                
                export default ConfirmationDetails;