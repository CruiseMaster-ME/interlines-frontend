import type { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import { Card, Pill } from "@/components/PremiumUI";

export const metadata: Metadata = {
  title: "Pending Approval - Interline Cruises Middle East",
  description: "Your registration is pending verification.",
};

export default function PendingApprovalPage() {
  return (
    <div className="bg-[var(--interlines-bg)] min-h-[calc(100vh-80px)] flex flex-col justify-center relative isolate overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--interlines-azure)]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full max-w-xl mx-auto px-5 py-20 flex flex-col items-center">
        
        <Card className="p-8 sm:p-14 border border-[var(--interlines-azure)]/10 shadow-[0_20px_50px_rgba(48,117,128,0.06)] backdrop-blur-md bg-white/80 text-center flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-[var(--interlines-azure)]/10 flex items-center justify-center text-[var(--interlines-slate)] mb-8">
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10" stroke="currentColor" strokeWidth="1.5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="font-display text-[2.25rem] leading-tight tracking-[-0.02em] text-[var(--interlines-slate)]">
            Awaiting <span className="italic text-[var(--interlines-gold)]">Verification</span>
          </h1>
          
          <p className="mt-6 text-[15px] leading-relaxed text-[var(--interlines-slate-soft)] max-w-sm mx-auto">
            Your registration has been received and is currently under review by our verification team. 
          </p>
          
          <div className="mt-6 p-4 rounded-xl bg-[var(--interlines-azure)]/5 border border-[var(--interlines-azure)]/10 text-sm text-[var(--interlines-slate)]">
            You will receive an email and be granted platform access once your industry eligibility is successfully verified.
          </div>

          <div className="mt-10 flex flex-col gap-4 w-full">
            <Pill href="/faq" variant="glass">
              View Frequent Questions
            </Pill>
            <Link
              href="/"
              className="mt-4 text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--interlines-slate-soft)] hover:text-[var(--interlines-slate)] transition-colors underline underline-offset-4"
            >
              Return Home
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
