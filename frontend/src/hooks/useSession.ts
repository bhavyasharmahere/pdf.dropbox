import { useState, useEffect, useCallback } from "react";

const SESSION_KEY = "portal_session";
const SESSION_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

interface SessionData {
  isAuthenticated: boolean;
  expiresAt: number;
}

export function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const session: SessionData = JSON.parse(stored);
        if (session.isAuthenticated && Date.now() < session.expiresAt) {
          return true;
        }
        localStorage.removeItem(SESSION_KEY);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    return false;
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        try {
          const session: SessionData = JSON.parse(stored);
          const remaining = session.expiresAt - Date.now();
          if (remaining <= 0) {
            logout();
          } else {
            setTimeRemaining(remaining);
          }
        } catch {
          logout();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const login = useCallback(() => {
    const session: SessionData = {
      isAuthenticated: true,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    setTimeRemaining(SESSION_DURATION_MS);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setTimeRemaining(0);
  }, []);

  const formatTimeRemaining = useCallback(() => {
    if (timeRemaining <= 0) return "00:00:00";
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeRemaining]);

  return { isAuthenticated, login, logout, timeRemaining, formatTimeRemaining };
}
