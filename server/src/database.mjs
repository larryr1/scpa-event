import nedb from '@seald-io/nedb';
import { createSaltedHash } from './lib/auth/CreateSaltedHash.mjs';
import { randomUUID } from 'crypto';

export const UsersDatabase = new nedb({ filename: "users.db", autoload: true });
export const SettingsDatabase = new nedb({ filename: "settings.db", autoload: true });

UsersDatabase.findOne({ username: "admin"}, (err, doc) => {
  if (err) {
    throw new Error("Error while searching for admin user on startup: " + err);
  }
  if (doc) return;
  
  console.log("Creating default admin account.");

  const id = randomUUID();
  UsersDatabase.insert({
    _id: id,
    username: "admin",
    password: createSaltedHash("password", id),
    permissions: {
      admin: true
    }
  }, (err, doc) => {
    if (err) {
      console.log("Error creating default admin account.");
      console.error(err);
      return;
    }

    console.log("Default admin account created.");
  });
})