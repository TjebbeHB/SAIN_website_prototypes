/**
 * Onboarding form every chapter links to from its "Join our community" CTAs.
 * Shared here so the form can be swapped in one place.
 */
export const COMMUNITY_JOIN_URL = "https://sainonboard.fillout.com/new";

/**
 * The "Find your next step" guide in the homepage hero opens this Airtable
 * form: its conditional fields send a newcomer to a course, someone who has
 * done a course to a research project, and an experienced researcher to
 * supervising. Paste the form's share link (https://airtable.com/app…/shr…)
 * or its embed link; the dialog embeds it either way.
 *
 * Left empty, the dialog asks the same three-way question itself and links
 * straight to the courses, the Project hub and the supervisor form.
 */
export const PATHFINDER_FORM_URL = "";

export type NationalContact = {
  label: string;
  detail: string;
  email: string;
};

export const nationalContacts: NationalContact[] = [
  {
    label: "Formal",
    detail: "General formal inquiries",
    email: "info@safeainetherlands.org",
  },
  {
    label: "Media and outreach",
    detail: "Press, public outreach, and partnerships",
    email: "pr@safeainetherlands.org",
  },
  {
    label: "Research",
    detail: "Project Hub, supervisors, and collaborations",
    email: "research@safeainetherlands.org",
  },
  {
    label: "Substack",
    detail: "Writing, editing, and newsletter work",
    email: "substack@safeainetherlands.org",
  },
  {
    label: "Conduct",
    detail: "Code of Conduct breaches or general concerns",
    email: "conduct@safeainetherlands.org",
  },
];

export const chapterContactLinks = [
  { name: "SAIN Groningen", href: "/chapters/groningen#join" },
  { name: "SAIN Amsterdam", href: "/chapters/amsterdam#join" },
  { name: "SAIN Utrecht", href: "/chapters/utrecht#join" },
] as const;

export type LeadershipContact = {
  names: string;
  role: string;
  /** The address that belongs to this person and to nobody else. */
  email: string;
  /** The shared inbox they also answer, already printed in full further up the page.
      Left out for a lead who answers none of them. */
  alsoAnswers?: string;
  linkedin?: string;
};

/** Named leads. The shared inboxes are listed once, in the bands above; what is
 *  new here is the person and the address only they read. */
export const leadershipContacts: LeadershipContact[] = [
  {
    names: "Alexander Müller",
    role: "Director SAIN",
    email: "alexander@safeainetherlands.org",
    alsoAnswers: "Also answers the formal role address above.",
    linkedin: "https://alexanderakm.github.io/",
  },
  {
    names: "Tarteel Mohamed",
    role: "Director SAIN Groningen",
    email: "tarteel@safeainetherlands.org",
    alsoAnswers: "Also answers the SAIN Groningen chapter address above.",
    linkedin: "https://www.linkedin.com/in/tarteel-mohamed-8918aa2a7/",
  },
  {
    names: "Ana Paula Castillo Rodriguez",
    role: "Director SAIN Amsterdam and Head of Growth SAIN",
    email: "ana@safeainetherlands.org",
    alsoAnswers: "Also answers the SAIN Amsterdam chapter address above.",
    linkedin: "https://www.linkedin.com/in/ana-paula-casrod/",
  },
  {
    names: "Riccardo Campanella",
    role: "Director SAIN Utrecht",
    email: "riccardo@safeainetherlands.org",
    alsoAnswers: "Also answers the SAIN Utrecht chapter address above.",
    linkedin: "https://www.linkedin.com/in/riccardo-campanella/",
  },
  {
    names: "Marta Polizzi",
    role: "Head of Operations SAIN",
    email: "marta@safeainetherlands.org",
    linkedin: "https://www.linkedin.com/in/martapolizzi/",
  },
  {
    names: "Tjebbe Boersma",
    role: "Head of Projects SAIN",
    email: "tjebbe@safeainetherlands.org",
    linkedin: "https://www.linkedin.com/in/tjebbe-hylke-boersma/",
  },
];

export type ChapterRoleEmails = {
  chapter: string;
  /** The chapter page itself, for a link labelled "View chapter". */
  href: string;
  /** The join section of that page, for a link that asks someone to join. */
  joinHref: string;
  roles: { label: string; email: string }[];
};

export const chapterRoleEmails: ChapterRoleEmails[] = [
  {
    chapter: "SAIN Groningen",
    href: "/chapters/groningen",
    joinHref: "/chapters/groningen#join",
    roles: [
      { label: "Formal collaboration", email: "infogro@safeainetherlands.org" },
      { label: "Community manager", email: "cmgro@safeainetherlands.org" },
      { label: "Education", email: "edugro@safeainetherlands.org" },
      { label: "Research", email: "research@safeainetherlands.org" },
      { label: "Events", email: "eventsgro@safeainetherlands.org" },
      { label: "Substack", email: "substack@safeainetherlands.org" },
      { label: "Public outreach", email: "prgro@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Amsterdam",
    href: "/chapters/amsterdam",
    joinHref: "/chapters/amsterdam#join",
    roles: [
      { label: "Formal collaboration", email: "infoams@safeainetherlands.org" },
      { label: "Community manager", email: "cmams@safeainetherlands.org" },
      { label: "Education", email: "eduams@safeainetherlands.org" },
      { label: "Research", email: "research@safeainetherlands.org" },
      { label: "Events", email: "eventsams@safeainetherlands.org" },
      { label: "Substack", email: "substack@safeainetherlands.org" },
      { label: "Public outreach", email: "prams@safeainetherlands.org" },
    ],
  },
  {
    chapter: "SAIN Utrecht",
    href: "/chapters/utrecht",
    joinHref: "/chapters/utrecht#join",
    roles: [
      { label: "Formal collaboration", email: "infoutr@safeainetherlands.org" },
      { label: "Community manager", email: "cmutr@safeainetherlands.org" },
      { label: "Education", email: "eduutr@safeainetherlands.org" },
      { label: "Research", email: "research@safeainetherlands.org" },
      { label: "Events", email: "eventsutr@safeainetherlands.org" },
      { label: "Substack", email: "substack@safeainetherlands.org" },
      { label: "Public outreach", email: "prutr@safeainetherlands.org" },
    ],
  },
];
