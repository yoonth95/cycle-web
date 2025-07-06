import SectionHeader from "@/components/common/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Truck, HeadphonesIcon } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "전문 수리",
    description: "모든 종류의 자전거 수리 및 정비 서비스를 제공합니다.",
  },
  {
    icon: Truck,
    title: "무료 배달",
    description: "인천 근교 가까운 곳은 무료로 배달해드립니다.",
  },
  {
    icon: HeadphonesIcon,
    title: "지속적인 A/S",
    description: "창업 이후 지속적인 애프터서비스로 보답하겠습니다.",
  },
];

export function ServicesSection() {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          title="전문 서비스"
          description="창업 이후 지속적인 A/S로 보답하겠습니다. 전문적인 수리와 정비 서비스를 제공합니다."
        />

        {/* 서비스 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="text-center p-8 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="space-y-4">
                {/* 아이콘 */}
                <div className="w-16 h-16 bg-figma-your-pink rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-figma-old-brick" />
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
