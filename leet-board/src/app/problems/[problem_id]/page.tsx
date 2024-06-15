'use client'
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Theme } from "@excalidraw/excalidraw/types/element/types";
import { useRef, useState, useEffect } from "react";

// Dynamically import ExcalidrawWrapper without SSR
const ExcalidrawWrapper = dynamic(
  async () => (await import("../../../ExcalidrawWrapper")).default,
  {
    ssr: false,
  }
);

export default function WhiteBoard() {
  const { theme } = useTheme();

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

      // Set new width with minimum and maximum constraints
      if (newWidth > 200 && newWidth < window.innerWidth - 200) {
        setSideWidth(newWidth);
        setBoardWidth(window.innerWidth - newWidth - 20); // Adjust board width
      }
    };

    // Cleanup mouse event listeners
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


    return (
    <div className="m-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg min-h-screen">
      <div className="flex flex-row h-lvh items-center justify-center w-full bg-neutral-100 dark:bg-neutral-900 shadow-xl rounded-lg overflow-hidden" style={{ height: "645px" }}>
        {/* Problem Statement Section */}
        <div
          className="flex flex-col justify-center h-full items-start p-4 bg-white dark:bg-black rounded-l"
          ref={sideBarRef}
          style={{ width: `${sideWidth}px` }}
        >
          <p className="text-gray-800 dark:text-white">ProblemStatement here</p>
        </div>

        {/* Resizable Divider */}
        <div
    className="bg-gray-300 min-h-full hover:bg-slate-400"
    style={{width: "4px", cursor: "ew-resize"}}
    onMouseDown={customMouseHandler}
        ></div>

        {/* Excalidraw Wrapper Section */}
        <div className="flex-grow h-full">
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
