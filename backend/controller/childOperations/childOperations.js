/** @format */

const {
  insertChildren,
  selectChildrenParent,
} = require('../../db/dbOperations');

async function childrenRegistration(data) {
  try {
    const registrationResult = await insertChildren(data);
    return registrationResult;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}
async function getParentChildren(parent_id) {
  try {
    const childrenResult = await selectChildrenParent(parent_id);
    return childrenResult;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

module.exports = { childrenRegistration, getParentChildren };
