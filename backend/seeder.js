import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/user.js'
import Product from './models/product.js'
import Order from './models/order.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // creating users into the database and will map through users to find the admin user
    // passing in the users data that I created with mock users in the param
    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id
    // map through the products and added the admin user that I set as a variable 
    const sampleProducts = products.map(product => {
      return {...product, user: adminUser}
    })
    // Pass in the sampleProducts that have included the admin user to store it into the database
    await Product.insertMany(sampleProducts)
    // this is for console reading when data show it have been imported and done the same for when error is caught
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(`${err}`.red.inverse)
    process.exit(1)
  }
}
const destroyData = async () => {
    try {
      await Order.deleteMany()
      await Product.deleteMany()
      await User.deleteMany()
  
      // this is for console reading when data show it have been imported and done the same for when error is caught
      console.log('Data deleted!'.red.inverse)
      process.exit()
    } catch (err) {
      console.error(`${err}`.red.inverse)
      process.exit(1)
    }
  }
// check condition if -d is called in terminal to run destroy data else if not call import data
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
      importData()
  }