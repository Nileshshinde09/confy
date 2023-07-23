import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from '../../../database/conn'
import User from "../../../models/userModel"
import { compare } from 'bcryptjs'


// const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const GITHUB_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_ID="826728436259-j40scjk1pplqge1240vn3os12s68u6f0.apps.googleusercontent.com"
const GOOGLE_SECRET="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"
const GITHUB_ID ="d20f55fda87744e8ba0f"
const GITHUB_SECRET ="e2fd92471c764f32c17ce08e1b66ada09294c95e"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    CredentialsProvider({
      name : "Credentials",
      async authorize(credentials, req){
          connectMongo().catch(error => { error: "Connection Failed...!"})

          // check user existance
          const result = await User.findOne( { email : credentials.email})
          if(!result){
              throw new Error("No user Found with Email Please Sign Up...!")
          }

          // compare()
          const checkPassword = await compare(credentials.password, result.password);
          
          // incorrect password
          if(!checkPassword || result.email !== credentials.email){
              throw new Error("Username or Password doesn't match");
          }

          return result;

      }
  })
  ],
secret:'DqrJ4LWA6g7PT7mclEuhrjdowGNXzpykgWzwS6SvzC0='
  // Optional: Add custom callbacks, session handling, etc. here if needed.

  // Optional: Add custom pages like signIn, signOut, error, etc.
});
