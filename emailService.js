var nodemailer  = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: '',
           pass: ''
       }
   });


   var emailService = {
    
        sendMail: async (userEmail,body) => {
            const mailOptions = {
                from: 'tsushant1996@gmail.com', // sender address
                to: `${userEmail}`, // list of receivers
                subject: 'Order recieved', // Subject line
                body: `${body}`// plain text body
              };


              transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
             });
        }
    
 };

 module.exports = emailService;
