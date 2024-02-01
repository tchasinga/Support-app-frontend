"use strict";
// Import dependencies
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { DefaultButton, Text, TextField } from "@fluentui/react";
import Link from 'next/link';

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
    <div  className='max-w-4xl mx-auto flex flex-col justify-center w-full items-center py-40'>
       <Text variant='xxLarge'>Login page</Text>
      <div className="">
      <form className='flex flex-col gap-4 pt-5' onSubmit={handleSubmit}>
        <div>
          <TextField
            className='w-96' 
            type="email"
            id="email"
            placeholder="Please enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            placeholder="Please enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <DefaultButton className='w-28' text="Login now" type="submit" allowDisabledFocus />
      </form>
      </div>
      <Text className='pt-4' variant='medium'>Don&apos;t have an account? <Link className='text-green-500 font-normal' href='/register'>Register now</Link></Text>
    </div>
  );
}
