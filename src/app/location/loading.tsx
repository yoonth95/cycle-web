export default function LocationLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="skeleton mb-4 h-8 w-32" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-4">
          <div className="skeleton aspect-[4/3] rounded-lg" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="skeleton h-6 w-24" />
          <div className="space-y-4">
            <div className="skeleton h-16 w-full" />
            <div className="skeleton h-16 w-full" />
            <div className="skeleton h-24 w-full" />
            <div className="skeleton h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
