/** @format */

const { insertChildren } = require('../../db/dbOperations');

async function childrenRegistration(data) {
  try {
    const registrationResult = await insertChildren(parentProfile);
    return registrationResult;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

module.exports = { childrenRegistration };
