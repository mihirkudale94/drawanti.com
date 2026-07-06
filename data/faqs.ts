export type FAQItem = {
  question: string;
  answer: string;
  bullets?: string[];
};

export const faqs: FAQItem[] = [
  {
    question: "How is treatment done at the clinic?",
    answer:
      "We begin with detailed case taking where we understand your physical complaints, emotional patterns, sleep patterns, habits, lifestyle, personal history, and family history. We assess and analyze your case, then prescribe a homeopathic remedy. If counseling is part of your journey, we also design a support plan that may include one-on-one sessions or lifestyle guidance. Regular follow-ups help us track your progress, with family or adolescent sessions when needed.",
  },
  {
    question: "Are Homeopathic medicines habit forming? Do they contain steroids?",
    answer:
      "For chronic problems, longer treatment is needed. Homeopathic medicines, even when taken for a long time, do not create dependency or habit formation. Homeopathic medicines do not contain steroids. They are prepared in lactose, a type of sugar used as a medium.",
  },
  {
    question: "Are there any food restrictions while we are on Homeopathic medicines?",
    answer:
      "With respect to the ailment, certain food types may be advised to be avoided, and some food items may be advised to be consumed. For example, warm food may be advised for bronchitis or salt restriction for hypertension.",
  },
  {
    question: "Can I take Homeopathic medicine for acute complaints?",
    answer:
      "Homeopathic medicines are fast acting and can also be used in treatment for fever, asthma, and infections.",
  },
  {
    question: "Can homeopathy help with emotional issues like anxiety, grief, or anger?",
    answer:
      "Yes. Homeopathy is remarkably effective in addressing emotional imbalances. We often combine it with counselling. The remedies gently restore emotional equilibrium without side effects.",
  },
  {
    question: "Can I take homeopathy for preventive care or general wellness?",
    answer:
      "Yes. Many clients use homeopathy to boost immunity, manage stress, and maintain emotional balance. It is a wonderful tool for preventive care and maintaining an appropriate lifestyle.",
  },
  {
    question: "What issues can be addressed through counselling?",
    answer:
      "Counseling can help with a wide range of concerns like anxiety, stress, relationship challenges, grief, low self-esteem, parenting struggles, adolescent transitions, and more.",
  },
  {
    question: "Can I combine counselling with Homeopathic treatment?",
    answer:
      "Absolutely. Homeopathic medicines work very well on the mind level. Many patients benefit from an integrated approach of emotional healing through counselling supported by gentle Homeopathic remedies.",
  },
  {
    question: "Do you offer online consultations or only in-person sessions?",
    answer:
      "Both. We offer online sessions and in-person consultations at the Pune clinic.",
  },
  {
    question: "What's included in Personality Development program?",
    answer: "We plan customised sessions on the following topics:",
    bullets: [
      "Communication & Public Speaking",
      "Leadership & Team Building",
      "Emotional Intelligence & Self-Awareness",
      "Goal Setting & Decision making",
      "Interview Preparation",
      "Stress & Lifestyle Management",
    ],
  },
  {
    question: "Who all can take up these personality development sessions?",
    answer:
      "Our Personality Development Programs are thoughtfully designed to help individuals grow from the inside out, emotionally, socially, and professionally. They are recommended for students, educators, and working professionals.",
  },
];
