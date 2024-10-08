// Custom icon imports
import grid from "../assets/sidebar-icons/grid.svg";
import gridActive from "../assets/sidebar-icons/grid-active.svg";
import pills from "../assets/sidebar-icons/pills.svg";
import pillsActive from "../assets/sidebar-icons/pills-active.svg";
import cards from "../assets/sidebar-icons/cards.svg";
import cardsActive from "../assets/sidebar-icons/cards-active.svg";
import hospital from "../assets/sidebar-icons/hospital.svg";
import hospitalActive from "../assets/sidebar-icons/hospital-active.svg";
import profile from "../assets/sidebar-icons/profile.svg";
import profileActive from "../assets/sidebar-icons/profile-active.svg";
import consultation from "../assets/sidebar-icons/consultation.svg";
import consultationActive from "../assets/sidebar-icons/consultation-active.svg";
import clock from "../assets/sidebar-icons/clock.svg";
import clockActive from "../assets/sidebar-icons/clock-active.svg";
import delivery from "../assets/sidebar-icons/delivery.svg";
import deliveryActive from "../assets/sidebar-icons/delivery-active.svg";

//avatar
import avatar1 from "../assets/avatar/avatar-1.svg";
import avatar2 from "../assets/avatar/avatar-2.svg";

//durg images
import GLP from "../assets/dummy-drugs/glp-1.svg";
import Tadafil from "../assets/dummy-drugs/Tadafil.svg";
import Finasteride from "../assets/dummy-drugs/Finasteride.svg";
import Apixaban from "../assets/dummy-drugs/Apixaban.svg";

//labs
import lab1 from "../assets/dummyLabs/lab-1.svg";
import lab2 from "../assets/dummyLabs/lab-2.svg";
import lab3 from "../assets/dummyLabs/lab-3.svg";
import lab4 from "../assets/dummyLabs/lab-4.svg";
import lab5 from "../assets/dummyLabs/lab-5.svg";

// account types
import lab from "../assets/accountTypes/lab.svg";
import pharmacy from "../assets/accountTypes/pharmacy.svg";
import hospitalImg from "../assets/accountTypes/hospital.svg";
import doctor from "../assets/accountTypes/doctor.svg";
import travelNurse from "../assets/accountTypes/travelNurse.svg";

//dummy Results
//results
import doc1 from "../assets/result-1.svg";
import doc2 from "../assets/result-2.svg";

export const navItemsPatient = [
	{
		to: "/dashboard/patient",
		label: "Dashboard",
		icons: { default: grid, active: gridActive },
	},
	{
		to: "/dashboard/patient/medications",
		label: "Medications",
		icons: { default: pills, active: pillsActive },
	},
	{
		to: "/dashboard/patient/cards",
		label: "Cards",
		icons: { default: cards, active: cardsActive },
	},
	{
		to: "/dashboard/patient/consultations",
		label: "Consultations",
		icons: { default: hospital, active: hospitalActive },
	},
	{
		to: "/dashboard/patient/profile",
		label: "Profile",
		icons: { default: profile, active: profileActive },
	},
];

export const navItemsDoctor = [
	{
		to: "/dashboard/partner/doctor",
		label: "Dashboard",
		icons: { default: grid, active: gridActive },
	},
	{
		to: "/dashboard/partner/doctor/consultations",
		label: "Consultations",
		icons: { default: consultation, active: consultationActive },
	},
	{
		to: "/dashboard/partner/doctor/schedule",
		label: "Shedule",
		icons: { default: clock, active: clockActive },
	},
	{
		to: "/dashboard/partner/doctor/profile",
		label: "Profile",
		icons: { default: profile, active: profileActive },
	},
];

export const navItemsPharmacy = [
	{
		to: "/dashboard/partner/pharmacy",
		label: "Dashboard",
		icons: { default: grid, active: gridActive },
	},
	{
		to: "/dashboard/partner/pharmacy/orders",
		label: "Orders",
		icons: { default: delivery, active: deliveryActive },
	},
	{
		to: "/dashboard/partner/pharmacy/inventory",
		label: "Inventory",
		icons: { default: pills, active: pillsActive },
	},
	{
		to: "/dashboard/partner/pharmacy/profile",
		label: "Profile",
		icons: { default: profile, active: profileActive },
	},
];

export const navItemsLab = [
	{
		to: "/dashboard/partner/lab",
		label: "Dashboard",
		icons: { default: grid, active: gridActive },
	},
	{
		to: "/dashboard/partner/lab/appointments",
		label: "Appointments",
		icons: { default: clock, active: clockActive },
	},
	{
		to: "/dashboard/partner/lab/profile",
		label: "Profile",
		icons: { default: profile, active: profileActive },
	},
];

