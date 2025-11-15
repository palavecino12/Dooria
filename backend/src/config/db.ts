import mongoose from "mongoose"

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/DooriaDB")
    console.log("MongoDB conectado correctamente")
  } catch (error) {
    console.error("Error al conectar MongoDB:", error)
    process.exit(1)
  }
}
