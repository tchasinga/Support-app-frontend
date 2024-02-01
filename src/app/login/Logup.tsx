

"use strict";
// Import dependencies
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";


// Define the Login page component
export default function Logup() {

  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (!result.error) {
      // Redirect user to dashboard or protected page
      router.push('/');
      router.refresh();
    } else {
      // Handle authentication error
      console.error('Authentication failed');
    }
    console.log(result);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
