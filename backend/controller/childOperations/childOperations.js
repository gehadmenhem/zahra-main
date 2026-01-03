const {insertChildren}=require("../../db/dbOperations")

async function childrenRegistration(data) {
  try {
   
      const registrationResult = await registerUser(parentProfile)
      return registrationResult
  } catch (error) {
   
    console.error('Register error:', error);
    throw error;
  }
}

