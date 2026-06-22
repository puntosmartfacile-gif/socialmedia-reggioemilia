"use client";

import { create } from "zustand";

export type BookingService = "fotografia" | "consulenza";
export type PhotographySessionType = "standard" | "premium";

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type ConsultationDetails = {
  needs: string;
  interest: string;
};

type BookingState = {
  service: BookingService | null;
  currentStep: number;
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  photographySessionType: PhotographySessionType;
  consultationDetails: ConsultationDetails;
  contactInfo: ContactInfo;
  setService: (service: BookingService) => void;
  setCurrentStep: (step: number) => void;
  nextStep: (maxSteps: number) => void;
  previousStep: () => void;
  setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (slot: string) => void;
  setPhotographySessionType: (sessionType: PhotographySessionType) => void;
  setConsultationDetails: (details: Partial<ConsultationDetails>) => void;
  setContactInfo: (details: Partial<ContactInfo>) => void;
  resetBooking: (service?: BookingService) => void;
};

const initialContactInfo: ContactInfo = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const initialConsultationDetails: ConsultationDetails = {
  needs: "",
  interest: "Strategia Social",
};

export const useBookingStore = create<BookingState>((set) => ({
  service: null,
  currentStep: 1,
  selectedDate: null,
  selectedTimeSlot: null,
  photographySessionType: "standard",
  consultationDetails: initialConsultationDetails,
  contactInfo: initialContactInfo,
  setService: (service) => set({ service }),
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: (maxSteps) =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, maxSteps) })),
  previousStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  setSelectedDate: (date) => set({ selectedDate: date, selectedTimeSlot: null }),
  setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
  setPhotographySessionType: (sessionType) =>
    set({ photographySessionType: sessionType }),
  setConsultationDetails: (details) =>
    set((state) => ({
      consultationDetails: { ...state.consultationDetails, ...details },
    })),
  setContactInfo: (details) =>
    set((state) => ({
      contactInfo: { ...state.contactInfo, ...details },
    })),
  resetBooking: (service) =>
    set({
      service: service ?? null,
      currentStep: 1,
      selectedDate: null,
      selectedTimeSlot: null,
      photographySessionType: "standard",
      consultationDetails: initialConsultationDetails,
      contactInfo: initialContactInfo,
    }),
}));