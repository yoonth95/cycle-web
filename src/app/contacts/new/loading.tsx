import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto mb-4 h-12 w-64" />
          <Skeleton className="mx-auto h-6 w-96" />
        </div>

        {/* Form Skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <Skeleton className="mb-2 h-5 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Description Field */}
            <div>
              <Skeleton className="mb-2 h-5 w-24" />
              <Skeleton className="h-32 w-full" />
            </div>

            {/* Name Field */}
            <div>
              <Skeleton className="mb-2 h-5 w-40" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Email Field */}
            <div>
              <Skeleton className="mb-2 h-5 w-28" />
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
