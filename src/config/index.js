import dotenv from "dotenv";

dotenv.config()

const config={
    PORT: process.env.PORT|| 5000,
    MONGO_URL : process.env.MONGO_URL||'mongodb://127.0.0.1:27017'
}

export default config