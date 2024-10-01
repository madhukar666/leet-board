"use client"
import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { Theme } from "@excalidraw/excalidraw/types/element/types";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {useToast}  from "@/hooks/use-toast";
import formatString from "@/lib/formatString"
import saveBoards from "@/lib/saveboards";

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
  const [board, setBoard] = useState("");
  const [user, setUser] = useState({email: ""});
  const { problem_id } = useParams();
  const [problemData, setProblemData] = useState<ProblemData | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sideWidth, setSideWidth] = useState(300);
  const { toast } = useToast();

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
    //@ts-ignore
    setUser(JSON.parse(localStorage.getItem("user")));
    //@ts-ignore
    setBoard(localStorage.getItem("currentVersion"));
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSideWidth(Math.min(300, window.innerWidth * 0.3));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
      const autoSaveInterval = setInterval(async () => {
        try {
          if(problemData == null)
              clearInterval(autoSaveInterval);
            // @ts-ignore
          const response = await saveBoards(parseInt(problem_id as string, 10), replaceAndCapitalize(problemData.title_slug), user.email, board);
            console.log(response);
            toast({
              title: "Auto-save successful",
              description: "Your work has been saved.",
              duration: 3000,
            });
        } catch (error){
          console.log(error);
          // setError("Check your connection. Can't autosave the work");
          toast({
            title: "Auto-save failed",
            description: "Please check your connection.",
            variant: "destructive",
            duration: 3000,
          });
        }
      }, 60000);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearInterval(autoSaveInterval);
      };
  }, [problem_id, getProblemDescription, user.email, board, toast]);

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
      let formattedText = formatString(problemData.description);
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
    <div className="m-2 pb-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg h-fit text-sm">
  {/* Main container with flex layout */}
  <div
    className={`flex ${
      isVerticalLayout ? "flex-col" : "lg:flex-row"
    } items-center justify-center w-full bg-neutral-100 dark:bg-neutral-900 shadow-xl rounded-lg overflow-hidden`}
    style={{ height: isVerticalLayout ? "max-content" : "calc(100vh - 4rem)" }}
  >
    {/* Sidebar for problem statement */}
    <div
      className={`flex ${
        isVerticalLayout ? "w-full" : "lg:w-auto"
      } justify-center h-full items-start p-4 bg-white dark:bg-black rounded-l overflow-y-auto`}
      ref={sideBarRef}
      style={{ width: isVerticalLayout ? "100%" : `${sideWidth}px` }}
    >
      {renderProblemStatement()}
    </div>

    {/* Resizer only visible in horizontal layout */}
    {!isVerticalLayout && (
      <div
        className="bg-gray-300 min-h-full hover:bg-slate-400 cursor-ew-resize"
        style={{ width: "4px" }}
        onMouseDown={customMouseHandler}
      />
    )}

    {/* ExcalidrawWrapper with flexible grow */}
    <div className={`flex-grow h-full ${isVerticalLayout ? "w-full" : ""}`}>
      <ExcalidrawWrapper theme={theme as Theme} problem_id={problem_id as string} />
    </div>
  </div>

  {/* Footer note */}
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