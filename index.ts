import express, { Request, Response } from "express";
import cors from "cors";
import {Transform} from 'stream'
import multer from "multer";
import axios from "axios";

const speech = require("@google-cloud/speech");

const api = express();

api.use(express.json());
api.use(cors());

const uploader = multer();

api.post("/chat/", async (request:Request, response:Response) => {
  const {messages} = request.body
  
  const getData = async () => {
      const resp = await axios.post("https://api.openai.com/v1/chat/completions", 
          {
              model: "gpt-3.5-turbo",
              messages: messages,
              stream:true
          },
          {
              headers:{
                  Authorization:`Bearer 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`,
              },
              responseType:"stream"
      })
      return resp.data
  }
  const stream = await getData();
  stream.pipe(     
      new Transform({
          transform(chunk, encoding, callback) {
              callback(null, chunk)
          },
      })
  )
  .pipe(response);
})

api.post(
  "/speech/",
  uploader.single("audio"),
  async (request: Request, response: Response) => {
    const client = new speech.SpeechClient();

    const {file} = request;

    const encoding = "OGG";
    const sampleRateHertz = 48000;
    const languageCode = "pt-BR";

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode,
      enableAutomaticPunctuation: true,
      enableSpokenPunctuation:{value:true},
      enableSpokenEmojis:{value:true}
    };

    if(!file){ 
      throw new Error("O reconhecimento do audio falhou");
    }

    const audio = {
      content:Buffer.from(file.buffer).toString('base64'),
    };

    const request_google = {
      config: config,
      audio: audio,
    };

    const [operation] = await client.longRunningRecognize(request_google);
    
    const [response_google] = await operation.promise();
    const transcription = response_google.results
      .map((result:any) => result.alternatives[0].transcript)
      .join("\n");

    return response.status(200).json({message:transcription});
  }
);

api.listen(3333, async () => {
});
