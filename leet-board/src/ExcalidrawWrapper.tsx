"use client"
import { Excalidraw, getSceneVersion,serializeAsJSON } from "@excalidraw/excalidraw"
import {WelcomeScreen} from "@excalidraw/excalidraw";
import {ExcalidrawElement} from "@excalidraw/excalidraw/types/element/types";
import {AppState, BinaryFiles} from "@excalidraw/excalidraw/types/types";
// import "@excalidraw/excalidraw/index.css"
interface ExcalidrawWrapperProps {
    identifier : String
}
const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps>= ({identifier,}) => {

    let prevVersion = -1;

    const handleChange = (
        elements : readonly ExcalidrawElement[],
        appState : AppState,
        files : BinaryFiles

    )=>{

        let currentVersion = getSceneVersion(elements);
        if(currentVersion > prevVersion){
            localStorage.setItem("currentVersion", serializeAsJSON(elements,appState,files,"local"));
            prevVersion = currentVersion;
        }
    }
    const renderInitial = ()=>{

        const storedData = localStorage.getItem("currentVersion");
        if(storedData)
            return JSON.parse(storedData);
        return null;
    }
  return (
    <div style={{ width: "1436px", height: "100%" }}>
      <Excalidraw onChange={handleChange} initialData={renderInitial()}>
            <WelcomeScreen/>
      </Excalidraw>
    </div>
  )
}
export default ExcalidrawWrapper
