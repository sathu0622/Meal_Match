const User = require("../models/UserDetails");

const registerUser = async (req, res) => {
  const { username, email, role } = req.body;

  // Validate fields
  if (!username || !email || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, role });
    await newUser.save();

    // Respond with success
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the user ID in the URL
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, getUser ,deleteUser};
