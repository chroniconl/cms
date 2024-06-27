"use client";

import { Card } from "@/components/ui/card";
import React from "react";

const updateTitle = (title: string, id: string) => {
  const fetcher = async () => {
    const response = await fetch("/api/v0/document/title", {
      method: "PUT",
      body: JSON.stringify({ title, id }),
    });
    const { data, error, message } = await response.json();

    if (error) {
      return;
    }
  };

  fetcher();
};

export default function TitleForm({
  title,
  id,
}: { title: string; id: string }) {
  return (
    <Card>
      <h2 className="text-2xl px-4 w-full font-bold mt-6">{title}</h2>
    </Card>
  );
}
