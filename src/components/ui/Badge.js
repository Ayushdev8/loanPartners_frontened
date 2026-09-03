const loadStyles = {
  LOW: "bg-moss-soft text-moss",
  MEDIUM: "bg-amber-soft text-amber-dark",
  HIGH: "bg-clay-soft text-clay",
};

const loadLabels = {
  LOW: "Low load",
  MEDIUM: "Medium load",
  HIGH: "High load",
};

export function LoadBadge({ level }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium ${loadStyles[level]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {loadLabels[level]}
    </span>
  );
}

export function StatusBadge({ verified }) {
  return verified ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-moss-soft px-2.5 py-1 text-[12.5px] font-medium text-moss">
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-line px-2.5 py-1 text-[12.5px] font-medium text-slate">
      Pending review
    </span>
  );
}