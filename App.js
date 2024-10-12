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
import MealForm from "./screens/MealForm";
import MealListScreen from "./screens/MealListScreen";
import UpdateMealScreen from "./screens/UpdateMealScreen";
import TopMeal from "./screens/TopMeal";
import OrphanageRequestForm from "./screens/OrphanageRequestForm";
import RequestListScreen from "./screens/RequestListScreen";
import RestReqList from "./screens/RestReqList";
import HotelMenu from "./screens/HotelMenu";
import RandomCodeScreen from "./screens/RandomCodeScreen ";
import VolunteerScreen from "./screens/VoluteerScreen";
import RatingScreen from "./screens/RatingScreen";
import MapScreen from "./screens/MapScreen";
import HotelDetailScreen from "./screens/HotelDetails";
import OrphanageDetailScreen from "./screens/OrphanageDetails";
import OrphanageScreen from "./screens/OrphanageScreen";
import HotelScreen from "./screens/HotelScreen";
import UserProfile from "./screens/UserProfile";
import ReviewForm from "./screens/ReviewForm";
import MyFavourite from "./screens/MyFavourite";
import VolunteerOrder from "./screens/VolunteerOrder ";
import VolunteerMap from "./screens/VolunteerMap";
import VolunteerConfirm from "./screens/VolunteerConfirm";
//import UserProfile from './screens/UserProfile'
import ViewDeliveryRating from "./screens/ViewDeliveryRating";
import CartScreen from "./screens/CartScreen";
import IngredientsScreen from "./screens/IngredientsScreen";
import NutritionPlan from "./screens/NutritionPlan";
import CardDetails from "./screens/CardDetails";
import PaymentDone from "./screens/PaymentDone";
import Confirmation from "./screens/Confirmation";

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
          name="HotelMenu"
          component={HotelMenu}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="NutritionPlan" component={NutritionPlan} />
        <Stack.Screen name="IngredientsScreen" component={IngredientsScreen} />

        <Stack.Screen
          name="RandomCodeScreen"
          component={RandomCodeScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="VolunteerScreen"
          component={VolunteerScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="HotelDetailScreen"
          component={HotelDetailScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="OrphanageDetailScreen"
          component={OrphanageDetailScreen}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="OrphanageScreen"
          component={OrphanageScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen
          name="HotelScreen"
          component={HotelScreen}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen
          name="ReviewForm"
          component={ReviewForm}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen
          name="MyFavourite"
          component={MyFavourite}
          options={{ headerShown: false }} // Hides header for MealForm
        />
        <Stack.Screen
          name="VolunteerOrder"
          component={VolunteerOrder}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="VolunteerMap"
          component={VolunteerMap}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="VolunteerConfirm"
          component={VolunteerConfirm}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="PaymentDone"
          component={PaymentDone}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={{ headerShown: false }} // Hides header for the bottom tabs
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
