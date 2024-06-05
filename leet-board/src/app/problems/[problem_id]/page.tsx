import dynamic from "next/dynamic"
import {WelcomeScreen} from "@excalidraw/excalidraw";

// Since client components get pre-rendered on server as well, import
// the Excalidraw stuff dynamically with ssr false

const ExcalidrawWrapper = dynamic(
  async () => (await import("../../../ExcalidrawWrapper")).default,
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
    <div className={"z-100"}>
        <div className={"w-full"} style={{height : "90.5vh"}}>
      <ExcalidrawWrapper identifier={""}/>

            </div>
    </div>
  )
}