export const dummyDrugList = [
	{
		id: "1",
		name: "GLP-1",
		imageUrl: GLP,
		strength: "",
		price: 120.0,
	},
	{
		id: "2",
		name: "Tadafil",
		imageUrl: Tadafil,
		strength: "5mg/10mg",
		price: 80.5,
	},
	{
		id: "3",
		name: "Finasteride",
		imageUrl: Finasteride,
		strength: "5mg",
		price: 45.99,
	},
	{
		id: "4",
		name: "Apixaban",
		imageUrl: Apixaban,
		strength: "5mg",
		price: 110.25,
	},
	{
		id: "5",
		name: "Finasteride",
		imageUrl: Finasteride,
		strength: "5mg",
		price: 47.5,
	},
	{
		id: "6",
		name: "GLP-1",
		imageUrl: GLP,
		strength: "",
		price: 125.0,
	},
	{
		id: "7",
		name: "Tadafil",
		imageUrl: Tadafil,
		strength: "5mg/10mg",
		price: 79.99,
	},
	{
		id: "8",
		name: "Apixaban",
		imageUrl: Apixaban,
		strength: "5mg",
		price: 115.0,
	},
	{
		id: "9",
		name: "GLP-1",
		imageUrl: GLP,
		strength: "",
		price: 123.49,
	},
	{
		id: "10",
		name: "Finasteride",
		imageUrl: Finasteride,
		strength: "5mg",
		price: 44.99,
	},
	{
		id: "11",
		name: "Apixaban",
		imageUrl: Apixaban,
		strength: "5mg",
		price: 113.75,
	},
	{
		id: "12",
		name: "Tadafil",
		imageUrl: Tadafil,
		strength: "5mg/10mg",
		price: 82.5,
	},
];

// labsData.js
export const labs = [
	{
		id: "1",
		name: "Moviki Labs",
		address: "123 Health Avenue, Suite 4, Lagos",
		image: lab1,
		mapLink: "https://maps.google.com",
	},
	{
		id: "2",
		name: "MedX Labs",
		address: "456 Medical Street, Suite 8, Lagos",
		image: lab2,
		mapLink: "https://maps.google.com",
	},
	{
		id: "3",
		name: "Dolly Labs & Pharmacy",
		address: "789 Clinic Drive, Suite 10, Abuja",
		image: lab3,
		mapLink: "https://maps.google.com",
	},
	{
		id: "4",
		name: "BioLabs Diagnostics",
		address: "789 Clinic Drive, Suite 10, Abuja",
		image: lab4,
		mapLink: "https://maps.google.com",
	},
	{
		id: "5",
		name: "Tripea Consulting Laboratory",
		address: "789 Clinic Drive, Suite 10, Abuja",
		image: lab5,
		mapLink: "https://maps.google.com",
	},
];

