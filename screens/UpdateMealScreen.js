import React, { useEffect, useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Platform, 
  ScrollView, 
  Alert 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const UpdateMealScreen = ({ route, navigation }) => {
  const { meal } = route.params || {};
  const [itemName, setName] = useState(meal?.itemName || '');
  const [description, setDescription] = useState(meal?.description || '');
  const [category, setCategory] = useState(meal?.category || '');
  const [price, setPrice] = useState(meal?.price?.toString() || '');
  const [discount, setDiscount] = useState(meal?.discount?.toString() || '');
  const [expiryTime, setExpiryTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(meal?.isVegetarian || false);
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (meal) {
      setName(meal.itemName || '');
      setDescription(meal.description || '');
      setCategory(meal.category || '');
      setPrice(meal.price ? meal.price.toString() : '');
      setDiscount(meal.discount ? meal.discount.toString() : '');

      const expiryDate = new Date(meal.expiryTime);
      setExpiryTime(isNaN(expiryDate.getTime()) ? new Date() : expiryDate);
      setIsVegetarian(meal.isVegetarian || false);
    }
  }, [meal]);

  useEffect(() => {
    validateForm();
  }, [itemName, description, category, price, discount]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expiryTime;
    setShowDatePicker(Platform.OS === 'ios');
    setExpiryTime(currentDate);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || expiryTime;
    setShowTimePicker(Platform.OS === 'ios');
    const updatedExpiryTime = new Date(expiryTime);
    updatedExpiryTime.setHours(currentTime.getHours());
    updatedExpiryTime.setMinutes(currentTime.getMinutes());
    setExpiryTime(updatedExpiryTime);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!itemName) {
      newErrors.itemName = 'Meal name is required.';
    }
    if (!description) {
      newErrors.description = 'Description is required.';
    }
    if (!category) {
      newErrors.category = 'Please select a category.';
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a valid positive number.';
    }
    if (discount && (isNaN(discount) || parseFloat(discount) < 0 || parseFloat(discount) > 100)) {
      newErrors.discount = 'Discount must be between 0 and 100.';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleUpdate = () => {
    validateForm();

    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please correct the highlighted errors.');
      return;
    }

    const updatedMealData = {
      itemName,
      description,
      category,
      price: parseFloat(price),
      discount: parseInt(discount),
      expiryTime,
      isVegetarian,
    };

    axios.put(`http://172.20.10.12:5000/api/meals/${meal._id}`, updatedMealData)
      .then(response => {
        alert('Meal updated successfully!');
        navigation.navigate("MealListScreen", { refresh: true });
      })
      .catch(error => {
        console.log('Meal ID:', meal._id);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainContainer}>
              <Text style={styles.title}>Update Food</Text>
      <ScrollView contentContainerStyle={styles.container}>


        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, errors.itemName && styles.errorInput]}
          placeholder="Meal name, e.g., 'Rice and Curry'"
          value={itemName}
          onChangeText={setName}
        />
        {errors.itemName && <Text style={styles.errorText}>{errors.itemName}</Text>}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, errors.description && styles.errorInput]}
          placeholder="Brief description of the meal"
          value={description}
          onChangeText={setDescription}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          style={[styles.picker, errors.category && styles.errorInput]}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Kottu" value="Kottu" />
          <Picker.Item label="Rice" value="Rice" />
          <Picker.Item label="Parotta" value="Parotta" />
          <Picker.Item label="String Hoppers" value="String Hoppers" />
          <Picker.Item label="Hoppers" value="Hoppers" />
          <Picker.Item label="Shorteats" value="Shorteats" />
        </Picker>
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={[styles.input, errors.price && styles.errorInput]}
          placeholder="Enter price, e.g., '120.00'"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <Text style={styles.label}>Discount</Text>
        <TextInput
          style={[styles.input, errors.discount && styles.errorInput]}
          placeholder="Discount percentage, e.g., '10%'"
          value={discount}
          keyboardType="numeric"
          onChangeText={setDiscount}
        />
        {errors.discount && <Text style={styles.errorText}>{errors.discount}</Text>}

        <Text style={styles.label}>Expiry Date and Time</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>
            {expiryTime.toLocaleDateString()} {expiryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={expiryTime}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={expiryTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Vegetarian</Text>
          <TouchableOpacity
            style={[styles.toggle, isVegetarian && styles.activeToggle]}
            onPress={() => setIsVegetarian(true)}
          >
            <Text style={styles.toggleText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggle, !isVegetarian && styles.activeToggle]}
            onPress={() => setIsVegetarian(false)}
          >
            <Text style={styles.toggleText}>No</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.postButton, !isFormValid && styles.disabledButton]} 
          onPress={handleUpdate}
          disabled={!isFormValid}
        >
          <Text style={styles.postButtonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('MealListScreen')} style={styles.navButton}>
          <Icon name="home-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MealForm')} style={styles.navButton}>
          <Icon name="add-circle-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TopMeal')} style={styles.navButton}>
          <Icon name="heart-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RestReqList')} style={styles.navButton}>
          <Icon name="document-text-outline" size={30} color="#D55A00" />
          <Text style={styles.navText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 100, // To ensure content is not hidden behind the navigation bar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#f45d22',
  },
  
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#D55A00',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggle: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  activeToggle: {
    backgroundColor: '#FFDF88',
  },
  toggleText: {
    color: '#D55A00',
  },
  postButton: {
    backgroundColor: '#D55A00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    textAlign: 'center',
    color: '#D55A00',
    marginTop: 5,
    fontSize: 12,
  },
});

export default UpdateMealScreen;
