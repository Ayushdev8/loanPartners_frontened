// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { applications } from "@/lib/dummy-applications";
// import { ApplicationStatusBadge } from "@/components/ui/Badge";
// import { toast } from "react-toastify";
// import { api } from "@/service/api";

// export default function ApplicationDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [updatingApplicantId, setUpdatingApplicantId] = useState(null);
//   const found = applications.find((a) => a.id === id) || applications[0];

//   const [status, setStatus] = useState(found.status);

//   function handleAccept() {
//     setStatus("ACCEPTED");
//     toast.success("Application accepted");
//   }

//   function handleReject() {
//     setStatus("REJECTED");
//     toast.error("Application rejected");
//   }

//   const updateApplicationStatus = async (applicantId, partnerId, status) => {
//   try {
//     setUpdatingApplicantId(applicantId);

//     const res = await api.put(`/public/applications/${applicantId}/${partnerId}/status`,
//       {
//         status: status,
//       }
//     );
//     toast.success("Application accepted");

//   } catch (error) {
//     console.error("Failed to update application status:", error);

//     alert(
//       error?.response?.data?.message ||
//         "Failed to update application status"
//     );
//   } finally {
//     setUpdatingApplicantId(null);
//   }
// };
//   const initials = found.applicantName.split(" ").map((w) => w[0]).slice(0, 2).join("");

//   return (
//     <div className="max-w-2xl space-y-5">
//       <button onClick={() => router.back()} className="btn-ghost -ml-3">
//         ← Back to applications
//       </button>

//       {/* Applicant header */}
//       <div className="card p-6">
//         <div className="flex items-start justify-between gap-4 flex-wrap">
//           <div className="flex items-center gap-4">
//             <div className="avatar h-14 w-14 text-[16px]">{initials}</div>
//             <div>
//               <h2 className="font-display text-[20px] text-ink leading-tight">{found.applicantName}</h2>
//               <p className="text-[13px] text-slate mt-1">
//                 Applied to <span className="text-ink font-medium">{found.schemeTitle}</span>
//               </p>
//               <p className="text-[12.5px] text-slate-dim mt-0.5">{found.schemeId} · Submitted {found.submittedOn}</p>
//             </div>
//           </div>
//           <ApplicationStatusBadge status={status} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-paper-line">
//           <div>
//             <p className="field-label">Email</p>
//             <p className="text-[14px] text-ink">{found.email}</p>
//           </div>
//           <div>
//             <p className="field-label">Phone</p>
//             <p className="text-[14px] text-ink">{found.phone}</p>
//           </div>
//           <div className="sm:col-span-2">
//             <p className="field-label">Address</p>
//             <p className="text-[14px] text-ink">{found.address}</p>
//           </div>
//         </div>

//         {found.note && (
//           <div className="mt-5 rounded-xl bg-amber-soft/60 border border-amber/20 px-4 py-3">
//             <p className="text-[13px] text-amber-dark">{found.note}</p>
//           </div>
//         )}
//       </div>

//       {/* Documents */}
//       <div className="card p-6">
//         <h3 className="section-title !text-[16px]">Submitted documents</h3>
//         <div className="mt-4 space-y-2">
//           {found.documents.map((doc) => (
//             <div
//               key={doc.name}
//               className="flex items-center justify-between rounded-xl border border-paper-line px-4 py-3"
//             >
//               <div className="flex items-center gap-3 min-w-0">
//                 <div className="h-8 w-8 rounded-lg bg-indigo-soft flex items-center justify-center text-indigo shrink-0">
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
//                     <path
//                       d="M7 3.5h7l5 5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
//                       stroke="currentColor"
//                       strokeWidth="1.6"
//                       strokeLinejoin="round"
//                     />
//                     <path d="M14 3.5V9h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//                 <p className="text-[13.5px] text-ink truncate">{doc.name}</p>
//               </div>
//               <span className="text-[12px] text-slate-dim shrink-0">{doc.size}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Decision actions */}
//       <div className="card p-6 flex items-center gap-3 flex-wrap">
//         <button
//           onClick={handleAccept}
//           disabled={status === "ACCEPTED"}
//           className="btn-primary"
//         >
//           {status === "ACCEPTED" ? "Accepted" : "Accept application"}
//         </button>
//         <button
//           onClick={handleReject}
//           disabled={status === "REJECTED"}
//           className="btn-secondary !border-clay/40 !text-clay hover:!bg-clay-soft disabled:opacity-50"
//         >
//           {status === "REJECTED" ? "Rejected" : "Reject application"}
//         </button>
//         {status !== found.status && (
//           <span className="text-[13px] text-slate-dim ml-auto">
//             Decision updated locally — wire this up to your API when ready.
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }