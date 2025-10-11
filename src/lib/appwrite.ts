import { Client, Account, Databases } from "appwrite";

const client: Client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)

const account: Account = new Account(client);
const databases: Databases = new Databases(client);

export { client, account, databases };


export const DATABASE_CONFIG = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  collections: {
    arts: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ARTS as string,
    users: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS as string,
    reviews: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REVIEWS as string,
    skills: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS as string,
    bookings: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS as string,
  },
} as const;

export const PAGINATION_CONFIG = {
  defaultLimit: 12,
  maxLimit: 100,
  defaultOffset: 0,
} as const;

