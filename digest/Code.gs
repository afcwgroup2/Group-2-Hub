/* Cadet Group 2 Hub: weekly digest email (Google Apps Script, free).
   Every Sunday evening it emails each person on the access list what needs them: open taskers, paperwork waiting on them,
   and the next 7 days on the calendars they can see. People with nothing open get no email.
   Setup is in DIGEST.md. Who-sees-what below matches index.html (canSeeItem/canSeeCal) and firestore.rules. */

const PROJECT_ID = 'PASTE_PROJECT_ID';                              // Firebase → Project settings → Project ID
const SITE_URL   = 'https://afcwgroup2.github.io/Group-2-Hub/';  // the site's real address
const SEND_DAY   = 0;    // 0 = Sunday … 6 = Saturday
const SEND_HOUR  = 18;   // about 1800 local (the script's time zone)
const DAILY_CAP  = 90;   // free Gmail sends about 100 emails a day; anyone left over gets theirs the next day

const GROUP = 'G2';

/* Run once after pasting: makes the daily timer. */
function setup() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('daily').timeBased().everyDays(1).atHour(SEND_HOUR).create();
  console.log('Timer set: the digest goes out on day ' + SEND_DAY + ' about ' + SEND_HOUR + '00.');
}
/* Run any time to email YOURSELF the digest a given person would get, e.g. testDigest('c27first.last@afacademy.af.edu'). */
function testDigest(email) {
  email = email || Session.getActiveUser().getEmail();
  const data = load(); const m = data.members.find(x => x.email === String(email).toLowerCase());
  if (!m) throw new Error(email + ' is not on the access list.');
  const d = digestFor(m, data);
  MailApp.sendEmail({ to: Session.getActiveUser().getEmail(), subject: '[TEST for ' + email + '] ' + (d ? d.subject : 'nothing open'), htmlBody: d ? d.html : 'Nothing open for this person, so they would get no email.', name: 'Cadet Group 2 Hub' });
}

function daily() {
  const props = PropertiesService.getScriptProperties();
  let queue = JSON.parse(props.getProperty('queue') || '[]');
  const now = new Date(), day = ymd(now);
  if (now.getDay() === SEND_DAY && props.getProperty('built') !== day) {
    queue = load().members.map(m => m.email); props.setProperty('built', day);
  }
  if (!queue.length) return;
  const data = load(); let sent = 0;
  while (queue.length && sent < DAILY_CAP && MailApp.getRemainingDailyQuota() > 0) {
    const email = queue.shift(); const m = data.members.find(x => x.email === email); if (!m) continue;
    const d = digestFor(m, data); if (!d) continue;
    try { MailApp.sendEmail({ to: email, subject: d.subject, htmlBody: d.html, name: 'Cadet Group 2 Hub' }); sent++; } catch (e) { console.warn(email, e); }
  }
  props.setProperty('queue', JSON.stringify(queue));
}

/* ---------- reading Firestore (the script's owner must be an Owner of the Firebase project) ---------- */
function load() {
  const dir = list('directory').find(d => d.id === 'all') || {};
  return {
    members: list('members').map(m => ({ ...m, email: m.id.toLowerCase(), posts: m.posts || [], cmdUnits: m.cmdUnits || [], unitDivs: m.unitDivs || [], divs: m.divs || [], units: m.units || [], gDivs: m.gDivs || [] })),
    items: list('items').map(body), acks: list('acks').map(body), cal: list('cal').map(body),
    people: (body(dir).people || [])
  };
}
function list(coll) {
  const out = []; let tok = '';
  do {
    const r = UrlFetchApp.fetch('https://firestore.googleapis.com/v1/projects/' + PROJECT_ID + '/databases/(default)/documents/' + coll + '?pageSize=300' + (tok ? '&pageToken=' + tok : ''),
      { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() }, muteHttpExceptions: true });
    if (r.getResponseCode() !== 200) throw new Error(coll + ': ' + r.getContentText().slice(0, 300));
    const j = JSON.parse(r.getContentText());
    (j.documents || []).forEach(d => { const f = {}; for (const k in d.fields || {}) f[k] = val(d.fields[k]); f.id = d.name.split('/').pop(); out.push(f); });
    tok = j.nextPageToken || '';
  } while (tok);
  return out;
}
function val(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue; if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return +v.integerValue; if ('doubleValue' in v) return v.doubleValue; if ('timestampValue' in v) return v.timestampValue;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(val);
  if ('mapValue' in v) { const o = {}; for (const k in v.mapValue.fields || {}) o[k] = val(v.mapValue.fields[k]); return o; }
  return null;
}
function body(f) { let b = {}; try { b = JSON.parse(f.j || '{}'); } catch (e) {} return Object.assign(b, { id: f.id, sq: f.sq, div: f.div, t: f.t, up: !!f.up, pub: !!f.pub }); }

