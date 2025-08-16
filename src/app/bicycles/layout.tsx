import DynamicBreadcrumb from "@/components/features/bicycles/dynamic-breadcrumb";

export default function BicyclesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      <DynamicBreadcrumb />
      {children}
    </main>
  );
}
