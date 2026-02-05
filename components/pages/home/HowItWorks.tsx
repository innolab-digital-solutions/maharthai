'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations('home');

  const steps = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      ),
      titleKey: "howItWorks.step1",
      descriptionKey: "howItWorks.step1Desc",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
      titleKey: "howItWorks.step2",
      descriptionKey: "howItWorks.step2Desc",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
      titleKey: "howItWorks.step3",
      descriptionKey: "howItWorks.step3Desc",
    },
  ];

  return (
    <div className="mt-15 md:mt-25 px-5 md:px-0">
      {/* Title */}
      <div
        className="text-center space-y-2 px-5 md:px-0"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-2xl md:text-4xl font-semibold">{t('howItWorks.title')}</h1>

        <p className="text-slate-500 text-sm md:text-base">
          Simple steps to get the help you need for your home
        </p>
      </div>

      <div className="mt-10 mx-auto md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 ">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-start space-y-2 px-5 md:px-6 bg-white rounded-lg shadow-md py-8 hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 150}
            >
              {/* Icon */}
              <div className="text-primary">{step.icon}</div>

              {/* Title */}
              <h2 className="font-semibold text-base">{t(step.titleKey)}</h2>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed">
                {t(step.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