/* ---------- who sees what (same as the site) ---------- */
const groupCmd = m => m.cmdUnits.indexOf(GROUP) >= 0;
function seeItem(d, m) {
  return ((groupCmd(m) || m.gDivs.indexOf(d.div) >= 0) && (d.sq === 'ALL' || d.sq === GROUP || d.up)) || m.cmdUnits.indexOf(d.sq) >= 0
    || m.unitDivs.indexOf(d.sq + ':' + d.div) >= 0 || (d.div === 'ALL' && m.units.indexOf(d.sq) >= 0)
    || (d.sq === 'ALL' && (d.div === 'ALL' || m.divs.indexOf(d.div) >= 0 || m.cmdUnits.length > 0));
}
function seeCal(d, m) {
  return m.cmdUnits.indexOf(d.sq) >= 0 || m.unitDivs.indexOf(d.sq + ':' + d.div) >= 0 || (d.div === 'ALL' && m.units.indexOf(d.sq) >= 0)
    || (d.up && (groupCmd(m) || m.gDivs.indexOf(d.div) >= 0)) || d.pub;
}
function canWrite(sq, div, m) {
  if (groupCmd(m)) return true; if (sq === 'ALL') return div !== 'ALL' && m.gDivs.indexOf(div) >= 0;
  if (m.cmdUnits.indexOf(sq) >= 0) return true; return div !== 'ALL' && m.unitDivs.indexOf(sq + ':' + div) >= 0;
}
function isActor(p, m, people) {
  const has = x => m.posts.indexOf(x) >= 0;
  if (p.status === 'Submitted') return !!p.to && String(p.to.email).toLowerCase() === m.email;
  switch (p.status) {
    case 'In squadron review': return m.cmdUnits.indexOf(p.sq) >= 0 && p.sq !== GROUP;
    case 'Sent to Group': return m.gDivs.indexOf(p.div) >= 0;
    case 'Group CoS review': return has(GROUP + ':CoS');
    case 'Group CC review': return has(GROUP + ':CC') || has(GROUP + ':CD');
    case 'Returned': return (m.cmdUnits.indexOf(p.sq) >= 0 && p.sq !== GROUP) || (p.sq === GROUP && has(GROUP + ':CoS'));
    default: return false;
  }
}

