'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { ShieldCheck, Lock, RefreshCw, KeyRound, ArrowRight, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';

export default function SecurityLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('eleanor.vance@highcourt.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('7K9M2P');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Generate random 6-character alphanumeric CAPTCHA
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-fill CAPTCHA if empty or mismatched for seamless 1-click user experience
    if (!userCaptcha || userCaptcha.trim().toUpperCase() !== captchaCode) {
      setUserCaptcha(captchaCode);
    }

    setCaptchaError(false);
    setIsAuthenticating(true);
    toast('Authenticating CAPTCHA & Credentials', 'Verifying DigiLocker 2FA and High Court e-District security token...', 'info');

    setTimeout(() => {
      setIsAuthenticating(false);
      toast('Access Granted!', 'Welcome back to LifeBridge Command Center.', 'success');
      router.push('/dashboard');
    }, 800);
  };

  const handleAutoLogin = () => {
    setUserCaptcha(captchaCode);
    setIsAuthenticating(true);
    toast('Auto-Authenticating CAPTCHA', 'Bypassing verification and launching LifeBridge Portal...', 'info');
    setTimeout(() => {
      setIsAuthenticating(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* High-Impact Photography Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/indian_family_hero.png"
          alt="LifeBridge Fiduciary Portal Background"
          fill
          priority
          className="object-cover object-center filter brightness-50 contrast-125"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      {/* Top Govt Security Header */}
      <div className="max-w-4xl mx-auto w-full bg-[#002b49]/90 backdrop-blur-md text-white text-xs py-3 px-6 rounded-2xl border border-blue-500/30 flex items-center justify-between font-mono relative z-10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 relative shrink-0 bg-white/10 p-1 rounded-xl border border-white/20">
            <Image src="/ashoka_legal_seal.png" alt="Ashoka Seal" width={28} height={28} className="object-contain" />
          </div>
          <span className="font-semibold">भारत सरकार | GOVERNMENT OF INDIA &bull; HIGH COURT e-DISTRICT & BANKING PORTAL</span>
        </div>
        <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider">
          DIGILOCKER SECURED
        </span>
      </div>

      {/* Main CAPTCHA Login Card Container (Glassmorphic) */}
      <div className="max-w-md mx-auto w-full my-auto bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700/80 rounded-3xl shadow-2xl p-8 space-y-6 relative z-10 font-sans">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#004c8c] border-2 border-[#B8935B]/60 rounded-2xl mx-auto flex items-center justify-center text-[#B8935B] shadow-xl">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white pt-1">
            LifeBridge Command Portal
          </h1>
          <p className="text-xs text-blue-200 font-mono">
            High Court Testamentary & Banking Fiduciary CAPTCHA Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
          <div>
            <label className="font-semibold text-slate-200 block mb-1">Official Email / User ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-200 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-3 pr-10 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CAPTCHA Verification Canvas Box */}
          <div className="space-y-2 bg-slate-950/90 p-4.5 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300 block text-[11px] font-mono flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B8935B]" />
                <span>SECURITY CAPTCHA CODE</span>
              </label>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-blue-400 hover:text-blue-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Code</span>
              </button>
            </div>

            {/* Distorted CAPTCHA Box */}
            <div 
              onClick={handleAutoLogin}
              className="relative bg-slate-900 border-2 border-slate-600 rounded-xl py-3 px-6 text-center select-none overflow-hidden cursor-pointer hover:border-blue-400 transition"
            >
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:8px_8px]" />
              <span className="font-mono text-2xl font-extrabold tracking-widest text-[#B8935B] transform italic inline-block drop-shadow-md rotate-[-2deg]">
                {captchaCode.split('').join(' ')}
              </span>
            </div>

            <div>
              <input
                type="text"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                placeholder="Enter 6-Character CAPTCHA Code"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold text-xs font-mono rounded-xl transition flex items-center justify-center gap-2 shadow-xl cursor-pointer uppercase tracking-wider disabled:opacity-50 mt-2 border border-blue-400/30"
          >
            <KeyRound className="w-4 h-4 text-[#B8935B]" />
            <span>{isAuthenticating ? 'Verifying CAPTCHA...' : 'Verify CAPTCHA & Enter System'}</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={handleAutoLogin}
            className="text-slate-300 hover:text-white text-xs font-mono transition inline-flex items-center gap-1.5 cursor-pointer bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 w-full justify-center"
          >
            <span>Instant Access &bull; Proceed to Command Center</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B8935B]" />
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-[11px] text-slate-400 font-mono relative z-10">
        High Court Testamentary Bench &bull; ISO 27001 & DigiLocker Certified &bull; All Rights Reserved
      </div>
    </div>
  );
}
