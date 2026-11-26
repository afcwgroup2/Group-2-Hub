# Cadet Group 2 Hub: handover guide

Built to keep running after its builders graduate: no paid tools, no coding, no AI assistant. Three things keep it alive,
each with more than one key holder:

| What | Where | Who holds the keys |
|---|---|---|
| Who can get in, and each person's positions | Admin 🔑 → Load the UMD (and People & positions for one-offs) | Site admins (2+, from 2+ classes) |
| The data and sign-in | Firebase project `cadet-group-2-hub` | Firebase owners (2+ cadets from different classes + 1 permanent-party backstop) |
| The web address and files | GitHub account `afcwgroup2` (shared login), repository `Group-2-Hub` | Everyone who holds the shared login (same rule); hand the password over in person and change it at turnover |

## Every semester (or whenever the UMD changes)
Admin → **New term** walks through these steps with buttons, and has **Remove a class** (everyone whose email starts with that class year, admins kept).
1. **Admin → Backup → Download backup.** Save it in Group 2's private Teams files (never GitHub).
2. **Admin → Load the UMD:** paste the new UMD from Excel, check the preview (new spots, spots leaving and who loses access) and apply. New people sign in with Google and claim their job by name; check the Roster list that each spot was claimed by someone you recognize.
3. Make sure there are at least two site admins, from two classes.
4. **Admin → Site settings:** update the semester label and the Group CC indorsement signature block.
5. Close or delete last semester's taskers; delete old calendar entries and approved paperwork you no longer need (keeps the free plan fast).
6. Each Group division chief: check their staff's Library (Duty → their division → Library) is still accurate. Group A3: update the Guidance and calendar for the new semester (and the Silver Training Weekend dates, see MAINTAINING.md), re-count the storage room and update the inventory, and upload the signed guidance and the Jack's Valley map in the A3 Library. Group staff: refresh Misc → Helpful files (new OPORD, CSD, ROEs, guidance).
7. Outside the site: add new admins as Firebase **Owners** and GitHub org **Owners**; remove graduates.

## Who sees what (positions decide it, and the database enforces it)
- **Squadron CC, Deputy, CoS, SEL, Exec, Staff Supt:** everything in their squadron (on My Board). **Squadron division chiefs / First Sergeants:** their division only. **A-Staff and Command Staff tabs:** Group staff only.
- **Group** (CC, Deputy, CoS, SEL, and each Group division chief in their lane) sees a squadron's taskers, paperwork and calendar
  entries **only** when Group sent them or the squadron sent them up / shared them. Squadron-internal work stays in the squadron.
- **Group First Sergeant:** squadron First Sergeant items that were sent up, plus anything Group First Sergeant sends out.
- **Site admin** only adds people, settings and backups; tabs still follow the admin's positions.

## Tabs
- **My Board:**
  - **Group staff:** their taskers, submissions to review (or returned to them) and what's coming up. The Group Exec also gets "All submissions".
  - **Squadron people:** an Overview plus one workspace per job. Squadron command staff (CC, Deputy, CoS, SEL, Exec, Staff Supt) get a **Command** workspace (command, SEL and all-leadership taskers) plus every division in their squadron. A squadron division chief or First Sergeant gets only their own division, with its taskers to answer and its tools (A3: Guidance, Priorities & mastery, Schedule, Semester plan, Silver Weekend CONOP, AARs, Storage room; A4/6: **How each fund works** (the Group 2 Squadron Funds Guide) and the funds request builder; First Sergeant: the **weekly wrap-up**).
- **Taskers** (Group command staff and the Group First Sergeant): every active tasker the person oversees, grouped by audience, with each squadron's progress, what needs review, and **+ New tasker** (post to several audiences at once). Squadron audiences:
  - Group Commander, Deputy and Exec: Squad Coms, SELs, First Sergeants and every A-Staff division.
  - Group SEL: Squad Coms and SELs.
  - Group Chief of Staff and Staff Superintendent: every A-Staff division.
  - Group First Sergeant: First Sergeants.
  Tasking Group staff (New tasker → Group staff): the Group Commander, Deputy and Chief of Staff can task any Group command staff member, the Group First Sergeant and every Group division chief; the Staff Superintendent can task every Group division chief. When a Group division has two chiefs (A3: Training and MAE), pick who takes lead or leave it to either. A Group-staff tasker shows only on the named person's My Board.
