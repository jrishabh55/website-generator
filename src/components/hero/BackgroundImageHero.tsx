import { Button } from "@/components/ui/button";
import { Hero } from "@/validations";
import Image from "next/image";
import EditableImage from "@/components/EditableImage";
import EditableText from "@/components/EditableText";

export default function BackgroundImageHero({
  heading,
  shortDescription,
  cta,
  image,
}: Hero & { cta: string[]; image: string }) {
  return (
    <section className="w-full py-12 bg-background">
      <div className="relative">
        <EditableImage
          editOnTop
          src={image}
          width={1600}
          height={800}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative bg-gray-950/60">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center min-h-[40rem] text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                <EditableText>{heading}</EditableText>
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                <EditableText>{shortDescription}</EditableText>
              </p>
            </div>
            <div className="space-x-4 mt-6">
              {cta.map((text, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? undefined : "outline"}
                >
                  {text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
