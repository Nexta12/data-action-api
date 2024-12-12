const User = require('../models/User')
const bcrypt = require('bcryptjs')
module.exports = {
    createSuperAdmin: async (req, res) =>{
        const superAdmin = {
          email: process.env.SUPER_EMAIL,
          firstName: process.env.FIRST_NAME,
          lastName: process.env.LAST_NAME,
          role: process.env.ROLE,
        };
     
          try {
            const superAdminExists = await User.findOne({
              email: superAdmin.email,
            });
 
            if (superAdminExists) {
              res.status(200).send('Work already in progress')
            } else {
             const bodyPassword = process.env.SUPER_PASSWORD;
 
              const hashedPassword = await bcrypt.hash(bodyPassword, 10);
 
           await User.create({
                password: hashedPassword,
                ...superAdmin,
              });
              res.status(200).send('Perfect Job just got done');
            }
          } catch (error) {
            console.log(error);
          }
    
   }
}