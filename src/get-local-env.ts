import * as dotenv from "dotenv"

export const getLocalEnv = () => {
  const env = process.env.APP_ENV
  if (env === "production") {
    return
  }
  dotenv.config({ path: `${__dirname}/../.env` })
}
