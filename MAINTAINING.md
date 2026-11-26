# Maintaining the Cadet Group 2 Hub (no coding or AI needed)

## Changed inside the site
| To change… | Go to |
|---|---|
| Who can sign in and their positions | Admin 🔑 → Load the UMD (whole roster) or People & positions (one person, site admins) |
| Semester label, division names, squadron list, Group CC indorsement block | Admin 🔑 → Site settings |
| Staff libraries (information page and files) | A-Staff → division → Library (Group division chief); Command Staff → Command / First Sergeant library |
| CSD, OPORD, training MFRs, blank forms, other helpful files | Misc → Helpful files (anyone on Group staff) |
| Storage room inventory and photos | A-Staff → A3 → Storage room → Edit inventory (Group A3) |
| A3 guidance, priorities and calendar | A-Staff → A3 → Guidance → Edit (Group A3) |
| Misc → Helpful files | Anyone on Group staff, in the site |
| Silver Training Weekend dates and deadlines (A3 Guidance table, SWE CONOP builder) | `index.html`: search for `const STW=` and change the four dates per weekend (one line each) |
| Taskers, calendar entries, paperwork lines | Their own tabs |

Don't change a division's **code** once people hold it (labels are fine): access is tied to the code.

## The files on GitHub
| File | What it is | Change it? |
|---|---|---|
| `index.html` | The whole site | Only to install an update or fix wording |
| `config.js` | Connects to Firebase; holds the official address | Only if you move Firebase projects or the address |
| `firestore.rules` | Security rules (copy; the live one is in Firebase) | Only with an update that says so |
| `logo.png`, `letterhead.jpg`, `seal.jpg`, `form10.pdf` | Group patch, Group MFR letterhead, DoD seal (squadron letterheads), blank Form 10 | If the patch, letterhead or form changes |
| `af724.pdf`, `af715a.pdf`, `af715b.pdf` | Blank AFCW feedback forms (724 is filled by the site; 715A/B are Adobe-only) | Only when AFCW issues a new version: blank copies only |
| `trss_conop.pdf`, `conop_template.pptx` | Blank 34 TRSS Request CONOP and the Executive CONOP template | Only when a new version comes out |
| `inventory/*.jpg` | Photos of the original storage room items | Only to change a photo (new items get photos in the site) |

`logo.png` is the Group 2 patch; `letterhead.jpg` (1104 × 160 pixels) has the DoD seal left and the patch right. Replace either with a same-named file.

## Install an update
1. GitHub → repository → **Add file → Upload files** → drag in the new file(s) → **Commit changes**.
2. Wait 2–5 minutes, open the site, press Ctrl+Shift+R (Cmd+Shift+R on a Mac).
3. If the update includes `firestore.rules`: copy it into Firebase → Firestore → Rules → **Publish** (same sitting as the upload).
4. Admin → **Site health → Run the self-test**. If it says the rules are older than the website, step 3 was missed.

## Undo a bad update
GitHub → `index.html` → **History** → open the last good version → **Raw** → save it as `index.html` → upload it.
Rules: Firebase → Firestore → Rules keeps every published version; publish the last good one.

## Fix wording
GitHub → `index.html` → pencil icon → Ctrl+F the words → change only what's between the quote marks → **Commit**.

## What genuinely needs a coder
- Adding a brand-new kind of record or tab, or changing who-sees-what (three places must match, see below).
- Raising the 4 MB attachment limit (it's the free plan's record size; bigger files belong in SharePoint).
- A new site version that changes the rules: bump `SITE_VERSION` in `index.html` and the matching version string in the `health` rule in `firestore.rules`, so Site health can tell when the rules weren't re-published.

## For anyone who knows a little JavaScript
The code is plain JavaScript with no build tools. Sections are marked `/* ===== NAME ===== */`. Visibility logic lives in three
places that must match: `canSeeItem / canSeeCal / canWrite` in `index.html`, `seeItem / seeCal / canWrite` in `firestore.rules`, and the
"who sees what" section of `digest/Code.gs`.
