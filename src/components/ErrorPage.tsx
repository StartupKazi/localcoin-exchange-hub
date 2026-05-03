import { Link } from "react-router-dom";
import { AlertTriangle, Ban, Clock, Lock, SearchX, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export type ErrorCode = 401 | 403 | 404 | 419 | 429;

const META: Record<ErrorCode, { title: string; description: string; Icon: React.ComponentType<{ className?: string }> }> = {
  401: {
    title: "Unauthorized",
    description: "You need to sign in to access this page. Please log in and try again.",
    Icon: Lock,
  },
  403: {
    title: "Forbidden",
    description: "You don't have permission to view this resource.",
    Icon: Ban,
  },
  404: {
    title: "Page Not Found",
    description: "The page you are looking for doesn't exist or has been moved.",
    Icon: SearchX,
  },
  419: {
    title: "Page Expired",
    description: "Your session has expired. Please refresh the page and try again.",
    Icon: Clock,
  },
  429: {
    title: "Too Many Requests",
    description: "You've made too many requests in a short time. Please slow down and try again later.",
    Icon: Zap,
  },
};

interface ErrorPageProps {
  code: ErrorCode;
  title?: string;
  description?: string;
}

const ErrorPage = ({ code, title, description }: ErrorPageProps) => {
  const meta = META[code] ?? { title: "Error", description: "Something went wrong.", Icon: AlertTriangle };
  const Icon = meta.Icon;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7FA]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16 pb-20 sm:pb-16">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#021B38]/5">
            <Icon className="h-10 w-10 text-[#021B38]" />
          </div>
          <p className="text-sm font-semibold tracking-widest text-[#021B38]/60 uppercase mb-2">
            Error {code}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#021B38] mb-3">
            {title ?? meta.title}
          </h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {description ?? meta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-[#021B38] px-6 py-3 text-sm font-semibold text-white hover:bg-[#021B38]/90 transition-colors"
            >
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;