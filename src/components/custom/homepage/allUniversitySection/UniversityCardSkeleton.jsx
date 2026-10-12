const UniversityCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-white/10 bg-white p-3 shadow-sm">
      <div className="mb-3 flex h-16 items-center justify-center rounded-lg bg-slate-100">
        <div className="h-10 w-24 rounded-md bg-slate-200" />
      </div>
      <div className="mx-auto mb-2 h-3 w-full rounded bg-slate-200" />
      <div className="mx-auto h-3 w-2/3 rounded bg-slate-100" />
      <div className="mx-auto mt-3 h-5 w-16 rounded-full bg-slate-100" />
    </div>
  );
};

export default UniversityCardSkeleton;
