import nedb from '@seald-io/nedb';

export const UsersDatabase = new nedb({ filename: "users.db", autoload: true });
export const SettingsDatabase = new nedb({ filename: "settings.db", autoload: true });

UsersDatabase.findOne({ username: "admin"}, (err, doc) => {
  if (err) {
    throw new Error("Error while searching for admin user on startup: " + err);
  }
  if (doc) return;
  
  console.log("Creating default admin account.");

  UsersDatabase.insert({
    _id: "69701513-5e57-40f5-a32a-822e8a165df6",
    username: "admin",
    password: "3227d55c6bea8c846931d01659c41a77aa64831ae4d3159fc17ae74ff9bd09f3",
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