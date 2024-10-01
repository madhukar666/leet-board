"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProblemForm } from "@/components/custom/lc-form";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"; // Adjust the import as per your UI library

interface BoardItem {
  problem_id: string;
  problem_title: string;
  lastModified: string;
}

interface DrawerForDropDownProps {
  title: string;
  description: string;
  footer: string;
  variant: string;
  onClick: () => void;
}

const ListItem: React.FC<
  BoardItem & { onClick: () => void; key?: unknown; problem_statement: string }
> = ({ problem_id, problem_title, lastModified, onClick, key }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
    <CardContent className="flex items-center justify-between p-4">
      {/* Left side: Problem details */}
      <div className="flex items-center space-x-4 flex-grow">
        <div className="text-lg font-semibold">{problem_id}</div>
        <Separator orientation="vertical" />

        {/* Title with Tooltip and clipping */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-grow">
                <div className="text-lg font-semibold truncate w-full max-w-[200px]">
                  {problem_title}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lastModified}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-sm max-w-xs">
              {problem_title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Right side: View button and Dropdown */}
      <div className="flex items-center space-x-2">
        <ButtonCustom text={"View"} variant={"ghost"} onClick={onClick} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <DrawerForDropDown
                title={"Delete the board"}
                description={"Process cannot be reversed"}
                footer={"Delete"}
                variant={"destructive"}
                onClick={() => {
                  console.log("Delete action triggered");
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
);

export default function ProblemCard() {
  const [firstboards, setFirstBoards] = useState<BoardItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFirstBoards(parsedUser.boards);
    }
  }, []);

  const filteredBoards = firstboards.filter((board) =>
    board.problem_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.problem_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Problem Board</CardTitle>
          <div className="flex items-center space-x-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">New Problem</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>New Problem</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                      <ProblemForm />
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className={"w-auto"}>
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          {filteredBoards.map((board) => (
            <ListItem
              key={board.problem_id}
              {...board}
              onClick={() => {
                router.push(`/problems/${board.problem_id}`);
              }}
            />
          ))}
          {filteredBoards.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No problems found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function ButtonCustom({ text, variant, onClick }) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="
        px-6 py-3
        text-black dark:text-white
        bg-white dark:bg-black
        border border-gray-300 dark:border-gray-700
        rounded-lg
        transform transition-transform duration-300 ease-in-out
        hover:scale-110
      "
    >
      {text}
    </Button>
  );
}

const DrawerForDropDown: React.FC<DrawerForDropDownProps> = ({
  title,
  description,
  footer,
  variant,
  onClick,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-justify">
          Delete
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <ButtonCustom variant={variant} onClick={onClick} text={footer} />
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
