import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from "@utils/database";
import User from "@models/users.model";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    async session({ session }){
        const sessionUser = User.findOne({  email: session.user.email });

        session.user.id = sessionUser._id.toString();

        return session;
    },

    async signIn({ profile }){
        try {
            await connectToDB()

            //check if user is already logged in
            const userExists = await User.findOne({ email: profile.email })

            //if not user exists
            if (!userExists) {
                User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }

            return true;
        } catch (error) {
            console.log('error :>> ', error);
            return false;
        }
    }
})

export { handler as GET, handler as POST }