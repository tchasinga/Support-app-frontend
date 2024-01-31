
"use client";
import React from 'react'
import { DefaultButton, Text, TextField } from "@fluentui/react";
import Link from "next/link";

export default function page() {
  return (
    <div className='max-w-4xl mx-auto flex flex-col justify-center w-full items-center py-40'>
        <Text variant='xxLarge'>creating an account...</Text>
        
        <div className="">
            <form className='flex flex-col gap-4 pt-5'>
                <div>
                <TextField type='text' className='w-96' placeholder="Please enter your name here" />
                </div>

                <div>
                <TextField type='email' placeholder="Please enter your email" />
                </div>

                <div>
                <TextField placeholder="Please enter your password" type="password" canRevealPassword revealPasswordAriaLabel="Show password"/>
                </div>
                <DefaultButton className='w-28' text="Sing up"  allowDisabledFocus  />
            </form>
        </div>
        <Text className='pt-4' variant='medium'>Have already an account? <Link className='text-green-500 font-normal' href='/login'>Login</Link></Text>
    </div>
  )
}
