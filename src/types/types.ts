import { ChangeEvent } from "react";


export interface NavItems {
  to: string;
  label: string;
  icons: { default: string; active: string };
}


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
  onChange?: (value: ChangeEvent) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  id?: string;
  checked?: boolean;
  fieldOptions?: { name: string; value?: string }[];
  page?: string;
  disabled?: boolean
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

export interface NoteOrResultDocFiles{
  title: string;
  url: string;
  publicId: string;
  _id: string
}


// Type for a single consultation
export interface Consultation {
  _id: string;
  type: string;
  status: string;
  notes: string;
  documents: NoteOrResultDocFiles[];
  lastVisit: string;
  remarks: string;
  tests: TestResult;
  uploads: NoteOrResultDocFiles[]; // Array for file uploads
  prescriptions: Prescription[];
  patientDetails?: any;
  dateTime?: any;
  testType: string;
  doctor?: any;
  doctorNotes?: string;
  results?: any;
}

// Type for Doctor's Notes
export interface DoctorsNotesProps {
  doctorNotes: string;
  documents: NoteOrResultDocFiles[]; // Array of document image URLs
  isDoctor?: boolean;
}

// Type for Lab Results
export interface LabResultsProps {
  lastVisit: string;
  remarks: string;
  tests: TestResult;
  uploads: NoteOrResultDocFiles[];
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
