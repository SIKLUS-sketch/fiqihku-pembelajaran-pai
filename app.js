"use strict";
/* Logika bersama untuk semua halaman SiklusKu.
   Setiap halaman HTML hanya perlu: <body data-halaman="..."> + <div id="app"> + memuat data.js lalu app.js */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ========== alamat halaman ========== */
const U = {
  dashboard:'index.html', materi:'materi.html', progres:'progres.html', profil:'profil.html',
  bab:(b, i) => `${b}.html` + (i ? `?m=${i}` : ''),
  kuis:b => 'kuis.html' + (b ? `?bab=${b}` : ''),
  evaluasi:b => 'evaluasi.html' + (b ? `?bab=${b}` : '')
};

/* ========== penyimpanan (localStorage, aman kalau diblokir) ========== */
const KUNCI = 'fiqihku:v1' + (typeof USER_AKTIF !== 'undefined' && USER_AKTIF ? ':' + USER_AKTIF : '');   // data terpisah per akun (lihat auth.js)
function bacaSimpan(){ try{ const t = localStorage.getItem(KUNCI); if(t) return JSON.parse(t); }catch(e){} return null; }
let S = Object.assign({nama:'', selesai:{najis:[],haid:[]}, kuis:{}, evaluasi:{}, terakhir:null}, bacaSimpan() || {});
S.selesai = S.selesai || {}; S.selesai.najis = S.selesai.najis || []; S.selesai.haid = S.selesai.haid || [];
S.kuis = S.kuis || {}; S.evaluasi = S.evaluasi || {};
function simpan(){ try{ localStorage.setItem(KUNCI, JSON.stringify(S)); }catch(e){} }

/* ========== ikon & ilustrasi ========== */
const IK = {
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  buku:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  air:'<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.4 0z"/>',
  kalender:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  cek:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  papan:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
  grafik:'<path d="M12 20V10M18 20V4M6 20v-4"/>',
  user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  jam:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  centang:'<path d="M20 6L9 17l-5-5"/>',
  silang:'<path d="M18 6L6 18M6 6l12 12"/>',
  kiri:'<path d="M19 12H5M12 19l-7-7 7-7"/>',
  kanan:'<path d="M5 12h14M12 5l7 7-7 7"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  rumah:'<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  timbangan:'<path d="M12 3v17M7 21h10M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
  terang:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  gelap:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sistem:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  medali:'<circle cx="12" cy="8" r="6"/><path d="M15.5 13.9L17 23l-5-3-5 3 1.5-9.1"/>',
  lampu:'<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  dokumen:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  tanya:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  kamera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  telepon:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
};
const ik = (n, k = '') => `<svg class="ik ${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IK[n]}</svg>`;

const LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 35V21q0-11 13-15 13 4 13 15v14z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="M20 6V2" stroke="#D8B568" stroke-width="2.2" stroke-linecap="round"/><path d="M14 35v-8a6 6 0 0 1 12 0v8" fill="#D8B568"/></svg>';

const ILUS = {
  hero:'<svg viewBox="0 0 260 200"><ellipse cx="130" cy="188" rx="120" ry="9" fill="#176B50" opacity=".14"/><rect x="62" y="114" width="136" height="74" fill="#176B50"/><path d="M72 114q0-54 58-64 58 10 58 64z" fill="#1F8A66"/><path d="M130 50V34" stroke="#D8B568" stroke-width="3" stroke-linecap="round"/><path d="M137 27a8 8 0 1 1-8-12 6.2 6.2 0 0 0 8 12z" fill="#D8B568"/><path d="M114 188v-28a16 16 0 0 1 32 0v28z" fill="#E6F3EB"/><rect x="30" y="84" width="14" height="104" fill="#176B50"/><path d="M28 84l9-28 9 28z" fill="#1F8A66"/><rect x="216" y="84" width="14" height="104" fill="#176B50"/><path d="M214 84l9-28 9 28z" fill="#1F8A66"/><path d="M240 188c-6-30 4-54 18-66 0 30-6 52-18 66z" fill="#3E9B76"/><path d="M18 188c4-24-2-42-14-52 0 24 4 42 14 52z" fill="#3E9B76"/></svg>',
  tetes:'<svg viewBox="0 0 120 110"><path d="M12 64h96a48 38 0 0 1-96 0z" fill="#7FB7D6"/><ellipse cx="60" cy="64" rx="48" ry="9" fill="#A9D3E8"/><path d="M60 8c14 20 22 30 22 42a22 22 0 0 1-44 0c0-12 8-22 22-42z" fill="#176B50"/><path d="M51 44a10 10 0 0 0 6 14" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/><circle cx="96" cy="22" r="3" fill="#D8B568"/><circle cx="22" cy="34" r="2.5" fill="#D8B568"/></svg>',
  kalender:'<svg viewBox="0 0 120 110"><rect x="16" y="18" width="88" height="82" rx="10" fill="#fff" stroke="#D8B568" stroke-width="3"/><path d="M16 40V28a10 10 0 0 1 10-10h68a10 10 0 0 1 10 10v12z" fill="#D8B568"/><rect x="34" y="8" width="6" height="18" rx="3" fill="#176B50"/><rect x="80" y="8" width="6" height="18" rx="3" fill="#176B50"/><g fill="#CFE5D8"><circle cx="36" cy="56" r="5"/><circle cx="60" cy="56" r="5"/><circle cx="84" cy="56" r="5"/><circle cx="36" cy="76" r="5"/><circle cx="84" cy="76" r="5"/></g><circle cx="60" cy="76" r="6" fill="#B2432C"/></svg>',
  kota:'<svg viewBox="0 0 200 70"><g fill="currentColor"><rect x="30" y="42" width="140" height="28"/><path d="M44 42q0-26 26-26 26 0 26 26z"/><path d="M108 42q0-18 18-18 18 0 18 18z"/><rect x="12" y="22" width="6" height="48"/><path d="M9 22l6-14 6 14z"/><rect x="180" y="26" width="6" height="44"/><path d="M177 26l6-14 6 14z"/></g></svg>'
};
window.__fb = function(img){
  const k = img.dataset.ilus;
  if(!k || !ILUS[k] || img.dataset.sudah) return;
  img.dataset.sudah = '1';
  const w = document.createElement('span');
  w.className = 'svg-ilus'; w.setAttribute('role','img'); w.setAttribute('aria-label', img.alt || '');
  w.innerHTML = ILUS[k];
  img.replaceWith(w);
};
function pasangFallback(root){
  root.querySelectorAll('img[data-ilus]').forEach(img => {
    if(img.complete && img.naturalWidth === 0) window.__fb(img);
    else img.addEventListener('error', () => window.__fb(img), {once:true});
  });
}
const gambar = (k, alt = '', kelas = '') =>
  `<div class="ilus ${kelas}"><img src="gambar/${k}.png" alt="${esc(alt)}" data-ilus="${k}" loading="lazy" onerror="window.__fb&&window.__fb(this)"></div>`;

