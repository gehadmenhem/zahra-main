const knexInstance = require("./dbConfig");

async function registerInventory(registerInfo,base64Images) {
  try {
    if (!registerInfo) {
      throw new Error("registration info is required to register");
    }
    const result = await knexInstance("inventory.inventory").insert(
      registerInfo
    ).returning('vin_number');
    if (result && result.length>=1) {

      try {
        const imagesToInsert = base64Images.map((base64Str) => ({
    vin_number: result[0].vin_number,
    image: base64Str,
  }));
    await knexInstance.transaction(async (trx) => {
      await trx('inventory.images').insert(imagesToInsert);
    });
   
  } catch (error) {
    console.error('Error inserting images:', error);
    throw error;
  }
    
    }
   
     return('Data inserted successfully');
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
}

async function getUser() {
  try {
    const result = await knexInstance
      .select("*")
      .from("reg.register")
      .where("first_name", "=", "gehad");

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getInventory(){
  try {
    const result = await knexInstance.select("i.*",
    knexInstance("inventory.images")
      .count("*")
      .whereRaw("images.vin_number = i.vin_number")
      .as("image_count"),
    knexInstance("inventory.images")
      .select("image")
      .whereRaw("inventory.images.vin_number = i.vin_number")
      .orderBy("id", "asc")
      .limit(1)
      .as("first_image")
  )
  .from("inventory.inventory as i");

console.log(result)
    return result || [];
    
  } catch (error) {
    throw new Error(error)
  }
}

async function getInventoryImages(vin_number){
  try {
   
    if(!vin_number){
      throw new Error("validation error:vin_number is required to get the car images")
    }
     const result = await knexInstance
      .select("*")
      .from("inventory.images")
      .where(vin_number)
      

    return result || [];
    
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

async function getUserByEmail() {
  try {
    const result = await knexInstance
      .select("*")
      .from("reg.register")
      .where("first_name", "=", "gehad");

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function registerUser(profile) {
  try {
    console.log(profile);

    const [email_address] = await knexInstance.transaction(async (trx) => {
      return await trx('dbo.parent')
        .insert(profile)
        .returning('email_address');
    });

    return email_address;
  } catch (error) {
    // PostgreSQL unique constraint error
    if (error.code === '23505' && error.constraint === 'unique_email') {
      throw new Error('Email already exists!');
    }

    console.error('Register error:', error);
    throw error; // rethrow other errors
  }
}

async function loginUser(parentData) {
  try {

   const loginResult = await knexInstance("dbo.parent")
      .select("id", "email_address", "password", "status")
      .where({ parentData })
     .first();
    return loginResult
  } catch (error) {
    // PostgreSQL unique constraint error
    if (error.code === '23505' && error.constraint === 'unique_email') {
      throw new Error('Email already exists!');
    }

    console.error('Register error:', error);
    throw error; // rethrow other errors
  }
}


async function getReviews(){
  try {
   
   
     const result = await knexInstance
      .select("*")
      .from("services.reviews")
      .orderBy("creation_date","asc")
      

    return result || [];
    
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = { registerInventory, getUser,getInventory,getInventoryImages,registerUser,getReviews,loginUser };
