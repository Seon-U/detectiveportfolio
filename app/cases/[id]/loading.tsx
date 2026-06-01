export default function CaseLoading() {
  return (
    <div className="max-w-6xl mx-auto py-24">
      <div className="animate-pulse space-y-8">
        <div className="h-4 w-40 bg-muted rounded" />
        <div className="h-12 w-2/3 bg-muted rounded" />
        <div className="h-64 w-full bg-muted rounded" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-4/6 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
