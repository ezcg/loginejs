const siteConfigs = require("../config/site.config");
const baseURL = siteConfigs.url;

module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: 'MAKE_UP_A_RANDOM_STRING',

  baseURL: baseURL,

  // The credentials and information for OAuth2
  // Create them here:https://console.developers.google.com/apis/credentials
  oauth2Credentials: {
    client_id: "",
    project_id: "", // The name of your project
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "",
    redirect_uris: [
      `${baseURL}/auth/callback`
    ],
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }

};
