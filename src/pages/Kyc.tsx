import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Upload, ArrowLeft, Check, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Kyc() {
  const navigate = useNavigate();
  const { profile, submitKyc } = useAuth();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState(profile?.country || "");
  const [dob, setDob] = useState(profile?.dob || "");
  const [idType, setIdType] = useState(profile?.idType || "passport");
  const [idNumber, setIdNumber] = useState(profile?.idNumber || "");
  const [address, setAddress] = useState(profile?.address || "");

  if (!profile) {
    navigate("/login");
    return null;
  }

  const status = profile.kycStatus;

  const handleSubmit = () => {
    if (!country || !dob || !idNumber || !address) {
      toast.error("Please fill in all required fields");
      return;
    }
    submitKyc({ country, dob, idType, idNumber, address });
    toast.success("KYC submitted! Verification typically takes a few minutes.");
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Identity Verification</h1>
                <p className="text-sm text-muted-foreground">Complete KYC to unlock trading on LocalCoin.</p>
              </div>
            </div>

            {/* Status banners */}
            {status === "verified" && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 flex items-center gap-3 mb-6">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold text-green-900">You're verified!</div>
                  <div className="text-sm text-green-800">Your account is active. Happy trading.</div>
                </div>
              </div>
            )}
            {status === "pending" && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-center gap-3 mb-6">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="font-semibold text-amber-900">Under review</div>
                  <div className="text-sm text-amber-800">We'll notify you when verification is complete.</div>
                </div>
              </div>
            )}

            {status !== "verified" && status !== "pending" && (
              <>
                {/* Stepper */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-full grid place-items-center text-sm font-semibold ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>
                      {s < 3 && <div className={`flex-1 h-1 rounded ${step > s ? "bg-primary" : "bg-muted"}`} />}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-semibold">Personal information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Country of residence *</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                          <SelectContent>
                            {["Nigeria", "Ghana", "Kenya", "South Africa", "United States", "United Kingdom", "Other"].map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="dob">Date of birth *</Label>
                        <Input id="dob" type="date" value={dob} onChange={e => setDob(e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="addr">Residential address *</Label>
                      <Textarea id="addr" rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, city, postal code" />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => country && dob && address ? setStep(2) : toast.error("Fill all fields")}>Continue</Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-semibold">Identity document</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Document type *</Label>
                        <Select value={idType} onValueChange={setIdType}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="national_id">National ID</SelectItem>
                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="idn">Document number *</Label>
                        <Input id="idn" value={idNumber} onChange={e => setIdNumber(e.target.value)} placeholder="A12345678" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      {["Front of ID", "Back of ID"].map(label => (
                        <label key={label} className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-muted/30 transition">
                          <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</div>
                          <input type="file" accept="image/*" className="hidden" />
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button onClick={() => idNumber ? setStep(3) : toast.error("Enter document number")}>Continue</Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="font-semibold">Selfie verification</h2>
                    <p className="text-sm text-muted-foreground">Take a clear selfie holding your document. This helps us confirm your identity.</p>
                    <label className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary hover:bg-muted/30 transition block">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <div className="text-sm font-medium">Upload selfie</div>
                      <div className="text-xs text-muted-foreground mt-1">Face clearly visible, no filters</div>
                      <input type="file" accept="image/*" capture="user" className="hidden" />
                    </label>
                    <div className="rounded-lg bg-muted/50 border border-border p-3 text-xs text-muted-foreground">
                      By submitting, you confirm that all info provided is accurate and consent to identity verification.
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                      <Button onClick={handleSubmit}>Submit for verification</Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center py-6">
                    <div className="h-16 w-16 rounded-full bg-amber-100 grid place-items-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Submitted!</h2>
                    <p className="text-muted-foreground mb-6">We're reviewing your documents. This usually takes a few minutes.</p>
                    <Button onClick={() => navigate("/profile")}>Back to profile</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
