import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '649b28ee3ae88a522a0b'
export const DATABASE_ID = '649b2e87342d0635163a'
export const COLLECTION_ID_MESSAGES = '649b2e9c0341920b94a5'

const client = new Client();

// hide these later
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('649b28ee3ae88a522a0b');

export const databases = new Databases(client) 
export const account = new Account(client)
export default client;