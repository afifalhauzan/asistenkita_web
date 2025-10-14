import { Client, Account, Databases, Storage } from "appwrite";

const client: Client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setDevKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string);


const account: Account = new Account(client);
const databases: Databases = new Databases(client);
const storage: Storage = new Storage(client);

export { client, account, databases, storage };


export const DATABASE_CONFIG = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  collections: {
    arts: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ARTS as string,
    users: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS as string,
    reviews: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REVIEWS as string,
    lowongan: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_LOWONGAN as string,
  },
  buckets: {
    artphoto: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ARTPHOTO as string,
  },
} as const;

export const PAGINATION_CONFIG = {
  defaultLimit: 12,
  maxLimit: 100,
  defaultOffset: 0,
} as const;

