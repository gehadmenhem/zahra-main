const {registerUser,loginUser}=require("../../db/dbOperations")

async function parentRegistration(parentProfile) {
  try {
   
      const registrationResult = await registerUser(parentProfile)
      return registrationResult
  } catch (error) {
   
    console.error('Register error:', error);
    throw error;
  }
}

async function parentLogin(parentLoginInfo) {
  try {
   
      const loginResult = await loginUser(parentLoginInfo)
      return loginResult || {}
  } catch (error) {
   
    console.error('Register error:', error);
    throw error;
  }
}

module.exports={parentRegistration,parentLogin}