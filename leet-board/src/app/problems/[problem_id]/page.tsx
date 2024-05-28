"use client"

import dynamic from "next/dynamic"

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
)

export default function WhiteBoard({
  params,
}: {
  params: {
    problem_id: string
  }
}) {
  return (
    <div className={"h-full"}>
      <h1>Include Excalidraw here for {params.problem_id}</h1>
      <Excalidraw />
    </div>
  )
}
