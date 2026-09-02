import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="max-w-2xl mx-auto py-24 text-center space-y-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        404 · Project Not Found
      </p>
      <h1 className="font-serif text-4xl font-black uppercase">
        Project Not Found
      </h1>
      <p className="text-muted-foreground">
        해당 프로젝트가 존재하지 않습니다.
      </p>
      <Link
        href="/projects"
        className="inline-block px-5 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        Back to Projects
      </Link>
    </div>
  );
}
