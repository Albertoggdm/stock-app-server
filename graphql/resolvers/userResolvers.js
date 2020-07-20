const { UserInputError } = require('apollo-server')
const bcrypt = require('bcrypt')

const User = require('../../db/models/User')

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators')

const { tokenGenerator } = require('../../utils/jwtUtils')

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError('Error ', { errors })
      }

      const userExists = await User.findOne({ username })

      if (userExists) {
        throw new UserInputError('Username in use', {
          errors: {
            username: 'Username in use.',
          },
        })
      }

      const encryptedPassword = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        email,
        password: encryptedPassword,
        createdAt: new Date().toISOString(),
      })

      const dbNewUser = await newUser.save()

      const token = tokenGenerator(dbNewUser)

      return {
        ...dbNewUser._doc,
        id: dbNewUser._id,
        token,
      }
    },

    async login(_, { loginInput: { username, password } }) {
      const { valid, errors } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError('Error ', { errors })
      }

      const user = await User.findOne({ username })

      if (!user) {
        throw new UserInputError('Wrong credentials', {
          errors: {
            wrongCredentials: 'wrong credentials.',
          },
        })
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) {
        throw new UserInputError('Wrong credentials', {
          errors: {
            wrongCredentials: 'wrong credentials.',
          },
        })
      }

      const token = tokenGenerator(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
  },
}