/* ========== hitungan progres ========== */
const TOTAL = () => BAB.najis.materi.length + BAB.haid.materi.length;
const jmlSelesai = b => S.selesai[b].length;
const babKuis = () => ['najis','haid'].filter(b => S.kuis[b]).length;
const babEval = () => ['najis','haid'].filter(b => S.evaluasi[b]).length;
const persen = () => Math.round((jmlSelesai('najis') + jmlSelesai('haid') + babKuis() + babEval()) / (TOTAL() + 4) * 100);
const persenBab = b => Math.round(jmlSelesai(b) / BAB[b].materi.length * 100);
const titikBab = b => {
  if(S.terakhir && S.terakhir.bab === b) return S.terakhir.idx;
  for(let i = 1; i <= BAB[b].materi.length; i++) if(!S.selesai[b].includes(i)) return i;
  return 1;
};
const statusBelajar = () => { const p = persen(); return p === 0 ? 'Belum Mulai' : p >= 100 ? 'Selesai' : 'Dalam Proses'; };

function ring(p, ukuran = 96, tebal = 9, label = ''){
  const r = (ukuran - tebal) / 2, k = 2 * Math.PI * r, c = ukuran / 2;
  return `<svg class="ring" width="${ukuran}" height="${ukuran}" viewBox="0 0 ${ukuran} ${ukuran}" role="img" aria-label="${p} persen">
    <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--trek)" stroke-width="${tebal}"/>
    <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--aksen)" stroke-width="${tebal}" stroke-linecap="round" stroke-dasharray="${(k * p / 100).toFixed(1)} ${k.toFixed(1)}" transform="rotate(-90 ${c} ${c})"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${Math.round(ukuran / 4.4)}" font-weight="800" fill="var(--tinta)">${label || p + '%'}</text></svg>`;
}
const fmtJam = d => String(Math.floor(d / 60)).padStart(2,'0') + ':' + String(d % 60).padStart(2,'0');
const fmtLama = d => d < 60 ? `${d} detik` : `${Math.floor(d / 60)} menit${d % 60 ? ' ' + (d % 60) + ' detik' : ''}`;
const acak = a => { const b = a.slice(); for(let i = b.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const hari = t => new Date(t).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}) + ', ' + new Date(t).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});

