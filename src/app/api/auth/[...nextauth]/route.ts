import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "email", placeholder: "examplle@gmail.com" },
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