const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string | Record<string, unknown>;
}) => {
  const htmlDescription = typeof description === "string" ? description : "";

  return (
    <div className="mx-auto mb-8 text-center lg:mb-12">
      {/* 반응형 텍스트 크기: 모바일에서 heading-4, 데스크톱에서 heading-3 */}
      <h2 className="heading-4 lg:heading-3 text-foreground mb-4">{title}</h2>
      <div
        className="body-small lg:body-medium text-muted-foreground break-keep"
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
      />
    </div>
  );
};

export default SectionHeader;
