// Import NextAuth and the CredentialsProvider
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Initialize NextAuth with the CredentialsProvider
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        // Define the fields for username and password
        username: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      // Define the authentication logic
      async authorize(credentials, req) {
        try {
          // Make a POST request to your authentication endpoint
          const res = await fetch('http://localhost:2000/api/auth/signinuser', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          // Parse the response
          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          } else {
            // Handle authentication failure
            throw new Error('Authentication failed');
          }
        } catch (error) {
          // Handle network errors, server errors, or other exceptions
          console.error('Authentication error:');
          return null;
        }
      }
    })
  ]
});

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
export default handler;
