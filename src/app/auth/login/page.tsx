"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authServices } from "@/services/authServices";
import { MagicCard } from "@/components/magicui/magic-card";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authServices.login(formData);
      if (response.data.access_token) {
        document.cookie = `token=${response.data.access_token}; path=/`;
        toast.success("Login berhasil!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
      <MagicCard
        className="w-full max-w-md p-8 rounded-2xl"
        gradientSize={400}
        gradientFrom="#1a1a1a"
        gradientTo="#2a2a2a"
        gradientColor="#333333"
        gradientOpacity={0.9}
      >
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-muted-foreground">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                className="bg-background/80 backdrop-blur-sm rounded-xl border-border/50"
              />
            </div>
            <div className="space-y-2">
              <PasswordInput
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <RainbowButton
              type="submit"
              className="w-full rounded-xl"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </RainbowButton>
          </form>

          <div className="text-center text-sm">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Daftar di sini
            </Link>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}
