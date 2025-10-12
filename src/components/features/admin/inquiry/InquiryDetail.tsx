const InquiryDetail = ({ description }: { description: string }) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-foreground font-medium">문의 내용</h3>
    <div className="bg-muted/30 text-muted-foreground rounded-md border p-4 text-sm">
      <p className="text-foreground whitespace-pre-line">{description}</p>
    </div>
  </div>
);

export default InquiryDetail;
