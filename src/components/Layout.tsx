import { FC, Suspense, useMemo } from "react";
import { getHeroComp } from "./hero";
import { ClaudeSPAResponse } from "@/validations";
import { getServicesComp } from "./services";
import { LayoutData } from "@/app/actions";
import { getFaqComp } from "./faqSection";
import { Skeleton } from "./ui/skeleton";

type LayoutProps = {
  sections: LayoutData["data"]["sections"];
  meta: ClaudeSPAResponse;
  images: {
    hero: string;
    faqs: string[];
    services: string[];
  };
};

const Layout: FC<LayoutProps> = ({ sections, meta, images }) => {
  const Hero = useMemo(() => getHeroComp(sections.hero), [sections.hero]);
  const Service = useMemo(
    () => getServicesComp(sections.service),
    [sections.service]
  );
  const Faq = useMemo(() => getFaqComp(sections.faq), [sections.faq]);

  if (!Hero) {
    return null;
  }

  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <Hero {...meta.hero} cta={meta.cta} image={images.hero} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Service services={meta.services} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Faq faqs={meta.faq} />
      </Suspense>
    </>
  );
};

export default Layout;
