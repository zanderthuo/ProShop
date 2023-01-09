import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = async(req, res, next) => {
    try {
      // distructure email and password
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email })
      
      /* check if user matches the user and password stored */
      if (user && (await user.matchPassword(password))) {
        /* if user matches return the id, name, email, isAdmin and tokem */
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
        })
      } else {
        res.status(401)
        throw new Error('Invalid Email OR Password')
      }
    } catch (err) {
        next(err)
    }
}

// @desc  Register a new user
// @route POST /api/users
// @access Public
export const registerUser = async(req, res, next) => {
  try {
    // distructure email and password
    const { name, email, password } = req.body;

    // Find user by email
    const userExists = await User.findOne({ email })
    
    // Check if user exist
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    // initialize new user
    const user = await User.create({
      name,
      email,
      password
    })

    /**
     * If user created succesfully
     */
    if (user) {
      res.status(201).json({
        _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('User not found')
    }
  } catch (err) {
      next(err)
  }
}


// @desc  Get user profile
// @route GET /api/users/login
// @access Private
export const getUserProfile = async(req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  } catch (err) {
      next(err)
  }
}