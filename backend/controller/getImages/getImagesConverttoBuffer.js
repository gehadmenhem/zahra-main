async function base64ImageToBuffer(base64String) {
    try {
        
   
  if (typeof base64String !== 'string') {
    throw new Error('Input must be a Base64 string');
  }

  return  Buffer.from(base64String, 'base64');
   } catch (error) {
        throw new Error(error)
    }
}


module.exports={base64ImageToBuffer}