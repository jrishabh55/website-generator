import EditableImage from "@/components/EditableImage";
import EditableText from "@/components/EditableText";
import { Button } from "@/components/ui/button";
import { Hero } from "@/validations";

export default function SplitHero({
  heading,
  shortDescription,
  cta,
  image,
}: Hero & { cta: string[]; image: string }) {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <EditableImage
            src={image}
            width={550}
            height={550}
            alt="Hero"
            path="^images.hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <EditableText path="hero.heading">{heading}</EditableText>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                <EditableText path="hero.shortDescription">
                  {shortDescription}
                </EditableText>
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
