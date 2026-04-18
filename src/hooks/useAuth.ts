import { useEffect, useState, useCallback } from "react";

export type KycStatus = "none" | "pending" | "verified" | "rejected";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  kycStatus: KycStatus;
  kycSubmittedAt?: string;
  country?: string;
  dob?: string;
  idType?: string;
  idNumber?: string;
  address?: string;
  createdAt: string;
}

const STORAGE_KEY = "lc_user_profile";

const readProfile = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
};

const writeProfile = (p: UserProfile | null) => {
  if (p) localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("lc-profile-changed"));
};

export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(() => readProfile());

  useEffect(() => {
    const handler = () => setProfile(readProfile());
    window.addEventListener("lc-profile-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("lc-profile-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const signUp = useCallback((data: Omit<UserProfile, "kycStatus" | "createdAt">) => {
    const p: UserProfile = { ...data, kycStatus: "none", createdAt: new Date().toISOString() };
    writeProfile(p);
  }, []);

  const signIn = useCallback((email: string) => {
    const existing = readProfile();
    if (existing && existing.email === email) return existing;
    // Mock: create a minimal profile if none exists
    const p: UserProfile = {
      firstName: "Trader",
      lastName: "",
      email,
      kycStatus: "none",
      createdAt: new Date().toISOString(),
    };
    writeProfile(p);
    return p;
  }, []);

  const signOut = useCallback(() => writeProfile(null), []);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    const cur = readProfile();
    if (!cur) return;
    writeProfile({ ...cur, ...patch });
  }, []);

  const submitKyc = useCallback((data: Pick<UserProfile, "country" | "dob" | "idType" | "idNumber" | "address">) => {
    const cur = readProfile();
    if (!cur) return;
    writeProfile({ ...cur, ...data, kycStatus: "pending", kycSubmittedAt: new Date().toISOString() });
    // Mock auto-approve after 4s for demo
    setTimeout(() => {
      const c = readProfile();
      if (c && c.kycStatus === "pending") writeProfile({ ...c, kycStatus: "verified" });
    }, 4000);
  }, []);

  const isAuthenticated = !!profile;
  const isKycVerified = profile?.kycStatus === "verified";
  const canTrade = isAuthenticated && isKycVerified;

  return { profile, isAuthenticated, isKycVerified, canTrade, signUp, signIn, signOut, updateProfile, submitKyc };
}
