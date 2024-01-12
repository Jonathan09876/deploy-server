import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
 
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Create a virtual property `domain` that's computed from `email`.
userSchema.virtual('domain').get(function() {
  return this.email.slice(this.email.indexOf('@') + 1);
});

const User = mongoose.model('User', userSchema)

export default User
