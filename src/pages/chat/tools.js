import { GET_USERS, GET_USERS_BY_ID, SENT_EMAIL } from "../../api";

export const TOOLS = [
  {
    type: "function",
    function: {
      name: "GET_USERS",
      description: "Get the list of users exist in the system.",
      // parameters: {
      //   type: "object",
      //   properties: {
      //     city: {
      //       type: "string",
      //       description: "Name of the city"
      //     }
      //   },
      //   required: ["city"]
      // }
    },
  },
  {
    type: "function",
    function: {
      name: "GET_USERS_BY_ID",
      description: "Get the user by id from users table.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "User id which exist in the system.",
          },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "SENT_EMAIL",
      description: `Sent Email to the user with proper mailId body and subject.
        Tool Description:
Use this tool to send well-formatted professional emails. The email should:

Support recipient email, subject (with emojis if suitable), and body.

Format the body with proper paragraphs and line breaks.

Use HTML tags (e.g., <b> for bold) instead of markdown formatting.

Add emojis for good vibes when appropriate.

End with a natural email closing/complimentary close (e.g., Regards, Best wishes, Warmly, Cheers, etc.) followed by the sender’s name or role.

Ensure the email body looks like a proper email in mail clients, not raw markdown.

        `,
      parameters: {
        type: "object",
        properties: {
          to_email: {
            type: "string",
            description:
              "Mail id of the user. IF NOT SPECIFIED ASK USER TO SEND WHOM?",
          },
          subject: {
            type: "string",
            description:
              "Give some good appropriate subject to the mail. Give good and exciting so people can't ignore the mail.",
          },
          body: {
            type: "string",
            description:
              "Add proper understandable body for the receiver. Add good formatting good fonts proper new lines with regards and helpful nature.",
          },
        },
        required: ["id"],
      },
    },
  },
];

export const TOOLS_EXECUTOR = {
  GET_USERS: () => GET_USERS(),
  GET_USERS_BY_ID: (req) => GET_USERS_BY_ID(req.id),
  SENT_EMAIL: (req) => SENT_EMAIL(req),
};
