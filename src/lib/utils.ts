import western from "../assets/sponsors/westernunion.svg";
import skrill from "../assets/sponsors/Skrill.svg";
import amazonPay from "../assets/sponsors/AmazonPay.svg";
import klarna from "../assets/sponsors/Klarna.svg";

//1st section image
import theEliteIMG from "../assets/for-the-elite.svg";

//features icons
import pillsIcon from "../assets/icons/pills.svg";
import profileIcon from "../assets/icons/profile.svg";
import downIcon from "../assets/icons/direct-down.svg";
import sendIcon from "../assets/icons/send-2.svg";
import clipboardIcon from "../assets/icons/clipboard-text.svg";
import supportIcon from "../assets/icons/24-support.svg";

//experts key points
import globe from "../assets/icons/globe.svg";
import teacher from "../assets/icons/teacher.svg";
import health from "../assets/icons/health.svg";
import hospital from "../assets/icons/hospital.svg";

//experts
import andrewSvene from "../assets/experts/Andrew-Svene.svg";
import johnDoe from "../assets/experts/John-Doe.svg";
import davidDoe from "../assets/experts/David-Doe.svg";
import domDom from "../assets/experts/Janelle-Dom-Dom.svg";

//how it works
import howCmdWorks1 from "../assets/how-cmd-works/step-1.svg";
import howCmdWorks2 from "../assets/how-cmd-works/step-2.svg";
import howCmdWorks3 from "../assets/how-cmd-works/step-3.svg";
import howCmdWorks4 from "../assets/how-cmd-works/step-4.svg";

//benefits
import benefitIMG1 from "../assets/benefits/benefit-1.svg";
import benefitIMG2 from "../assets/benefits/benefit-2.svg";
import { Package } from "../types/types";

//payment methods
import payMethod1 from "../assets/payment-options/itump.svg"
import payMethod2 from "../assets/payment-options/paypal.svg"
import payMethod3 from "../assets/payment-options/google.svg"

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const sponsorsHero = [
  { src: western },
  { src: skrill },
  { src: amazonPay },
  { src: klarna },
  { src: western },
];

export const sponsors = [
  { src: western },
  { src: skrill },
  { src: amazonPay },
  { src: klarna },
  { src: western },
  { src: skrill },
  { src: amazonPay },
  { src: klarna },
  { src: skrill },
];

export const theElite = {
  id: "solutions",
  title: "A Health System Designed for the Elite",
  desc: "CMD Health Systems connects high-net-worth individuals to rare and effective drugs sourced worldwide, delivered with unmatched convenience and precision. Our comprehensive membership plans ensure that you receive top-tier medical care, personalized to your unique health needs. Whether you require specialized medications, VIP access to healthcare providers, or tailored health risk assessments, CMD Health Systems is here to offer a seamless healthcare experience unlike any other.",
  imgUrl: theEliteIMG,
  url: "#",
  btnLabel: "See Benefits",
};

export const features = [
  {
    icon: pillsIcon,
    title: "Exclusive Access to Rare Medications",
    desc: "Gain access to high-quality, rare, and effective drugs that are often unavailable through regular channels. These medications are directly sourced from Canada and prescribed by certified physicians",
  },
  {
    icon: profileIcon,
    title: "Personalized Healthcare Solutions",
    desc: "Your health is unique, and so is our approach. Through our membership program, we provide a personalized health plan tailored to your specific medical needs and lifestyle",
  },
  {
    icon: downIcon,
    title: "VIP Medical Care and Priority Services",
    desc: "Skip the waiting lines and get priority access to leading hospitals, labs, and pharmacies through our global healthcare network. Our team ensures your health needs are handled promptly, with absolute discretion",
  },
  {
    icon: sendIcon,
    title: "Seamless Payment and Transactions",
    desc: "Our integrated payment solutions, including CareCredit and Healthcare Spending Accounts (HSA), make managing your health expenses easy and efficient.",
  },
  {
    icon: clipboardIcon,
    title: "Health Risk Assessment",
    desc: "We provide comprehensive health risk assessments as part of your membership. These assessments identify potential health issues early, ensuring you're always one step ahead in managing your wellness",
  },
  {
    icon: supportIcon,
    title: "24/7 Concierge Support",
    desc: "Our dedicated concierge service is available round the clock to help you schedule appointments, refill prescriptions, and manage all your health-related needs",
  },
];

export const conditionsList = [
  "Otitis (earache)",
  "Fever",
  "Hypertension",
  "Conjunctivitis (pink eye)",
  "Rash and other skin eruptions",
  "Headache",
  "Asthma",
  "Colitis, enteritis, and gastroenteritis",
  "Sinusitis",
  "Allergy",
  "Bronchitis",
  "Genital herpes",
  "Sore throat and related",
  "Minor burns",
  "Reflux",
  "Herpes simplex",
  "Upper respiratory infections",
  "Minor cuts, Blisters and wounds",
  "Diarrhea",
  "Abdominal pain",
  "Urinary tract and bladder infection",
  "Constipation",
  "Laryngitis",
  "Allergy",
  "Sprains and strains",
  "Bug bites and stings",
  "Lumbago",
  "Backache",
  "Virginities",
  "Cold, canker and mouth sores",
  "Candidacies",
  "Cystitis",
];

