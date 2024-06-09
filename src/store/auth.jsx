import { create } from "zustand";

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const hasActiveRide = localStorage.getItem("hasActiveRide");
  const activeRideId = localStorage.getItem("activeRideId");

  return {
    isAuthenticated: !!token,
    user: user || null,
    token: token || null,
    hasActiveRide: hasActiveRide || false,
    activeRideId: activeRideId || null,
  };
};

const useAuthStore = create((set) => ({
  ...getInitialState(),
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  setHasActiveRide: (activeRide) => {
    set({ hasActiveRide: activeRide });
    localStorage.setItem("hasActiveRide", activeRide);
  },
  setActiveRideId: (activeRideId) => {
    set({ activeRideId: activeRideId });
    localStorage.setItem("activeRideId", activeRideId);
  },
}));

export default useAuthStore;
