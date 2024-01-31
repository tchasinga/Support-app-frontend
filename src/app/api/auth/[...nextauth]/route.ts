import { NextAuth } from "next-auth";
import { CredentialsOptions, CredentialsProvider } from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string>) {
        const res = await fetch('http://localhost:2000/api/auth/signinuser', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true
  },
callbacks: {
    async jwt(token : any, user: any) {
        if (user) {
            token.id = user._id;
        }
        return token;
    },
    async session(session: any, token: any) {
        session.user.id = token._id;
        return session;
    }
}
});