export const expertsKeyPoints = [
  {
    icon: globe,
    title: "Global Expertise",
    desc: "Top specialists worldwide, covering wide range of medical fields",
  },
  {
    icon: teacher,
    title: "Certified and Qualified",
    desc: "Board-certified, highly vetted physicians and pharmacists",
  },
  {
    icon: health,
    title: "Personalized Care",
    desc: "Tailored healthcare plans to meet your unique health needs",
  },
  {
    icon: hospital,
    title: "Advanced Treatments",
    desc: "Latest in medical technology and cutting-edge treatments",
  },
];

export const experts = [
  {
    id: "66f3719bfcadeb51bd9aecd3",
    img: andrewSvene,
    name: "Andrew Svene",
    position: "Chief Medical Doctor @ John Hospital",
    hospitals:
      "John Hospital, John Hospital University, John Board of Hopitals",
      availableDates: ['2024-09-11', '2024-09-13', '2024-09-15'],
  },
  {
    id: "66f3719bfrddeb50bd9aecdf",
    img: johnDoe,
    name: "John Doe",
    position: "Chief Doctor @ Dominic Hospital",
    hospitals:
      "Dominic Hospital, John Hospital University, John Board of Hopitals",
      availableDates: ['2024-09-11', '2024-09-13', '2024-09-15'],
  },
  {
    id: "66f3719bfcadef60bd9aecdf",
    img: davidDoe,
    name: "David Doe",
    position: "Medical Consultant @ Belwolf",
    hospitals: "Belwolf, John Hospital University, John Board of Hopitals",
    availableDates: ['2024-09-01', '2024-09-03', '2024-09-05'],
  },
  {
    id: "66f3719bfcadeb50bd9aecdf",
    img: domDom,
    name: "Janelle Dom-Dom",
    position: "Chief Doctor @ UUNH",
    hospitals: "UUNH, John Hospital University, John Board of Hopitals",
    availableDates: ['2024-09-17', '2024-09-13', '2024-09-03'],
  },
];



export const benefitsList = [
  {
    title: "Global Health Solutions at Your Fingertips",
    desc: "Our system offers an all-in-one solution for your healthcare needs. Experience unmatched convenience, exclusive access to the world’s best treatments, and the peace of mind that comes with expert-led care.",
    img: benefitIMG1,
    keyPoints: [
      "$150 One-off Health Risk Assessment Test for you (and your family)",
      "24/7 Consultations with Top Experts Worldwide",
      "Exclusive Access to Rare Medications and Best Treatment Options",
      "Quick Delivery and Services, with Neccessary Concierge Assists",
      "Pre-funded Membership Cards for Elective Treatments",
    ]
  },
  {
    title: "Personalized Card for all your Medical Needs",
    desc: "The CMD CarePoints Card goes beyond simple access—it's a powerful tool that enhances your healthcare experience with seamless payments, priority access, and valuable perks.",
    img: benefitIMG2,
    keyPoints: [
      "Seamless Payments Across Our Healthcare Network",
      "Monthly CareCredit for Elective Treatments",
      "Priority Access to Partner Hospitals, Clinics, and Specialists",
      "Leverage Your Healthcare Spending Account (HSA)",
      "Global Recognition for Healthcare Services",
    ]
  },
];



export const howCmdWorksList = [
  {
    title: "Choose Your Membership Plan",
    desc: "Select the membership plan that suits your lifestyle and healthcare needs.",
    img: howCmdWorks1,
  },
  {
    title: "Health Risk Assessment",
    desc: "After registering, undergo a comprehensive Health Risk Assessment, which helps us design a personalized health plan for you.",
    img: howCmdWorks2,
  },
  {
    title: "Access Premium Services",
    desc: "From personalized care to exclusive access to rare medications, CMD Health Systems provides a suite of premium services tailored to your health.",
    img: howCmdWorks3,
  },
  {
    title: "Manage Your Healthcare Effortlessly",
    desc: "With seamless payments, 24/7 concierge support, and an intuitive online portal, CMD Health Systems makes managing your healthcare effortless.",
    img: howCmdWorks4,
  },
];

