"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login, setProfile } from "@/redux/features/auth";


export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");
      const returnTo = searchParams.get("returnTo");

      if (error) {
        toast.error("Google sign-in was cancelled");
        router.push(redirectUrl|| returnTo || "/");
        return;
      }

      if (!code) {
        toast.error("No authorization code received");
        router.push(redirectUrl|| returnTo || "/");
        return;
      }

      try {
        // Send code to backend
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "api/website/user/google-callback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        const data = await res.json();

        if (data._status) {
          // Save token in cookie
          Cookies.set("user", data._data.token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });

  
          toast.success(data._message || "Login successful!");
          dispatch(login(data._data.token));
          dispatch(setProfile(data._data.user));
          router.push(redirectUrl|| "/profile");
        } else {
          toast.error(data._message || "Login failed");
          router.push(redirectUrl|| returnTo || "/");
        }
      } catch (error) {
        console.error("Callback error:", error);
        toast.error("Authentication failed");
        router.push(redirectUrl|| returnTo || "/");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}