
"use client";
import React, { useState } from "react";
import { DefaultButton, Text , TextField } from "@fluentui/react";
import { useRouter } from "next/navigation";

export default function Createideas() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        author: "",
        functionality: "",
        email: "",
        title: "",
        description: "",
      });


    const handleCreateChanges = async (e : any) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
        console.log(formData);
      };

        const handlerDatacreating = async (e: any) => {
            if (!formData.author || !formData.functionality || !formData.email || !formData.title || !formData.description) {
            return;
            }
            e.preventDefault();
            let data;
            try {
            const response = await fetch(
                "http://localhost:2000/api/cardidea/creatingideas",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                }
            );
            data = await response.json();
            router.push("/");
            router.refresh();
            console.log(data);
            } catch (error) {
            console.log(error);
            }
        };

  return (
    <div className='flex flex-col justify-center items-center mt-36'>
        <Text variant='xLarge'>Creating ideas user </Text>
        <div className="">
             <form className='mt-4 flex flex-col gap-2 flex-wrap w-full' onSubmit={handlerDatacreating}>

              <div className="flex flex-wrap gap-2">

              <div className="">
                    <TextField className='w-96'  id='author' type='text' placeholder="Author name" onChange={handleCreateChanges}/>
                </div>
                <div className="">
                    <TextField className='w-96' id='functionality'  type='text' placeholder="Please enter your functionality" onChange={handleCreateChanges}/>
                </div>
              </div>
              <div className="border">
                    <TextField className='w-full'  id='email' type='text' placeholder="Please enter your email" onChange={handleCreateChanges}/>
                </div>

                <div className="border">
                    <TextField className='w-full'  id='title' type='text' placeholder="Please enter your title" onChange={handleCreateChanges}/>
                </div>

                <div className="border">
                <TextField id='description' type='text' multiline onChange={handleCreateChanges}/>
                </div>
                <DefaultButton className='mt-1 w-1/2' text="Create" type="submit" allowDisabledFocus />
             </form>
        </div>
    </div>
  )
}
