"use client";
import OpenAI from "openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job started");
      },
    }),
  );
  //  const data = useQuery(trpc.createAi.queryOptions({text : "Aman"}))
  return (
    <>
      <div className="w-full h-screen">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          onClick={() => {
            invoke.mutate({ value: value });
          }}
        >
          Invoke BackGround job
        </Button>
        <div>{JSON.stringify(invoke.data)}</div>
      </div>
    </>
  );
}
