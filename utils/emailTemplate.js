const emailHeader = (title) => {
    return `
  <!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>${title}</title>
      <meta name="description" content="Email From Data-Actions .">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!-- 100% body table -->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:25px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
  
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:20px;font-family:'Rubik',sans-serif;">${title}
                                          </h1>
  
      `;
  };
  
  const emailFooter = () => {
    return `
      </td>
      </tr>
  
      <tr>
       <td style="height:40px;">&nbsp;</td>
      </tr>
      </table>
      </td>
      </tr>
      <tr>
          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">Copyright; <strong>Data-Actions</strong> </p>
                          </td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <a href="https://dataactions.com/unsubscribe" target='_blank' >Unsubscribe</a></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:25px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
  
  </html>
  
  
      `;
  };
  
  module.exports = {
   
    ProjectSaleSuccessTemplate: (user, product ) =>{
     return `
       ${emailHeader("Data project purchase")}

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left; font-weight: bold;">
           Dear ${user.name},
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px;">
           You have made a successfull purchase of a product on our portal, the details are ass follows.
           <br>
            Product Name: ${product.title}
            Amount Paid:  £${product.cost}
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px;">
           Please Use the link Below to download the purchased Items
           <br>

       </p>

           <p
            style="background:#20104B;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:16px;padding:10px 24px;display:inline-block;border-radius:50px; letter-spacing:1px;"><a href=${process.env.BASE_URL}/api/projectSales/download/${product.id} style="text-decoration: none; color: white;" > Download Dataset</a>
           </p>

        ${emailFooter()}
     `
    },

    ConsultationBookingEmailTemplate: (user ) =>{
     return `
       ${emailHeader("Consultation Booking")}

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left; font-weight: bold;">
           Dear ${user.name},
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           We have received your payment for consultation booking, please be assured that one of our experts will be in touch with you shorly..
           <br>
        
            
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Thank you for chosing Data Actions
           <br>

       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Kassim Jimoh
            <br>
           Managing Partner,
            <br>
           Data-action, UK
           <br>
       </p>

        ${emailFooter()}
     `
    },

    TrainingRegistrationSuccess: (user ) =>{
     return `
       ${emailHeader("Training Registeration")}

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left; font-weight: bold;">
           Dear ${user.name},
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Thank you for registering to be part of our training programmes, please be assured that one of our experts will be in touch with you shorly..
           <br>
        
            
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Thank you for chosing Data Actions
           <br>

       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Kassim Jimoh
            <br>
           Managing Partner,
            <br>
           Data-action, UK
           <br>
       </p>

        ${emailFooter()}
     `
    },

    TrainingPayment: (user ) =>{
     return `
       ${emailHeader("Payment for training")}

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left; font-weight: bold;">
           Dear ${user.name},
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           We have received your payment to be part of our training programmes, please be assured that one of our experts will be in touch with you shorly..
           <br>
        
            
       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Thank you for chosing Data Actions
           <br>

       </p>

        <p style="color:#455056; font-size:15px;line-height:24px; margin-top:10px; text-align: left;">
           Kassim Jimoh
            <br>
           Managing Partner,
            <br>
           Data-action, UK
           <br>
       </p>

        ${emailFooter()}
     `
    },

 
  };
  