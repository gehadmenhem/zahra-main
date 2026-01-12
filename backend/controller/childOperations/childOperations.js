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
    // Convert profile_image buffer to base64 data URL
    const childrenWithImages = childrenResult.map((child) => {
      if (child.profile_image) {
        const buffer = child.profile_image.data || child.profile_image;
        const base64 = buffer.toString('base64');
        child.profile_image = `data:image/jpeg;base64,${base64}`;
      }
      return child;
    });
    return childrenWithImages;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

module.exports = { childrenRegistration, getParentChildren };
