import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/validations";
import EditableText from "@/components/EditableText";

export const Service1 = ({ services = [] }: { services: Service[] }) => {
  if (services.length === 0) return null;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader>
              {service.icon && (
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  {service.icon}
                </div>
              )}
              <CardTitle>
                <EditableText path={`services.${index}.name`}>
                  {service.name}
                </EditableText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <EditableText path={`services.${index}.description`}>
                  {service.description}
                </EditableText>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Service1;
