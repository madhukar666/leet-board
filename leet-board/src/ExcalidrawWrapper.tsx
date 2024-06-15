"use client"
import {Excalidraw, getSceneVersion, serializeAsJSON} from "@excalidraw/excalidraw"
import {WelcomeScreen} from "@excalidraw/excalidraw";
import {ExcalidrawElement, Theme} from "@excalidraw/excalidraw/types/element/types";
import {AppState, BinaryFiles} from "@excalidraw/excalidraw/types/types";
import Image from "next/image";
import leetbrd from "../public/leetbrd.png"

// import "@excalidraw/excalidraw/index.css"
interface ExcalidrawWrapperProps {
    theme:Theme | undefined
}


const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ( {theme}) => {

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
    }
    const renderInitial = () => {

        const storedData = localStorage.getItem("currentVersion");
        if (storedData)
            return JSON.parse(storedData);
        return null;
    }
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Excalidraw onChange={handleChange} theme = {theme} initialData={renderInitial()}>
                <WelcomeScreen>
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Logo>
                            <Image src={leetbrd} alt={"logo1"} style={{width:"200px"}}/>
                        </WelcomeScreen.Center.Logo>
                        <WelcomeScreen.Center.Heading>
                            Brainstorm your ideas here
                        </WelcomeScreen.Center.Heading>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>
        </div>
    )
}
export default ExcalidrawWrapper
