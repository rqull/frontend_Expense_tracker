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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authServices.register(formData);
      if (response.status === "success") {
        toast.success("Registrasi berhasil! Silakan login.");
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Registrasi gagal. Silakan coba lagi.");
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
            <h1 className="text-3xl font-bold tracking-tight">Buat Akun</h1>
            <p className="text-muted-foreground">
              Daftar untuk mulai mengelola keuangan Anda
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
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
              {loading ? "Memproses..." : "Daftar"}
            </RainbowButton>
          </form>

          <div className="text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}
