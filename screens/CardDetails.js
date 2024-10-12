import React from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from "react-native";


const CardDetails = ({navigation}) => {
  const [rememberCard, setRememberCard] = React.useState(false);
  const [sendReceipt, setSendReceipt] = React.useState(false);
  const [cashOnDelivery, setCashOnDelivery] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card details</Text>

      <Text style={styles.label}>Payment Method</Text>
      <TextInput style={styles.input} placeholder="Select payment method" />

      <Text style={styles.label}>Cardholder Name</Text>
      <TextInput style={styles.input} placeholder="Enter cardholder name" />

      <Text style={styles.label}>Cardnumber</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card number"
        keyboardType="numeric"
      />

      <View style={styles.expiryContainer}>
        <View style={styles.expiryInput}>
          <Text style={styles.label}>Expiry</Text>
          <TextInput style={styles.input} placeholder="MM/YY" />
        </View>
        <View style={styles.expiryInput}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text>Remember this card</Text>
        <Switch value={rememberCard} onValueChange={setRememberCard} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Send receipt to my email</Text>
        <Switch value={sendReceipt} onValueChange={setSendReceipt} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Cash On Delivery</Text>
        <Switch value={cashOnDelivery} onValueChange={setCashOnDelivery} />
      </View>

      <Text style={styles.amount}>Amount Payable: Rs.450</Text>
      <Button
        title="Pay Now"
        onPress={() => navigation.navigate("PaymentDone")}
        color="#FFA500"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  expiryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryInput: {
    flex: 1,
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default CardDetails;