/* ========== halaman: dashboard (index.html) ========== */
function lencana(){
  return [
    {nama:'Pelajar Aktif', ket:'Menyelesaikan materi pertama', ok:jmlSelesai('najis') + jmlSelesai('haid') >= 1},
    {nama:'Tuntas Bab Najis', ket:'Semua materi Bab Najis selesai', ok:jmlSelesai('najis') === BAB.najis.materi.length},
    {nama:'Tuntas Bab Haid', ket:'Semua materi Bab Haid selesai', ok:jmlSelesai('haid') === BAB.haid.materi.length},
    {nama:'Nilai 80 ke Atas', ket:'Evaluasi akhir dengan nilai minimal 80', ok:['najis','haid'].some(b => S.evaluasi[b] && S.evaluasi[b].nilai >= 80)}
  ];
}
function vDashboard(){
  const nama = S.nama ? ', ' + esc(S.nama) : '';
  const p = persen(), t = S.terakhir;
  const lanjut = t ? U.bab(t.bab, t.idx) : U.bab('najis', 1);
  const kartuBab = id => {
    const B = BAB[id], pp = persenBab(id);
    return `<div class="bab ${id}"><div>
      <h3>Bab ${B.judul}</h3><p>${esc(B.pendek)}.</p>
      <div class="bar ${id === 'haid' ? 'emas' : ''}" role="progressbar" aria-valuenow="${pp}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pp}%"></i></div>
      <div class="baris"><span class="lembut">${jmlSelesai(id)} dari ${B.materi.length} materi · ${pp}%</span></div>
      <div class="baris"><span class="lembut">${ik('jam')} ± ${B.menit} menit</span><a class="btn ${id === 'haid' ? 'emas' : ''}" href="${U.bab(id)}">Pelajari Materi</a></div>
    </div>${gambar(B.ilus, 'Ilustrasi bab ' + B.judul)}</div>`;
  };
  const badge = lencana().slice(0, 4).map(b => `<div class="lencana ${b.ok ? '' : 'kunci'}"><span class="medal">${ik('medali')}</span><div><b>${b.nama}</b><span>${b.ket}</span></div></div>`).join('');
  const terakhir = t ? `<div class="riwayat"><span class="bulat">${ik('dokumen')}</span><div><b class="kecil">${esc(BAB[t.bab].materi[t.idx - 1].judul)}</b><div class="kecil lembut">Bab ${BAB[t.bab].judul} · ${hari(t.waktu)}</div></div></div>`
    : `<p class="kecil lembut" style="margin:0">Belum ada materi yang dibuka. Mulai dari Bab Najis, yuk.</p>`;
  return `
  <div class="kepala"><div><h1>Assalamu’alaikum${nama}!</h1><p>Mari belajar fikih dengan mudah dan menyenangkan.</p></div>
    <a class="pengguna" href="${U.profil}"><span class="av">${esc((S.nama || 'S').trim().charAt(0).toUpperCase())}</span><span>${S.nama ? esc(S.nama) : 'Isi namamu'}</span></a></div>
  <section class="hero">
    <div><h2>Pahami Fikih, Terapkan dalam Kehidupan</h2>
      <p>Pelajari ketentuan najis dan haid melalui materi ringkas, contoh kasus, dan latihan interaktif. Semua bersumber dari Terjemah Kitab Fathul Qorib.</p>
      <div class="aksi"><a class="btn" href="${lanjut}">${t ? 'Lanjut Belajar' : 'Mulai Belajar'}</a><a class="btn garis" href="${U.progres}">Lihat Progres</a></div></div>
    <div class="hero-visual"><span class="hero-masjid" aria-hidden="true">${ILUS.hero}</span><img class="hero-tokoh" src="gambar/hero.png" alt="Pemuda muslim membaca buku" width="360" height="432"></div>
  </section>
  <div class="dash"><div>
    <h2 class="seksi">Materi Pembelajaran</h2>
    <div class="g2">${kartuBab('najis')}${kartuBab('haid')}</div>
    <h2 class="seksi">Fitur Lainnya</h2>
    <div class="g4 fitur-lain">
      <a class="tile" href="kalender.html"><span class="bulat">${ik('kalender')}</span><b>Kalender Haid</b><span>Catat dan pantau siklusmu</span></a>
      <a class="tile" href="scan.html"><span class="bulat">${ik('kamera')}</span><b>Scan Warna Darah</b><span>Kenali jenis darah dari warnanya</span></a>
      <a class="tile" href="tanya.html"><span class="bulat">${ik('tanya')}</span><b>Tanya Fiqih</b><span>Pertanyaan seputar ibadah wanita</span></a>
      <a class="tile" href="konsultasi.html"><span class="bulat">${ik('telepon')}</span><b>Konsultasi</b><span>Hubungi pihak yang tepat</span></a>
    </div>
    <h2 class="seksi">Belajar Lebih Mudah</h2>
    <div class="g4">
      <a class="tile" href="${U.materi}"><span class="bulat">${ik('buku')}</span><b>Ringkasan Materi</b><span>Penjelasan singkat dan terstruktur</span></a>
      <a class="tile" href="${U.bab('najis', BAB.najis.materi.length)}"><span class="bulat">${ik('lampu')}</span><b>Contoh Kasus</b><span>Situasi sehari-hari yang relevan</span></a>
      <a class="tile" href="${U.kuis()}"><span class="bulat">${ik('cek')}</span><b>Kuis Interaktif</b><span>Soal pilihan ganda dengan umpan balik</span></a>
      <a class="tile" href="${U.evaluasi()}"><span class="bulat">${ik('papan')}</span><b>Evaluasi Akhir</b><span>Tes pemahaman setelah materi</span></a>
    </div>
  </div><aside>
    <h2 class="seksi" style="margin-top:26px">Progres Belajar</h2>
    <div class="kartu"><div class="ring-wrap">${ring(p)}<div><b>Materi selesai</b><div class="lembut kecil">${jmlSelesai('najis') + jmlSelesai('haid')} dari ${TOTAL()}</div>
      <p class="kecil lembut" style="margin:8px 0 0">${p === 0 ? 'Belum mulai. Satu materi sudah cukup untuk memulai.' : p >= 100 ? 'Semua materi, kuis, dan evaluasi sudah kamu selesaikan.' : 'Terus lanjut, sedikit demi sedikit.'}</p></div></div></div>
    <h2 class="seksi">Terakhir Diakses</h2><div class="kartu">${terakhir}</div>
    <h2 class="seksi">Lencana Pencapaian</h2><div class="kartu" style="padding-top:8px;padding-bottom:8px">${badge}</div>
  </aside></div>`;
}

/* ========== halaman: ringkasan materi (materi.html) ========== */
function vRingkasan(){
  const kartu = id => { const B = BAB[id];
    return `<div class="kartu"><h2 style="font-size:18px;margin-bottom:4px">Bab ${B.judul}</h2><p class="kecil lembut">${esc(B.pendek)}. Sumber: Fathul Qorib ${B.hlm}.</p>
    <div class="daftar-list">${B.materi.map((m, i) => `<a class="item ${S.selesai[id].includes(i + 1) ? 'selesai' : ''}" style="display:flex;gap:10px;align-items:center;padding:8px 4px;text-decoration:none;color:inherit;border-top:1px solid var(--garis)" href="${U.bab(id, i + 1)}"><span class="no" style="${S.selesai[id].includes(i + 1) ? 'background:var(--hijau-muda);border-color:var(--aksen);color:var(--aksen)' : ''}">${S.selesai[id].includes(i + 1) ? ik('centang') : i + 1}</span><span style="flex:1">${esc(m.judul)}</span><span class="kecil lembut">${m.hlm}</span></a>`).join('')}</div></div>`; };
  return `<div class="kepala"><div><h1>Materi Pembelajaran</h1><p>Pilih bab, lalu ikuti materinya berurutan.</p></div></div><div class="g2">${kartu('najis')}${kartu('haid')}</div>`;
}

