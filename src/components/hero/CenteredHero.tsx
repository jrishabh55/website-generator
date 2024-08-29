import { Button } from "@/components/ui/button";
import { Hero } from "@/validations";
import EditableText from "@/components/EditableText";

export default function CenteredHero({
  heading,
  shortDescription,
  cta,
}: Hero & { cta: string[] }) {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <EditableText path="hero.heading">{heading}</EditableText>
            </h1>
            <EditableText
              path="hero.shortDescription"
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
            >
              {shortDescription}
            </EditableText>
          </div>
          <div className="space-x-4">
            {cta.map((text, index) => (
              <Button key={index} variant={index === 0 ? undefined : "outline"}>
                {text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
