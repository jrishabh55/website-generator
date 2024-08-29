"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { updateWebsite } from "@/lib/api";

interface HoverImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  editOnTop?: boolean;
  path?: string;
}

export default function EditableImage({
  src,
  alt,
  width,
  height,
  className,
  path,
  editOnTop,
}: HoverImageProps) {
  const { id } = useParams();
  const [isHovering, setIsHovering] = useState(false);
  const [baseImage, setBaseImage] = useState(src);

  const onEdit = () => {
    fetch(`/api/image?width=${width}&height=${height}`)
      .then((r) => r.json())
      .then(async (res) => {
        setBaseImage(res.image);
        if (path) {
          await updateWebsite(id.toString(), { [path]: res.image });
        }
      });
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div
          className="relative group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image
            src={baseImage}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-300",
              isHovering ? "opacity-70" : "opacity-100"
            )}
          />
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute top-2 z-10 right-2 transition-opacity duration-300",
              editOnTop || isHovering ? "opacity-100" : "opacity-0"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit image"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
