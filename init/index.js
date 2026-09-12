const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const sample=require("./data.js");
main().then(()=>{
    console.log("connected with DB");
}).catch((er)=>{
    console.log(er);
})

async function main() {
  await  mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async ()=>{
await Listing.deleteMany({});

sample.data=sample.data.map((obj)=>({
    ...obj, owner:"6a8f1b177e04257389915cd0"
}));

let listingdata=await Listing.insertMany(sample.data);
console.log(listingdata);
}

initDB();
    
