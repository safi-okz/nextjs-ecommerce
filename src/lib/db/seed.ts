import data from '@/lib/data'
import { connectToDatabase } from '.'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'
import User from './models/user.model'

loadEnvConfig(cwd())

const main = async () => {
  try {
    // First connect to the database
    await connectToDatabase(process.env.MONGODB_URI)

    // Load seed data
    const { products, users } = data

    // Seed Users
    await User.deleteMany()
    const createdUser = await User.insertMany(users)

    // Seed Products
    await Product.deleteMany()
    const createdProducts = await Product.insertMany(products)

    console.log({
      createdProducts,
      createdUser,
      message: 'Seeded database successfully',
    })
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}


main()