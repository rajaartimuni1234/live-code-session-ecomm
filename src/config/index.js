import dotenv from "dotenv";

dotenv.config()

const config={
    PORT: process.env.PORT|| 5000,
    MONGO_URL : process.env.MONGO_URL||'mongodb://127.0.0.1:27017',
    JWT_SECRET: process.env.JWT_SECRET||"yoursecret",
    JWT_EXPIRY: process.env.JWT_EXPIRY||"1d"
}

export default config