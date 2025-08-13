"use client";

import { useMobile } from "@/hooks/use-mobile";

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  const [isMobile, _] = useMobile({ breakpoint: 640 });

  return (
    <div className="mx-auto mb-8 text-center lg:mb-12">
      <h2 className={`${isMobile ? "heading-4" : "heading-3"} text-foreground mb-4`}>{title}</h2>
      <div
        className={`${isMobile ? "body-small" : "body-medium"} text-muted-foreground break-keep`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default SectionHeader;
