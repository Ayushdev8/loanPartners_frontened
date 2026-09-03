"use client"
import Link from "next/link";
import { LoadBadge } from "@/components/ui/Badge";
import { api } from "@/service/api";
import { useEffect, useState } from "react";
const partnerId =1;
export default function SchemesPage() {
  const[mySchemes,setMySchemes] = useState([])
  
  const getAllPartnerSchemes = async ()=>{
    try{
      const res = await api.get(`/public/get/partnerSchemes/${partnerId}`)
      console.log(res.data);
      setMySchemes(res.data);
    }catch(err){
      console.log(err.response?.data)
    }
  }
  useEffect(()=>{
    getAllPartnerSchemes();

  },[])
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[14px] text-slate">
          {mySchemes.length} scheme{mySchemes.length !== 1 ? "s" : ""} under your organisation
        </p>
        <Link href="/schemes/new" className="btn-primary">
          Add scheme
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_140px_140px_120px] gap-4 px-5 py-3 text-[12.5px] text-slate border-b border-paper-line bg-paper/60">
          <span>Scheme ID</span>
          <span>Load</span>
          <span>Turnaround</span>
          <span>Updated by</span>
        </div>
        {mySchemes && mySchemes.map((s, i) => (
          <Link
            key={s.PartnerSchemeId}
            href={`/schemes/${s.PartnerSchemeId}`}
            className={`grid grid-cols-2 sm:grid-cols-[1fr_140px_140px_120px] gap-y-2 gap-x-4 px-5 py-4 hover:bg-paper transition-colors ${
              i !== 0 ? "border-t border-paper-line" : ""
            }`}
          >
            <span className="text-[14.5px] text-ink font-medium col-span-2 sm:col-span-1">{s.schemeId}</span>
            <span>
              <LoadBadge level={s.loadLevel} />
            </span>
            <span className="text-[13.5px] text-slate self-center">
              <span className="md:hidden font-medium text-[11px] text-slate/70 mr-1">
                avgTurnaroundDays=
              </span>
              <span className="font-semibold text-ink">
                {s.avgTurnaroundDays}
              </span>
              <span className="text-slate ml-1">
                days
              </span>
            </span>
            <span className="text-[13.5px] text-slate self-center">{s.updatedBy}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}