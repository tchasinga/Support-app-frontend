// Import NextAuth and the CredentialsProvider
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Initialize NextAuth with the CredentialsProvider
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:2000/api/auth/singinuser", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ]
});

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
export default handler;
