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
  PENDING: "bg-amber-soft text-amber-dark",
  ACCEPTED: "bg-moss-soft text-moss",
  REJECTED: "bg-clay-soft text-clay",
};

const applicationStatusLabels = {
  PENDING: "Pending review",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export function ApplicationStatusBadge({ status }) {
  return (
    <span className={`badge-pill ${applicationStatusStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {applicationStatusLabels[status]}
    </span>
  );
}