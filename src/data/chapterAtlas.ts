import type { ChapterName } from "@/data/courseApplications";

/* The chapters as the /community page digests them: the hero prints, the
   atlas and the fourth-chapter band all read this. Every fact is one the
   chapter's own page already states (src/app/chapters/<city>/page.tsx); keep
   them in step when a chapter page changes. Plain data, so both the server
   page and the client atlas can import it. */

export type AtlasChapter = {
  id: string;
  city: ChapterName;
  index: string;
  href: string;
  origin: string;
  summary: string;
  photo: string;
  photoAlt: string;
  facts: { label: string; value: string }[];
  course: string;
  calendar: string;
  calendarUrl: string;
};

export const ATLAS: AtlasChapter[] = [
  {
    id: "utrecht",
    city: "Utrecht",
    index: "01",
    href: "/chapters/utrecht",
    origin: "Utrecht University and beyond",
    summary:
      "A free AI safety course, two discussion groups, and a growing research track at Utrecht University. Run by volunteers, open to anyone in the city.",
    photo: "/photos/cities/utrecht-hero",
    photoAlt: "The Dom tower over the rooftops of Utrecht",
    facts: [
      { label: "Directed by", value: "Riccardo Campanella" },
      { label: "Community", value: "240+ members, multidisciplinary" },
      {
        label: "This year",
        value:
          "Win4AISafety, a full ARENA-based technical course, and a research talk by an Anthropic researcher to more than 60 people",
      },
    ],
    course: "AI Safety Fundamentals",
    calendar: "cal-2gYun0D26BriJ5z",
    calendarUrl: "https://lu.ma/sain-utrecht-events",
  },
  {
    id: "groningen",
    city: "Groningen",
    index: "02",
    href: "/chapters/groningen",
    origin: "Since 2023, first as AISIG",
    summary:
      "Free courses, hackathons, and published research. It began as the AI Safety Initiative Groningen (AISIG) and continues as SAIN Groningen.",
    photo: "/photos/cities/groningen-hero",
    photoAlt: "Canal-side houses and moored boats in Groningen",
    facts: [
      { label: "Directed by", value: "Tarteel Mohamed" },
      { label: "Since October 2023", value: "30 events: hackathons, graduations, talks, pub quizzes" },
      /* Workshops, said out loud: every NeurIPS and ICLR item in research.ts
         is a workshop paper. */
      { label: "Research", value: "Members published at NeurIPS and ICLR workshops" },
    ],
    course: "AI Safety, Ethics, and Society",
    calendar: "cal-jjqTmBdWcqoyEUF",
    calendarUrl: "https://luma.com/user/SAINGroningen",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    index: "03",
    href: "/chapters/amsterdam",
    origin: "UvA, VU and the city's tech scene",
    summary:
      "Free courses and a weekly discussion group, from BSc students to working professionals, supported by the ELLIS Unit Amsterdam.",
    photo: "/photos/cities/amsterdam-hero",
    photoAlt: "Canal houses leaning over the water in central Amsterdam",
    facts: [
      { label: "Directed by", value: "Ana Paula Castillo Rodriguez" },
      { label: "Courses", value: "More than 120 applicants so far" },
      { label: "On stage", value: "The AI020 Conference and TEDxUniversiteit van Amsterdam" },
    ],
    course: "Technical AI Safety & Frontier AI Governance",
    calendar: "cal-WD5xl5IYLpY7xNm",
    calendarUrl: "https://luma.com/user/SAIN_Amsterdam",
  },
];
