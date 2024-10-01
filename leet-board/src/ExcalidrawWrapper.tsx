import { Excalidraw, getSceneVersion, serializeAsJSON } from "@excalidraw/excalidraw";
import { useEffect } from "react";
import { WelcomeScreen } from "@excalidraw/excalidraw";
import { ExcalidrawElement, Theme } from "@excalidraw/excalidraw/types/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import Image from "next/image";
import leetbrd from "../public/LeetbrdLogo.png";
import boards from "@/lib/boards";

interface ExcalidrawWrapperProps {
  theme: Theme | undefined;
  problem_id: string;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({ theme, problem_id }) => {
  let prevVersion = -1;

  const handleChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    let currentVersion = getSceneVersion(elements);
    if (currentVersion > prevVersion) {
      localStorage.setItem("currentVersion", serializeAsJSON(elements, appState, files, "local"));
      prevVersion = currentVersion;
    }
  };

  const renderInitial = () => {
    const storedData = localStorage.getItem("currentVersion");
    if (storedData) {
      if (problem_id === localStorage.getItem("problem_id")) return JSON.parse(storedData);
      localStorage.setItem("problem_id", problem_id);
      //@ts-ignore
      const boards = JSON.parse(localStorage.getItem("user")).boards;
      //@ts-ignore
      const boardIndex = boards.findIndex((board) => problem_id === board.problem_id);
      if (boardIndex === -1) return null;
      return boards[boardIndex].version;
    }
    return null;
  };

  return (
    <div
      className="w-full h-[calc(100vh-4rem)] max-h-[90vh] flex justify-center items-center"
      style={{ minHeight: "500px" }} // Ensures a minimum height
    >
      <Excalidraw onChange={handleChange} theme={theme} initialData={renderInitial()}>
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <Image src={leetbrd} alt={"logo1"} style={{ width: "200px" }} />
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>
              Brainstorm your ideas here
            </WelcomeScreen.Center.Heading>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};

export default ExcalidrawWrapper;
