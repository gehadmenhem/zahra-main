const {registerUser}=require("../../db/dbOperations")

async function parentRegistration(parentProfile) {
  try {
   
      const registrationResult = await registerUser(parentProfile)
      return registrationResult
  } catch (error) {
   
    console.error('Register error:', error);
    throw error;
  }
}

module.exports={parentRegistration}