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
        <div className="grid md:grid-cols-3 gap-6">
          {data.serviceTypes
            .sort((a, b) => a.order - b.order)
            .map((service) => (
              <Card
                key={service.order}
                className="text-center p-8 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardContent className="space-y-4">
                  {/* 아이콘 */}
                  <div className="w-16 h-16 bg-figma-your-pink rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    {(() => {
                      const IconComponent = getIconComponent(service.iconName);
                      return <IconComponent className="w-8 h-8 text-figma-old-brick" />;
                    })()}
                  </div>

                  {/* 제목 */}
                  <h3 className="heading-5 text-foreground">{service.title}</h3>

                  {/* 설명 */}
                  <p className="body-medium text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
