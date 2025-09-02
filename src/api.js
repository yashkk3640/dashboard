// AXIOS request

import axios from "axios";

export const GET_USERS = () =>
  axios.get("http://localhost:8000/users", {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const GET_USERS_BY_ID = (id) =>
  axios.get("http://localhost:8000/users/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
// .then((response) => {
//   console.log(response);
// })
// .catch((error) => {
//   console.error(error);
// });
export const SENT_EMAIL = ({ to_email, subject, body }) =>
  axios.post(
    "http://localhost:8000/send-email",
    { to_email, subject, body },
    { headers: { "Content-Type": "application/json" } }
  );
// fetch("http://localhost:8000/send-email", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     to_email: "ykhatri@integconsulting.com",
//     subject: "Testing the service mail from python",
//     body: "Hi Yash,\n This is testing mail by python server.\nHave you got the mail!\nThanks.\n\nDO NOT REPLY.",
//   }),
// });
