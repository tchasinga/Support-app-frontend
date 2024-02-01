
"use client";
import React, { useState } from "react";
import { DefaultButton, Text , TextField } from "@fluentui/react";
import { useRouter } from "next/navigation";

export default function Comment() {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [formData, setFormData] = useState({
      user : "",
      commenting : "",
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
            setIsCreating(true);
            const response = await fetch(
                "http://localhost:2000/api/comment/creatingcomments",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                }
            );
            data = await response.json();
            router.refresh();
            setIsCreating(false);
            console.log(data);
            } catch (error) {
            console.log(error);
            }
        };

  return (
    <div className='flex flex-col justify-center items-center mt-36'>
        <Text variant='xLarge'>Add your point of view...</Text>
        <div className="">
             <form className='mt-4 flex flex-col gap-2 flex-wrap w-full' onSubmit={handlerDatacreating}>
              <div className="">
                    <TextField className='w-96'  id='user' type='text' placeholder="Specifier your name here" onChange={handleCreateChanges}/>
                </div>

                <div className="">
                    <TextField className='w-96' id='commenting'  type='text' placeholder="Post your comments" onChange={handleCreateChanges}/>
                </div>
                     
                <DefaultButton className='mt-1 w-1/2' text={isCreating ? "Creating..." : "Create now"} type="submit" allowDisabledFocus />
             </form>
        </div>
    </div>
  )
}
