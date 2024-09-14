"use client"
//
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { useParams } from "next/navigation";
// import { Theme } from "@excalidraw/excalidraw/types/element/types";
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
//
// const ExcalidrawWrapper = dynamic(
//   async () => (await import("../../../ExcalidrawWrapper")).default,
//   { ssr: false }
// );
//
// interface ProblemData {
//   description: string;
//   problem_id: string;
//   title_slug: string;
// }
//
// export default function WhiteBoard() {
//   const { theme } = useTheme();
//   const { problem_id } = useParams();
//   const [problemData, setProblemData] = useState<ProblemData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [sideWidth, setSideWidth] = useState(300);
//
//   const sideBarRef = useRef<HTMLDivElement>(null);
//   const isVerticalLayout = typeof window !== "undefined" && window.innerWidth <= 768;
//
//   function replaceAndCapitalize(input: string): string {
//     return input.replace(/-/g, ' ')
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   }
//
//   const getProblemDescription = useCallback(async (problem_id: string | string[]) => {
//     try {
//       const response = await fetch("/api/problem", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ problem_id })
//       });
//
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//
//       const data = await response.json();
//       setProblemData(data.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unknown error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);
//
//   useEffect(() => {
//     if (problem_id) {
//       getProblemDescription(problem_id);
//     }
//
//     const handleResize = () => {
//       if (typeof window !== "undefined") {
//         setSideWidth(Math.min(300, window.innerWidth * 0.3));
//       }
//     };
//
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [problem_id, getProblemDescription]);
//
//   const customMouseHandler = useCallback((event: React.MouseEvent) => {
//     event.preventDefault();
//     const startX = event.clientX;
//     const startWidth = sideWidth;
//
//     const mouseMoveHandler = (e: MouseEvent) => {
//       const newWidth = startWidth + e.clientX - startX;
//       setSideWidth(Math.max(200, Math.min(newWidth, window.innerWidth - 400)));
//     };
//
//     const mouseUpHandler = () => {
//       document.removeEventListener("mousemove", mouseMoveHandler);
//       document.removeEventListener("mouseup", mouseUpHandler);
//     };
//
//     document.addEventListener("mousemove", mouseMoveHandler);
//     document.addEventListener("mouseup", mouseUpHandler);
//   }, [sideWidth]);
//
//   const renderProblemStatement = () => {
//     if (isLoading) {
//       return <div className="animate-pulse">Loading problem statement...</div>;
//     }
//
//     if (error) {
//       return (
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       );
//     }
//
//     if (problemData?.description) {
//       let formattedText = problemData.description
//         .replace(/\n/g, '</p><p>')
//         .replace(/Example \d+:/g, match => `<h2 class="text-xl font-semibold mt-4 mb-2">${match}</h2>`)
//         .replace(/Input: /g, '<strong class="text-blue-600 dark:text-blue-400">Input: </strong>')
//         .replace(/Output: /g, '<strong class="text-green-600 dark:text-green-400">Output: </strong>')
//         .replace(/Explanation: /g, '<strong class="text-purple-600 dark:text-purple-400">Explanation: </strong>')
//         .replace(/Constraints:/g, '<h2 class="text-xl font-semibold mt-4 mb-2">Constraints:</h2>')
//         .replace(/Note:/g, '<h2 class="text-xl font-semibold mt-4 mb-2">Note:</h2>');
//
//       return (
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold mb-4">{replaceAndCapitalize(problemData.title_slug)}</h1>
//           <div
//             className="w-full prose dark:prose-invert text-justify space-y-2"
//             dangerouslySetInnerHTML={{ __html: `<p>${formattedText}</p>` }}
//           />
//           <p className="mt-6">
//             Find the full problem statement{' '}
//             <Link
//               href={`https://leetcode.com/problems/${problemData.title_slug}/description/`}
//               className="text-blue-500 hover:underline"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               here
//             </Link>
//           </p>
//         </div>
//       );
//     }
//
//     return <div>Problem not found</div>;
//   };
//
//   return (
//     <div className="m-2 pb-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg h-screen">
//       <div
//         className={`flex ${
//           isVerticalLayout ? "flex-col" : "lg:flex-row"
//         } items-center justify-center w-full bg-neutral-100 dark:bg-neutral-900 shadow-xl rounded-lg overflow-hidden`}
//         style={{ height: isVerticalLayout ? "max-content" : "calc(100vh - 4rem)" }}
//       >
//         <div
//           className={`flex ${
//             isVerticalLayout ? "w-full" : "lg:w-auto"
//           } justify-center h-full items-start p-4 bg-white dark:bg-black rounded-l overflow-y-auto`}
//           ref={sideBarRef}
//           style={{ width: isVerticalLayout ? "100%" : `${sideWidth}px` }}
//         >
//           {renderProblemStatement()}
//         </div>
//
//         {!isVerticalLayout && (
//           <div
//             className="bg-gray-300 min-h-full hover:bg-slate-400 cursor-ew-resize"
//             style={{ width: "4px" }}
//             onMouseDown={customMouseHandler}
//           />
//         )}
//
//         <div className={`flex-grow h-full ${isVerticalLayout ? "w-full" : ""}`}>
//           <ExcalidrawWrapper theme={theme as Theme} />
//         </div>
//       </div>
//
//       <div className="mt-4 flex items-start font-bold text-gray-800 dark:text-white">
//         Note:
//         <span className="ml-1 font-light">
//           Whiteboard used here is{' '}
//           <Link href="https://docs.excalidraw.com/" className="text-blue-500 hover:underline">
//             Excalidraw
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { Theme } from "@excalidraw/excalidraw/types/element/types";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ExcalidrawWrapper = dynamic(
  async () => (await import("../../../ExcalidrawWrapper")).default,
  { ssr: false }
);

