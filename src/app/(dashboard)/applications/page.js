"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { ApplicationsSkeleton, ApplicationStatusBadge, getInitials } from "@/components/ui/Badge";
import { api } from "@/service/api";

const filters = ["ALL", "APPLIED", "ACCEPTED", "REJECTED"];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("ALL");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary partner ID
  // Later you can get this from logged-in partner data
  const partnerId = 1;

  const getApplications = async (id) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/public/get-applications/${id}`);

      console.log("Applications:", res.data);

      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications(partnerId);
  }, [partnerId]);

  const filtered = useMemo(() => {
    if (filter === "ALL") {
      return applications;
    }

    return applications.filter(
      (application) => application.status === filter
    );
  }, [applications, filter]);

  const counts = {
    ALL: applications.length,

    APPLIED: applications.filter(
      (application) => application.status === "APPLIED"
    ).length,

    ACCEPTED: applications.filter(
      (application) => application.status === "ACCEPTED"
    ).length,

    REJECTED: applications.filter(
      (application) => application.status === "REJECTED"
    ).length,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown";
    }

    const now = new Date();
    const difference = now.getTime() - date.getTime();

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
        </div>

        <ApplicationsSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Applications
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Manage and track all your applications.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {filters.map((status) => (
          <SummaryCard
            key={status}
            label={status}
            value={counts[status]}
            active={filter === status}
            onClick={() => setFilter(status)}
          />
        ))}
      </div>

      {/* Applications */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <span className="text-xl">📄</span>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No applications found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            There are no applications matching the selected filter.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Application List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filtered.length} application
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
              {filtered.map((application) => (
                <div
                  key={`${application.applicantId}-${application.schemeId}`}
                  className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-[minmax(280px,2fr)_minmax(140px,1fr)_minmax(120px,1fr)_auto] lg:items-center"
                >
                  {/* Applicant */}
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                      {getInitials(application.applicantName)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {application.applicantName || "Unknown Applicant"}
                      </h3>
                      <p
                        className="mt-1 break-words text-sm text-gray-500"
                        title={application.schemeId}
                      >
                        Scheme: {application.schemeId}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Status
                    </p>

                    <ApplicationStatusBadge status={application.status} />
                  </div>

                  {/* Applied */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Applied
                    </p>

                    <p
                      className="text-sm font-medium text-gray-900"
                      title={formatDate(application.createdAt)}
                    >
                      {formatRelativeDate(application.createdAt)}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="lg:justify-self-end">
                    <Link
                      href={`/applications/${application.applicantId}`}
                      className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? "border-gray-900 bg-gray-900 text-white shadow-md"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
      }`}
    >
      <p
        className={`text-sm font-medium ${
          active ? "text-gray-300" : "text-gray-500"
        }`}
      >
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </button>
  );
}