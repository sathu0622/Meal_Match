import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen";
import StartScreenTwo from "./screens/StartScreenTwo";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import UserScreen from "./screens/UserScreen";
import IntroPageOne from "./screens/IntroPageOne";
import IntroPageTwo from "./screens/IntroPageTwo";
import IntroPageThree from "./screens/IntroPageThree";
import IntroPageFour from "./screens/IntroPageFour";
import MealForm from './screens/MealForm';
import MealListScreen from './screens/MealListScreen';
import UpdateMealScreen from './screens/UpdateMealScreen';
import TopMeal from "./screens/TopMeal";
import OrphanageRequestForm from "./screens/OrphanageRequestForm"
import RequestListScreen from "./screens/RequestListScreen"
import RestReqList from "./screens/RestReqList"

import MapScreen from './screens/MapScreen';
import RatingScreen from './screens/RatingScreen';
import RandomCodeScreen from './screens/RandomCodeScreen ';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StartTwo"
          component={StartScreenTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WPageOne"
          component={IntroPageOne}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WPageTwo"
          component={IntroPageTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WPageThree"
          component={IntroPageThree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WPageFour"
          component={IntroPageFour}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen 
          name="MealForm" 
          component={MealForm}
          options={{ headerShown: false }} // Hides header for MealForm
        />
          <Stack.Screen 
          name="MealListScreen" 
          component={MealListScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
          <Stack.Screen 
          name="UpdateMealScreen" 
          component={UpdateMealScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen
          name="TopMeal"
          component={TopMeal}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="OrphanageRequestForm"
          component={OrphanageRequestForm}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="RequestListScreen"
          component={RequestListScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
                <Stack.Screen
          name="RestReqList"
          component={RestReqList}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen 
          name="MapScreen" 
          component={MapScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen 
          name="RatingScreen" 
          component={RatingScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen 
          name="RandomCodeScreen" 
          component={RandomCodeScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
