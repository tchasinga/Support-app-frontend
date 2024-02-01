
"use client"
import React from 'react'
import { DefaultButton, Text , TextField } from "@fluentui/react";
export default function Createideas() {
  return (
    <div className='flex flex-col justify-center items-center mt-36'>
        <Text variant='xLarge'>Creating ideas user </Text>
        <div className="">
             <form className='mt-4 flex flex-col gap-2'>

              <div className="flex flex-wrap gap-2">

              <div className="">
                    <TextField className='w-96'  type='text' placeholder="Please enter your email"/>
                </div>
                <div className="">
                    <TextField className='w-96'  type='text' placeholder="Please enter your email"/>
                </div>
              </div>
              <div className="border">
                    <TextField className='w-full'  type='text' placeholder="Please enter your email"/>
                </div>

                <div className="border">
                    <TextField className='w-full'  type='text' placeholder="Please enter your email"/>
                </div>

                <div className="border">
                    <TextField className='w-full'  type='text' placeholder="Please enter your email"/>
                </div>

             </form>
        </div>
    </div>
  )
}
