const ExpertCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-red-100/50 bg-linear-to-b from-[#fff6f6] via-white to-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      <div className="h-1 bg-slate-200" />
      <div className="p-3.5 pb-0">
        <div className="h-[252px] rounded-2xl bg-slate-200/80" />
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="mx-auto h-5 w-2/3 rounded-lg bg-slate-200" />
        <div className="mx-auto h-3 w-1/3 rounded bg-slate-100" />
        <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-slate-100">
          <div className="h-[88px] bg-slate-50" />
          <div className="h-[88px] bg-slate-50" />
        </div>
        <div className="h-12 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
};

export default ExpertCardSkeleton;
