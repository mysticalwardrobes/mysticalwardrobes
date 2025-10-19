export default function CollectionsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-secondary/20 rounded-lg h-64 mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-secondary/20 rounded w-3/4"></div>
            <div className="h-4 bg-secondary/20 rounded w-full"></div>
            <div className="h-4 bg-secondary/20 rounded w-5/6"></div>
            <div className="h-4 bg-secondary/20 rounded w-4/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