export const faqData = [
  {
    question: "What does the membership fee cover?",
    answer: "The membership fee provides scalable access to 24/7 care coordination, prioritizing privacy, OnDemand care, and high-quality services at an affordable cost. It also offers preferred access to both local and international provider networks without any limitations.",
  },
  {
    question: "Can I access CMD Health Systems internationally?",
    answer: "We find the best treatment options for you and provide the opportunity to choose the care that aligns with your Out-Of-Pocket Expenses (OOPE) budget.",
  },
  {
    question: "How does the CareCredit work?",
    answer: "As a member, you have the option to upgrade to our Healthcare Spending Account (HSA) program, which is managed by our local financial institution partner. The card, issued upon qualification, allows cardholders and their dependents to access up to 4 times their average HSA cash value with no interest charges for up to 3 months.",
  },
  {
    question: "What kind of drugs are available?",
    answer: "Our doctors and pharmacists, both locally and internationally, have access to premium brand and generic medications from Canada and other Western countries.  online that are approved and in use.",
  },
  {
    question: "How do I get access to rare medications?",
    answer: "You can consult with our doctor online, who will prescribe the appropriate medication through a participating pharmacy, with delivery either to your doorstep or directly to your doctor's office.",
  },
  {
    question: "What happens during the Health Risk Assessment (HRA)?",
    answer: " Upon becoming a member, the primary member and dependents can schedule an appointment, choosing either an in-person visit or a virtual consultation with a Primary Care Physician (PCP). The PCP will review each registered member's medical records, customize their wellness care, and prescribe any necessary medications.",
  },
  {
    question: "How can I manage my Healthcare Spending Account (HSA)?",
    answer: "If approved, you will have the option to choose between a CarePoints Card or a Well-Lux Card, providing you and your dependents with access to CareCredit-Points (CCP). The CCP can be used as currency for any clinical care, including medications, within our closed international network. You can repay the CCP under terms and conditions similar to a credit card, but with no interest if paid as agreed. For more details, please review the terms and conditions.",
  },
];

export const testimonials = [
  {
    name: "John Doe",
    role: "Client",
    message:
      "CMD Health Systems has redefined healthcare for me. The priority access to top hospitals and exclusive medications has made managing my health stress-free.",
  },
  {
    name: "Mark Wilson",
    role: "Client",
    message:
      "As a couple, the Silver Plan gives us both peace of mind knowing our health is being handled with precision. The concierge service is outstanding.",
  },
  {
    name: "Angel & Steve Sven",
    role: "Client",
    message:
      "The personalized care and attention we receive through CMD is unparalleled. Their CarePoints Card makes handling healthcare expenses and accessing treatments easy.",
  },
  {
    name: "Jason Stunner",
    role: "Client",
    message:
      "CMD Health Systems transformed the way I manage my health. Their seamless access to global specialists and rare medications has been a game-changer for my wellness journey.",
  },
  {
    name: "Angel & Steve Sven",
    role: "Client",
    message:
      "The personalized care and attention we receive through CMD is unparalleled. Their CarePoints Card makes handling healthcare expenses and accessing treatments easy.",
  },
  // More testimonials can be added here...
];



export const packages: Package[] = [
  {
    name: "Single",
    price: 400,
    description:
      "Stay in control of your health with a plan that fits your individual needs and lifestyle",
    users: "1 Person",
    orientation: "$150 One-off Health Risk Assessment",
    basicInvestigation: "Includes CBC Blood Work & Urine Analysis",
    monthlyCareCredit: "$20 for elective treatments (up to $200 annually)",
    electiveMedicalPractices:
      "Men's Clinics, Weight Management, SMO for major medical treatment, access to global hospital network",
    accessToMedicalCare: "No restrictions (subject to member and doctor approval)",
  },
  {
    name: "Couple",
    price: 700,
    description:
      "Shared healthcare made simple with comprehensive coverage for you and your partner",
    users: "1 Couple (2 Persons)",
    orientation: "$150 One-off Health Risk Assessment for Enrollees",
    basicInvestigation: "Includes CBC Blood Work & Urine Analysis",
    monthlyCareCredit: "$40 for elective treatments (up to $400 annually)",
    electiveMedicalPractices:
      "Men's Clinics, Weight Management, SMO for major medical treatment, access to global hospital network",
    accessToMedicalCare: "No restrictions (subject to member and doctor approval)",
  },
  {
    name: "Family",
    price: 1000,
    description:
      "Complete care for your entire family with top-tier services for every member",
    users: "No Limit (For Everyone)",
    orientation: "$150 One-off Health Risk Assessment for Enrollees",
    basicInvestigation: "Includes CBC Blood Work & Urine Analysis",
    monthlyCareCredit: "$60 for elective treatments (up to $600 annually)",
    electiveMedicalPractices:
      "Men's Clinics, Weight Management, SMO for major medical treatment, access to global hospital network",
    accessToMedicalCare: "No restrictions (subject to member and doctor approval)",
  },
];


export const paymentMethods = [
  {
    name: "Itump Pay",
    url: "#",
    img: payMethod1
  },
  {
    name: "PayPal",
    url: "#",
    img: payMethod2
  },
  {
    name: "Google Pay",
    url: "#",
    img: payMethod3
  },
]