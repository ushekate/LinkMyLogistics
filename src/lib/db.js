// import { PB_URL } from '@/constants/url';
import PocketBase from 'pocketbase';

const pbclient = new PocketBase('http://127.0.0.1:8090');

// pbclient.authStore((e) => {
//   console.log("Action", e);
//   console.log("User Details", pbclient.authStore.record);
//   console.log("is User Authenticated", pbclient.authStore.isValid);
// })

export default pbclient;
