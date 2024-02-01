
"use client";
import React from "react";
import { Text } from "@fluentui/react";
import Image from "next/image";
import Comment from "../../Components/Comment";

async function getCard(_id) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await fetch(
      `http://localhost:2000/api/cardidea/findingideasbyid/${_id}`,
      {
        next: {
          revalidate: 0, // use 0 to opt out of using cache which means that refetch data
        },
      }
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

export default async function Carddetails({params}) {
    const ticket = await getCard(params.id)

  return (
    <main className='max-w-4xl mx-auto min-h-screen py-10'>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      {ticket ? (
        <div className="card">
            <div key={ticket._id} className="mt-10 border-b flex flex-col p-4 bg-gray-300 rounded-xl">
                <div className="w-full border ">
                <Image src={ticket.image} alt="Picture of the author" className="object-cover" width={'1000'} height={'1000'}/>
                </div>
                <Text variant={"xLarge"}>{ticket.title}</Text>
                <div className="my-1 flex flex-col justify-center">
                <Text className="text-gray-900 font-medium" variant={"medium"}>{ticket.functionality}</Text>
                <Text className='line-clamp-5 text-black font-normal' variant={"medium"}>Created by : {ticket.author}</Text>
                <Text variant={"medium"}>{ticket.email}</Text>
                </div>
                <Text className='line-clamp-5 text-black font-normal' variant={"medium"}>{ticket.description}</Text>
              </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Comment />
    </main>
  );
}