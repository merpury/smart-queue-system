import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI2;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) {
    console.log('Already connected to MongoDB');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('Connected to MongoDB successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB', e);
    throw e;
  }

  return cached.conn;
}



// import mongoose from "mongoose";

// let isConnected = false;

// export const connectToDB = async () => {
//     mongoose.set('strictQuery', true);

//     if (isConnected) {
//         console.log("Mongo is already connected!");
//         return;
//     }

//     try {
//         await mongoose.connect(process.env.MONGODB_URI2, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         isConnected = true;
//         console.log("MongoDB is connected");
//     } catch (error) {
//         console.log(error);
//     }
// }

// import mongoose from 'mongoose';

// const MONGODB_URL = process.env.MONGODB_URL2;

// if (!MONGODB_URL) {
//   throw new Error('Please define the MONGODB_URL environment variable');
// }

// export async function dbConnect() {
//   if (mongoose.connection.readyState >= 1) {
//     console.log("MongoDB is already connected.");
//     return;
//   }

//   try {
//     await mongoose.connect(MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Successfully connected to MongoDB.");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//   }
// }

// import mongoose from 'mongoose'

// const MONGODB_URI = process.env.MONGODB_URI2

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// export async function dbConnect() {
//   if (cached.conn) {
//     console.log('Already connected to MongoDB')
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
//       console.log('Connected to MongoDB successfully')
//       return mongoose
//     })
//   }

//   try {
//     cached.conn = await cached.promise
//   } catch (e) {
//     cached.promise = null
//     console.error('Failed to connect to MongoDB', e)
//     throw e
//   }

//   return cached.conn
// }