interface ProblemData {
  description: string;
  problem_id: string;
  title_slug: string;
}

export default function WhiteBoard() {
  const { theme } = useTheme();
  const { problem_id } = useParams();
  const [problemData, setProblemData] = useState<ProblemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sideWidth, setSideWidth] = useState(300);

  const sideBarRef = useRef<HTMLDivElement>(null);
  const isVerticalLayout = typeof window !== "undefined" && window.innerWidth <= 768;

  function replaceAndCapitalize(input: string): string {
    return input.replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const getProblemDescription = useCallback(async (problem_id: string | string[]) => {
    try {
      const response = await fetch("/api/problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem_id })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProblemData(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (problem_id) {
      getProblemDescription(problem_id);
    }

    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSideWidth(Math.min(300, window.innerWidth * 0.3));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [problem_id, getProblemDescription]);

  const customMouseHandler = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = sideWidth;

    const mouseMoveHandler = (e: MouseEvent) => {
      const newWidth = startWidth + e.clientX - startX;
      setSideWidth(Math.max(200, Math.min(newWidth, window.innerWidth - 400)));
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }, [sideWidth]);

  const renderProblemStatement = () => {
    if (isLoading) {
      return <div className="animate-pulse">Loading problem statement...</div>;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (problemData?.description) {
      let formattedText = problemData.description
        .replace(/\n/g, '</p><p>')
        .replace(/Example \d+:/g, match => `<h2 class="text-xl font-semibold mt-4 mb-2">${match}</h2>`)
        .replace(/Input: /g, '<strong class="text-blue-600 dark:text-blue-400">Input: </strong>')
        .replace(/Output: /g, '<strong class="text-green-600 dark:text-green-400">Output: </strong>')
        .replace(/Explanation: /g, '<strong class="text-purple-600 dark:text-purple-400">Explanation: </strong>')
        .replace(/Constraints:/g, '<h2 class="text-xl font-semibold mt-4 mb-2">Constraints:</h2>')
        .replace(/Note:/g, '<h2 class="text-xl font-semibold mt-4 mb-2">Note:</h2>')
        // Style inline code and equations
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // Style block equations (assuming they're wrapped in double backticks)
        .replace(/``([^`]+)``/g, '<pre class="block-equation">$1</pre>');

      return (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold mb-4">{problemData.problem_id}.{replaceAndCapitalize(problemData.title_slug)}</h1>
          <div
            className="w-full prose dark:prose-invert text-justify space-y-2 problem-description"
            dangerouslySetInnerHTML={{ __html: `<p>${formattedText}</p>` }}
          />
          <p className="mt-6">
            Find the full problem statement{' '}
            <Link
              href={`https://leetcode.com/problems/${problemData.title_slug}/description/`}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </Link>
          </p>
        </div>
      );
    }

    return <div>Problem not found</div>;
  };

  return (
    <div className="m-2 pb-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg h-screen text-sm">
      <div
        className={`flex ${
          isVerticalLayout ? "flex-col" : "lg:flex-row"
        } items-center justify-center w-full bg-neutral-100 dark:bg-neutral-900 shadow-xl rounded-lg overflow-hidden`}
        style={{ height: isVerticalLayout ? "max-content" : "calc(100vh - 4rem)" }}
      >
        <div
          className={`flex ${
            isVerticalLayout ? "w-full" : "lg:w-auto"
          } justify-center h-full items-start p-4 bg-white dark:bg-black rounded-l overflow-y-auto`}
          ref={sideBarRef}
          style={{ width: isVerticalLayout ? "100%" : `${sideWidth}px` }}
        >
          {renderProblemStatement()}
        </div>

        {!isVerticalLayout && (
          <div
            className="bg-gray-300 min-h-full hover:bg-slate-400 cursor-ew-resize"
            style={{ width: "4px" }}
            onMouseDown={customMouseHandler}
          />
        )}

        <div className={`flex-grow h-full ${isVerticalLayout ? "w-full" : ""}`}>
          <ExcalidrawWrapper theme={theme as Theme} />
        </div>
      </div>

      <div className="mt-4 flex items-start font-bold text-gray-800 dark:text-white">
        Note:
        <span className="ml-1 font-light">
          Whiteboard used here is{' '}
          <Link href="https://docs.excalidraw.com/" className="text-blue-500 hover:underline">
            Excalidraw
          </Link>
        </span>
      </div>
    </div>
  );
}