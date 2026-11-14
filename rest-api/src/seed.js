import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';

const { BSON } = mongoose.mongo;

const DUMP_DIR = new URL('../seed/forum/', import.meta.url);
const COLLECTIONS = ['users', 'themes', 'posts'];

function parseBsonDump(buffer) {
  const docs = [];
  for (let offset = 0; offset < buffer.length;) {
    const size = buffer.readInt32LE(offset);
    docs.push(BSON.deserialize(buffer.subarray(offset, offset + size)));
    offset += size;
  }
  return docs;
}

// Loads the SoftUni forum dump (same data as `mongorestore -d forum`) into an empty database.
export async function seedIfEmpty() {
  const db = mongoose.connection.db;
  if ((await db.collection('users').estimatedDocumentCount()) > 0) {
    return;
  }

  for (const name of COLLECTIONS) {
    const docs = parseBsonDump(await readFile(new URL(`${name}.bson`, DUMP_DIR)));
    if (docs.length > 0) {
      await db.collection(name).insertMany(docs);
    }
  }
  console.log('Seeded the database with the initial forum data.');
}
