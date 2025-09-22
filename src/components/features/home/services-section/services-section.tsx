import SectionHeader from "@/components/common/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { getIconComponent } from "@/utils/icon-mapping";
import type { ServicesSectionProps } from "@/types/home";

export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={data.title} description={data.description} />

        {/* 서비스 카드 그리드 */}
        <div className="grid gap-6 md:grid-cols-3">
          {data.serviceTypes
            .sort((a, b) => a.order - b.order)
            .map((service) => (
              <Card
                key={service.order}
                className="group border p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="space-y-4">
                  {/* 아이콘 */}
                  <div className="bg-figma-your-pink mx-auto flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                    {(() => {
                      const IconComponent = getIconComponent(service.iconName);
                      return <IconComponent className="text-figma-old-brick h-8 w-8" />;
                    })()}
                  </div>

                  {/* 제목 */}
                  <h3 className="heading-5 text-foreground">{service.title}</h3>

                  {/* 설명 */}
                  <div
                    className="body-medium text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={
                      typeof service.description === "string"
                        ? { __html: service.description }
                        : undefined
                    }
                    suppressHydrationWarning
                  />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
