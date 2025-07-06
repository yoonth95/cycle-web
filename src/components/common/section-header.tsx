"use client";

import { useMobile } from "@/hooks/use-mobile";

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  const [isMobile, _] = useMobile({ breakpoint: 640 });

  return (
    <div className="text-center mx-auto mb-8 lg:mb-12">
      <h2 className={`${isMobile ? "heading-4" : "heading-3"} text-foreground mb-4`}>{title}</h2>
      <p className={`${isMobile ? "body-small" : "body-medium"} text-muted-foreground`}>
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
