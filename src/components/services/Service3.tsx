"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/validations";
import EditableText from "@/components/EditableText";

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            {service.icon}
          </div>
          <CardTitle>
            <EditableText path={`services.${index}.name`}>
              {service.name}
            </EditableText>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <EditableText path={`services.${index}.description`}>
            {service.description}
          </EditableText>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default function Service3({ services = [] }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="max-w-5xl container grid grid-cols-2 gap-5">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}
