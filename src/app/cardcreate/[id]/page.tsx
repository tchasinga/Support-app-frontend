
"use client"
import React from 'react'
import { Text } from "@fluentui/react";


async function fetchCardDetailsById(_id){
    try {
        const res = await fetch(
          `http://localhost:2000/api/cardidea/findingideasbyid/${_id}`,
          {
            next: {
              revalidate: 0,
            },
          }
        );
        return res.json();
      } catch (error) {
        console.error("Error fetching ticket:", error);
        throw error;
      }
}


export default function CarddetailsId({params}) {
    const { data, error } = fetchCardDetailsById(params._id);
    if (error) return <div>{error.message}</div>;
    if (!data) return <div className="max-w-4xl mx-auto">Loading...</div>;
    console.log(data);
    return (
        <div className="max-w-4xl mx-auto">
        <div className="newgridtemplate rounded">
          {data &&
            data.map((card) => {
              return (
                <div key={card._id} className="mt-10 border-b flex flex-col p-4 bg-gray-300 rounded-xl">
                  <Text variant={"xLarge"}>{card.title}</Text>
                  <div className="my-1 flex flex-col justify-center">
                  <Text className="text-gray-900 font-medium" variant={"medium"}>{card.functionality}</Text>
                  <Text variant={"medium"}>{card.email}</Text>
                  </div>
                  <Text className='line-clamp-5 text-black font-normal' variant={"medium"}>{card.description}</Text>
                </div>
              );
            })}
        </div>
      </div>
    )
}
