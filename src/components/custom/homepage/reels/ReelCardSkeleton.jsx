const ReelCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100">
      <div className="aspect-[256/383] w-full bg-slate-200" />
      <div className="space-y-2 border-t border-slate-100 bg-slate-50/80 px-3 py-2.5">
        <div className="mx-auto h-3 w-2/3 rounded bg-slate-200" />
      </div>
    </div>
  );
};

export default ReelCardSkeleton;
