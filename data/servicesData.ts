export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'homeopathic-consultation',
    title: 'Homeopathic Consultation',
    icon: '🍵',
    shortDescription: 'Individualized classical Homeopathy for physical and emotional well-being.',
    fullDescription: 'We offer individualized treatment using classical Homeopathy, guided by a deep understanding of both physical symptoms and emotional patterns. Our consultations go beyond surface-level diagnosis, exploring the root causes of illness through detailed case analysis. Remedies are selected with precision, aiming to restore balance, vitality, and emotional well-being. Flower remedies and biochemic medicines can also be used to support healing.'
  },
  {
    id: 'adolescent-counselling',
    title: 'Adolescent Counselling',
    icon: '🧠',
    shortDescription: 'A safe, non-judgmental space to build emotional intelligence and coping skills.',
    fullDescription: 'These sessions provide a safe, non-judgmental space for individuals to explore their thoughts, emotions, and life challenges. Whether dealing with stress, behavioural issues, relationship concerns, psychological challenges & Academic Challenges; we help clients build emotional intelligence, self-awareness and coping skills. Our empathetic approach allows clients to feel deeply understood and empowered to make meaningful changes.'
  },
  {
    id: 'teachers-training',
    title: "Teachers Training Program",
    icon: '🎨',
    shortDescription: 'Empowering educators with effective classroom management and emotional awareness.',
    fullDescription: 'Designed exclusively for teachers and school staff, these are introduced to effective methods of classroom management, helping them create structured yet emotionally safe learning environments. The workshops also explore the concept of Multiple Intelligences, helping teachers recognize and nurture diverse learning styles. Teachers are equipped to adapt to their methods and reach every student meaningfully. We guide educators to reflect on emotional patterns, communication styles and the deeper purpose of their profession. This self-awareness becomes the foundation for better classroom relationships and improved student performance.'
  },
  {
    id: 'personality-development',
    title: 'Personality Development Programs',
    icon: '✨',
    shortDescription: 'Show up as your best self for campus placements, career growth, or personal transformation.',
    fullDescription: 'Whether you are preparing for campus placements, career growth or personal transformation - these programs help you show up as your best self! It involves sessions on communication skills, leadership skills, emotional intelligence, goal setting, team building, interview preparation, stress & lifestyle management etc. The goal is to help individuals feel more centered, capable and empowered.'
  },
  {
    id: 'emotional-wellness',
    title: 'Emotional Wellness Sessions',
    icon: '🧘‍♀️',
    shortDescription: 'Self-reflection, emotional release, and inner alignment for personal growth.',
    fullDescription: 'These sessions are ideal for those seeking personal growth, emotional clarity, or a deeper connection with themselves. Using a blend of counseling techniques and expressive methods, Dr. Awanti guides clients through self-reflection, emotional release, and inner alignment. Whether one-on-one or in group formats, these sessions foster insight, confidence, and emotional strength.'
  },
  {
    id: 'study-skills',
    title: 'Study Skills & Personality Development Programs',
    icon: '📚',
    shortDescription: 'Tailored for students to overcome exam pressure and build effective learning habits.',
    fullDescription: 'Tailored for school and college students, and those studying for board exams, these programs focus on planning your studies, raising targets, note taking, memorization techniques, building concentration, effective learning habits, revisions and exam writing skills. We use creative techniques and psychological insights to help students overcome exam pressure and develop a confident sense of self.'
  },
  {
    id: 'parenting-guidance',
    title: 'Parenting & Family Guidance',
    icon: '👨‍👩‍👧‍👦',
    shortDescription: 'Practical tools for conscious parenting and building stronger family relationships.',
    fullDescription: 'We support parents in understanding their child’s emotional needs and building stronger, more empathetic relationships. Our sessions offer practical tools for conscious parenting, adolescent guidance, family communication and bonding. Parents leave with greater clarity, confidence, and the ability to nurture their child’s emotional development.'
  }
];
