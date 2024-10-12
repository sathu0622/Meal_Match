import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
//import StripeCheckout from 'react-stripe-checkout';

// Use fixed colors for the pie chart
const fixedColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const NutritionPlan = ({ route, navigation }) => {
  const { cartData } = route.params; // Receiving cart items

  // Calculate total calories
  const totalCalories = cartData.reduce((sum, item) => sum + item.calories * item.quantity, 0);

  // Get current time in hours
  const currentHour = new Date().getHours();

  // Generate chart data
  const chartData = cartData.map((item, index) => ({
    name: item.itemName, // Ensure this matches the property from your cart items
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
<View style={{ padding: 10, backgroundColor: '#F5CB58', flex: 1 ,alignItems: 'center'}}>

  {/* Nutrition Plan Heading Centered */}
  <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>Nutrition Plan</Text>
  
  
  {/* Pie Chart */}
  <PieChart
    data={chartData}
    width={Dimensions.get('window').width - 40} // Adjust width as needed
    height={200}
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
   // paddingLeft="100"
  />
  {/* Total Calories Text */}
  <Text style={{ fontSize: 18, marginVertical: 10, textAlign: 'center' }}>Total Calories: {totalCalories} kcal</Text>
  
    <Text style={{ marginVertical: 20, fontSize: 24, color: '#E95322', textAlign: 'center',fontWeight:'bold' }}>
    Recommendation
  </Text>
  <Text style={{ marginVertical: 5, fontSize: 16, color: '#E95322', textAlign: 'center' }}>
    {getRecommendation(totalCalories, currentHour)}
  </Text>
  {/* Recommendation Message with Orange Color */}


  {/* Buttons for navigation */}
  <Button title="CheckOut"   onPress={() => navigation.navigate('CardDetails')
  } />
</View>

  );
};


export default NutritionPlan;

