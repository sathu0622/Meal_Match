import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MealForm from '../screens/MealForm'
import MealListScreen from '../screens/MealListScreen'
const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return (
        <Tab.Navigator>
          <Tab.Screen name="MealForm" component={MealForm} />
          <Tab.Screen name="MealListScreen" component={MealListScreen} />
        </Tab.Navigator>
      );

}

export default Tabs;