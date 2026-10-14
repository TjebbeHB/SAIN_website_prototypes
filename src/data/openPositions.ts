/**
 * Open positions content for the /open-positions page.
 *
 * Source of truth for role descriptions: working_docs/foundations/06_role_templates.md
 * Roles here are written as marketing-friendly distillations that still reflect
 * the full template (mission, responsibilities, preferred background, collaborations).
 *
 * To open or close a position for a chapter, edit `chapterPositions` below.
 * For roles that belong to SAIN Netherlands as a whole rather than to a single
 * chapter, edit `nationalPosting`.
 */

// -----------------------------------------------------------------------------
// Application form (Google Form)
// -----------------------------------------------------------------------------

/**
 * Single Google Form for all chapters and roles.
 *
 * PRE-SHIP BLOCKER (checked 13 September 2026): fetching the URL below returns
 * HTTP 401 with an ordinary browser user agent, which means the form is not
 * publicly readable: it is either restricted to signed-in or in-organisation
 * Google accounts, or it no longer exists. A public form answers 200. Every
 * chapter apply button on /open-positions points here, so before this page
 * ships someone has to open the form in a logged-out browser and confirm an
 * outside applicant can reach and submit it. If they cannot, point the chapter
 * apply CTAs at the chapter inboxes until the form is public.
 *
 * SETUP NOTES:
 * - Form fields: Name, Email, Chapter (Amsterdam / Utrecht / Groningen), Role(s), CV upload,
 *   Motivation letter upload (or long-text), LinkedIn (optional), availability.
 * - Email routing: configure a Google Apps Script trigger on form submission
 *   that emails info@safeainetherlands.org plus the relevant chapter inbox
 *   (infoams@ or infoutr@) based on the "Chapter" answer. Apps Script template
 *   is left as an action item for whoever sets up the form. Until that trigger
 *   exists the page must not promise where an application lands, so the
 *   routing sentence has been taken out of the how-to-apply copy.
 * - Pre-fill: this URL is appended with `&entry.<id>=<value>` to pre-select the
 *   chapter and role for the applicant. Until the form exists, the URL below is
 *   a placeholder that links to the contact page so the page is never broken.
 */
export const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfp_XJWTbIUzf7szLlq4pe_RXUYxeK8B1SzKt5TUwkREmINtA/viewform";

/**
 * Application form for the Head of Projects role only.
 *
 * National roles do not go through the chapter Google Form: each one has its
 * own form, because the questions are role-specific rather than
 * chapter-and-role shaped. This Airtable form is for the Head of Projects
 * and nothing else. Give any future national role its own URL rather
 * than reusing this one.
 */
export const RESEARCH_OPERATIONS_LEAD_APPLICATION_FORM_URL =
  "https://airtable.com/appMwcwhDIpVSvLrz/pagfucm2gVY91sjPg/form";

/**
 * Pre-fill entry IDs for the Google Form. Still unconfirmed: replace with the
 * real IDs read off a pre-filled link from the live form (open the form, use
 * "Get pre-filled link", and read the entry ids out of the resulting URL).
 * Google silently drops unknown entry keys, so a wrong id costs the applicant
 * nothing except a field they fill in themselves. Nothing on the page promises
 * the pre-fill until these are verified.
 */
export const FORM_PREFILL = {
  chapterEntryId: "entry.2132087508",
  roleEntryId: "entry.542644840",
};

export function buildApplicationUrl(opts?: {
  chapter?: string;
  role?: string;
}): string {
  const url = new URL(APPLICATION_FORM_URL);
  url.searchParams.set("usp", "pp_url");
  if (opts?.chapter) {
    url.searchParams.set(FORM_PREFILL.chapterEntryId, opts.chapter);
  }
  if (opts?.role) {
    url.searchParams.set(FORM_PREFILL.roleEntryId, opts.role);
  }
  return url.toString();
}

/**
 * Exact text of the Communications Team Member option in the Google Form.
 * Web Designer, Content Creator, and Graphic Designer are presented as
 * distinct roles on the website but pre-fill this single form option, since
 * they are specialisations of the Communications Team Member role.
 */
export const COMMS_TEAM_FORM_VALUE =
  "Communications Team member (general or Web Designer, Content Creator, Graphic Designer, Photographer)";

/**
 * Exact text of the catch-all option in the Google Form's role field.
 *
 * The form is not extended when a new role goes live on the website, so roles
 * with no option of their own point here instead. Their card tells the
 * applicant to pick this option and name the actual role in the motivation
 * letter, which is what `formRoleValue === OPEN_POSITION_FORM_VALUE` switches
 * on in the apply hint.
 */
export const OPEN_POSITION_FORM_VALUE = "Open position";

// -----------------------------------------------------------------------------
// Role catalogue
// -----------------------------------------------------------------------------

export type Team =
  | "directors"
  | "education"
  | "events"
  | "communications"
  | "community"
  | "outreach"
  | "research";

export const TEAM_LABELS: Record<Team, string> = {
  directors: "Chapter Leadership",
  education: "Education",
  events: "Events",
  communications: "Communications",
  community: "Community",
  outreach: "Outreach",
  research: "Research",
};

export const TEAM_ORDER: Team[] = [
  "directors",
  "education",
  "events",
  "communications",
  "community",
  "outreach",
  "research",
];

export type Role = {
  id: string;
  title: string;
  team: Team;
  scope: "chapter" | "national";
  reportsTo: string;
  timeCommitment: string;
  /**
   * Short pill shown next to the role title to flag the shape of the
   * commitment, e.g. "Part-time". Shares the accent pill style with
   * `employment.badge` but is independent of it: setting this does not mark
   * the role as salaried or add the terms and benefits block.
   */
  commitmentBadge?: string;
  mission: string;
  responsibilities: string[];
  /**
   * Structured background for volunteer roles. Paid staff roles use the
   * bullet-style `goodFitIf` / `alsoStrong` instead, matching how the job
   * posting itself is written.
   */
  preferredBackground?: {
    field?: string;
    level?: string;
    experience?: string;
    softSkills?: string;
  };
  /** "You may be a good fit if you..." — rendered instead of `preferredBackground`. */
  goodFitIf?: string[];
  /** "Strong candidates may also have..." — non-essential strengths. */
  alsoStrong?: string[];
  collaborations: string;
  /**
   * Set only for paid staff positions. SAIN is otherwise a volunteer
   * organisation, so the presence of this field is what marks a listing as a
   * salaried job and switches the card over to showing terms and benefits.
   */
  employment?: {
    /** Short badge shown next to the role title, e.g. "Paid - Full-time". */
    badge: string;
    location: string;
    salary: string;
    contract: string;
    startDate: string;
    benefits: string[];
  };
  /**
   * Role-specific hiring stages. Overrides the site-wide
   * `APPLICATION_TIMELINE` on this role's card when set.
   */
  applicationProcess?: string[];
  /**
   * Optional override for the value used when pre-filling the form's role
   * field. Useful when several distinct website roles share a single form
   * option (e.g. Communications Team Member specialisations).
   */
  formRoleValue?: string;
  /**
   * Optional label shown on the role card to flag this role as a
   * specialisation of a broader role.
   */
  specialisationOf?: string;
};

