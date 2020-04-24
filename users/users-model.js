const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

// Return a list of all users
function find() {
  return db("users").select("id", "username");
}

// Return user with matching username
function findBy(filter) {
  return db("users").where(filter);
}

// Add new user to auth database
async function add(user) {
  const [id] = await db("users").insert(user);
  console.log("add", user, [id]);
  // find new user in database for confirmation
  return findById(id);
}

// Return a single user
function findById(id) {
  return db("users").where({ id }).first();
}
