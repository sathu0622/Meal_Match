import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const fixedColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const NutritionPlanScreen = ({ route, navigation }) => {
  const { cartItems } = route.params; // Receiving cart items

  // Calculate total calories
  const totalCalories = cartItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);

  // Get current time in hours
  const currentHour = new Date().getHours();

  // Generate chart data
  const chartData = cartItems.map((item, index) => ({
    name: item.name,
    calories: item.calories * item.quantity,
    color: fixedColors[index % fixedColors.length], // Use fixed colors
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  // Generate recommendation message based on total calories and time
  const getRecommendation = (totalCalories, hour) => {
    let recommendation = '';

    if (hour < 12) { // Morning
        recommendation = 'Good morning! A healthy breakfast can help kickstart your day.';
    } else if (hour < 17) { // Afternoon
        if (totalCalories > 600) {
            recommendation = 'It looks like you have had a substantial lunch. Consider lighter snacks.';
        } else {
            recommendation = 'Your calorie intake for lunch seems balanced.';
        }
    } else if (hour < 21) { // Evening
        if (totalCalories > 800) {
            recommendation = 'Dinner is important. Make sure to balance your intake for the evening.';
        } else {
            recommendation = 'Your dinner seems light and healthy!';
        }
    } else { // After 9 PM
        if (totalCalories > 600) {
            recommendation = 'It\'s late, and consuming more than 600 calories at this time might not be ideal.';
        } else {
            recommendation = 'This meal is appropriate for a late-night snack.';
        }
    }
    
    return recommendation;
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Nutrition Plan</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Total Calories: {totalCalories} kcal</Text>
      
      {/* Pie Chart */}
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="calories"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      {/* Recommendation Message */}
      <Text style={{ marginVertical: 20, fontSize: 16 }}>
        {getRecommendation(totalCalories, currentHour)}
      </Text>

      {/* Buttons for navigation */}
      <Button title="Skip" onPress={() => Alert.alert("Proceeding to Payment Process")} />
      <Button title="View Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default NutritionPlanScreen;