export const ROLES: Record<string, Role> = {
  "education-lead": {
    id: "education-lead",
    title: "Education Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Chapter Director",
    timeCommitment: "6 to 10 hours per week, with iteration peaks",
    mission:
      "Run iterations of the AI Safety, Ethics and Society course in the chapter. Run discussion groups. Recruit, train, and support course facilitators and discussion leads. Maintain quality across cohorts and groups.",
    responsibilities: [
      "Plan and run course iterations (3-4 per year per chapter).",
      "Plan and run the relevant discussion groups.",
      "Recruit and onboard course facilitators and discussion leads while communicating closely with the facilitator mentor.",
      "Manage course logistics: cohort design, room booking, curriculum updates, project phase, graduation.",
      "Manage discussion logistics: group design, room booking.",
      "Keep the chapter education inbox in check.",
      "Coordinate with the Communications Lead on course and discussion group marketing.",
    ],
    preferredBackground: {
      field:
        "Open. Comfort with both technical and governance AI safety content essential.",
      level:
        "Master's preferred. Strong bachelor's with prior facilitation considered.",
      experience:
        "Facilitation, teaching, or course design experience preferred. Prior AI safety course participation strongly preferred (e.g. having completed a previous SAIN iteration).",
      softSkills:
        "Written communication, organisation, comfort facilitating discussion-based learning.",
    },
    collaborations:
      "The Chapter Director, facilitators, Communications Lead, Community Manager.",
  },

  "education-course-facilitator": {
    id: "education-course-facilitator",
    title: "Education Course Facilitator",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment: "About 4 hours per week during iterations (one 2-hour session plus prep)",
    mission:
      "Facilitate one cohort of the course. Lead weekly discussions, support participants, and mark final projects.",
    responsibilities: [
      "Read the weekly readings ahead of the cohort.",
      "Run weekly interactive sessions.",
      "Provide feedback on the final project, depending on the course.",
      "Attend the facilitator check-ins with the Education Lead.",
    ],
    preferredBackground: {
      field:
        "Track-aligned: technical track facilitators with technical background; governance track with policy, law, or philosophy background.",
      level:
        "Professional or master's preferred. Strong bachelor's with prior course participation considered.",
      experience:
        "Prior completion of a previous AI safety course (ours or a comparable one) strongly preferred.",
      softSkills:
        "Warmth, ability to draw out quieter participants, willingness to admit uncertainty.",
    },
    collaborations: "Education Lead, fellow facilitators, course participants.",
  },

  "education-discussion-lead": {
    id: "education-discussion-lead",
    title: "Education Discussion Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "About 3 hours per week during the running block (1-hour session plus about 2 hours of prep, curation, and chat moderation)",
    mission:
      "Run one Discussion Group on a specific theme (technical safety, AI governance, privacy, and so on). Maintain a high-quality, casual environment where 8 to 10 participants engage seriously with shared material and with each other.",
    responsibilities: [
      "Pick themes at least a week in advance and prepare questions aligned with the group's focus.",
      "Brief the Communications Lead on promotional details: theme, time, location, description, RSVP mechanism.",
      "Curate reading material before each session: papers, articles, recent cases.",
      "Run the weekly 1-hour session in an informal setting (cafe, rented space, chapter office). Sessions may extend by 30 minutes if participants want to.",
      "Frame the discussion at the start, moderate to keep it balanced, summarise insights at the end. Encourage less participatory members.",
      "Document key points, arguments, disagreements, and open questions in the group's shared session document.",
      "Manage the group's communication platform: keep it on-topic, send reminder posters 2 days before each session, nudge less active participants supportively.",
      "At the start of each block, run the sign-up form, prune inactive members, and refresh the group with new participants.",
      "Surface participants who want to go deeper to the Education Lead, the Research Hub, or Substack opportunities.",
    ],
    preferredBackground: {
      field:
        "Aligned with the group's theme. Technical groups benefit from a CS/ML background; governance and privacy groups benefit from policy, law, ethics, or social-science backgrounds.",
      level: "Bachelor's minimum, master's and above preferred.",
      experience:
        "Prior facilitation, prior reading-group participation, or substantive engagement with the theme. Familiarity with current AI safety discourse in the chosen area is strongly preferred.",
      softSkills:
        "Facilitation (drawing out quieter voices, gently containing dominators), genuine curiosity, comfort moderating without dominating, reliability week to week.",
    },
    collaborations:
      "Education Lead, fellow Discussion Leads, Communications Lead, Head of Projects and chapter Research Operations.",
  },

  "events-lead": {
    id: "events-lead",
    title: "Events Lead",
    team: "events",
    scope: "chapter",
    reportsTo: "Chapter Director",
    timeCommitment: "6 to 10 hours per week",
    /* Paid since September 2026 (upstream #54). The badge is what tells a
       reader this chapter role is compensated where its neighbours are not. */
    commitmentBadge: "Paid - Part-time",
    mission:
      "Plan and execute the chapter's events. Maintain the chapter's event presence, attract speakers, organise community life. Identify opportunities for SAIN exposure to reach new audiences, strengthen the community, and inspire people into AI safety careers.",
    responsibilities: [
      "Plan a balanced calendar of professional events, community socials, and hackathons. Communicate key dates to Communications Lead.",
      "Identify exposure opportunities for SAIN board and community members.",
      "Recruit and brief external speakers.",
      "Manage event logistics: venue, catering, marketing handover to Communications.",
      "Run the team meeting.",
      "Triage the chapter events inbox.",
      "Coordinate budget with the Chapter Director.",
    ],
    preferredBackground: {
      field: "Open. Genuine interest in AI safety required.",
      level: "Not relevant.",
      experience:
        "Prior event organisation (student associations, conferences, hackathons) strongly preferred.",
      softSkills:
        "Project management, comfort cold-emailing speakers, calmness under deadline pressure, strong social skills.",
    },
    collaborations:
      "The Chapter Director, Communications Lead, Community Manager, external speakers, venue contacts.",
  },

  "events-team-member": {
    id: "events-team-member",
    title: "Events Team Member",
    team: "events",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Work alongside the Events Lead to deliver events end-to-end.",
    responsibilities: [
      "Take ownership of specific events as delegated by the Events Lead.",
      "Help with logistics: bookings, catering, on-site setup.",
      "Attend the weekly team meeting.",
      "Be present at events.",
    ],
    preferredBackground: {
      field: "Open. Strong passion for AI safety.",
      level: "Not relevant.",
      experience:
        "Not required; willingness to learn is enough. Previous experience organising events is a bonus.",
      softSkills: "Reliability, willingness to do hands-on work, social.",
    },
    collaborations: "Events Lead, fellow team members.",
  },

  "communications-lead": {
    id: "communications-lead",
    title: "Communications Lead",
    team: "communications",
    scope: "chapter",
    reportsTo: "Chapter Director",
    timeCommitment: "6 to 10 hours per week",
    mission:
      "Run the chapter's internal and external communication. Maintain the chapter's social media presence, coordinate with the national communications leads on shared communication goals, and uphold a consistent brand and tone. Ensure the chapter's events and outputs are optimised for awareness, action (applying to courses), conversion (career switching), or community strengthening.",
    responsibilities: [
      "Run the chapter's Instagram, LinkedIn and WhatsApp announcements in line with the brand kit (agreed templates with SAIN fonts and colours).",
      "Align the content calendar at the beginning of each month with broader organisational goals and SAIN's content pillars.",
      "Identify relevant content to reshare on socials to maintain and grow engagement (advisors, board members, partner organisations).",
      "Propose designs for offline materials, e.g. roll-ups, mugs, T-shirts.",
      "Research and share best practices with Communications Team members.",
      "Delegate tasks with clear expectations and deadlines according to the content calendar.",
      "Coordinate with the Events Lead on event marketing timelines. Drive event anticipation, registration, and post-event recaps.",
      "Coordinate with the Education and Research Leads quarterly on whether any projects benefit from promotion.",
      "Maintain and optimise the chapter portion of the website.",
      "Sync at least quarterly with the other chapters' Communications Leads.",
      "Triage the chapter PR inbox.",
    ],
    preferredBackground: {
      field:
        "Open. Communications, marketing, design, or journalism experience helpful but not required.",
      level: "Bachelor's minimum.",
      experience:
        "Prior social media management, content creation, or journalism. Familiarity with Canva, Figma, or equivalent.",
      softSkills:
        "Writing, visual sense, attention to brand consistency.",
    },
    collaborations:
      "The Chapter Director, Events Lead, Education Lead, Research Lead, Community Manager, other chapters' Communications Leads.",
  },

  "communications-team-member": {
    id: "communications-team-member",
    title: "Communications Team Member",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Strengthen the chapter's internal and external communication. Coordinate with the Communications Lead on shared goals and a consistent brand and tone across all channels.",
    responsibilities: [
      "Create posts per the chapter's posting calendar across Instagram, LinkedIn or WhatsApp. Create design content, photographs, and videos that can be cross-shared when relevant.",
      "Observe what content performs well, replicate it, and share recommendations with team members.",
      "Cover events live (real-time stories, photos, videos).",
      "Work on local and national SAIN branding.",
      "Attend the weekly team meeting.",
      "Propose ideas based on observed engagement.",
    ],
    preferredBackground: {
      field: "Open.",
      level: "Bachelor's minimum.",
      experience: "Prior content creation helpful.",
      softSkills: "Visual sense, writing, reliability.",
    },
    collaborations: "Communications Lead, Events Lead.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
  },

  "web-designer": {
    id: "web-designer",
    title: "Web Designer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Keep the chapter's web presence polished, up to date, and consistent with SAIN's brand.",
    responsibilities: [
      "Build and maintain chapter web pages, ensuring content and design are current.",
      "Implement updates requested by the Communications, Events, or Education Lead.",
      "Optimise pages for readability, mobile responsiveness, and load performance.",
      "Ensure visual consistency with SAIN's brand kit across all web-facing assets.",
      "Propose and prototype improvements to page layout and user flow.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field: "Open. Design, computer science, or media studies are helpful.",
      level: "Bachelor's minimum.",
      experience:
        "GitHub experience is a must as our website is developed accordingly. Prior web design or front-end development (portfolio preferred). Familiarity with tools such as Webflow, WordPress, or Figma.",
      softSkills:
        "Visual sense, attention to detail, ability to take and act on feedback.",
    },
    collaborations: "Communications Lead, Communications Team members.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "content-creator": {
    id: "content-creator",
    title: "Content Creator",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Produce written and multimedia content that communicates SAIN's work, events, and mission to internal and external audiences.",
    responsibilities: [
      "Write copy for social media posts, newsletters, event announcements, and the website in line with SAIN's tone and brand.",
      "Produce short-form video or photo content for Instagram and LinkedIn, including live event coverage (stories, reels, recap posts).",
      "Adapt content to platform and audience: concise and visual for Instagram, professional and substantive for LinkedIn.",
      "Follow the monthly content calendar set by the Communications Lead.",
      "Monitor what content performs well and share observations with the team.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Journalism, communications, marketing, or media are helpful.",
      level: "Bachelor's minimum.",
      experience:
        "Prior content creation, copywriting, blogging, or social media management helpful. Portfolio or examples of prior work are a strong plus.",
      softSkills:
        "Writing, storytelling, creativity, ability to meet deadlines.",
    },
    collaborations:
      "Communications Lead, Graphic Designer, Events Lead.",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "graphic-designer": {
    id: "graphic-designer",
    title: "Graphic Designer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Create visual assets that make SAIN's communications distinctive, on-brand, and compelling across digital and print channels.",
    responsibilities: [
      "Design social media visuals, event posters, flyers, and banner graphics in line with SAIN's brand kit.",
      "Produce templates for recurring formats (event announcements, reminder posters, recap cards) for reuse by the Communications team.",
      "Design offline materials such as roll-ups, merchandise, and printed handouts as needed.",
      "Ensure all visual outputs are consistent with SAIN's fonts, colours, and tone.",
      "Incorporate feedback from the Communications Lead and iterate quickly.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Graphic design, visual communication, or media arts are helpful.",
      level: "Not relevant; portfolio carries more weight than credentials.",
      experience:
        "Prior graphic design work required. Proficiency in Canva, Figma, Adobe Illustrator, Photoshop, or equivalent. Portfolio strongly preferred.",
      softSkills:
        "Visual sense, attention to brand consistency, receptiveness to feedback, ability to work to deadlines.",
    },
    collaborations:
      "Communications Lead, Content Creator, Events Lead (for event materials), On-Campus Ambassador (for print materials).",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "photographer": {
    id: "photographer",
    title: "Photographer",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Capture, edit, and deliver high-quality visual imagery that documents SAIN's activities, humanises the organisation's mission, and enhances storytelling across all digital and print platforms.",
    responsibilities: [
      "Photograph live events, workshops, panels, and social gatherings hosted by the chapter.",
      "Conduct planned photo shoots for team portraits, marketing campaigns, and promotional materials.",
      "Edit and touch up raw imagery to maintain a professional, polished aesthetic aligned with SAIN's brand tone.",
      "Organise and maintain a shared digital media library (e.g. Google Drive) with properly tagged, high-resolution assets for the Communications team.",
      "Incorporate feedback from the Communications Lead regarding visual style and selection.",
      "Attend the weekly Communications team meeting.",
    ],
    preferredBackground: {
      field:
        "Open. Photography, media production, or visual arts are helpful.",
      level:
        "Not relevant; portfolio and technical skill carry more weight than credentials.",
      experience:
        "Prior photography and editing experience required. Experience with Adobe Lightroom, Photoshop, or equivalent editing software. Access to professional or semi-professional camera equipment is helpful. A portfolio or gallery of past work is strongly preferred.",
      softSkills:
        "Keen eye for framing and lighting, ability to capture candid moments, reliability in meeting post-production deadlines, and a comfortable demeanour when interacting with event attendees.",
    },
    collaborations:
      "Communications Lead, Content Creator, Events Lead (for event materials).",
    formRoleValue: COMMS_TEAM_FORM_VALUE,
    specialisationOf: "Communications Team Member",
  },

  "community-manager": {
    id: "community-manager",
    title: "Community Manager",
    team: "community",
    scope: "chapter",
    reportsTo: "Chapter Director",
    timeCommitment: "4 to 6 hours per week",
    mission:
      "Welcome people into the chapter community and funnel them into deeper involvement. Be the friendly face and first point of contact.",
    responsibilities: [
      "Identify and welcome new community members (chapter WhatsApp, after course iterations, after events).",
      "Maintain the community relationship management database: track first contact, study, year, level of involvement (GDPR-compliant).",
      "Be present at chapter events; approach new people there.",
      "Funnel interested community members towards open positions, course iterations, and events. Forward opportunities from announcement channels to specific high-potential members.",
      "Triage the chapter community manager inbox.",
      "Attend Team Lead Meetings; flag community insights and pain points.",
    ],
    preferredBackground: {
      field: "Open.",
      level: "Not relevant.",
      experience:
        "Prior community management, student association leadership, or similar helpful.",
      softSkills:
        "Warmth, social fluency, reliability, comfort with light data work.",
    },
    collaborations:
      "The Chapter Director, all team leads, course graduates, community members.",
  },

  "on-campus-ambassador": {
    id: "on-campus-ambassador",
    title: "On-Campus Ambassador",
    team: "outreach",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment: "3 to 5 hours per week",
    mission:
      "Be SAIN's face on campus. Drive awareness and foot traffic to SAIN events by reaching students where they are: at notice boards, tabling spots, and in passing.",
    responsibilities: [
      "Table at university common areas to introduce SAIN to students and invite them to upcoming events.",
      "Distribute flyers and printed materials across campus ahead of events and course iterations.",
      "Post and maintain advertisements on university notice boards and approved campus display areas.",
      "Engage passersby in friendly, informed conversation about SAIN's activities and mission.",
      "Coordinate with the Events Lead on upcoming dates, materials needed, and target locations.",
      "Report back on campus reception, questions asked, and any leads to pass to the Community Manager.",
    ],
    preferredBackground: {
      field: "Open. Genuine interest in AI safety required.",
      level: "Not relevant.",
      experience:
        "Not required. Prior brand ambassador, student rep, or outreach experience is a bonus.",
      softSkills:
        "Outgoing, approachable, reliable, comfortable initiating conversations with strangers.",
    },
    collaborations:
      "Events Lead, Communications Lead, Community Manager.",
  },

  "research-operations-lead": {
    id: "research-operations-lead",
    title: "Head of Projects",
    team: "research",
    scope: "national",
    reportsTo: "Executive Director",
    timeCommitment:
      "Full-time (1.0 FTE), 40 hours per week, 5-day week",
    mission:
      "Hundreds of people in the Netherlands finish an AI safety course each year, and almost none go on to do anything with it. The Research Hub exists to close that gap: it is where someone who has done a course or two makes their first real contribution, whether that is a paper, a policy submission, an eval, a tool, or a Dutch-language resource. You run both of its tracks, supervised projects and open collaboration, and you are accountable for how many reach a finished, valuable state. Today the Hub has a few supervisors, a few completed projects, and volunteer teams in three chapter cities. Your job is to make it flourish. As the fourth person on SAIN's national team, you own its strategy, budget, and volunteer teams. The work is project management and relationship-building: you do not need to be the smartest researcher in the room, you need to be the person who makes sure fifty projects actually get finished.",
    responsibilities: [
      "Set and hold the strategic direction of the Research Hub, together with leadership and the Advisory Board.",
      "Proactively recruit supervisors and source projects, across research, policy and technical work.",
      "Run the application process; match people to supervisors and projects.",
      "Monitor active projects and intervene when they stall.",
      "Recruit, onboard and manage the Research Operations teams in each chapter; maintain continuity across academic-year turnover.",
      "Work with Communications to publish and promote the Hub's output; maintain the Research Hub Handbook; track and report Hub metrics.",
    ],
    goodFitIf: [
      "Have demonstrated experience managing a team, volunteers, or junior researchers.",
      "Have a track record of chasing things to a finished state without being asked. Being proactive is very important.",
      "Are familiar with the field of AI safety, on both the technical and the governance/policy side.",
      "Are comfortable working with senior people in academia, industry and government.",
    ],
    alsoStrong: [
      "Published AI safety research, or shipped policy or technical work in the field.",
      "Familiarity with the Dutch academic and policy landscape.",
      "Professional working proficiency in Dutch.",
    ],
    collaborations:
      "Executive Director, Advisory Board, technical advisors, chapter Research Operations volunteers, supervisors, researchers and project contributors, Communications.",
    employment: {
      badge: "Paid - Full-time",
      location:
        "Amsterdam, with regular travel to SAIN chapter cities within the Netherlands",
      salary: "€50k-€60k gross per year",
      contract: "One-year contract, 40h, 5-day week",
      startDate: "As soon as possible",
      benefits: [
        "8% holiday allowance",
        "Flexible additional leave",
        "A budget for the Research Hub's operations",
      ],
    },
    applicationProcess: [
      "Initial screener: a 30-minute conversation with a member of our leadership team.",
      "Work test: a roughly 2-hour take-home assignment mirroring the real job. If you advance past this stage, we will ask your permission to contact references.",
      "Final conversation: 45 to 60 minutes with the Director and one of our technical advisors, including discussion of your work test.",
      "Work trial: a paid 2-day work trial in Amsterdam or remote, doing exactly what the job requires.",
    ],
  },

  "research-operations": {
    id: "research-operations",
    title: "Research Operations",
    team: "research",
    scope: "national",
    reportsTo: "Head of Projects",
    timeCommitment:
      "2 hours per week in quiet times to 8 hours per week when many supervisors and researchers are onboarded",
    mission:
      "Make the Research Hub run smoothly day-to-day. Handle operational logistics, onboard new researchers and supervisors, and shape the research direction with the Research Lead.",
    responsibilities: [
      "Decide the strategic direction of the Research Hub together with the Lead.",
      "Track applicants and ongoing projects (the Research Hub interest tracker).",
      "Send check-in forms and follow up on open ones.",
      "Maintain Discord channels and the GitHub organisation.",
      "Keep the website's research section updated.",
    ],
    preferredBackground: {
      field:
        "Open. Technical background helpful (familiar with GitHub, basic ML literacy).",
      level: "Bachelor's minimum, master's preferred.",
      experience:
        "Prior research support, lab management, or operational role helpful but not required.",
      softSkills:
        "Reliability, attention to detail, comfort with admin work.",
    },
    collaborations:
      "Head of Projects, supervisors, researchers.",
  },

  "education-lead-utrecht": {
    id: "education-lead-utrecht",
    title: "Education Lead",
    team: "education",
    scope: "chapter",
    reportsTo: "Chapter Director",
    timeCommitment:
      "10 to 15 hours per week, spread across the week, with peaks during course iterations and pre-incubation cycles",
    commitmentBadge: "Paid - Part-time",
    mission:
      "Own the coordination and partnerships side of SAIN Utrecht's education-to-incubation pipeline: make sure the courses run well, the facilitator team is supported, promising participants become concrete pre-incubation projects, and SAIN courses are connected to the wider AI safety field and to institutions. The Education Lead does not own the code repository; that sits with the Research Ops & Repository Steward. This is a paid position, not a volunteer role: compensation reflects the coordination and accountability responsibilities below.",
    responsibilities: [
      "Plan and coordinate course iterations (Intro, Technical, Governance), including the Technical AI Safety program (e.g. ARENA 2-4) and the Agents + CyberSec, Biorisk, and Embodied AI Safety modules: schedules, cohort logistics, participant communication, and curriculum currency.",
      "Coordinate with Incubation Ops (Research Team) to turn strong course participants into projects in the pre-incubation stage: scope Forge proposals, match participants to project tracks and mentors, and hand projects over to Incubation Ops with a clear status summary.",
      "Work with the Research Ops & Repository Steward to make sure Forge proposals and incubating projects get a technical assessment before they progress to the Research Hub, a Grant (Type 1/2), or an external mentor pipeline.",
      "Find and maintain partnerships in the AI safety field (e.g. ARENA, Apart Research, SecureBio, Convergent Robotics, BlueDot Impact) that strengthen SAIN's courses, mentor network, and project pipeline.",
      "Find and maintain partnerships with institutions (UU departments, other universities, research groups, companies) for SAIN courses: guest lecturers, course recognition or credit, shared cohorts, and co-run programs. Hand leads to the Ambassador and Director where relevant.",
      "Recruit, train, and support facilitators and TAs, and run regular facilitator check-ins. Track cohort progress and flag participants ready for early hand-off.",
      "Coordinate updates to course content with the Director, the Discussion Team, and SAIN Research Hub agenda topics.",
      "Coordinate with the Communications Lead on course marketing and with the Events Lead on hackathon and challenge design.",
      "Keep a steady weekly presence, not only on weekends: check the education inbox and facilitator channels on weekdays, answer participant and partner messages promptly, and keep pre-incubation and partnership threads moving with regular small actions. A few short check-ins during the week are worth more than one long weekend session.",
    ],
    preferredBackground: {
      field:
        "Open. A technical, governance, or related background with solid AI safety literacy.",
      experience:
        "Prior AI safety course completion or facilitation experience strongly preferred. Experience in program coordination, partnership building, or running a student organisation or team.",
      softSkills:
        "Strong communication and follow-through, and comfort with cold outreach to organisations and institutions. Comfortable working with technical contributors and relying on their assessments without needing to do the code review personally. Reliable, with a weekly rhythm: able to commit to consistent weekday availability.",
    },
    collaborations:
      "Chapter Director, Research Lead, Research Ops & Repository Steward, Incubation Ops, Events Lead, Communications Lead, facilitators, external partners and institutions.",
  },

  "research-ops-repository-steward": {
    id: "research-ops-repository-steward",
    title: "Research Ops & Repository Steward",
    team: "research",
    scope: "chapter",
    reportsTo: "Research Lead",
    timeCommitment:
      "~6 to 8 hours per week, spread across the week, with peaks during incubation cycles and external project deadlines",
    mission:
      "Build and look after SAIN Utrecht's technical backbone. Create and maintain the SAIN Repository, hold incubated code to a high engineering standard, and collaborate with external companies on projects. This role makes sure that what SAIN publishes, benchmarks, and demonstrates is reproducible and technically trustworthy.",
    responsibilities: [
      "Create and maintain the SAIN Repository: repo structure, contribution standards, PR review and approval, CI/testing hygiene, documentation, and reproducibility of benchmarks and demos.",
      "Collaborate with the Education Lead and Incubation Ops to provide technical assessment of Forge proposals and incubating projects, and advise on which are ready to progress to the Research Hub, a Grant, or an external mentor pipeline.",
      "Collaborate with external companies on projects: scope joint work, keep technical deliverables on track, and act as the technical contact.",
      "Support course facilitators who own module repositories (e.g. Embodied AI Safety) by aligning their repos with SAIN-wide standards.",
      "Help design hands-on project tracks (agent security benchmarks, sandboxing, MCP/tool-ecosystem security, AI×Bio project ladder, embodied AI red-teaming), calibrated to participants' skill levels.",
      "Give technical feedback to project teams that participants and mentors will trust.",
      "Contribute throughout the week rather than in weekend bursts: review PRs in a timely way, keep CI green, and respond to project teams and external partners within a few days.",
    ],
    preferredBackground: {
      field: "AI/ML, Computer Science, or an adjacent technical field.",
      level: "Master's preferred. PhD or PhD in progress is a plus.",
      experience:
        "Proficiency in coding is required, and applicants must provide a GitHub repository or profile showing their work. Solid grounding in machine learning. Comfortable owning a shared codebase (branching, code review, testing, reproducibility), not just personal research code.",
      softSkills:
        "Reliability, clear written communication, and comfort giving direct, respectful technical feedback.",
    },
    alsoStrong: [
      "A background in cybersecurity, robotics, reinforcement learning, or interpretability.",
      "Prior AI safety course completion, or competition or research output (ARENA, MATS, SPAR, Apart Research sprints).",
    ],
    collaborations:
      "Research Lead, Education Lead, Incubation Ops, facilitators, Events Lead, external companies and mentors.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "education-facilitator-evals": {
    id: "education-facilitator-evals",
    title:
      "Education Course Facilitator, Science of Evaluation (LLM Evals)",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "~4 to 6 hours per week during iterations (one 2-hour session plus prep, homework review, and cross-track coordination), with peaks before events and hackathons",
    mission:
      "Build the foundation for upskilling SAIN Utrecht's community to evaluate risks from transformative AI. Facilitate the Science of Evaluation module of the Technical AI Safety program, focused on LLMs, covering benchmarking, field understanding, evaluation trajectories, and model capabilities. Beyond teaching the module, coordinate with the Education Lead and the other technical tracks (CyberSec & Agentic AI, Biosecurity & AI, Embodied AI Safety) to turn evaluation methods into evaluation projects specific to each domain, and develop demos of risks that SAIN can show at events and in courses.",
    responsibilities: [
      "Read all assigned materials ahead of each cohort session, especially technical materials from AI safety organisations and companies (e.g. the ARENA evaluation modules, frontier lab and AI safety institute evaluation reports and frameworks).",
      "Run weekly interactive sessions on the science of evaluation: how benchmarks are designed and where they fail, measuring model capabilities and propensities, the limits of evals (validity, contamination, sandbagging, elicitation gaps), and how the field and eval methods have developed over time.",
      "Give participants a shared vocabulary and toolkit, from reading a benchmark critically to designing and running a small evaluation, so they can move on to domain-specific work.",
      "Coordinate with the Education Lead and the facilitators of the other tracks to define evaluation projects for their domains (e.g. agent security benchmarks, non-operational AI×Bio evaluation design, embodied AI red-teaming setups). Advise on methodology and hand promising projects to the pre-incubation pipeline.",
      "Work with the Research Ops & Repository Steward and build on the SAIN Repository: align eval code, course notebooks, and demos with its contribution standards, and contribute reusable eval templates and reproducible baselines.",
      "Develop demos of risks for SAIN to show at events and courses (e.g. live model-behaviour demos, eval walkthroughs, \"how do we know if a model is dangerous?\" interactive exhibits). Coordinate with the Events Lead on format and with the Communications Lead on how demos are presented publicly.",
      "Keep demos responsible: they illustrate risk and evaluation methods without providing operational uplift or hazardous content, and sensitive demos get sign-off from the Education Lead or Director before public use.",
      "Review homework notebooks and project code, give direct technical feedback, and flag strong participants for the Forge/Incubation pipeline.",
      "Keep the module current as evaluation methods, benchmarks, and model capabilities change, in coordination with the Education Lead and the SAIN Research Hub agenda.",
      "Attend regular facilitator check-ins with the Education Lead and report on cohort progress and curriculum needs.",
      "Contribute throughout the week rather than only on weekends: short weekday check-ins on participant questions, cross-track coordination, and demo development.",
    ],
    preferredBackground: {
      field:
        "AI/ML, Computer Science, or an adjacent technical field, with hands-on LLM experience.",
      level:
        "Master's or PhD preferred. A strong bachelor's with relevant evals or research experience is considered.",
      experience:
        "Hands-on work with LLM evaluations or benchmarking (running evals, designing tasks, or analysing model behaviour), or completion of an AI safety technical course such as ARENA (evaluation modules in particular). Some demonstrable technical output: a GitHub repo, research contributions, or competition/sprint results such as Apart Research, MATS, or SPAR. Comfortable working in a shared codebase (branching, PR review, reproducibility) and with the SAIN Repository standards.",
      softSkills:
        "Ability to make evaluation concepts accessible to a mixed-skill cohort, comfort giving critical technical feedback, and a collaborative attitude toward the other tracks.",
    },
    alsoStrong: [
      "Familiarity with eval frameworks and tooling, red-teaming experience, or a background in one of the other tracks (cybersecurity, biosecurity, robotics/RL).",
      "Experience building demos or interactive exhibits for a general audience.",
    ],
    collaborations:
      "Education Lead, Research Ops & Repository Steward, Research Lead, fellow Technical facilitators (CyberSec & Agentic AI, Biosecurity & AI, Embodied AI Safety), Events Lead (demos, hackathons, challenges), Communications Lead, external AI safety organisations.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "education-facilitator-cybersec": {
    id: "education-facilitator-cybersec",
    title: "Education Course Facilitator, CyberSec & Agentic AI Track",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "~4 to 5 hours per week during iterations (one 2-hour session plus prep and homework review)",
    mission:
      "Facilitate the Agentic AI + CyberSec module of the Technical AI Safety program. Lead weekly sessions covering agent attack surfaces and defenses (prompt injection, tool misuse, memory poisoning, sandboxing, multi-agent security), support participants through their notebooks and project work, and help identify strong candidates for the Agentic AI Security project portfolio and the Forge/Incubation pipeline.",
    responsibilities: [
      "Read all assigned materials ahead of each cohort session (ARENA modules, agent security literature).",
      "Run weekly interactive sessions on agentic AI security topics: attack taxonomies, agent identity and privilege management, MCP and tool-ecosystem risks, red-teaming frameworks.",
      "Review homework notebooks and provide technical feedback; flag participants who complete strong work for the Research Hunger Games / solo project track.",
      "Support project scoping for cohort members progressing into the Agentic AI Security Benchmark, Agent Sandbox, or Secure-by-Design portfolio projects.",
      "Attend regular facilitator check-ins with the Education Lead; report on cohort progress and any participants ready for early hand-off.",
    ],
    preferredBackground: {
      field:
        "Computer Science, Cybersecurity, or AI/ML with hands-on security experience (red-teaming, pentesting, or agent/LLM security research).",
      level:
        "Professional or master's preferred. Strong bachelor's with relevant industry or CTF/red-team experience considered.",
      experience:
        "Direct hands-on exposure to agentic AI systems and/or applied cybersecurity, e.g. prior red-team work, security research, or completion of an AI safety technical course such as ARENA.",
      softSkills:
        "Warmth, ability to make technical material accessible to a mixed-skill cohort, comfort giving direct code and security feedback.",
    },
    collaborations:
      "Education Lead, Research Lead, fellow Technical facilitators, Events Lead (for the hackathon pipeline).",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "education-facilitator-biosecurity": {
    id: "education-facilitator-biosecurity",
    title:
      "Education Course Facilitator, Biosecurity & AI (CBRN Risk Focus)",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "~4 hours per week during iterations (one 2-hour session plus prep)",
    mission:
      "Facilitate the biosecurity module across the Intro, Technical, and Governance programs, with a focus on AI-driven CBRN risk: how frontier AI systems intersect with biological risk pathways, how that risk is evaluated and governed, and how students can contribute to non-operational, safety-oriented research (threat modeling, evaluation design, governance analysis) without ever generating or handling operationally sensitive content.",
    responsibilities: [
      "Read all assigned readings ahead of sessions (SecureBio biorisk evaluations, dual-use LLM risk literature, relevant governance material) and keep pace with fast-moving developments in this area.",
      "Run weekly sessions introducing AI×bio risk concepts at the appropriate level for each track: high-level risk-pathway framing for Intro, deeper technical and evaluation framing for Technical, and policy or governance framing for the Governance program.",
      "Guide participants toward safe, non-dangerous project formats from the AI×Bio project ladder (e.g. risk-landscape mapping, threat modeling, capability taxonomies, evaluation-benchmark design, governance gap analysis), strictly avoiding any project that could generate or require real operational biological uplift content.",
      "Provide feedback on written project work (essays, threat models, policy papers) and flag strong candidates for the Research Hub or Governance E2I pipeline.",
      "Coordinate with the Education Lead on maintaining curriculum accuracy as CBRN-related guidance and public research evolves.",
      "Attend regular facilitator check-ins with the Education Lead.",
    ],
    preferredBackground: {
      field:
        "Biosecurity, biosafety, life sciences, public health, or AI governance/policy with a demonstrated interest in dual-use biological risk. Candidates from a technical AI background with strong biosecurity literacy are also welcome.",
      level:
        "Master's or PhD preferred. Professionals with relevant biosecurity, biosafety, or policy experience strongly considered.",
      experience:
        "Familiarity with biosecurity risk frameworks, dual-use research of concern (DURC) norms, or AI-bio evaluation literature (e.g. SecureBio, frontier lab biorisk evaluations). Prior completion of an AI safety course preferred.",
      softSkills:
        "Strong ability to discuss CBRN risk pedagogically and responsibly, framing risk pathways and governance gaps without ever walking through operational detail. This is a non-negotiable requirement for the role. Comfort facilitating a sensitive topic with care, intellectual humility, and the ability to redirect discussion away from operational specifics while keeping it substantive.",
    },
    collaborations:
      "Education Lead, Governance track facilitators, Research Lead, Director (for any content requiring sign-off given the sensitivity of the topic).",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "education-facilitator-embodied": {
    id: "education-facilitator-embodied",
    title:
      "Education Course Facilitator, Embodied AI Safety (Physical AI Track)",
    team: "education",
    scope: "chapter",
    reportsTo: "Education Lead",
    timeCommitment:
      "~4 to 5 hours per week during iterations (one 2-hour session plus prep and homework review)",
    mission:
      "Facilitate the Embodied AI Safety module of the Technical AI Safety program. Lead weekly sessions on the distinct risks posed by physical AI systems: sabotage of infrastructure, loss of control through irreversible physical action, and the limits of transferring digital-AI safety tooling (RLHF, CoT monitoring, interpretability) to multimodal, RL-trained, VLA/world-model architectures. Own the GitHub repository for the module's code and coursework, supervise students' hands-on work with reinforcement learning for robotics, and help identify strong candidates for embodied red-teaming and incubation projects.",
    responsibilities: [
      "Read all assigned materials ahead of each cohort session (physical AI misalignment case studies, RL-for-robotics literature, VLA/world-model safety papers, relevant threat-modeling and red-teaming reports).",
      "Run weekly interactive sessions on embodied AI safety topics: embodiment and irreversibility, physical threat modeling, RL reward hacking in robotic control, sim-to-real gaps, and the non-transferability of LLM-era alignment techniques to non-linguistic, action-based systems.",
      "Own and maintain the module's shared GitHub repository: set up starter code and simulation environments, define contribution standards, review and merge student pull requests, and keep coursework reproducible.",
      "Supervise students' technical work with reinforcement learning for robotics (policy training, reward design, sim environments), using NVIDIA robotics/RL libraries (e.g. Isaac Sim, Isaac Lab, Isaac Gym) or comparable frameworks (e.g. MuJoCo, Affine) as the technical backbone of exercises and projects.",
      "Provide TAing-style feedback on homework and project code: debugging RL training runs, reviewing environment and reward design, and giving direct, technical feedback students and mentors will trust.",
      "Help scope and support student projects aligned with the Embodied AI Safety project ladder (e.g. red-teaming a simulated robot policy, threat-model case studies, monitoring and control prototypes for physical agents), drawing on collaborator work such as Convergent Robotics' threat-modeling and red-teaming agenda.",
      "Draft and iterate on the curriculum for the Embodied AI Safety course (session plans, readings, project tracks) in coordination with the Education Lead, and keep it current as physical AI capabilities and incidents evolve.",
      "Flag participants who complete strong work for the Forge/Incubation pipeline or for introductions to external collaborators working on physical AI safety.",
      "Attend regular facilitator check-ins with the Education Lead; report on cohort progress and curriculum needs.",
    ],
    preferredBackground: {
      field:
        "Robotics, Computer Science, AI/ML, or a related technical field, with hands-on exposure to reinforcement learning and/or robotics.",
      level:
        "Master's or PhD preferred. Strong bachelor's with relevant research, an RL/robotics project, or industry experience considered.",
      experience:
        "Direct hands-on work with RL for robotics and familiarity with common simulation and training stacks (NVIDIA Isaac Sim/Isaac Lab/Isaac Gym, MuJoCo, Affine, or equivalent). Comfortable owning and maintaining a shared codebase (branching, PR review, reproducibility), not just personal research code. Some demonstrable technical output in robotics/RL or AI safety: repos, coursework, competition results, or research contributions. Prior completion of an AI safety technical course (e.g. ARENA) strongly preferred.",
      softSkills:
        "Ability to make RL and robotics concepts accessible to a mixed-skill cohort, comfort giving direct code feedback, and care in framing physical-risk scenarios responsibly.",
    },
    alsoStrong: [
      "Familiarity with physical AI threat models (sabotage, loss of control, emotional or physical manipulation), or prior exposure to red-teaming methodology.",
    ],
    collaborations:
      "Education Lead, Research Lead, fellow Technical facilitators, Events Lead (for the hackathon pipeline), external physical AI safety collaborators.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Education Course Facilitator",
  },

  "sain-ambassador": {
    id: "sain-ambassador",
    title: "SAIN Ambassador",
    team: "outreach",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment:
      "~4 to 6 hours per week, with peaks around conference season, welcome week, and major university events",
    mission:
      "Be the outward-facing presence of SAIN Utrecht on campus and beyond: get the chapter into rooms it is not in yet. Help represent SAIN Utrecht through tabling, pitching, workshops, talks, and conferences, with a particular focus on starting and maintaining collaborations with UU departments. This role exists to make sure SAIN Utrecht is visible, credible, and actively building relationships across the university, not just running its own internal programming.",
    responsibilities: [
      "Represent SAIN Utrecht at tabling events (welcome fairs, department open days, student association markets) to recruit interest and raise awareness of the chapter.",
      "Pitch SAIN Utrecht, its mission, programs, and pipeline to university departments, student societies, professors, and potential partners, adapting the pitch to each audience.",
      "Identify and pursue opportunities at conferences (attending, tabling, or speaking) that raise SAIN Utrecht's profile and surface new collaborators or participants.",
      "Proactively build and maintain relationships with UU departments (e.g. Computer Science, Philosophy, Ethics, and other relevant faculties) to open doors for guest talks, joint workshops, course-integration opportunities, or research collaboration.",
      "Scout and open new collaboration opportunities more broadly (other student associations, external orgs, academic groups) and hand off promising leads to the right internal owner: Education Lead, Research/Incubation Ops, or the Director.",
      "Coordinate closely with the Communications Lead so events are promoted effectively (event pages, social posts, university channels) and messaging stays consistent across pitches and materials.",
      "Coordinate closely with the Events Lead on the overall events calendar, prioritisation, and resourcing, ensuring ambassador activity feeds into rather than duplicates the chapter's broader event strategy.",
      "Track outreach and collaboration status (contacts made, pitches given, events run, collaborations opened) and report regularly to the Events Lead.",
    ],
    preferredBackground: {
      field:
        "Open. This is a relationship and representation role rather than a technical one, though familiarity with AI safety concepts is important for credible pitching.",
      experience:
        "Prior experience with outreach, community-building, event organisation, or representing an organisation publicly. Student association board experience, ambassador or rep roles, and sales or partnerships experience all transfer well.",
      softSkills:
        "Comfort with cold outreach: willing to approach departments, professors, and organisations without a warm introduction, and to follow up persistently. A strong communicator, confident and adaptable when pitching to different audiences, from students at a table to faculty in a meeting. Reliability under event-logistics pressure, organisation, and the discretion to represent SAIN Utrecht credibly to external stakeholders.",
    },
    alsoStrong: [
      "An existing network or familiarity with UU departments, student societies, or the broader Utrecht conference and event scene.",
    ],
    collaborations:
      "Events Lead, Communications Lead, Chapter Director, UU departments, external student organisations and conference organisers.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "events-team-member-facilitator": {
    id: "events-team-member-facilitator",
    title: "Events Team Member, Facilitator",
    team: "events",
    scope: "chapter",
    reportsTo: "Events Lead",
    timeCommitment:
      "~3 to 5 hours per week, with peaks during discussion group cycles and major events",
    mission:
      "Guide the conversation at SAIN Utrecht events. Lead discussion groups, reading groups, workshops, and panel Q&As so that participants of all backgrounds feel welcome, take part actively, and leave with a clearer understanding of AI safety. This role makes sure our events are not only well organised but also well discussed.",
    responsibilities: [
      "Facilitate discussion groups and reading groups as assigned by the Events Lead: open the session, guide the conversation, keep it on topic, and make sure everyone gets a chance to speak.",
      "Prepare each session in advance: read the materials, and write a short session plan (agenda, timings, discussion questions, activities).",
      "Moderate talks and panels: introduce speakers, keep time, and run the Q&A.",
      "Run the interactive parts of workshops and research challenges, such as icebreakers, breakout groups, group exercises, and wrap-ups.",
      "Create a safe and inclusive space: handle disagreements respectfully and adapt to mixed knowledge levels, from complete beginners to researchers.",
      "Collect feedback from participants after sessions and share it with the Events Lead to improve future events.",
      "Coordinate with the Education Lead on session content and reading materials where relevant.",
      "Attend the weekly team meeting and help with general event logistics when needed (setup, check-in, cleanup).",
    ],
    preferredBackground: {
      field:
        "Open. A solid grasp of core AI safety concepts (e.g. alignment, interpretability, governance) is important, so you can guide discussions and answer basic questions.",
      level: "Not relevant.",
      experience:
        "Not required; willingness to learn is enough. Prior experience with facilitating, teaching, tutoring, TA work, debating, or leading reading groups is a bonus, as is having completed an introductory AI safety course (e.g. BlueDot Impact).",
      softSkills:
        "A good listener, able to draw out quieter participants and keep more dominant voices in balance. Calm and neutral, able to guide discussions on contested topics without pushing personal views. Reliability, clear speaking, time management, and careful preparation.",
    },
    collaborations:
      "Events Lead, Education Lead, fellow team members, guest speakers.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
    specialisationOf: "Events Team Member",
  },

  "communications-lead-groningen": {
    id: "communications-lead-groningen",
    title: "Communications Lead",
    team: "communications",
    scope: "chapter",
    reportsTo: "Chapter Director",
    timeCommitment: "8 to 10 hours per week",
    commitmentBadge: "Paid - Part-time",
    mission:
      "SAIN Groningen is the Groningen chapter of Safe AI Netherlands, a national foundation developing the talent needed to address the risks of transformative AI in the Netherlands. We run talks, socials, courses and research projects for students and young professionals. The chapter has been running since 2023, first as the AI Safety Initiative Groningen. Since then, we have organised many events and brought around 60 people a year through our free AI safety course, and our members have published research at NeurIPS and ICLR workshops. Very few students and professionals in Groningen know any of this yet, and that is where you come in. As Communications Lead, you shape how the chapter shows up online and around the city. You run our channels, work closely with the events, education and research teams, and build your own small team of communications volunteers.",
    responsibilities: [
      "Run our Instagram, LinkedIn and Discord announcements using the SAIN brand kit (fonts, colours and templates).",
      "Plan a monthly content calendar that fits our wider goals and content themes.",
      "Promote events with the Events Lead: build anticipation, drive sign-ups and post recaps afterwards.",
      "Check in with the Education Lead and Research Operations about courses and projects worth promoting.",
      "Keep the Groningen page of the SAIN website current by sending updates to our website developers. They make the changes, so you never need to edit the site or work in GitHub yourself.",
      "Design offline materials such as roll-up banners and merchandise.",
      "Recruit and onboard communications volunteers, and assign them tasks with clear deadlines.",
      "Stay in touch with the Communications Leads at our Amsterdam and Utrecht chapters.",
      "Manage the chapter communications inbox.",
      "Reshare relevant content from our advisors, board members and partner organisations.",
    ],
    /* The brief also lists "Interest in AI safety" (required) and
       "Motivation", which have no row in `preferredBackground`, so they sit
       here rather than in a new Role field. */
    goodFitIf: [
      "Care about the risks of advanced AI and want to understand them better. You need no prior knowledge or background in AI, and we will help you get up to speed. If you already know the field, even better.",
      "Care about where AI is heading, and want more people to engage with it seriously.",
    ],
    preferredBackground: {
      field:
        "Studies or experience in communications, marketing, design or journalism.",
      level: "Bachelor's student, Master's student or graduate.",
      experience:
        "Some experience with social media, content creation or journalism. Comfortable with Canva or a similar design tool.",
      softSkills:
        "Strong writing, a good eye for visuals and consistency, creative confidence, reliability with deadlines, clear communication with the team, and flexibility when plans change.",
    },
    collaborations:
      "The Chapter Director, the Events Lead, the Education Lead, Research Operations, your communications volunteers, and the Communications Leads in Amsterdam and Utrecht.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

  "communications-team-member-groningen": {
    id: "communications-team-member-groningen",
    title: "Communications Team Member",
    team: "communications",
    scope: "chapter",
    reportsTo: "Communications Lead",
    timeCommitment:
      "2 to 6 hours per week, with a little more around events, for at least 9 months",
    mission:
      "We are building the SAIN Groningen communications team, and we are looking for volunteers who already have some design or content experience and want to put it to use. You create the posts, visuals and stories that bring students to our events and courses. You can lean into what you do best, whether that is design, writing, photography or video. In return, you get published work for your portfolio, made for a growing national organisation; creative input and feedback from the Communications Lead; a place in the SAIN community, with our events, socials, courses and discussion groups; a national network of students, researchers and professionals working on AI safety; room to grow into roles with more responsibility in the chapter; and a reference or certificate of involvement on request.",
    responsibilities: [
      "Create posts, stories and graphics for Instagram and LinkedIn using the SAIN brand kit.",
      "Help promote events, and capture them through photos, video and recaps.",
      "Write short pieces such as captions, announcements and event summaries.",
      "Contribute ideas to the monthly content calendar.",
      "Support the design of offline materials such as posters, banners and merchandise.",
      "Attend the communications team check-ins, and stay reachable on Discord, where all team communication happens.",
      "Deliver work that follows the SAIN brand kit and is ready to publish after light feedback.",
      "Deliver what you take on by the agreed deadline, and say so early if something gets in the way.",
    ],
    goodFitIf: [
      "Are curious about AI safety and the impact of AI on the world. No prior AI knowledge needed.",
    ],
    preferredBackground: {
      field: "Open. Design, media, communications or marketing is a plus.",
      level: "Open. Your portfolio carries more weight than your degree.",
      experience:
        "Prior experience in graphic design, content creation, photography or video is required, whether from studies, a student association, freelance work or personal projects. You can work in Canva or a similar design tool without training.",
      softSkills:
        "Reliable, independent, open to feedback and happy to work in a team.",
    },
    collaborations:
      "The Communications Lead, the events team, and communications volunteers at our other chapters.",
    formRoleValue: OPEN_POSITION_FORM_VALUE,
  },

};

// -----------------------------------------------------------------------------
// Chapter -> open positions
// -----------------------------------------------------------------------------

export type ChapterPosting = {
  /** Slug used in pre-fill (must match the option text in the Google Form). */
  chapterSlug: string;
  chapterName: string;
  /**
   * The section heading on /open-positions. It states what the chapter is
   * doing ("SAIN Amsterdam is building its core team"), so the reader knows
   * whose schedule they are reading before any role title.
   */
  heading: string;
  /** Body paragraph under the heading while the chapter is recruiting. */
  blurb?: string;
  inboxEmail: string;
  status: "open" | "closed";
  /**
   * Body shown instead of `blurb` when the chapter is closed. Rendered as one
   * sentence with the chapter inbox as an inline link between the two halves,
   * so a closed chapter is a fact with a door, not a section.
   */
  closedNote?: { beforeEmail: string; afterEmail: string };
  /**
   * Each posting references a role id from ROLES. Optionally specify how many
   * positions are open and an override on title or notes for the chapter.
   */
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
    note?: string;
  }>;
};

export const chapterPositions: ChapterPosting[] = [
  {
    chapterSlug: "Amsterdam",
    chapterName: "SAIN Amsterdam",
    heading: "SAIN Amsterdam is building its core team",
    blurb:
      "Director Ana is looking for team leads and team members across all teams. If you want to help shape a chapter from the ground up, this is the moment.",
    inboxEmail: "infoams@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "events-lead" },
      { roleId: "photographer" },
      { roleId: "community-manager" },
    ],
  },
  {
    chapterSlug: "Utrecht",
    chapterName: "SAIN Utrecht",
    heading: "SAIN Utrecht is growing its team",
    blurb:
      "Director Riccardo and the current team leads are looking for hands-on contributors who want to grow the chapter.",
    inboxEmail: "infoutr@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "education-lead-utrecht" },
      { roleId: "education-facilitator-evals" },
      { roleId: "education-facilitator-cybersec" },
      { roleId: "education-facilitator-biosecurity" },
      { roleId: "education-facilitator-embodied" },
      { roleId: "research-ops-repository-steward" },
      { roleId: "sain-ambassador" },
      { roleId: "events-team-member-facilitator" },
      { roleId: "graphic-designer" },
      { roleId: "photographer" },
    ],
  },
  {
    chapterSlug: "Groningen",
    chapterName: "SAIN Groningen",
    heading: "SAIN Groningen is building its communications team",
    blurb:
      "Director Tarteel is looking for a Communications Lead and communications volunteers to tell students and professionals in Groningen what the chapter has been doing since 2023.",
    closedNote: {
      beforeEmail:
        "The Groningen team is full right now, and we are not listing roles there. If you want to be considered when something opens, write to",
      afterEmail: "and tell us what you would like to do.",
    },
    inboxEmail: "infogro@safeainetherlands.org",
    status: "open",
    postings: [
      { roleId: "communications-lead-groningen" },
      { roleId: "communications-team-member-groningen" },
    ],
  },
];

// -----------------------------------------------------------------------------
// National (SAIN Netherlands-wide) open positions
// -----------------------------------------------------------------------------

export type NationalPosting = {
  /** Anchor slug used for the section on /open-positions. */
  slug: string;
  name: string;
  /** The section heading on /open-positions. */
  heading: string;
  blurb: string;
  inboxEmail: string;
  status: "open" | "closed";
  closedNote?: string;
  postings?: Array<{
    roleId: keyof typeof ROLES;
    positions?: number;
    note?: string;
    /**
     * Each national role has its own application form — there is no shared
     * national form to fall back on, so this is required per role.
     */
    applyUrl: string;
  }>;
};

/**
 * Roles that sit with SAIN Netherlands as a whole rather than with a chapter.
 * Rendered above the chapter sections on /open-positions. Set `status` to
 * "closed" (or empty `postings`) to hide the national section and the Research
 * Hub banner that points at it.
 */
export const nationalPosting: NationalPosting = {
  slug: "national",
  name: "National team",
  heading: "Roles on the national team",
  blurb:
    "Most of SAIN runs on volunteers in the chapters. National roles are the exception: they work across Amsterdam, Utrecht, and Groningen and report to the Director. Each has its own application form and hiring process, separate from the chapter form above.",
  inboxEmail: "info@safeainetherlands.org",
  status: "closed",
  postings: [],
};

/** National roles currently open, in the order declared above. */
export const openNationalPostings = nationalPosting.status === "open"
  ? (nationalPosting.postings ?? [])
  : [];

export const isNationalRecruiting = openNationalPostings.length > 0;

/**
 * Whether a specific national role is currently advertised. Used by
 * /research to decide whether to show its Research Hub hiring banner.
 */
export function isNationalRoleOpen(roleId: keyof typeof ROLES): boolean {
  return openNationalPostings.some((p) => p.roleId === roleId);
}

// -----------------------------------------------------------------------------
// Recruiting state (single source of truth for what the site shows)
// -----------------------------------------------------------------------------

/**
 * A chapter counts as recruiting only when it is marked open AND actually has
 * postings listed. Set a chapter's `status` to "closed" (or empty its
 * `postings`) to hide its recruiting banner and its section on
 * /open-positions.
 */
export function isChapterRecruiting(chapterSlug: string): boolean {
  const chapter = chapterPositions.find((c) => c.chapterSlug === chapterSlug);
  return chapter?.status === "open" && (chapter.postings?.length ?? 0) > 0;
}

/** Chapters currently recruiting, in the order declared above. */
export const recruitingChapters: ChapterPosting[] = chapterPositions.filter(
  (c) => isChapterRecruiting(c.chapterSlug),
);

/**
 * How many volunteer roles are listed across the recruiting chapters. The
 * careers hero counts the page rather than restating a number in prose, so
 * closing a posting changes the sentence without anyone editing it.
 */
export const openChapterPostingCount = recruitingChapters.reduce(
  (total, chapter) => total + (chapter.postings?.length ?? 0),
  0,
);

/**
 * How many of those chapter roles are compensated. A role counts as paid when
 * its badge says so; the careers page reads this so its "most chapter roles
 * are unpaid" paragraph cannot drift from the badges under it.
 */
export const paidChapterPostingCount = recruitingChapters.reduce(
  (total, chapter) =>
    total +
    (chapter.postings ?? []).filter((p) =>
      ROLES[p.roleId]?.commitmentBadge?.startsWith("Paid"),
    ).length,
  0,
);

/**
 * When this is false the whole open-positions surface disappears: the navbar
 * entry, the home and chapter recruiting banners, the get-involved link, and
 * the role listings on /open-positions (which falls back to the standing
 * open-application page). Close every chapter *and* the national posting to
 * switch the site over.
 */
export const hasOpenPositions =
  recruitingChapters.length > 0 || isNationalRecruiting;

// -----------------------------------------------------------------------------
// Review policy + Timeline
// -----------------------------------------------------------------------------

/**
 * There is no hard application deadline: applications are reviewed on a rolling
 * basis as they come in. Update these strings if the cycle ever moves back to a
 * fixed closing date.
 */
export const APPLICATION_REVIEW = {
  label: "Rolling applications",
  phrase: "on a rolling basis",
  sentence:
    "Applications are reviewed on a rolling basis, so apply whenever you are ready.",
};

export type TimelineStep = {
  label: string;
  detail: string;
};

/**
 * Edit these strings whenever the cycle changes. The page surfaces both the
 * default cycle and the "earlier onboarding possible" caveat.
 */
export const APPLICATION_TIMELINE: TimelineStep[] = [
  {
    label: "Applications open",
    detail:
      "Submit your application whenever you are ready. There is no closing date.",
  },
  {
    label: "Rolling review",
    detail:
      "We read applications as they arrive rather than all at once, so applying earlier means hearing back earlier.",
  },
  {
    label: "First-round response",
    detail:
      "Within two to three weeks of applying. Strong candidates are invited to a short intro call with the chapter lead for that team.",
  },
  {
    label: "Trial conversation",
    detail:
      "A 30 to 45 minute call to discuss the role, your motivation, and a small task or scenario relevant to the team.",
  },
  {
    label: "Onboarding",
    detail:
      "If the previous steps go well, the standard onboarding cycle starts right after. Joining SAIN's team at other dates is possible.",
  },
];
