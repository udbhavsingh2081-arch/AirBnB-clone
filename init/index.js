    require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const sample = require("./data.js");

main().then(() => {
    console.log("connected with DB");
}).catch((er) => {
    console.log(er);
});

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    let user = await User.findOne({ username: "admin" });

    if (!user) {
        user = new User({
            username: "admin",
            email: "admin@nuvora.com"
        });

        await User.register(user, "admin123");

        console.log("Admin user created");
    }

    sample.data = sample.data.map((obj) => ({
        ...obj,
        owner: user._id
    }));

    let listingdata = await Listing.insertMany(sample.data);

    console.log(`${listingdata.length} listings inserted`);
};

initDB();