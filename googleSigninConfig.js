import { GoogleSignin } from '@react-native-google-signin/google-signin';
const GOOGLE_WEB_CLIENT_ID = "824813510917-gn5cf0gsaltjkqblmb7fob09ffcg56hf.apps.googleusercontent.com";
//const GOOGLE_ANDROID_CLIENT_ID = "your_android_client_id_here";
const GOOGLE_IOS_CLIENT_ID = "824813510917-ca03cu8vphcvld1fl8bat5b7i383gh9e.apps.googleusercontent.com";

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    //androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'], // Optional: specify scopes
    offlineAccess: true, // Enables refresh tokens
    forceCodeForRefreshToken: true,
});


export default GoogleSignin;
