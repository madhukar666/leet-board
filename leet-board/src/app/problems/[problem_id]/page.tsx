import dynamic from "next/dynamic"

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
    <div className="h-full flex flex-col">
      <h1 className="p-4 bg-gray-800 text-white">
        WhiteBoard for the problem id : {params.problem_id}
      </h1>
      <div className="flex-grow">
        <ExcalidrawWrapper />
      </div>
    </div>
  )
}