/* ---------- one person's email ---------- */
function digestFor(m, data) {
  const sqs = ['CS11', 'CS12', 'CS13', 'CS14', 'CS15', 'CS16', 'CS17', 'CS18', 'CS19', 'CS20'];
  const ack = (t, u) => { const s = (data.acks.find(a => a.id === t.id + '__' + u) || {}).status || ''; return s === 'Accepted' ? 'Done' : s; };
  const today = ymd(new Date()), week = ymd(new Date(Date.now() + 7 * 864e5));
  const tasks = data.items.filter(t => t.t === 'task' && !t.closed && seeItem(t, m)).map(t => {
    const targets = t.sq === 'ALL' ? sqs : [t.sq];
    const mine = targets.filter(u => m.units.indexOf(u) >= 0 && canWrite(u, t.div, m));
    const overseer = (t.sq === 'ALL' || t.sq === GROUP) && (groupCmd(m) || m.gDivs.indexOf(t.div) >= 0);
    if (mine.length && !overseer) { const left = mine.filter(u => ack(t, u) !== 'Done'); return left.length ? { t, line: 'Your status: ' + (ack(t, left[0]) || 'Not started') } : null; }
    if (overseer) { const done = targets.filter(u => ack(t, u) === 'Done').length; return done < targets.length ? { t, line: done + '/' + targets.length + ' done' } : null; }
    return null;
  }).filter(Boolean).sort((a, b) => String(a.t.due || '9').localeCompare(String(b.t.due || '9')));
  // submissions waiting on this person (Group side) and submissions Group returned to their squadron
  const byId = {}; data.items.forEach(x => byId[x.id] = x);
  const papers = data.acks.map(a => ({ a, t: byId[a.tid] })).filter(x => x.t && seeItem({ sq: x.a.sq, div: x.a.div, up: true }, m) && (
      (x.a.status === 'Done' && (x.t.sq === 'ALL' || x.t.sq === GROUP || x.t.up) && (groupCmd(m) || m.gDivs.indexOf(x.t.div) >= 0)) ||
      (x.a.status === 'Returned' && m.units.indexOf(x.a.sq) >= 0 && canWrite(x.a.sq, x.t.div, m))))
    .map(x => ({ id: x.t.id, title: x.t.title, kind: x.a.status === 'Done' ? 'To review' : 'Returned to you', sq: x.a.sq, status: x.a.status === 'Done' ? 'submitted' : (x.a.reviewNote || 'returned') }));
  const events = data.cal.filter(e => seeCal(e, m) && e.start >= today && e.start <= week).sort((a, b) => a.start.localeCompare(b.start));
  if (!tasks.length && !papers.length) return null;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const due = d => { if (!d) return ''; const n = Math.round((new Date(d + 'T12:00') - new Date(today + 'T12:00')) / 864e5); return n < 0 ? '<b style="color:#D62828">' + (-n) + ' days late</b>' : n === 0 ? '<b>due today</b>' : 'due ' + d; };
  const li = (href, title, sub) => '<li style="margin:0 0 8px"><a href="' + href + '">' + esc(title) + '</a><br><span style="color:#525B6B;font-size:13px">' + sub + '</span></li>';
  let html = '<div style="font-family:Segoe UI,Arial,sans-serif;font-size:15px;color:#11141A;max-width:620px">'
    + '<p>Here’s what needs you this week on the <a href="' + SITE_URL + '">Cadet Group 2 Hub</a>.</p>';
  if (tasks.length) html += '<h3 style="margin:18px 0 6px">Open taskers (' + tasks.length + ')</h3><ul style="padding-left:18px">' + tasks.map(x => li(SITE_URL + '#task-' + x.t.id, x.t.title, [x.t.sq === 'ALL' ? 'All squadrons' : x.t.sq, due(x.t.due), esc(x.line)].filter(Boolean).join(' · '))).join('') + '</ul>';
  if (papers.length) html += '<h3 style="margin:18px 0 6px">Submissions (' + papers.length + ')</h3><ul style="padding-left:18px">' + papers.map(p => li(SITE_URL + '#task-' + p.id, p.title, [esc(p.kind), p.sq, esc(p.status)].join(' · '))).join('') + '</ul>';
  if (events.length) html += '<h3 style="margin:18px 0 6px">Next 7 days</h3><ul style="padding-left:18px">' + events.map(e => li(SITE_URL + '#event-' + e.id, e.title, [e.start, e.time, e.sq].filter(Boolean).join(' · '))).join('') + '</ul>';
  html += '<p style="color:#525B6B;font-size:12px;margin-top:24px">Sent weekly to Group 2 leadership on the hub’s access list. Your positions decide what’s in it.</p></div>';
  const n = tasks.length + papers.length;
  return { subject: 'Group 2 weekly: ' + n + (n === 1 ? ' item needs you' : ' items need you'), html };
}
function ymd(d) { return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd'); }
