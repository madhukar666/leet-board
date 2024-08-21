/* eslint-disable react/no-unescaped-entities */
'use client'
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Theme } from "@excalidraw/excalidraw/types/element/types";
import React, {useRef, useState, useEffect, SetStateAction} from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios"

const ExcalidrawWrapper = dynamic(
  async () => (await import("../../../ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function WhiteBoard() {
  const { theme } = useTheme();
  const search = useSearchParams()

  const problemStatement = async (problem_id : string)=> {
    const response = await axios.get(`http://localhost:3000/api/problems/${problem_id}`)
    console.log(response.data);
    return  response.data as SetStateAction<React.JSX.Element>;
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const problem_id = search.get("problem_id") as unknown as number
  const [problemDescription, setProblemDescription] = useState(
    (<div>Loading...</div>));
  // States for widths
  const [sideWidth, setSideWidth] = useState(200);
  const [boardWidth, setBoardWidth] = useState(window.innerWidth - 200 - 20); // Initial width based on screen size

  const sideBarRef = useRef(null);

  // Mouse event handler for resizing
  const customMouseHandler = (event: any) => {
    if (boardWidth < 200) return;
    const initialX = event.clientX;

    // Get initial width of the sidebar
    // @ts-ignore
    const sbWidth = window.getComputedStyle(sideBarRef.current).width;
    const initialWidth = parseInt(sbWidth, 10);

    // Handler for mouse movement
    const mouseMoveHandler = (event: MouseEvent) => {
      const deltaX = event.clientX - initialX;
      const newWidth = initialWidth + deltaX;


      if (newWidth > 200 && newWidth < window.innerWidth - 200) {
        setSideWidth(newWidth);
        setBoardWidth(window.innerWidth - newWidth - 20); // Adjust board width
      }
    };


    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  // Adjust board width on window resize
  useEffect(() => {
    const handleResize = () => {
      setBoardWidth(window.innerWidth - sideWidth - 20);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sideWidth]);
  // Determine if the layout should be stacked vertically based on screen width
  const isVerticalLayout = window.innerWidth <= 768; // Example breakpoint for responsiveness

  // @ts-ignore
  useEffect((problem_id) => {
      setProblemDescription(problemDescription);
  }, [problem_id]);
  return (
    <div className="m-2 pb-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg h-screen">
      <div
        className={`flex ${isVerticalLayout ? 'flex-col' : 'lg:flex-row'
          } items-center justify-center w-full bg-neutral-100 dark:bg-neutral-900 shadow-xl rounded-lg overflow-hidden`}
        style={{
          height: isVerticalLayout ? 'max-content' : '735px',
        }}
      >
        {/* Problem Statement Section */}
        <div
          className={`flex ${isVerticalLayout ? 'w-full' : 'lg:w-auto'
            } justify-center h-full items-start p-4 bg-white dark:bg-black rounded-l`}
          ref={sideBarRef}
          style={{ width: isVerticalLayout ? '100%' : `${sideWidth}px` }}
        >
          {loading ? <div>Loading...</div> : (error ? <div>Error: {error}</div> : problemDescription)}
        </div>

        {!isVerticalLayout && (
          <div
            className="bg-gray-300 min-h-full hover:bg-slate-400"
            style={{ width: "4px", cursor: "ew-resize" }}
            onMouseDown={customMouseHandler}
          ></div>
        )}


        <div className={`flex-grow h-full ${isVerticalLayout ? 'w-full' : ''}`}>
          <ExcalidrawWrapper theme={theme as Theme} />
        </div>
      </div>

      <div className="mt-4 flex items-start font-bold text-gray-800 dark:text-white">
        Note:
        <span className="ml-1 font-light">
          Whiteboard used here is <Link href="https://docs.excalidraw.com/" className="text-blue-500 underline">Excalidraw</Link>
        </span>
      </div>
    </div>
  );
}


