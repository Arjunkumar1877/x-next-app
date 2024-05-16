import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
console.log(process.env.GOOGLE_ID)
const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    async session({session, token}){
        session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
        session.user.uid = token.sub
        return session;
    }
  }
})

export { handler as GET, handler as POST };

