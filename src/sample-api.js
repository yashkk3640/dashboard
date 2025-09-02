// there are the api need to call which are create in dashboard mcp (in python server)

import axios from "axios";

fetch("http://localhost:8000/create-table", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "SALES",
    column: {
      sellerId: "INTEGER",
      name: "TEXT",
      product: "TEXT",
      items_sale: "INTEGER",
      amount: "INTEGER",
    },
  }),
})
  .then((m) => console.log(m))
  .catch((e) => console.error(e));

fetch("http://localhost:8000/users/3", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((m) => console.log(m))
  .catch((e) => console.error(e));

fetch("http://localhost:8000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Yash",
    email: "test@test.com",
    age: 10,
  }),
})
  .then((m) => console.log(m))
  .catch((e) => console.error(e));

fetch("http://localhost:8000/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to_email: "ykhatri@integconsulting.com",
    subject: "Testing the service mail from python",
    body: "Hi Yash,\n This is testing mail by python server.\nHave you got the mail!\nThanks.\n\nDO NOT REPLY.",
  }),
})
  .then((m) => confirm.log(m))
  .catch((e) => console.error(e));

// https://openrouter.ai/settings/keys
// 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
