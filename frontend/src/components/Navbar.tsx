"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  Activity, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Layers, 
  Smartphone, 
  HelpCircle, 
  LogIn, 
  Building2, 
  Stethoscope, 
  ClipboardList, 
  User, 
  Crown, 
  ArrowRight,
  Info,
  LogOut,
  Sparkles
} from 'lucide-react';

const PORTAL_ITEMS = [
  {
    name: 'Super Admin',
    tier: 'Level 1',
    description: 'Global Hospital Provisioning & Licensing',
    href: '/super-admin',
    icon: Crown,
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    name: 'Hospital Admin',
    tier: 'Level 2',
    description: 'Facility Operations & Staff Verification',
    href: '/management',
    icon: Building2,
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: 'Doctor Cockpit',
    tier: 'Level 3A',
    description: 'OPD Queue, SOAP Notes & Digital Rx',
    href: '/doctor',
    icon: Stethoscope,
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Reception & Triage',
    tier: 'Level 3B',
    description: 'Walk-in Tokens, Registration & Billing',
    href: '/reception',
    icon: ClipboardList,
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Patient Portal',
    tier: 'Level 4',
    description: 'Lifelong Records & AI Lab Explainer',
    href: '/patient',
    icon: User,
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-800',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
];

const NAV_LINKS = [
  { name: 'About', href: '/#about', icon: Info },
  { name: 'Hierarchy', href: '/#hierarchy', icon: Layers },
  { name: 'Portals', href: '/#portals', icon: Building2, isDropdown: true },
  { name: 'Mobile App', href: '/#app', icon: Smartphone },
  { name: 'Security', href: '/#security', icon: ShieldCheck },
  { name: 'FAQ', href: '/#faq', icon: HelpCircle },
];

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useStore();
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPortalsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPortalsDropdownOpen(false);
  }, [pathname]);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const getPortalPathForRole = (role?: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return '/super-admin';
      case 'MANAGEMENT': return '/management';
      case 'DOCTOR': return '/doctor';
      case 'RECEPTIONIST': return '/reception';
      case 'PATIENT': return '/patient';
      default: return '/login';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">MediSync</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">360</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                      onMouseEnter={() => setPortalsDropdownOpen(true)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        portalsDropdownOpen 
                          ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50' 
                          : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100/80 dark:hover:bg-slate-900/80'
                      }`}
                    >
                      <link.icon className="w-3.5 h-3.5" />
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${portalsDropdownOpen ? 'rotate-180 text-brand-600' : ''}`} />
                    </button>

                    {/* Workspaces Mega Dropdown */}
                    {portalsDropdownOpen && (
                      <div 
                        onMouseLeave={() => setPortalsDropdownOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">5 Direct Workspaces</span>
                          <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold flex items-center space-x-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Zero-Trust RBAC</span>
                          </span>
                        </div>

                        <div className="mt-2 space-y-1">
                          {PORTAL_ITEMS.map((portal) => (
                            <Link
                              key={portal.name}
                              href={portal.href}
                              onClick={() => setPortalsDropdownOpen(false)}
                              className="group flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                            >
                              <div className={`mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors ${portal.iconColor}`}>
                                <portal.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                    {portal.name}
                                  </span>
                                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${portal.badgeColor}`}>
                                    {portal.tier}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                  {portal.description}
                                </p>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all self-center" />
                            </Link>
                          ))}
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <Link
                            href="/#portals"
                            onClick={() => setPortalsDropdownOpen(false)}
                            className="block text-center text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline py-1"
                          >
                            Explore Full Clinical Architecture &rarr;
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100/80 dark:hover:bg-slate-900/80 transition-colors"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Authenticated User Status or Sign In Button */}
            {isAuthenticated && currentUser ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href={getPortalPathForRole(currentUser.role)}
                  className="flex items-center space-x-2 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold uppercase">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center space-x-1.5 py-2 px-4 rounded-xl btn-3d-primary text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle light and dark mode"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs flex items-center justify-center cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {mounted && isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 transition-transform -rotate-12" />
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-800 dark:text-slate-100" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800 dark:text-slate-100" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl">
          
          {/* Main Section Links */}
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 p-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <link.icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* 5 Clinical Portals List */}
          <div>
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Clinical Portals (5 Workspaces)</span>
              <span className="text-brand-600 dark:text-brand-400">ABDM / HIPAA</span>
            </div>
            <div className="mt-1 space-y-1">
              {PORTAL_ITEMS.map((portal) => (
                <Link
                  key={portal.name}
                  href={portal.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <portal.icon className={`w-4 h-4 ${portal.iconColor}`} />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">{portal.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{portal.tier}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 -rotate-90 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{currentUser.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-600 font-semibold px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl btn-3d-primary text-white font-bold text-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Workspace</span>
                </Link>
                <Link
                  href="/login?mode=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl btn-3d-white border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xs"
                >
                  <User className="w-4 h-4" />
                  <span>Register as New Patient</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
