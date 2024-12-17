const axios = require("axios")

module.exports = {
  // Function to check internet connection
  checkInternetConnection: async () => {
    try {
      // Make a small HTTP request to a known server
       await axios.get("https://www.google.com", { timeout: 3000 });

       return true; // If the request is successful, assume there is an internet connection
      
    } catch (error) {
      return false; // If there is an error, assume there is no internet connection
    }
  },

};
