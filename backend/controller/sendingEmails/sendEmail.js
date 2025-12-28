const { EmailSender } = require("../../email/emailSender")
const{emaiSender}=require("../../config")
async function sendEmail(name, email, phone = "", message,vin_number,make,year,price) {
    try {
      if (vin_number) {
        const constructCustomerBody = await constructEmailforCustomerInquiry(name,email,phone,make,year,price)
         const construcShoptBody = await constructEmailforShopInquiry(name,email,message,phone,make,year,vin_number,price)
        const sendEmailToShop = await EmailSender(construcShoptBody, emaiSender.realEmail)
        const sendEmailToCustomer = await EmailSender(constructCustomerBody, email)
     return "email has been sent Successfuly"
      }
      else{  const constructCustomerBody = await constructEmailforCustomer()
         const construcShoptBody = await constructEmailforShop(name,email,message,phone)
        const sendEmailToShop = await EmailSender(construcShoptBody,  emaiSender.realEmail)
        const sendEmailToCustomer = await EmailSender(constructCustomerBody, email)
     return "email has been sent Successfuly"}
      
} catch (error) {
    throw new Error(error)
}
}


async function constructEmailforCustomer() {
    return`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>A2Z Auto Reply</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 0;
      margin: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background-color: #1a73e8;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .email-header img {
      max-width: 150px;
      margin-bottom: 10px;
    }
    .email-body {
      padding: 30px;
    }
    .email-footer {
      font-size: 12px;
      color: #666;
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="cid:a2zlogo" alt="A2Z Logo">
      <h2>Thank you for contacting A2Z Auto Body and Sales</h2>
    </div>
    <div class="email-body">
      <p>Hi,</p>
      <p>We have received your message. One of our team members will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to browse our <a href="https://a2zautobody.com">website</a> for more information.</p>
      <p>Best regards,<br>
      A2Z Auto Body and Sales</p>
    </div>
    <div class="email-footer">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`
}


async function constructEmailforShop( name, email, message,phone ) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Message Received - A2Z Auto Body</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background-color: #1a73e8;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .email-header img {
      max-width: 140px;
      margin-bottom: 10px;
    }
    .email-body {
      padding: 30px;
    }
    .customer-message {
      background-color: #f0f8ff;
      padding: 15px;
      border-left: 4px solid #1a73e8;
      margin: 20px 0;
      white-space: pre-line;
    }
    .email-footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      padding: 20px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="cid:a2zlogo" alt="A2Z Logo">
      <h2>Receiving new Message from a New Customer</h2>
    </div>
    <div class="email-body">
      <p>Hi A2Z Shop Admin,</p>
      <p>you have a new message coming from new customer :${name}</p>
      <h3>Message:</h3>
      <div class="customer-message">${message || 'No message provided.'}</div>
      <p>and thats he is email we already sent him an auto email</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>


      <p>Best regards,<br>
      The A2Z Auto Body Website</p>
    </div>
  </div>
</body>
</html>`;
}


async function constructEmailforCustomerInquiry(name, email, phone, make, year, price) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>A2Z Auto Reply</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 0;
      margin: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background-color: #1a73e8;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .email-header img {
      max-width: 150px;
      margin-bottom: 10px;
    }
    .email-body {
      padding: 30px;
    }
    .email-footer {
      font-size: 12px;
      color: #666;
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="cid:a2zlogo" alt="A2Z Logo">
      <h2>Thank you for contacting A2Z Auto Body and Sales</h2>
    </div>
    <div class="email-body">
      <p>Hi ${name},</p>
      <p>We have received your inquiry about scheduling a test drive for the <strong>${year} ${make}</strong> priced at <strong>${price} CAD</strong>.</p>
      <p>One of our team members will reach out to you shortly via email at <strong>${email}</strong> or by phone at <strong>${phone}</strong>.</p>
      <p>In the meantime, feel free to browse our <a href="https://a2zautobody.com">website</a> for more information or to explore other vehicles.</p>
      <p>Best regards,<br>
      A2Z Auto Body and Sales</p>
    </div>
    <div class="email-footer">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>`;
}

    
async function constructEmailforShopInquiry(name, email, message, phone, make, year, vin_number,price) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Message Received - A2Z Auto Body</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background-color: #1a73e8;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .email-header img {
      max-width: 140px;
      margin-bottom: 10px;
    }
    .email-body {
      padding: 30px;
    }
    .customer-message {
      background-color: #f0f8ff;
      padding: 15px;
      border-left: 4px solid #1a73e8;
      margin: 20px 0;
      white-space: pre-line;
    }
    .email-footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      padding: 20px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="cid:a2zlogo" alt="A2Z Logo">
      <h2>New Customer Inquiry</h2>
    </div>
    <div class="email-body">
      <p>Hi A2Z Shop Admin,</p>
      <p>You have received a new inquiry from a customer: <strong>${name}</strong></p>

      <h3>Vehicle Info:</h3>
      <ul>
      <li><strong>VIN:</strong> ${vin_number}</li>
        <li><strong>Make:</strong> ${make}</li>
        <li><strong>Year:</strong> ${year}</li>
         <li><strong>Year:</strong> ${price}</li>
      </ul>

      <h3>Message:</h3>
      <div class="customer-message">${message || 'No message provided.'}</div>

      <h3>Contact Details:</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>

      <p>We have already sent an auto-reply to the customer.</p>

      <p>Best regards,<br>
      The A2Z Auto Body Website</p>
    </div>
  </div>
</body>
</html>`;
}



module.exports={sendEmail}