require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./dev-stubs/User");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteOne({ email: "employee@servicepro.test" });
  await User.create({
    name: "Kamal Perera",
    email: "employee@servicepro.test",
    password: "Employee@123",
    phone: "0771234567",
    role: "employee",
  });

  console.log("Seed done: employee@servicepro.test / Employee@123");
  await mongoose.disconnect();
})();