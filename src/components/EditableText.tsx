import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Copy, Edit, RefreshCcwIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { generateText } from "@/lib/api";

interface EditableTextProps {
  onEdit?: (newText: string) => void;
  onCopy?: () => void;
  onDelete?: () => void;
  children: string;
}

export default function EditableText({
  children,
  onEdit,
  onCopy,
  onDelete,
}: EditableTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(children);
  const [editedText, setEditedText] = useState(children);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmitEdit = () => {
    setEditedText(tempText);
    onEdit?.(editedText);
    setIsEditing(false);
  };

  const handleRegen = () => {
    generateText(editedText).then(({ text }) => {
      console.log("🚀 ~ generateText ~ text:", text);
      setTempText(text);
    });
  };

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <span
          onMouseEnter={() => {
            setTempText(editedText);
            setIsHovered(true);
            setIsEditing(false);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsEditing(false);
          }}
          className={`cursor-pointer p-0 m-0 ${
            isHovered ? "bg-accent/20" : ""
          }`}
        >
          {editedText}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex space-x-2">
          <Popover open={isEditing} onOpenChange={setIsEditing}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex space-x-2">
                <Textarea
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  className="flex-grow"
                />
                <div className="flex flex-col gap-2">
                  <Button size="icon-sm" onClick={handleSubmitEdit}>
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Submit</span>
                  </Button>
                  <Button
                    size="icon-sm"
                    onClick={handleRegen}
                    title="Refresh Gen"
                  >
                    <RefreshCcwIcon className="h-4 w-4" />
                    <span className="sr-only">Re-Generate</span>
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* <Button variant="ghost" size="icon-sm" onClick={onCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy</span>
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onDelete}>
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button> */}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