- **Duty** (Group staff only): one page per squadron job Group oversees and per A-Staff division. Each page has its tasker tracker (Group posts, squadrons answer) and that staff's tools:
  - **Squad Coms**: Group Commander, Deputy, Exec and the Group SEL.
  - **Chiefs of Staff**: Group Commander, Deputy, Exec, Chief of Staff and Staff Superintendent.
  - **First Sergeants** (tasker tracker plus the weekly wrap-up of AF 341s, AF 174s and Form 10s by class): Group Commander, Deputy, Exec and the Group First Sergeant.
  - **A1, A2, A3, A4/6, Stan/Eval** (tasker tracker, the division's tools and its Library): Group Commander, Deputy, Exec, Chief of Staff and Staff Superintendent see all; a Group division chief sees their own.
- **Filed Documents** (everyone): Group command staff see every squadron and division; a Group division chief sees every squadron's folders for their division; squadron command staff see their whole squadron; a squadron division chief sees only their division in their squadron. (The CSD, OPORD, training MFRs and blank forms are in Misc → Helpful files.)
- **Strategic Calendar.**
- **Paperwork builder:** MFR, AF 1206, Form 10, AF 174, **Feedback: AFCW 724** (initial and mid-term; fills the real form, nothing typed leaves the browser) and **Feedback: AFCW 715A / 715B** (final feedback and the optional External Cadet Performance Brief; blank Adobe forms with how to use them).
- **Misc:** **Helpful files** (the CSD, ROEs, USAFAI 36-2401, OPORD 26-007, the CG2 training guidance, the 34 TRSS and Executive CONOP templates, blank 724/715A/715B/Form 10, and anything else; anyone can open them; anyone on Group staff can add, edit or remove one) and the **Directory** (from the UMD).

## First Sergeant weekly wrap-up
Each squadron First Sergeant (or squadron command staff) opens My Board → First Sergeant → Weekly wrap-up once a week and enters how many AF 341s, AF 174s and Form 10s were written for each class. Numbers only: no names, no reasons. The squadron sees its own history; the Group First Sergeant and Group command staff see every squadron on Duty → First Sergeants.

## How taskers and files work
Group posts a tasker. Each squadron it went to gets a folder for it (Unit → Division → Tasker; Filed Documents tab). The squadron uploads its
files there, adds any information, and clicks **Submit tasker**. If something needs signatures, they download it, sign it in Adobe and upload
the signed copy. Group accepts each submission or returns it with a note; returned ones go back to the squadron to fix and resubmit.
A squadron never sees another squadron's folders.

## Weekly digest
`digest/` holds the free weekly email (see DIGEST.md). It runs from the Group 2 Google account that owns Firebase, so hand that
account over at turnover too.

## If something goes wrong
- **Deleted something:** Admin → Backup → Restore from a backup.
- **No admins left:** a Firebase owner opens Firestore → `members` → a person's email → set `role` to `admin`.
- **Someone can't get in:** their name or job doesn't match the UMD (spelling) or someone else claimed the spot. Approve their request in Admin → Requests, or fix the UMD and load it again, or Free the spot.
- **Someone sees too much or too little:** check their row on the UMD (unit and position) or Admin → People & positions. Removing and re-adding a position refreshes it.
- **"Today's free allowance" banner:** nothing is lost; it resets about 1 AM Mountain. The site keeps showing the last saved copy meanwhile.
- **Something seems off after an update:** Admin → **Site health → Run the self-test**. Each failed line says how to fix it. "The rules in Firebase are older than this website" means `firestore.rules` wasn't re-published: copy it from GitHub into Firebase → Firestore → Rules → Publish.
- **Lost the Firebase project** (deleted, or no owner left): create a new project with SETUP.md steps 2–4, then Admin → Backup → Restore from the newest backup file. This is why monthly backups matter; Admin shows a reminder once the last one is 30 days old.
- **People signed out unexpectedly:** the site signs people out after inactivity (1 hour for Group staff and admins, 4 hours for everyone else) and they sign back in with Google.

## Files that live only inside the site (never on GitHub)
The GitHub repo is public. Upload these inside the site, behind sign-in, and never commit them:
- The **signed** CG2 Military Training Guidance (digital signatures carry DoD ID numbers): Duty → A3 → Library.
- The **Jack's Valley Training Areas map** (marked FOUO): Duty → A3 → Library.
- Any completed 724 / 715A / 715B (personal information). The repo only holds blank forms.

## Note on "who sees what" for Group command staff
The Taskers and A-Staff tabs show each Group job only its own audiences (above). The database itself still lets any Group command staff member read Group-level records, so treat those tab limits as focus, not security. Squadron-to-squadron privacy is enforced by the database.

## Libraries
Each A-Staff division has a Library (information page and files) that its squadron division chiefs see in their workspace on My Board. The Group division chief edits it on Duty → their division → Library. Uploads up to 4 MB (Excel, Word, PDF…); bigger files go in Teams/SharePoint as a link.
