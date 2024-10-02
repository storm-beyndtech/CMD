import { useState } from "react";
import { faqData } from "../lib/utils";
import { BsChevronDown } from "react-icons/bs";

const boolArray = Array(faqData.length).fill(false); // Dynamically generate based on faqData length

export default function Faq() {
  const [openQuestions, setOpenQuestions] = useState(boolArray);

  const toggleQuestion = (index: number) => {
    const newOpenQuestions = openQuestions.map((isOpen, i) =>
      i === index ? !isOpen : isOpen,
    );
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <section className="max-ctn py-[75px]" id="faqs">
      <div className="mb-6">
        <h2 className="title mb-[18px] max-sm:max-w-72">Frequently Asked Questions</h2>
        <p className="desc">
          Get answers to the most common questions about CMD Health Systems
        </p>
      </div>
      {faqData.map((item, index) => (
        <div key={index} className="py-3.5 border-b border-[#F0F0F0]">
          <div
            onClick={() => toggleQuestion(index)}
            className="flex justify-between cursor-pointer py-5"
          >
            <p className=" sm:text-[21px] text-[#383E49] font-semibold">{item.question}</p>
            <div
              className={`ml-4 transform transition-transform ${
                openQuestions[index] ? "rotate-180" : ""
              }`}
            >
              <BsChevronDown />
            </div>
          </div>
          {openQuestions[index] && (
            <p className="desc py-2">{item.answer}</p>
          )}
        </div>
      ))}
    </section>
  );
}
