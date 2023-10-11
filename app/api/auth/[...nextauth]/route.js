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

    callbacks: {
        async session({ session }){
            const sessionUser = await User.findOne({  email: session.user.email });
    
            session.user.id = `${sessionUser?.id}`;
    
            return session;
        },
    
        async signIn({ profile }){
            console.log('profile ', profile )
            try {
                await connectToDB()
    
                //check if user is already logged in
                const userExists = await User.findOne({ email: profile.email })
    
                //if not user exists, create a new user
                if (!userExists) {
                    await User.create({
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
    }
})

export { handler as GET, handler as POST }