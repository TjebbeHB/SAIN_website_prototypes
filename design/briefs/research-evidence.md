# SAIN Research Hub — Evidence Log

Ground truth source: `src/data/research.ts` (site's own claims) cross-checked against the open web.
`docs/research_hub_handbook.md` is program/process documentation, not evidence of outputs — it contains
no publication claims to verify, only structure/policy. Authored by Alexander Müller (Director),
Thomas Brcic (Former SAIN Groningen Co-Director), Ilija Lichkovski (Research Lead) — these three names
are corroborated as real, active people by the papers below (Müller and Lichkovski are co-authors on
EU-Agent-Bench).

Legend: **VERIFIED** = confirmed against an independent web source (arXiv/OpenReview/ML Anthology/etc).
**REPO ONLY** = only supported by the site's own data file, not independently confirmed.
**DISCREPANCY** = repo claim conflicts with what the web source actually shows.

---

## Publications

### 1. "The Anatomy of Alignment: Decomposing Preference Optimization by Steering Sparse Features"
- Repo claims: NeurIPS 2025 Spotlight; authors Jeremias Ferrao, Matthijs van der Lende, Ilija Lichkovski; arXiv 2509.12934
- **VERIFIED**: paper exists at https://arxiv.org/abs/2509.12934, confirmed Spotlight at the **NeurIPS 2025 Mechanistic Interpretability Workshop** (not main-track NeurIPS — repo's "NeurIPS 2025 Spotlight" label is technically accurate but the featured-card label "NeurIPS 2025 workshop · Spotlight" is the honest version and matches).
- **DISCREPANCY**: actual paper has a 4th author, **Clement Neo**, not credited in the repo's author string. Not necessarily wrong (repo may intentionally list only SAIN-affiliated authors) but the copywriter should not claim "the team" is fully represented by the three names listed.
- No independent citation count found (paper is ~1 month old as of writing; too new for Semantic Scholar/Google Scholar indexing found in search).

### 2. "Self-Ablating Transformers: More Interpretability, Less Sparsity"
- Repo claims: ICLR 2025; single author Jeremias Ferrao; link openreview.net/pdf?id=QcmEb490bK
- **VERIFIED**: real paper, also on arXiv as **2505.00509**. Confirmed via ML Anthology and arXiv listing as **Poster at the ICLR 2025 Building Trust Workshop** (a workshop, not ICLR main track — repo's landing chip "ICLR 2025 · Building Trust Workshop" is accurate; the bare `venue: "ICLR 2025"` field is a simplification that drops the "workshop" qualifier).
- **DISCREPANCY (author list)**: actual paper's authors are **Jeremias Ferrao, Luhan Mikaelson, Keenan Pepper, and Natalia Perez-Campanero Antolin** — three of the four authors are NOT the "Jeremias Ferrao" solo credit the repo gives. This is the most material discrepancy found: the repo implies solo SAIN work; the paper is a 4-person team, and it's unclear from public sources whether Mikaelson/Pepper/Perez-Campanero Antolin have any SAIN affiliation. **Flag for copywriter: do not describe this as Ferrao's solo paper.**

### 3. "EU-Agent-Bench: Measuring Illegal Behavior of LLM Agents Under EU Law"
- Repo claims: NeurIPS 2025; authors Ilija Lichkovski, Alexander Müller, Mariam Ibrahim, Tiwai Mhundwa; arXiv 2510.21524
- **VERIFIED** in full, including exact author list, via arXiv abstract page. Confirmed accepted at the **Workshop on Regulatable ML at NeurIPS 2025 (39th)** — matches repo's featured-card label "NeurIPS 2025 · Regulatable ML Workshop" exactly. Code released publicly: https://github.com/ilijalichkovski/eu-agent-bench.
- No citation count available yet (submitted October 2025, too recent — ResearchGate shows zero resolved citations so far). **Do not claim any citation count for this paper.**

### 4. "Contextual Sparsity as a Tool for Mechanistic Understanding of Retrieval in Hybrid Foundation Models"
- Repo claims: ICLR 2025; authors Davide Zani, Felix Michalak, Steven Abreu
- **VERIFIED**: author list matches exactly (Zani, Michalak, Abreu) per ML Anthology. Confirmed as an **ICLR 2025 workshop paper (SLLM workshop)** — again the bare "ICLR 2025" venue field in repo omits "workshop," same pattern as #2.
- No citation count found.

### 5. "Steering Large Language Models using Conceptors"
- Repo claims: NeurIPS 2024; authors Joris Postmus, Steven Abreu; link jorispos.github.io/conceptor_steering
- **VERIFIED** via the project page itself: authors Joris Postmus and Steven Abreu, affiliation **University of Groningen**, venue **NeurIPS 2024 Workshop on Foundation Model Interventions**. Matches repo. Again a workshop paper, not main-track NeurIPS — repo's bare "NeurIPS 2024" venue field doesn't disclose the workshop status (consistent pattern across the four workshop papers above).

### 6–10. Apart Research hackathon projects (AutoSteer; Local Learning Coefficients; Collective Deliberation for Safer CBRN Decisions; Sandbagging LLMs using Activation Steering; Cybersecurity Persistence Benchmark; AI Misinformation and Threats to Democratic Rights)
- **PARTIALLY VERIFIED**: AutoSteer confirmed real — Apart Research project page exists, by "Jeremias Lino Ferrao," submitted to an Apart Research sprint Nov 25, 2024. Note: web search's auto-summary garbled AutoSteer's description with "Local Learning Coefficients" content (the two projects' Apart pages appear to be similar/related sprint entries) — **treat the specific placement/rank claims ("1st Place," "3rd Place," "4th Place") as REPO ONLY**; I could not independently confirm placement/ranking for any of the six Apart Research entries from search snippets. The project pages themselves were not fully fetched/confirmed one-by-one beyond AutoSteer.
- Recommend: if the copywriter wants to cite "1st place at Apart Research" etc. as a credibility signal, fetch each apartresearch.com/project/... URL directly to confirm the placement text before publishing, or keep language soft ("hackathon entries via Apart Research") rather than asserting unverified rankings.
- "Playing with Perception" (Google Drive link) — **REPO ONLY**, not independently verifiable (unindexed Drive file, no web presence found). Access re-checked signed out on 13 September 2026: the file downloads anonymously (1.8MB PDF), so the link is live for a reader who clicks it and the chip stays inside the counted "12 publications". The contents are still uncorroborated by any independent source, so the page keeps the soft "Research project" venue label.

---

## Supervisors — affiliation checks

| Name | Repo claim | Verification |
|---|---|---|
| Steven Abreu | Research Scientist, MakerMaker | **REPO ONLY** for the MakerMaker title (not checked/found independently in this pass), but Abreu's **University of Groningen** affiliation and authorship on two of the above papers (Conceptors, Contextual Sparsity) is **VERIFIED** independently. |
| Fatih Turkmen | Associate Professor of Computer Science, University of Groningen | **VERIFIED** — rug.nl staff page, Google Scholar profile confirm Associate Professor, Computer Science, University of Groningen, works on AI security/privacy. Google Scholar shows a substantial citation record (search summary reported ~1,292 citing authors, i.e. a well-established researcher, not a first-time supervisor). |
| Jobst Heitzig | Working Group Leader, Senior Scientist, Potsdam Institute for Climate Impact Research | **VERIFIED** — pik-potsdam.de staff page confirms Senior Researcher at PIK since 2010, leads the "Behavioural Game Theory and Interacting Agents" working group. Repo's title is accurate. |
| Ana Lucic | Assistant Professor, University of Amsterdam | **VERIFIED** — ELLIS spotlight, personal site, LinkedIn confirm Assistant Professor at UvA (joint ILLC/Informatics Institute appointment), works on interpretability and AI safety specifically — a strong topical fit for SAIN, previously at Microsoft AI for Science and Partnership on AI. |
| Guillaume Pourcel | PhD AI Candidate, University of Groningen | **NOT INDEPENDENTLY CHECKED** this pass (no search run) — currently **REPO ONLY**. |

---

## Career outcomes / other public traces of SAIN

- No public LinkedIn/Substack posts specifically documenting individual researcher career outcomes (job offers, PhD admits, etc.) attributable to SAIN were found in this pass — the search for `site:linkedin.com OR site:aisig.substack.com` mostly surfaced the SAIN LinkedIn company page and adjacent/different orgs (AI Safety Initiative Groningen / AISIG, AI Safety Hub), which are **related but distinct entities from SAIN** — do not conflate them on the page.
- Confirmed: SAIN LinkedIn company page exists (linkedin.com/company/safe-ai-netherlands), and an "Ana Paula C." is listed as **SAIN Amsterdam Co-Director / Board Member** on LinkedIn — this is a new name not in `research.ts`, worth flagging to whoever owns the roster (may belong on a different part of the site, e.g. leadership/about, not necessarily Research Hub).
- **No citation counts** could be confirmed for ANY of the five formal-venue papers — all are 2024–2025 workshop papers, too recent for meaningful Scholar/Semantic Scholar citation accrual. **The copywriter must not invent or estimate citation numbers.** If a "cited by" stat is wanted, it should be pulled live from Semantic Scholar/Google Scholar close to publish time, not asserted now.

---

## Bottom line for the copywriter

- Safe claims (independently verified): all 5 formal-venue papers are real, on arXiv/OpenReview, with correctly named workshops at ICLR 2025 / NeurIPS 2024 / NeurIPS 2025 — good, legitimate evidence of a real research programme.
- Use "workshop" language honestly — none of the five are main-track NeurIPS/ICLR papers; all are workshop papers (still a credible, normal outcome for this kind of hub, but should not be inflated to sound like main-track acceptances).
- Do NOT claim Ferrao authored "Self-Ablating Transformers" solo — it has 4 authors, 3 of whom are unverified as SAIN-affiliated.
- Do NOT cite any citation/impact numbers — none exist yet publicly.
- Apart Research hackathon placements (1st/3rd/4th place) are unverified in this pass — confirm directly on apartresearch.com before using placement claims in copy.
- All 4 supervisors checked (Turkmen, Heitzig, Lucic, and indirectly Abreu) have verified real academic/research affiliations matching the repo. Guillaume Pourcel not checked.
