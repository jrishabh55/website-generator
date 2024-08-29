import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Faq } from "@/validations";
import { ChevronDown } from "lucide-react";

export default function FaqCard({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Card-based FAQ with expandable content */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <span>View Answer</span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
