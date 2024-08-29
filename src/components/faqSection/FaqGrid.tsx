import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Faq } from "@/validations";

export default function FaqGrid({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Grid-based FAQ with hover effects */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Quick Answers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{faq.answer}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