/* ========== halaman: bab (najis.html, haid.html) ========== */
function blokHtml(b){
  if(typeof b === 'string') return `<p>${esc(b)}</p>`;
  if(b.t === 'tabel') return `<div class="tabel"><table><thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if(b.t === 'kartu2') return `<div class="kartu2">${b.items.map(i => `<div><h4>${esc(i.judul)}</h4><p>${esc(i.isi)}</p></div>`).join('')}</div>`;
  if(b.t === 'catatan') return `<div class="catatan">${esc(b.isi)}</div>`;
  if(b.t === 'daftar'){ const tag = b.urut ? 'ol' : 'ul'; return `${b.judul ? `<h4>${esc(b.judul)}</h4>` : ''}<${tag}>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</${tag}>`; }
  if(b.t === 'kasus') return b.items.map((k, i) => `<details class="kasus"><summary><span class="chip">Kasus ${i + 1}</span><span>${esc(k.q)}</span></summary><div class="jawab"><b>Jawaban:</b> ${esc(k.a)}</div></details>`).join('');
  return '';
}
function vMateri(id, idx){
  const B = BAB[id], n = B.materi.length;
  idx = Math.min(Math.max(parseInt(idx, 10) || 1, 1), n);
  const m = B.materi[idx - 1], sudah = S.selesai[id].includes(idx), pp = persenBab(id);
  S.terakhir = {bab:id, idx, waktu:Date.now()}; simpan();
  document.title = `${idx}. ${m.judul} | Bab ${B.judul} | SiklusKu`;
  const daftar = B.materi.map((x, i) => `<a class="item ${i + 1 === idx ? 'aktif' : ''} ${S.selesai[id].includes(i + 1) ? 'selesai' : ''}" href="${U.bab(id, i + 1)}" ${i + 1 === idx ? 'aria-current="page"' : ''}><span class="no">${S.selesai[id].includes(i + 1) ? ik('centang') : i + 1}</span><span>${esc(x.judul)}</span></a>`).join('');
  const pembuka = m.ilus === false ? `<div class="pembuka" style="grid-template-columns:1fr"><p>${esc(m.pembuka)}</p></div>`
    : `<div class="pembuka">${gambar(B.ilus, '')}<p>${esc(m.pembuka)}</p></div>`;
  const penting = m.penting ? `<div class="penting"><h4>${ik('lampu')} Penting untuk diingat</h4><ul>${m.penting.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  const R = 'gambar/ruang/';
  const popDaftar = B.materi.map((x, i) => `<a class="item ${i + 1 === idx ? 'aktif' : ''} ${S.selesai[id].includes(i + 1) ? 'selesai' : ''}" href="${U.bab(id, i + 1)}" ${i + 1 === idx ? 'aria-current="page"' : ''}><span class="no">${S.selesai[id].includes(i + 1) ? ik('centang') : i + 1}</span><span>${esc(x.judul)}</span></a>`).join('');
  const prev = idx > 1 ? `<a class="rb rb-prev" href="${U.bab(id, idx - 1)}" aria-label="Materi sebelumnya">${ik('kiri')}</a>` : '';
  const next = `<button class="rb rb-next" data-aksi="selesai-lanjut" data-bab="${id}" data-idx="${idx}"><span>${idx < n ? 'Lanjut' : 'Kerjakan Kuis'}</span>${ik('kanan')}</button>`;
  const batal = sudah ? `<button class="btn garis kecil-btn" data-aksi="batal-selesai" data-bab="${id}" data-idx="${idx}">Tandai belum selesai</button>` : '';
  return `
  <div class="ruang" data-bab="${id}">
    <div class="ruang-isi">
      <div class="tokoh" aria-hidden="true"><div class="tokoh-hidup">
        <img class="tk-buka" src="${R}gadis.webp" alt="" width="584" height="753">
        <img class="tk-kedip" src="${R}gadis-kedip.webp" alt="" width="584" height="753">
      </div></div>
      <img class="maskot-tetes" src="${R}tetes.webp" alt="" aria-hidden="true" width="219" height="223">
      <section class="papan" aria-labelledby="judul-materi">
        <header class="pita">
          <span class="pita-buku" aria-hidden="true">${ik('buku')}</span>
          <h2 id="judul-materi">${idx}. ${esc(m.judul)}</h2>
          <details class="pita-daftar"><summary aria-label="Daftar materi Bab ${B.judul}">${ik('menu')}<span>${idx}/${n}</span></summary>
            <div class="pop"><b>Bab ${B.judul}</b><div class="pop-list">${popDaftar}</div><a class="pop-semua" href="${U.materi}">${ik('kiri')} Semua bab</a></div></details>
        </header>
        <div class="papan-isi isi-materi" tabindex="0">
          <div class="sumber">Sumber: Terjemah Fathul Qorib, ${m.hlm}</div>
          ${pembuka}
          <div class="teks">${m.blok.map(blokHtml).join('')}</div>
          ${penting}
        </div>
        <footer class="papan-kaki">
          <div class="prog"><div><span>${idx} dari ${n} materi</span><b>${pp}%</b></div><div class="bar" role="progressbar" aria-valuenow="${pp}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pp}%"></i></div></div>
          ${batal}
        </footer>
      </section>
      <div class="bulat-ikon" aria-hidden="true">
        <img src="${R}najis-kotoran.webp" alt=""><img src="${R}najis-air-kuning.webp" alt=""><img src="${R}najis-darah.webp" alt=""><img src="${R}najis-tanah.webp" alt="">
      </div>
      <nav class="ruang-tombol" aria-label="Navigasi materi">
        <a class="rb rb-rumah" href="${U.dashboard}" aria-label="Ke beranda">${ik('rumah')}</a>
        ${prev}${next}
      </nav>
    </div>
  </div>`;
}

/* ========== halaman: kuis & evaluasi (kuis.html, evaluasi.html) ========== */
let sesi = null, timerId = null;
function mulaiSesi(mode, bab){
  const jml = mode === 'evaluasi' ? 10 : 6;
  const soal = acak(SOAL[bab]).slice(0, jml).map(s => {
    const o = acak(s.o.map((t, i) => ({t, b:i === 0})));
    return {q:s.q, opsi:o.map(x => x.t), benar:o.findIndex(x => x.b), e:s.e, m:s.m, h:s.h};
  });
  sesi = {mode, bab, soal, i:0, jwb:Array(soal.length).fill(null), cek:Array(soal.length).fill(false), mulai:Date.now(), selesai:false, lihat:false, detik:0};
}
function vPilih(mode){
  const kartu = id => { const B = BAB[id], d = mode === 'kuis' ? S.kuis[id] : S.evaluasi[id];
    const href = mode === 'kuis' ? U.kuis(id) : U.evaluasi(id);
    return `<div class="bab ${id}"><div><h3>Bab ${B.judul}</h3>
      <p>${mode === 'kuis' ? `6 soal acak dari ${SOAL[id].length} soal. Jawabanmu langsung dibahas.` : `10 soal acak, ada penghitung waktu. Pembahasan muncul setelah selesai.`}</p>
      <p class="kecil" style="margin-bottom:12px"><b>${d ? 'Nilai terakhir: ' + d.nilai : 'Belum dikerjakan'}</b></p>
      <a class="btn ${id === 'haid' ? 'emas' : ''}" href="${href}">${mode === 'kuis' ? 'Mulai Latihan' : 'Mulai Evaluasi'}</a></div>${gambar(B.ilus, '')}</div>`; };
  return `<div class="kepala"><div><h1>${mode === 'kuis' ? 'Latihan dan Kuis' : 'Evaluasi Pembelajaran'}</h1><p>${mode === 'kuis' ? 'Latihan untuk mengukur pemahaman setelah membaca materi.' : 'Tes akhir per bab. Kerjakan setelah semua materi bab selesai dibaca.'}</p></div></div><div class="pilih-bab">${kartu('najis')}${kartu('haid')}</div>`;
}
function vSesi(){
  const s = sesi, B = BAB[s.bab];
  if(s.selesai) return vHasil();
  const q = s.soal[s.i], total = s.soal.length, ev = s.mode === 'evaluasi';
  const terkunci = !ev && s.cek[s.i], pil = s.jwb[s.i];
  const opsi = q.opsi.map((t, k) => {
    let cls = '';
    if(terkunci){ if(k === q.benar) cls = 'benar'; else if(k === pil) cls = 'salah'; }
    else if(k === pil) cls = 'pilih';
    return `<button class="opsi ${cls}" data-aksi="pilih" data-k="${k}" ${terkunci ? 'disabled' : ''} aria-pressed="${k === pil}"><span class="huruf">${'ABCD'[k]}</span><span>${esc(t)}</span></button>`;
  }).join('');
  let umpan = '';
  if(terkunci){
    const ok = pil === q.benar, mm = BAB[s.bab].materi[q.m - 1];
    umpan = `<div class="umpan ${ok ? 'benar' : 'salah'}" role="status"><span class="tanda">${ik(ok ? 'centang' : 'silang')}</span><div>
      <h3>${ok ? 'Jawaban Benar!' : 'Belum tepat'}</h3>${ok ? '' : `<p><b>Jawaban yang benar:</b> ${esc(q.opsi[q.benar])}</p>`}
      <p><b>Pembahasan:</b> ${esc(q.e)} <span class="lembut">(${q.h})</span></p>
      <a href="${U.bab(s.bab, q.m)}" class="kecil">Baca lagi: ${esc(mm.judul)}</a></div></div>`;
  }
  const terakhir = s.i === total - 1;
  const belum = s.jwb.filter(x => x === null).length;
  let tombol;
  if(ev){
    tombol = `<div class="nav-btn">${s.i > 0 ? `<button class="btn garis" data-aksi="sebelumnya">${ik('kiri')} Sebelumnya</button>` : '<span></span>'}
      ${terakhir ? `<button class="btn" data-aksi="selesai-sesi">Selesai dan Lihat Nilai</button>` : `<button class="btn" data-aksi="berikutnya">Soal Berikutnya ${ik('kanan')}</button>`}</div>
      ${terakhir && belum ? `<p class="kecil lembut" style="margin-top:10px;text-align:right">Masih ada ${belum} soal yang belum dijawab. Soal kosong dihitung salah.</p>` : ''}`;
  } else {
    tombol = `<div class="nav-btn"><span></span>${!terkunci ? `<button class="btn" data-aksi="periksa" ${pil === null ? 'disabled' : ''}>Periksa Jawaban</button>`
      : (terakhir ? `<button class="btn" data-aksi="selesai-sesi">Lihat Hasil</button>` : `<button class="btn" data-aksi="berikutnya">Soal Berikutnya ${ik('kanan')}</button>`)}</div>`;
  }
  const pp = Math.round((s.i + 1) / total * 100);
  return `<div class="kuis-top"><a class="ikon-btn" href="${ev ? U.evaluasi() : U.kuis()}" aria-label="Keluar dari ${ev ? 'evaluasi' : 'kuis'}">${ik('kiri')}</a><h1>${ev ? 'Evaluasi Akhir' : 'Kuis'}: Bab ${B.judul}</h1>
    <div class="prog"><div><span>Soal ${s.i + 1} dari ${total}</span>${ev ? `<b id="timer">${fmtJam(Math.floor((Date.now() - s.mulai) / 1000))}</b>` : `<b>${pp}%</b>`}</div><div class="bar"><i style="width:${pp}%"></i></div></div></div>
  <div class="kartu kuis-kartu"><span class="chip">Pilihan Ganda</span><h2>${esc(q.q)}</h2>${opsi}${umpan}${tombol}</div>`;
}
function hitungHasil(){
  const s = sesi, benar = s.soal.filter((q, i) => s.jwb[i] === q.benar).length, total = s.soal.length;
  const nilai = Math.round(benar / total * 100), detik = Math.floor((Date.now() - s.mulai) / 1000);
  s.hasil = {benar, salah:total - benar, nilai, detik}; s.selesai = true;
  const rekam = {nilai, benar, total, detik, tgl:Date.now()};
  if(s.mode === 'evaluasi') S.evaluasi[s.bab] = rekam; else S.kuis[s.bab] = rekam;
  simpan();
}
function vHasil(){
  const s = sesi, h = s.hasil, B = BAB[s.bab], ev = s.mode === 'evaluasi';
  const judul = h.nilai >= 80 ? 'Selamat!' : h.nilai >= 60 ? 'Lumayan, sedikit lagi' : 'Belum maksimal, ulangi yuk';
  const kalimat = h.nilai >= 80 ? 'Kamu sudah memahami materi ini dengan baik.' : h.nilai >= 60 ? 'Pemahamanmu sudah cukup, tapi masih ada bagian yang perlu dimantapkan.' : 'Baca ulang materinya pelan-pelan, lalu coba lagi.';
  const salah = s.soal.filter((q, i) => s.jwb[i] !== q.benar);
  const bagian = [...new Set(salah.map(q => q.m))].map(i => `<a href="${U.bab(s.bab, i)}">${esc(B.materi[i - 1].judul)}</a>`);
  const saran = salah.length ? `Pelajari lagi: ${bagian.join(', ')}.` : 'Semua jawabanmu tepat. Lanjut ke bab berikutnya, atau ulangi untuk memantapkan.';
  const review = s.lihat ? `<div class="review"><h3 style="margin-bottom:10px">Pembahasan</h3>${s.soal.map((q, i) => { const ok = s.jwb[i] === q.benar;
    return `<div class="r ${ok ? 'ok' : 'no'}"><b>${i + 1}. ${esc(q.q)}</b>Jawabanmu: ${s.jwb[i] === null ? '<i>tidak dijawab</i>' : esc(q.opsi[s.jwb[i]])}${ok ? '' : `<br>Jawaban benar: ${esc(q.opsi[q.benar])}`}<br><span class="lembut">${esc(q.e)} (${q.h})</span></div>`; }).join('')}</div>` : '';
  return `<div class="kuis-top"><a class="ikon-btn" href="${ev ? U.evaluasi() : U.kuis()}" aria-label="Kembali">${ik('kiri')}</a><h1>${ev ? 'Evaluasi Akhir' : 'Hasil Kuis'}: Bab ${B.judul}</h1></div>
  <div class="kartu hasil"><span class="chip emas">${ik('medali')} ${ev ? 'Evaluasi selesai' : 'Latihan selesai'}</span><h2>${judul}</h2><p class="lembut">${kalimat}</p>
    <div class="stat4"><div class="ring-wrap" style="justify-content:center">${ring(h.nilai, 120, 11, String(h.nilai))}</div>
      <div class="stat"><span>Jawaban Benar</span><b>${h.benar}</b></div><div class="stat"><span>Jawaban Salah</span><b>${h.salah}</b></div><div class="stat"><span>Waktu</span><b style="font-size:16px">${fmtLama(h.detik)}</b></div></div>
    <div class="aksi" style="justify-content:center"><button class="btn" data-aksi="lihat-bahas">${s.lihat ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}</button><button class="btn garis" data-aksi="ulang">${ev ? 'Ulangi Evaluasi' : 'Ulangi Kuis'}</button></div>
    <div class="saran">${ik('lampu')}<p><b>Saran:</b> ${saran}</p></div>${review}</div>`;
}
function jalankanTimer(){
  clearInterval(timerId);
  if(sesi && sesi.mode === 'evaluasi' && !sesi.selesai)
    timerId = setInterval(() => { const t = $('#timer'); if(t && sesi) t.textContent = fmtJam(Math.floor((Date.now() - sesi.mulai) / 1000)); }, 1000);
}
function tampilSesi(){ $('#isi').innerHTML = vSesi(); pasangFallback($('#isi')); jalankanTimer(); }

/* ========== halaman: progres (progres.html) & profil (profil.html) ========== */
function vProgres(){
  const p = persen();
  const terbaru = Object.values(S.kuis).sort((a, b) => b.tgl - a.tgl)[0];
  const baris = (nama, val, tot, tipe, emas) => `<div class="baris"><span><b>${nama}</b></span><div class="bar ${emas ? 'emas' : ''}"><i style="width:${Math.round(val / tot * 100)}%"></i></div><span>${tipe === 'bab' ? `${val} dari ${tot} bab` : `${Math.round(val / tot * 100)}%`}</span></div>`;
  const ev = Object.values(S.evaluasi).sort((a, b) => b.tgl - a.tgl)[0];
  return `<div class="kepala"><div><h1>Progres Belajar</h1><p>Perkembangan belajarmu ada di sini. Data tersimpan di browser ini.</p></div></div>
  <div class="stat-grid">
    <div class="kartu"><span class="bulat">${ik('buku')}</span><div><span>Materi Selesai</span><b>${jmlSelesai('najis') + jmlSelesai('haid')} dari ${TOTAL()}</b></div></div>
    <div class="kartu"><span class="bulat">${ik('cek')}</span><div><span>Nilai Kuis Terakhir</span><b>${terbaru ? terbaru.nilai : '-'}</b></div></div>
    <div class="kartu"><span class="bulat">${ik('grafik')}</span><div><span>Progres Keseluruhan</span><b>${p}%</b></div></div>
    <div class="kartu"><span class="bulat">${ik('medali')}</span><div><span>Status Pembelajaran</span><b>${statusBelajar()}</b></div></div>
  </div>
  <div class="prog-bawah">
    <div class="kartu rinci"><h2 style="font-size:16px;margin-bottom:6px">Rincian Progres</h2>
      ${baris('Bab Najis', jmlSelesai('najis'), BAB.najis.materi.length, 'materi')}${baris('Bab Haid', jmlSelesai('haid'), BAB.haid.materi.length, 'materi', true)}
      ${baris('Latihan dan Kuis', babKuis(), 2, 'bab')}${baris('Evaluasi Akhir', babEval(), 2, 'bab', true)}</div>
    <div class="kartu"><h2 style="font-size:16px;margin-bottom:10px">Evaluasi Terbaru</h2>${ev ? `<div class="ring-wrap">${ring(ev.nilai, 84, 8, String(ev.nilai))}<div class="kecil"><b>${ev.benar} dari ${ev.total} benar</b><div class="lembut">${fmtLama(ev.detik)} · ${hari(ev.tgl)}</div></div></div>` : '<p class="kecil lembut" style="margin:0">Belum ada evaluasi. Selesaikan materi satu bab dulu, lalu coba evaluasinya.</p>'}
      <div style="margin-top:14px"><a class="btn" href="${U.evaluasi()}">Ke Evaluasi</a></div></div>
  </div>`;
}
const OPSI_TEMA = [['terang', 'Terang', 'terang'], ['gelap', 'Gelap', 'gelap'], ['sistem', 'Ikuti perangkat', 'sistem']];
function pilihTema(){
  const now = (typeof TEMA !== 'undefined') ? TEMA.baca() : 'sistem';
  return `<div class="tema-pilih" role="radiogroup" aria-label="Tema tampilan">${OPSI_TEMA.map(([v, t, i]) =>
    `<button type="button" class="tema-opsi${now === v ? ' aktif' : ''}" role="radio" aria-checked="${now === v}" data-aksi="tema" data-v="${v}">${ik(i)}<span>${t}</span></button>`).join('')}</div>`;
}
let konfirmReset = false, konfirmAkun = false;
function vProfil(){
  return `<div class="kepala"><div><h1>Profil dan Setelan</h1><p>Atur nama, tampilan, dan data akunmu.</p></div></div>
  <div class="kartu tampilan-kartu"><h2 style="font-size:16px;margin-bottom:4px">Tampilan</h2>
    <p class="kecil lembut" style="margin:0 0 12px">Pilih terang atau gelap. “Ikuti perangkat” mengikuti pengaturan di HP atau komputermu. Pilihan ini tersimpan di browser ini.</p>
    ${pilihTema()}</div>
  <div class="kartu" style="max-width:640px;margin-top:16px"><label for="nama"><b>Namamu</b></label>
    <div class="form-baris"><input type="text" id="nama" maxlength="40" placeholder="Misalnya: Ahmad" value="${esc(S.nama)}"><button class="btn" data-aksi="simpan-nama">Simpan Nama</button></div>
    <p class="kecil lembut" id="info-nama" style="min-height:20px;margin:6px 0 0"></p></div>
  <div class="kartu" style="max-width:640px;margin-top:16px"><h2 style="font-size:16px;margin-bottom:6px">Akun</h2>
    <p class="kecil lembut">Masuk sebagai <b>${esc(typeof USER_AKTIF !== 'undefined' ? USER_AKTIF : '')}</b>. Akun ini menjaga catatan kalender, hasil scan, dan progres belajarmu dari orang lain yang memakai perangkat ini. Selesai memakai di perangkat bersama, tekan Keluar.</p>
    ${konfirmAkun ? `<p class="kecil"><b>Yakin hapus akun ini?</b> Akun beserta semua datanya (progres, kalender haid) dihapus dari perangkat ini dan tidak bisa dipulihkan.</p><div class="aksi" style="margin-top:0"><button class="btn bahaya garis" data-aksi="hapus-akun-ok">Ya, hapus akun</button><button class="btn garis" data-aksi="hapus-akun-batal">Batal</button></div>`
      : `<div class="aksi" style="margin-top:0"><button class="btn garis" data-aksi="keluar">Keluar</button><button class="btn garis bahaya" data-aksi="hapus-akun">Hapus Akun</button></div>`}</div>
  <div class="kartu" style="max-width:640px;margin-top:16px"><h2 style="font-size:16px;margin-bottom:6px">Data belajar</h2>
    <p class="kecil lembut">Progres, nilai kuis, dan nilai evaluasi disimpan di browser ini saja. Kalau kamu ganti perangkat atau menghapus data browser, progresnya ikut hilang.</p>
    ${konfirmReset ? `<p class="kecil"><b>Yakin hapus semua progres?</b> Ini tidak bisa dibatalkan.</p><div class="aksi" style="margin-top:0"><button class="btn bahaya garis" data-aksi="reset-ok">Ya, hapus semua</button><button class="btn garis" data-aksi="reset-batal">Batal</button></div>`
      : `<button class="btn garis bahaya" data-aksi="reset">Hapus Progres</button>`}</div>
  <div class="kartu" style="max-width:640px;margin-top:16px"><h2 style="font-size:16px;margin-bottom:6px">Sumber materi</h2>
    <p class="kecil lembut" style="margin:0">Terjemah Kitab Fathul Qorib (Fath Al-Qarib), syarah dari Matan Taqrib Abu Syujak, karya Muhammad bin Qasim al-Ghazi. Terjemahan versi digital Pondok Pesantren Al-Khoirot Malang. Materi di aplikasi ini adalah ringkasan dan penataan ulang dari bagian Bab Najis (hlm. 40–46) serta Bab Haidl, Nifas, dan Istihadlah (hlm. 46–51).</p></div>`;
}

/* ========== kerangka bersama (header atas + navigasi bawah, gaya aplikasi) ========== */
function pasangShell(aktif){
  /* 5 tab bawah; halaman lain dikelompokkan ke tab terdekat supaya tab tetap menyala */
  const tab = [
    ['beranda', U.dashboard, 'Beranda', 'rumah'],
    ['haid', 'kalender.html', 'Haid', 'air'],
    ['hukum', U.materi, 'Hukum', 'timbangan'],
    ['evaluasi', U.evaluasi(), 'Evaluasi', 'papan'],
    ['profil', U.profil, 'Profil', 'user']
  ];
  const kelompok = {dashboard:'beranda', progres:'beranda', kalender:'haid', scan:'haid', haid:'haid',
    materi:'hukum', najis:'hukum', tanya:'hukum', konsultasi:'hukum', kuis:'evaluasi', evaluasi:'evaluasi', profil:'profil'};
  const tabAktif = kelompok[aktif] || 'beranda';
  const awal = ((typeof S !== 'undefined' && S.nama) || (typeof USER_AKTIF !== 'undefined' && USER_AKTIF) || 'S').trim().charAt(0).toUpperCase();
  $('#app').innerHTML = `
  <header class="app-top"><div class="app-top-isi">
    <a class="app-logo" href="${U.dashboard}" aria-label="SiklusKu, ke beranda"><span class="app-logo-ik">${LOGO}</span><b>SiklusKu</b></a>
    <a class="app-avatar" href="${U.profil}" aria-label="Profil">${esc(awal)}</a>
  </div></header>
  <main class="main" id="isi" tabindex="-1"></main>
  <nav class="tab-bawah" aria-label="Menu utama"><div class="tab-bawah-isi">${tab.map(n => `<a href="${n[1]}" class="${n[0] === tabAktif ? 'aktif' : ''}" ${n[0] === tabAktif ? 'aria-current="page"' : ''}>${ik(n[3])}<span>${n[2]}</span></a>`).join('')}</div></nav>`;
}
function tutupMenu(){ const a = $('#side'), b = $('#scrim'); if(a) a.classList.remove('buka'); if(b) b.classList.remove('buka'); }

/* ========== pemilih halaman: dibaca dari <body data-halaman="..."> ========== */
function mulaiHalaman(){
  if(typeof USER_AKTIF !== 'undefined' && !USER_AKTIF){ tampilLogin(); return; }   // belum masuk: tampilkan login, isi halaman tidak dimuat
  const h = document.body.dataset.halaman || 'dashboard';
  const q = new URLSearchParams(location.search);
  pasangShell(h);
  let html = '';
  if(h === 'dashboard') html = vDashboard();
  else if(h === 'materi') html = vRingkasan();
  else if(h === 'najis' || h === 'haid'){
    const idx = q.get('m') ? parseInt(q.get('m'), 10) : titikBab(h);
    html = vMateri(h, idx);
  }
  else if(h === 'kuis' || h === 'evaluasi'){
    const b = q.get('bab');
    if(BAB[b]){ mulaiSesi(h === 'kuis' ? 'latihan' : 'evaluasi', b); html = vSesi(); }
    else html = vPilih(h);
  }
  else if(h === 'progres') html = vProgres();
  else if(h === 'profil') html = vProfil();
  else if(h === 'kalender') html = vKalender();
  else if(h === 'scan') html = vScan();
  else if(h === 'konsultasi') html = vKonsultasi();
  else if(h === 'tanya') html = vTanya();
  $('#isi').innerHTML = html;
  pasangFallback($('#isi')); jalankanTimer();
}

/* ========== interaksi ========== */
document.addEventListener('click', e => { document.querySelectorAll('.pita-daftar[open]').forEach(d => { if(!d.contains(e.target)) d.removeAttribute('open'); }); });

document.addEventListener('click', e => {
  const el = e.target.closest('[data-aksi]'); if(!el) return;
  const a = el.dataset.aksi;
  if(a === 'tema'){
    if(typeof TEMA !== 'undefined') TEMA.simpan(el.dataset.v);
    document.querySelectorAll('.tema-opsi').forEach(b => { const on = b.dataset.v === el.dataset.v; b.classList.toggle('aktif', on); b.setAttribute('aria-checked', on); });
    return;
  }
  if(a === 'menu'){ $('#side').classList.add('buka'); $('#scrim').classList.add('buka'); return; }
  if(a === 'tutup-menu'){ tutupMenu(); return; }
  if(a === 'keluar'){ keluarAkun(); return; }
  if(a === 'hapus-akun'){ konfirmAkun = true; $('#isi').innerHTML = vProfil(); return; }
  if(a === 'hapus-akun-batal'){ konfirmAkun = false; $('#isi').innerHTML = vProfil(); return; }
  if(a === 'hapus-akun-ok'){ hapusAkun(); return; }
  if(a === 'selesai-lanjut'){
    const b = el.dataset.bab, i = parseInt(el.dataset.idx, 10);
    if(!S.selesai[b].includes(i)) S.selesai[b].push(i);
    simpan();
    const tuju = i < BAB[b].materi.length ? U.bab(b, i + 1) : U.kuis(b); if(window.PINDAH) PINDAH(tuju); else location.href = tuju;
    return;
  }
  if(a === 'batal-selesai'){
    const b = el.dataset.bab, i = parseInt(el.dataset.idx, 10);
    S.selesai[b] = S.selesai[b].filter(x => x !== i); simpan();
    $('#isi').innerHTML = vMateri(b, i); pasangFallback($('#isi')); return;
  }
  if(a === 'simpan-nama'){
    const v = ($('#nama').value || '').trim(); S.nama = v; simpan();
    $('#info-nama').textContent = v ? 'Tersimpan. Namamu akan tampil di dashboard.' : 'Nama dikosongkan.'; return;
  }
  if(a === 'reset'){ konfirmReset = true; $('#isi').innerHTML = vProfil(); return; }
  if(a === 'reset-batal'){ konfirmReset = false; $('#isi').innerHTML = vProfil(); return; }
  if(a === 'reset-ok'){ S = {nama:S.nama, selesai:{najis:[],haid:[]}, kuis:{}, evaluasi:{}, terakhir:null}; simpan(); konfirmReset = false; $('#isi').innerHTML = vProfil(); $('#info-nama').textContent = 'Progres sudah dihapus.'; return; }
  if(!sesi) return;
  if(a === 'pilih'){ if(sesi.mode === 'latihan' && sesi.cek[sesi.i]) return; sesi.jwb[sesi.i] = parseInt(el.dataset.k, 10); tampilSesi(); }
  else if(a === 'periksa'){ if(sesi.jwb[sesi.i] !== null){ sesi.cek[sesi.i] = true; tampilSesi(); } }
  else if(a === 'berikutnya'){ if(sesi.i < sesi.soal.length - 1){ sesi.i++; tampilSesi(); window.scrollTo(0, 0); } }
  else if(a === 'sebelumnya'){ if(sesi.i > 0){ sesi.i--; tampilSesi(); window.scrollTo(0, 0); } }
  else if(a === 'selesai-sesi'){ hitungHasil(); tampilSesi(); window.scrollTo(0, 0); }
  else if(a === 'lihat-bahas'){ sesi.lihat = !sesi.lihat; tampilSesi(); }
  else if(a === 'ulang'){ mulaiSesi(sesi.mode, sesi.bab); tampilSesi(); window.scrollTo(0, 0); }
});
document.addEventListener('keydown', e => {
  if(e.key === 'Enter' && e.target && e.target.id === 'nama'){ const b = document.querySelector('[data-aksi="simpan-nama"]'); if(b) b.click(); }
  if(e.key === 'Escape') tutupMenu();
});
mulaiHalaman();
