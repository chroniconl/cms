"use client";

import React from "react";

const updateTitle = (title: string, id: string) => {
  const fetcher = async () => {
    const response = await fetch("/api/v0/document/title", {
      method: "PUT",
      body: JSON.stringify({ title, id }),
    });
    const { data, error, message } = await response.json();

    if (error) {
      console.log(message);
      return;
    }

    console.log(data);
  };

  fetcher();
};

export default function TitleForm({
  title,
  id,
}: { title: string; id: string }) {
  return (
    <form>
      <input
        defaultValue={title}
        name="title"
        onChange={(e) => {
          updateTitle(e.target.value, id);
        }}
        type="text"
        placeholder="Enter a title"
        className="text-2xl px-4 py-6 w-full font-bold bg-transparent rounded-md border border-input"
      />
    </form>
  );
}
