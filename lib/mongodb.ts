import { MongoClient, ServerApiVersion } from "mongodb"

// Replace this with your actual MongoDB connection string
const uri =
  process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect()
}

export default clientPromise

// Helper function to get a database instance
export async function getDatabase(dbName = "qdrive") {
  const client = await clientPromise
  return client.db(dbName)
}

// Helper function to handle database errors
export function handleDbError(error: unknown) {
  console.error("Database error:", error)
  return { error: "Database operation failed", details: error instanceof Error ? error.message : "Unknown error" }
}
