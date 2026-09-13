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
    <span className={`badge-pill ${loadStyles[level]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {loadLabels[level]}
    </span>
  );
}

export function StatusBadge({ verified }) {
  return verified ? (
    <span className="badge-pill bg-moss-soft text-moss">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      Verified
    </span>
  ) : (
    <span className="badge-pill bg-paper-line text-slate">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      Pending review
    </span>
  );
}

const applicationStatusStyles = {
  APPLIED:"bg-amber-soft text-amber-dark",
  PENDING: "bg-amber-soft text-amber-dark",
  ACCEPTED: "bg-moss-soft text-moss",
  REJECTED: "bg-clay-soft text-clay",
  APPROVED: "bg-moss-soft text-moss",
};

const applicationStatusLabels = {
  APPLIED:"Pending",
  PENDING: "Pending review",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  APPROVED:"Approved"
};

export function ApplicationStatusBadge({ status }) {
  return (
    <span className={`badge-pill ${applicationStatusStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {applicationStatusLabels[status]}
    </span>
  );
}

export function ApplicationsSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-28 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="divide-y divide-gray-200">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

              <div className="flex-1">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-3 w-28 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}