export const consultations = [
	{
		id: "1",
		date: "2024-09-26",
		type: "Follow-up",
		status: "Completed",
		partner: "Dr. Jane Smith",
		testType: "Blood Test",
		notes:
			"Patient presented with symptoms of fatigue and shortness of breath. Possible anemia or vitamin deficiency. Blood tests and physical examination recommended to confirm diagnosis. The prescription below will help minimize the effect of these.",
		documents: [doc1, doc2],
		lastVisit: "2024-08-20",
		remarks:
			"Good news! All your test results came back within normal ranges. No further action is required, but we recommend sharing these results with your doctor for ongoing care.",
		tests: {
			bloodGroup: "O+",
			genotype: "AA",
			height: "175 cm",
			weight: "70 kg",
			allergy: "None",
		},
		uploads: [doc1, doc2],
		prescriptions: [
			{
				dosage: "1 Tab - Once daily",
				refillDate: "",
				refill: "No",
				drug: {
					id: "3",
					price: 300,
					imageUrl: Tadafil,
					name: "Tadafil",
					strength: "5mg/10mg",
				},
			},
			{
				dosage: "2 Tabs - Three times a Day",
				refillDate: "Refill available after Oct 11, 2024",
				refill: "Yes",
				drug: {
					id: "1",
					price: 250,
					imageUrl: Apixaban,
					name: "Atorvastatin",
					strength: "5mg",
				},
			},
		],
		patientDetails: {
			note: "Feeling unwell for the past few days with fever and cough.",
			isCurrentMedication: false,
			currentLocation: "Home",
			selectedLab: "None",
			// Basic profile details
			name: "George Joe",
			age: 35,
			gender: "Male",
			address: "123 Main St, Cityville",
			contactNumber: "+123456789",
			photo: {
				url: avatar1,
			},
		},
	},
	{
		id: "2",
		date: "2024-09-26",
		type: "Follow-up",
		status: "In Progress",
		partner: "Dr. Jane Smith",
		testType: "Blood Test",
		notes:
			"Patient presented with symptoms of fatigue and shortness of breath. Possible anemia or vitamin deficiency. Blood tests and physical examination recommended to confirm diagnosis. The prescription below will help minimize the effect of these.",
		documents: [doc1, doc2],
		lastVisit: "2024-08-20",
		remarks:
			"Good news! All your test results came back within normal ranges. No further action is required, but we recommend sharing these results with your doctor for ongoing care.",
		tests: {
			bloodGroup: "O+",
			genotype: "AA",
			height: "175 cm",
			weight: "70 kg",
			allergy: "None",
		},
		uploads: [doc1, doc2],
		prescriptions: [
			{
				dosage: "1 Tab - Once daily",
				refillDate: "",
				refill: "No",
				drug: {
					id: "3",
					price: 300,
					imageUrl: Tadafil,
					name: "Tadafil",
					strength: "5mg/10mg",
				},
			},
			{
				dosage: "2 Tabs - Three times a Day",
				refillDate: "Refill available after Oct 11, 2024",
				refill: "Yes",
				drug: {
					id: "1",
					price: 250,
					imageUrl: Apixaban,
					name: "Atorvastatin",
					strength: "5mg",
				},
			},
		],
		patientDetails: {
			note: "Feeling unwell for the past few days with fever and cough.",
			isCurrentMedication: false,
			currentLocation: "Home",
			selectedLab: "None",
			// Basic profile details
			name: "George Joe",
			age: 35,
			gender: "Male",
			address: "123 Main St, Cityville",
			contactNumber: "+123456789",
			photo: {
				url: avatar1,
			},
		},
	},
	{
		id: "3",
		date: "2024-09-26",
		type: "Follow-up",
		status: "Completed",
		partner: "Dr. Jane Smith",
		testType: "Blood Test",
		notes:
			"Patient presented with symptoms of fatigue and shortness of breath. Possible anemia or vitamin deficiency. Blood tests and physical examination recommended to confirm diagnosis. The prescription below will help minimize the effect of these.",
		documents: [doc1, doc2],
		lastVisit: "2024-08-20",
		remarks:
			"Good news! All your test results came back within normal ranges. No further action is required, but we recommend sharing these results with your doctor for ongoing care.",
		tests: {
			bloodGroup: "O+",
			genotype: "AA",
			height: "175 cm",
			weight: "70 kg",
			allergy: "None",
		},
		uploads: [doc1, doc2],
		prescriptions: [
			{
				dosage: "1 Tab - Once daily",
				refillDate: "",
				refill: "No",
				drug: {
					id: "3",
					price: 300,
					imageUrl: Tadafil,
					name: "Tadafil",
					strength: "5mg/10mg",
				},
			},
			{
				dosage: "2 Tabs - Three times a Day",
				refillDate: "Refill available after Oct 11, 2024",
				refill: "Yes",
				drug: {
					id: "1",
					price: 250,
					imageUrl: Apixaban,
					name: "Atorvastatin",
					strength: "5mg",
				},
			},
		],
		patientDetails: {
			note: "Feeling unwell for the past few days with fever and cough.",
			isCurrentMedication: false,
			currentLocation: "Home",
			selectedLab: "None",
			// Basic profile details
			name: "George Joe",
			age: 35,
			gender: "Male",
			address: "123 Main St, Cityville",
			contactNumber: "+123456789",
			photo: {
				url: avatar1,
			},
		},
	},
];

export const transactions = [
	{
		id: "1",
		desc: "External",
		date: "Oct 29, 2024",
		amount: "$150.00",
		status: "Pending",
	},
	{
		id: "2",
		desc: "Internal - CMD Rx - Sub",
		date: "Oct 27, 2024",
		amount: "$500.00",
		status: "Completed",
	},
	{
		id: "3",
		desc: "Internal - CMD Rx - Sub",
		date: "Oct 27, 2024",
		amount: "$500.00",
		status: "Completed",
	},
	{
		id: "4",
		desc: "Internal - CMD Rx - Prescription drugs",
		date: "Oct 29, 2024",
		amount: "$20.00",
		status: "Refunded",
	},
	{
		id: "5",
		desc: "Internal - CMD Rx - Sub",
		date: "Oct 13, 2024",
		amount: "$40.00",
		status: "Completed",
	},
];

