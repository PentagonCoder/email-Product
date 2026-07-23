import { useEffect, useState } from "react";
import { fetchProfile } from "../../services/authService";
import { useForm } from "react-hook-form";
import { keywordSearch } from "../../services/buyerService";
import { sendEmail } from "../../services/buyerService";

function DashboardUser() {
  const {
    register: registerSearch,
    handleSubmit: handleSearchSubmit,
    reset: resetSearch,
  } = useForm();
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    reset: resetEmail,
  } = useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchProfile();
        setUserProfile(response.data.data);
        console.log("User profile fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleKeywordSearch = async (data) => {
    setLoading(true);
    setError(null);
    setData([]);
    
    try {
      const res = await keywordSearch(data);
      setData(res.data.data);
      console.log("Keyword search successful:", res.data);
      resetSearch();
    } catch (err) {
      setError(err.response?.data?.message || "Keyword search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSend = async (data) => {
    setLoading(true);
    setError(null);
    setEmailData(null);

    const formData = new FormData();

    formData.append("subject", data.subject);
    formData.append("text", data.text);
    if (file) formData.append("presentation", file);

    try {
      const res = await sendEmail(formData);
      console.log(res.data);
      setEmailData(res.data?.message || "Email campaign sent successfully.");
      setFile(null);
      resetEmail();
    } catch (err) {
      setError(err.response?.data?.message || "Email campaign failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-xl sm:px-8">
          <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-blue-500/20 blur-2xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-[0.22em] text-blue-300">BUYER OUTREACH</p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">EXPORT AUTOMATION SYSTEM</h1>
              <p className="mt-3 text-slate-300">
                Find the right buyers and launch campaigns from one workspace.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur">
              <p className="text-slate-300">Logged in as</p>
              <p className="mt-1 font-semibold">{userProfile?.email || "Loading account..."}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Buyers discovered</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{data.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Search status</p>
            <p className="mt-1 text-lg font-semibold text-blue-700">{loading ? "Working..." : "Ready to search"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Campaign status</p>
            <p className="mt-1 text-lg font-semibold text-emerald-700">{emailData ? "Sent successfully" : "Draft a campaign"}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/70">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-slate-900">🔍 Search Buyers</h2>
            <p className="mt-1 text-sm text-slate-500">Use a product or niche to find relevant buyer contacts.</p>
          </div>
          <form onSubmit={handleSearchSubmit(handleKeywordSearch)} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter keyword (e.g. Singing Bowls)"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              {...registerSearch("keyword")}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search buyers"}
            </button>
          </form>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/70">
          <div className="flex flex-col gap-1 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">📋 Buyers Found</h2>
              <p className="mt-1 text-sm text-slate-500">Review contacts before sending your campaign.</p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{data.length} results</span>
          </div>
          <div className="overflow-x-auto p-2">
            <table className="w-full">
              <thead className="bg-slate-800 text-left text-sm text-white">
                <tr>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Website</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="border-b border-slate-100 text-slate-700 transition hover:bg-blue-50/50">
                    <td className="p-4 font-medium text-slate-900">{item.company}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit
                      </a>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-4 py-12 text-center text-slate-500">
                      Search for a keyword to see buyer contacts here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/70">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">📨 Send Email Campaign</h2>
            <p className="mt-1 text-sm text-slate-500">Create a concise, personal message for the buyers you found.</p>
          </div>
          <form onSubmit={handleEmailSubmit(handleEmailSend)} className="space-y-5">
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              {...registerEmail("subject")}
            />
            <textarea
              rows="5"
              placeholder="Write your email..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              {...registerEmail("text")}
            />
            <div>
              <label className="mb-2 block font-medium text-slate-700">Upload Presentation <span className="font-normal text-slate-400">(optional)</span></label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-3 file:py-2 file:font-semibold file:text-emerald-700 hover:file:bg-emerald-200"
              />
            </div>
            {file && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">✓ Selected: {file.name}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "🚀 Send Campaign"}
            </button>
            {emailData && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                ✅ {emailData}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
