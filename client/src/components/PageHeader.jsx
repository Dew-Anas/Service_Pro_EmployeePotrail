export default function PageHeader({ eyebrow, title }) {
  return (
    <header className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">
        {eyebrow}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-ink">{title}</h1>
    </header>
  );
}