export const accountTypes = [
	{
		image: lab,
		title: "Lab",
		desc: "Provide precise and advanced diagnostic services in a cutting-edge environment",
	},
	{
		image: pharmacy,
		title: "Pharmacy",
		desc: "Get access to rare and exclusive medications tailored to the needs of our high-end clientele",
	},
	{
		image: hospitalImg,
		title: "Hospital",
		desc: "Provide elite, personalised care within a luxurious environment, ensuring every patient experience is exceptional",
	},
	{
		image: doctor,
		title: "Doctor",
		desc: "Collaborate with us to offer personalised consultations in an elegant and professional setting",
	},
	{
		image: travelNurse,
		title: "Travel Nurse",
		desc: "Be at the forefront of healthcare delivery, providing elite care in diverse environments",
	},
];

export const docConsultations = [
	{
		id: "1",
		patientName: "John Doe",
		appointmentTime: "Oct 15, 2024, 10:00 AM",
		imageUrl: avatar1,
		meetingLink: "https://meet.google.com/edr-ghj-yti",
		location: "Lagos Health Clinic, Lekki",
	},
	{
		id: "2",
		patientName: "Jane Doe",
		appointmentTime: "Nov 15, 2024, 11:00 AM",
		imageUrl: avatar2,
		meetingLink: "https://meet.google.com/xyz-abc",
		location: "Princeton Hospital, Ikeja",
	},
	{
		id: "3",
		patientName: "John Doe",
		appointmentTime: "Oct 15, 2024, 10:00 AM",
		imageUrl: avatar1,
		meetingLink: "https://meet.google.com/edr-ghj-yti",
		location: "Princeton Hospital, Ikeja",
	},
	{
		id: "4",
		patientName: "Jane Doe",
		appointmentTime: "Oct 15, 2024, 11:00 AM",
		imageUrl: avatar2,
		meetingLink: "https://meet.google.com/xyz-abc",
		location: "Lagos Health Clinic, Lekki",
	},
];

export const dummySchedule = {
	exemptions: [
		{ date: "September 15, 2024", allDay: true },
		{
			date: "September 13, 2024",
			startTime: "10am",
			endTime: "12pm",
			allDay: false,
		},
	],

	availability: [
		{
			days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
			startTime: "9am",
			endTime: "10pm",
			allDay: false,
		},
		{ days: ["Sat"], startTime: "9am", endTime: "6pm", allDay: false },
	],

	days: [
		{ date: "2024-10-06", available: true, consultationCount: 1 },
		{
			date: "2024-10-03",
			available: true,
			consultationCount: 2,
			concluded: true,
		},
		{
			date: "2024-10-01",
			available: true,
			consultationCount: 1,
			partUnavailable: true,
		},
		{ date: "2024-10-05", available: false, consultationCount: 0 },
		{ date: "2024-10-20", available: false, consultationCount: 0 },

		// 5 additional random objects
		{ date: "2024-10-07", available: true, consultationCount: 3 },
		{ date: "2024-10-08", available: false, consultationCount: 0 },
		{ date: "2024-10-17", available: true, consultationCount: 1 },
		{
			date: "2024-10-02",
			available: true,
			consultationCount: 1,
			concluded: true,
		},
		{ date: "2024-10-04", available: false, consultationCount: 0 },
	],
};

export const labAppointments = [
	{
		id: "1",
		patientName: "John Doe",
		appointmentTime: "Oct 15, 2024, 10:00 AM",
		imageUrl: avatar1,
		meetingLink: "https://meet.google.com/edr-ghj-yti",
		location: "Lagos Health Clinic, Lekki",
	},
	{
		id: "2",
		patientName: "Jane Doe",
		appointmentTime: "Nov 15, 2024, 11:00 AM",
		imageUrl: avatar2,
		meetingLink: "https://meet.google.com/xyz-abc",
		location: "Princeton Hospital, Ikeja",
	},
	{
		id: "3",
		patientName: "John Doe",
		appointmentTime: "Oct 15, 2024, 10:00 AM",
		imageUrl: avatar1,
		meetingLink: "https://meet.google.com/edr-ghj-yti",
		location: "Princeton Hospital, Ikeja",
	},
	{
		id: "4",
		patientName: "Jane Doe",
		appointmentTime: "Oct 15, 2024, 11:00 AM",
		imageUrl: avatar2,
		meetingLink: "https://meet.google.com/xyz-abc",
		location: "Lagos Health Clinic, Lekki",
	},
];
