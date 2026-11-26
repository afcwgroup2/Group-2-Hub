# Cadet Group 2 Hub: setup (one time, about 20 minutes)

Same setup as the CS-12 One Stop Shop. Everything is free; no coding needed.

## 1. Make a GitHub organization (so the site isn't tied to one person)
1. The site lives on the shared GitHub account `afcwgroup2` (sign in with the shared Group 2 login). Later you can move the repository into a GitHub organization (repository Settings → Transfer) so several owners can manage it; if you do, update `G2_OFFICIAL_HOST` in `config.js` and Firebase's Authorized domains to the new address.
2. Create a **public** repository named `Group-2-Hub`.
3. Upload every file in this folder **except** backups (the `digest` folder can go up too; it holds no secrets). Commit.
4. Repository **Settings → Pages → Deploy from a branch → main / (root) → Save**. After a few minutes the site is at
   `https://afcwgroup2.github.io/Group-2-Hub/`. (If you pick another org name, change `G2_OFFICIAL_HOST` in `config.js` to match.)

## 2. Create the Firebase project
1. Go to https://console.firebase.google.com → **Create a project** → name it `cadet-group-2-hub`. Google Analytics: off. It stays on the free Spark plan.
2. **Build → Authentication → Get started.** Enable **Email/Password** (first switch only) and **Google**.
3. **Authentication → Settings → Authorized domains → Add domain:** `afcwgroup2.github.io`.
4. **Build → Firestore Database → Create database → Production mode**, location `nam5 (United States)`.
5. Open the **Rules** tab, delete everything, paste the whole `firestore.rules` file, **Publish**.

## 3. Connect the site
1. Gear icon → **Project settings → Your apps → Web app (`</>`)**, name it `Group 2 Hub`. Don't turn on Hosting.
2. Copy the six values from `firebaseConfig` into `config.js` (replace each `PASTE_…`), then upload `config.js` to GitHub again.

## 4. Make yourself the first admin
1. Firestore → **Data → Start collection** `members` → Document ID = your email, all lowercase → add fields
   `role` = `admin` and `name` = your name. (This is also how anyone fixes "no admins left" later.)
2. Open the site, click **First time? Create your password**, confirm the email Firebase sends, sign in.
3. Load the UMD (step 5). Your own row (G2 · Commander) gives you your position.

## 5. Load the UMD
Access follows the UMD, like the CS12 site. Open **Admin 🔑 → Load the UMD**, copy the UMD from Excel (header row included) and paste it.

- Columns it reads: **Unit**, **Position**, **Class**, **Rank**, **Name** (or Last / First) and **Email**. Unit can be a column or a section row ("Group 2 Staff", "Cadet Squadron 20").
- No Email column? It builds `c27first.last@afacademy.af.edu` from the Class and name and flags each one so you can check it.
- The preview shows who gets access, whose positions change, who loses access and which rows have positions the site doesn't use (flight commanders etc. get no access). Click **Apply the UMD**.

Each person then opens the link and signs in with their school email (Google, or **First time? Create your password**). The site matches that email to their UMD row and shows exactly what their job allows.
For one-off changes mid-semester use **Admin → People & positions**. Keep at least two site admins (tick Admin on their row), ideally one from 2028.

## 6. Upload the reference files
Misc → Helpful files → Edit each entry and upload the PDF (CSD, ROEs, USAFAI 36-2401, OPORD 26-007, the signed CG2 Military Training Guidance). The storage room inventory is 17 MB, so paste its SharePoint link. The Jack's Valley map (FOUO) goes only in the A3 Library. Keep them out of GitHub: the repository is public, while the site's files are behind sign-in. Files over 4 MB: paste a Teams/SharePoint link instead.

## 6b. Check it (2 minutes)
- Admin → **Site health → Run the self-test**. Every line should say OK (the backup line turns OK after your first backup).
- Ask one squadron person (not staff, not an admin) to sign in, open My Board and save something small (a Weekly wrap-up, or a Helpful files link if they're Group staff). If that works, the rules are live for ordinary members too.
- Sign in as yourself and confirm My Board says what you see.
- Optional: Firestore → **Rules → Rules Playground** to confirm someone with only `CS20:A46` can't read a `CS15` record.
- Try the site with made-up data any time by adding `?demo` to the address (nothing is saved).

## 7. Optional: weekly digest email
See DIGEST.md. Use the same shared Group 2 Google account that owns Firebase.

## Free plan limits (about 150 users is well inside them)
50,000 reads / 20,000 writes a day, 1,000 confirmation emails a day, about 100 new sign-ups per hour from one network.
Attachments are stored in the database in pieces (the free plan has no file storage), up to 4 MB each. Bigger files: paste a Teams/SharePoint link.

## Security checklist
- At least two other people (ideally plus one permanent-party backstop) are **Owners** in Firebase (Project settings → Users and permissions) and in the GitHub organization. Every owner turns on 2-Step Verification.
- `firestore.rules` and `index.html` are always updated together: every time the rules change, paste them into Firebase → Firestore → Rules → **Publish** in the same sitting.
- Backups hold private data: keep them in Group 2's private Teams files, never GitHub.
- Remove people the day they leave a position (Admin → People & positions → Remove, or load the updated UMD). Removal ends their access immediately.
- The only real address is the one in `config.js`. Staff never ask for passwords.
