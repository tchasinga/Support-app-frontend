"use client";
import React, { useEffect, useState } from "react";
import { Text } from "@fluentui/react";
import Link from "next/link";

async function getCard() {
  const res = await fetch("http://localhost:2000/api/comment/findallcomments", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default function Commentgetting() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cardData = await getCard();
      setData(cardData);
    };

    fetchData();
  }, []); // empty dependency array to run only once after initial render

  return (
    <div className="max-w-4xl mx-auto">
     
      <div className="newgridtemplate rounded">
        {data &&
          data.map((card) => {
            return (
              <div key={card._id} className="mt-10 border-b flex flex-col p-4 bg-gray-300 rounded-xl">
                <Text variant={"xLarge"}>{card.user}</Text>
                <div className="my-1 flex flex-col justify-center">
                <Text className="text-gray-900 font-medium" variant={"medium"}>{card.commenting}</Text>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
