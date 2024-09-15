import User from "../models/User";

export const register = async (req, res) => {
  try {
    const {
      firstName, // Corrected typo
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.conpare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });


    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN IN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
