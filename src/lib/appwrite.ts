import { Client, Account, Databases } from "appwrite";

const client: Client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  .setDevKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string);

const account: Account = new Account(client);
const databases: Databases = new Databases(client);

export { client, account, databases };
