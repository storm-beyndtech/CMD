import { ChangeEvent } from "react";

export type SecData = {
  title: string;
  desc: string;
  imgUrl: string;
  url: string;
  btnLabel: string;
  id?: string;
};

export type Features = {
  icon: string;
  title: string;
  desc: string;
};

export interface InputFieldProps {
  label?: string;
  value?: string | number;
  onChange: (value: ChangeEvent) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  id: string;
  checked?: boolean;
  fieldOptions?: { name: string; value?: string }[];
  page?: string;
}

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface Package {
  name: string;
  price: number;
  description: string;
  users: string;
  orientation: string;
  basicInvestigation: string;
  monthlyCareCredit: string;
  electiveMedicalPractices: string;
  accessToMedicalCare: string;
}

export interface TestResult {
  bloodGroup: string;
  genotype: string;
  height: string;
  weight: string;
  allergy: string;
}

// type Doctor = {
//   id: string;
//   img: string; // Assuming the image is a URL or a string reference to an image
//   name: string;
//   position: string;
//   hospitals: string;
//   availableDates: string[]; // Array of dates in string format
// };

export type Drug = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  strength: string; 
};


// Type for Prescription Item
export interface Prescription {
  dosage: string;
  refill: string;
  refillDate?: string | null;
  drug: Drug
}

// Type for a single consultation
export interface Consultation {
  id: string;
  date: string;
  type: string;
  status: string;
  partner: string;
  notes: string;
  documents: string[];
  lastVisit: string;
  remarks: string;
  tests: TestResult;
  uploads: string[]; // Array for file uploads
  prescriptions: Prescription[];
}

// Type for Doctor's Notes
export interface DoctorsNotesProps {
  notes: string;
  documents: string[]; // Array of document image URLs
  isDoctor?: boolean;
}

// Type for Lab Results
export interface LabResultsProps {
  lastVisit: string;
  remarks: string;
  tests: TestResult;
  uploads: string[];
}

// Type for Prescriptions
export interface PrescriptionsProps {
  prescriptions: Prescription[];
}

// Type for the complete consultation data
export interface ConsultationResultsProps {
  consultation: {
    notes: string;
    documents: string[];
    lastVisit: string;
    remarks: string;
    tests: TestResult;
    prescriptions: Prescription[];
  };
}

// Type for Mini Consultation component (without dynamic content)
export interface ConsultationResultsMiniProps {
  appointmentDate: string;
  symptoms: string;
  previewImages: string[];
}

export interface Transaction {
  id: string;
  desc: string; // The merchant or payment provider
  date: string;
  amount: string; // E.g., "$50.00"
  status: string
}
