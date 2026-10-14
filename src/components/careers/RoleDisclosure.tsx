import {
  ArrowUpRight,
  CalendarBlank,
  CaretDown,
  Compass,
  Flask,
  GraduationCap,
  MapPin,
  Megaphone,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import RuleList from "./RuleList";
import OutlineRows from "./OutlineRows";
import {
  buildApplicationUrl,
  OPEN_POSITION_FORM_VALUE,
  type Role,
  type Team,
} from "@/data/openPositions";

/* The career row from design.md: a full-width row on a hairline with a 26px
   orange stroke icon, never an icon in a coloured tile. The glyph names the
   team rather than the role, because the team is what the reader is joining.

   #FF6025 at 26px light is a large glyph, so it stays the identity orange
   here; every orange letterform on this page is orange-ink instead. */
const TEAM_ICON: Record<Team, Icon> = {
  directors: Compass,
  education: GraduationCap,
  events: CalendarBlank,
  communications: Megaphone,
  community: UsersThree,
  outreach: MapPin,
  research: Flask,
};

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <h4 className="kicker mb-3 text-kicker-sm text-navy/65">{children}</h4>
  );
}

export default function RoleDisclosure({
  role,
  note,
  chapterSlug,
  applyUrl: applyUrlOverride,
}: {
  role: Role;
  note?: string;
  chapterSlug?: string;
  applyUrl?: string;
}) {
  const applyUrl =
    applyUrlOverride ??
    buildApplicationUrl({
      chapter: chapterSlug,
      role: role.formRoleValue ?? role.title,
    });
  const TeamIcon = TEAM_ICON[role.team];
  const background = role.preferredBackground;
  const backgroundRows: Array<[string, string]> = background
    ? (
        [
          ["Field", background.field],
          ["Level", background.level],
          ["Experience", background.experience],
          ["Soft skills", background.softSkills],
        ] as Array<[string, string | undefined]>
      ).filter((row): row is [string, string] => Boolean(row[1]))
    : [];

  return (
    <details className="group border-t border-navy/10">
      <summary className="flex list-none items-start gap-5 py-[18px] pr-1 [&::-webkit-details-marker]:hidden">
        <TeamIcon
          size={26}
          weight="light"
          className="mt-0.5 shrink-0 text-orange"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h3 className="font-serif text-title-sm text-navy">{role.title}</h3>
            {role.employment ? (
              <span className="border border-navy/16 px-2 py-[3px] font-sans text-footnote text-orange-ink">
                {role.employment.badge}
              </span>
            ) : null}
            {role.commitmentBadge ? (
              <span className="border border-navy/16 px-2 py-[3px] font-sans text-footnote text-navy/70">
                {role.commitmentBadge}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 font-sans text-caption text-navy/65">
            {role.timeCommitment}. Reports to the {role.reportsTo}.
          </p>
        </div>
        <CaretDown
          size={14}
          weight="bold"
          className="mt-2 shrink-0 text-navy/50 transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="pb-9 sm:pl-[46px]">
        <p className="max-w-[760px] font-sans text-body text-navy/74">
          {role.mission}
        </p>
        {note ? (
          <p className="mt-3 max-w-[760px] font-sans text-caption text-navy/65">
            {note}
          </p>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col gap-7">
            <div>
              <PanelLabel>What you would do</PanelLabel>
              <RuleList items={role.responsibilities} />
            </div>
            {role.goodFitIf?.length ? (
              <div>
                <PanelLabel>You may be a good fit if you</PanelLabel>
                <RuleList items={role.goodFitIf} />
              </div>
            ) : null}
            {role.alsoStrong?.length ? (
              <div>
                <PanelLabel>Strong candidates may also have</PanelLabel>
                <RuleList items={role.alsoStrong} />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-7">
            {backgroundRows.length ? (
              <div>
                <PanelLabel>Preferred background</PanelLabel>
                <dl className="flex flex-col gap-3">
                  {backgroundRows.map(([term, value]) => (
                    <div key={term}>
                      <dt className="font-sans text-label text-navy">{term}</dt>
                      <dd className="mt-0.5 font-sans text-caption leading-[20px] text-navy/72">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {role.employment ? (
              <div>
                <PanelLabel>Terms</PanelLabel>
                <dl className="flex flex-col gap-3">
                  {[
                    ["Salary", role.employment.salary],
                    ["Contract", role.employment.contract],
                    ["Location", role.employment.location],
                    ["Start date", role.employment.startDate],
                  ].map(([term, value]) => (
                    <div key={term}>
                      <dt className="font-sans text-label text-navy">{term}</dt>
                      <dd className="mt-0.5 font-sans text-caption leading-[20px] text-navy/72">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6">
                  <PanelLabel>What SAIN offers</PanelLabel>
                  <RuleList items={role.employment.benefits} />
                </div>
              </div>
            ) : null}
            <div>
              <PanelLabel>Who you would work with</PanelLabel>
              <p className="font-sans text-caption leading-[20px] text-navy/72">
                {role.collaborations}
              </p>
            </div>
          </div>
        </div>

        {/* One rule above the stages, none between them: the numbers carry the
            order, and the rule marks where the role ends and the process
            starts. */}
        {role.applicationProcess?.length ? (
          <div className="mt-8 max-w-[760px] border-t border-navy/14 pt-7">
            <PanelLabel>How this role is filled</PanelLabel>
            <OutlineRows items={role.applicationProcess} rules={false} />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent gap-2"
          >
            Apply for this role
            <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {/* The footnote tells the applicant what to do in the form rather
              than promising what the form will already have done for them: the
              pre-fill entry ids in openPositions.ts are still unverified, and
              Google drops entry keys it does not recognise without a word. */}
          {applyUrlOverride ? null : (
            <p className="max-w-[400px] font-sans text-footnote text-navy/65">
              {role.formRoleValue === OPEN_POSITION_FORM_VALUE
                ? `The form has no option for this role yet. Choose "${OPEN_POSITION_FORM_VALUE}" there and name "${role.title}" in your motivation letter.`
                : role.specialisationOf
                  ? `Applies through the form's "${role.specialisationOf}" option. Mention "${role.title}" in your motivation letter.`
                  : `Opens the shared application form. Choose "${role.title}" there.`}
            </p>
          )}
        </div>
      </div>
    </details>
  );
}
