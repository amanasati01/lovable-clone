"use client"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"

export default  function Home() {
 const trpc = useTRPC()
 const invoke = useMutation(trpc.invoke.mutationOptions({}))
 const data = useQuery(trpc.createAi.queryOptions({text : "Aman"}))
  return (
    <>
    <div className="w-7 h-3">
      <Button onClick={()=>{
        invoke.mutate({text:"aman"})
      }}>
        Invoke
      </Button>
      <div>
         {JSON.stringify(data.data)}
      </div>
    </div>
    </>
)
}