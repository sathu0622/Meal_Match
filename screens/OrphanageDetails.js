import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios"; // For MongoDB request

export default function RegisterScreen({ route, navigation }) {
  const { email } = route.params;
  const [orphanageName, setOrphanageName] = useState("");
  const [orphanagePhone, setOrphanagePhone] = useState("");
  const [orphanageLocation, setOrphanageLocation] = useState("");
  const [orphanageCategories, setOrphanageCategories] = useState([]); // State for orphanage categories (multi-select)
  const [numberOfPersons, setNumberOfPersons] = useState(""); // State for number of persons
  const [loading, setLoading] = useState(false); // Loading state

  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone); // Simple phone validation
  };

  const toggleCategorySelection = (category) => {
    // Toggle category selection (add or remove from the array)
    if (orphanageCategories.includes(category)) {
      setOrphanageCategories(orphanageCategories.filter((c) => c !== category));
    } else {
      setOrphanageCategories([...orphanageCategories, category]);
    }
  };

  const handleRegister = async () => {
    if (!orphanageName || !orphanagePhone || !orphanageLocation || orphanageCategories.length === 0 || !numberOfPersons) {
      Alert.alert("All fields are required.");
      return;
    }

    if (isNaN(numberOfPersons) || parseInt(numberOfPersons) <= 0) {
      Alert.alert("Please enter a valid number of persons.");
      return;
    }
    

    if (!isValidPhone(orphanagePhone)) {
      Alert.alert("Please enter a valid phone number.");
      return /^\d{10}$/.test(orphanagePhone);;
    }

    setLoading(true); // Set loading state

    try {
      const response = await axios.post(
        "http://172.20.10.12:5000/api/orphanage/register",
        {
          orphanageName,
          orphanagePhone,
          orphanageLocation,
          orphanageCategories,
          numberOfPersons,
          email,
        }
      );

      if (response.data.success) {
        Alert.alert("Orphanage registered successfully: " + orphanageName);
        navigation.navigate("Login");
      } else {
        Alert.alert("MongoDB save failed: " + response.data.message);
      }
    } catch (error) {
      Alert.alert("Registration error: " + (error.response ? error.response.data.message : error.message));
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Orphanage Registration</Text>

        <TextInput
          onChangeText={setOrphanageName}
          placeholder="Orphanage Name"
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        <TextInput
          onChangeText={setOrphanagePhone}
          placeholder="Orphanage Phone Number"
          style={styles.textInput}
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        <TextInput
          onChangeText={setOrphanageLocation}
          placeholder="Orphanage Location (Country, District, Place)"
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Orphanage Categories:</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => toggleCategorySelection("kids")}
            style={[
              styles.checkboxButton,
              orphanageCategories.includes("kids") && styles.selectedCheckboxButton,
            ]}
          >
            <Text
              style={[
                styles.checkboxText,
                orphanageCategories.includes("kids") && styles.selectedCheckboxText,
              ]}
            >
              Kids
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategorySelection("elders")}
            style={[
              styles.checkboxButton,
              orphanageCategories.includes("elders") && styles.selectedCheckboxButton,
            ]}
          >
            <Text
              style={[
                styles.checkboxText,
                orphanageCategories.includes("elders") && styles.selectedCheckboxText,
              ]}
            >
              Elders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategorySelection("adults")}
            style={[
              styles.checkboxButton,
              orphanageCategories.includes("adults") && styles.selectedCheckboxButton,
            ]}
          >
            <Text
              style={[
                styles.checkboxText,
                orphanageCategories.includes("adults") && styles.selectedCheckboxText,
              ]}
            >
              Adults
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={setNumberOfPersons}
          placeholder="Number of Persons"
          style={styles.textInput}
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading} // Disable button when loading
        >
          <Text style={styles.registerButtonText}>{loading ? "Submitting..." : "Submit"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? Login Here
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  checkboxButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  selectedCheckboxButton: {
    backgroundColor: "black",
  },
  checkboxText: {
    color: "black",
  },
  selectedCheckboxText: {
    color: "white",
  },
  registerButton: {
    backgroundColor: "black",
    width: 300,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: "black",
  },
});
