"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/validations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import EditableText from "@/components/EditableText";

const Service2 = ({ services = [] }: { services: Service[] }) => {
  if (services.length === 0) return null;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Services - Carousel
      </h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="m-4 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      {service.icon}
                    </div>
                    <CardTitle>
                      <EditableText>{service.name}</EditableText>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <EditableText>{service.description}</EditableText>
                    </CardDescription>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Service2;
