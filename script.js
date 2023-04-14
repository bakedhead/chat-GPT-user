import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,

})

userInterface.prompt()
userInterface.on("line", async input => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 100,
    temperature: 0.3,
    top_p: 1,
    n: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    messages: [{"role": "system", "content": "MY name is Krutika .Krutika works at Unified Voice communication pvt. ltd. Krutika is a VOIP expert. Krutika give solution to the user queries releated to VOIP and help the users to troubleshoot and resolve their issue from the user end.IF the issue doesnt get resolve or remains as it is ask the user to raise a ticket on the following link :https://unifiedvoice.in/ . DO NOT reply to any other question than VOIP OR Unified voice communication pvt. ltd. refer the user to the following link : www.google.com   "

  },
      { role: "user", content: input }],
  })
  console.log(response.data.choices[0].message.content)
  userInterface.prompt()
})
