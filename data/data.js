// data.js (or mealsData)
export const mealsData = [
  {
    _id: '1',
    itemName: 'Chicken Kottu',
    category: 'Kottu',
    price: 450,
    description: 'Delicious chicken kottu.',
    discount: 10,
    expiryTime: '2024-10-12T18:00:00',
    ingredients: ['Chicken', 'Roti', 'Curry leaves', 'Spices', 'Vegetables'],
    allergens: ['Gluten', 'Eggs'],  // Add allergens
    contactNumber: '012-345-6789',  // Add a contact number for further details
    calories: 450, // Add calories here
  },
  {
    _id: '2',
    itemName: 'Rice and Curry',
    category: 'Rice',
    price: 300,
    description: 'Traditional rice and curry.',
    discount: 5,
    expiryTime: '2024-10-12T18:00:00',
    ingredients: ['Rice', 'Chicken curry', 'Dhal curry', 'Papadam', 'Pickle'],
    allergens: ['Dairy', 'Mustard'],  // Add allergens
    contactNumber: '098-765-4321',  // Add a contact number for further details
    calories: 450, // Add calories here
  },
  // Add more items as needed
];
