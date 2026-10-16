"use strict";
/* Mesin Tanya Jawab: pencarian di teks dua kitab (KITAB dari kitab.js), tanpa AI, tanpa kirim data ke luar.
   Jawaban selalu berupa kutipan paragraf kitab beserta nomor halaman. */
const SUMBER = {
  fq:{nama:'Fathul Qorib (Terjemah)', ket:'Bab Najis', pendek:'Fathul Qorib'},
  rm:{nama:'Risalatul Mahidl', ket:'Haid, Nifas, Istihadhah', pendek:'Risalatul Mahidl'}
};
const STOP = new Set('apa apakah yang dan di ke dari itu ini untuk dengan adalah bagaimana berapa kapan jika kalau bila apabila maka atau pada saya aku kami kita ada tidak bisa dapat sudah akan sebagai dalam oleh agar supaya sedang lalu kemudian seorang orang dia ia nya kah lah boleh bolehkah gimana kenapa mengapa siapa mana saja juga harus wajib hukum hukumnya paling lebih'.split(' '));
const SINON = [['salat','sembahyang'],['kada','ganti','mengganti'],['kelamin','kemaluan','farji','kubul','vagina'],['setubuh','jimak','hubungan'],['balut','pembalut','cawat','kapuk','sumbat'],['umur','usia'],['suci','bersih'],['najis','kotor','kotoran'],['duhur','zuhur','luhur'],['mani','sperma'],['kencing','air seni','beser'],['wudu','berwudu'],['sebentar','sedikit','minimal','sekurang','paling sedikit'],['lama','banyak','maksimal','sebanyak','paling lama'],['haram','larang','dilarang','diharamkan'],['jenabat','janabat','hadas besar'],['cara','kaifiyat','kaifiyah']];
function lipat(s){
  return s.toLowerCase().replace(/[’'`‘]/g, '').replace(/dl|dh/g, 'd').replace(/dz/g, 'z').replace(/th/g, 't').replace(/sh/g, 's').replace(/kh/g, 'k').replace(/q/g, 'k').replace(/(.)\1+/g, '$1');
}
function batang(w){
  w = lipat(w);
  if(/^(istihad|mustahad)/.test(w)) return 'istihad';
  if(w.length > 5){
    w = w.replace(/^(meny)/, 's').replace(/^(meng|mem|men|ber|per|ter|di|ke|se|pe|me)(?=.{4})/, '');
    w = w.replace(/(kan|nya|an|i|lah|kah)$/, '');
    if(w.length > 4) w = w.replace(/(at|ah)$/, '');
  }
  return w;
}
const toks = s => (s.match(/[A-Za-z’']+/g) || []).filter(w => w.length > 1);
const GRUP = SINON.map(g => new Set(g.map(x => toks(x).map(batang).join(' '))));
let IDX = null;
function bangunIndeks(){
  if(IDX) return IDX;
  const dok = KITAB.map(c => { const t = toks(c.t).map(batang); const tf = {}; t.forEach(w => tf[w] = (tf[w] || 0) + 1); return {c, tf, n: t.length}; });
  const df = {}; dok.forEach(d => Object.keys(d.tf).forEach(w => df[w] = (df[w] || 0) + 1));
  dok.forEach(d => { d.kepala = new Set(toks(d.c.t).slice(0, 7).map(batang)); });
  IDX = {dok, df, N: dok.length, avg: dok.reduce((a, d) => a + d.n, 0) / dok.length};
  return IDX;
}
function istilahTanya(q){
  const dasar = toks(q).filter(w => !STOP.has(w.toLowerCase())).map(batang).filter(w => w.length > 1 && !STOP.has(w));
  const set = new Set(dasar);
  GRUP.forEach(g => { if([...set].some(w => g.has(w))) g.forEach(x => x.split(' ').forEach(y => y && set.add(y))); });
  return {dasar: [...new Set(dasar)], semua: [...set]};
}
function cariKitab(q, lingkup){
  const I = bangunIndeks(), T = istilahTanya(q);
  if(!T.dasar.length) return {hasil: [], T};
  const k1 = 1.4, b = .75, hasil = [];
  I.dok.forEach(d => {
    if(lingkup !== 'semua' && d.c.k !== lingkup) return;
    let skor = 0, cocok = 0;
    T.semua.forEach(w => {
      const f = d.tf[w]; if(!f) return;
      const idf = Math.log(1 + (I.N - (I.df[w] || 0) + .5) / ((I.df[w] || 0) + .5));
      const bobot = T.dasar.includes(w) ? 1 : .5;
      skor += bobot * idf * f * (k1 + 1) / (f + k1 * (1 - b + b * d.n / I.avg));
      if(d.kepala.has(w)) skor += bobot * idf * .6;   // istilah ada di judul/awal paragraf
    });
    T.dasar.forEach(w => { if(d.tf[w]) cocok++; });
    if(skor > 0){ const cakup = cocok / T.dasar.length; hasil.push({c: d.c, skor: skor * (.35 + .65 * cakup), cakup}); }
  });
  hasil.sort((x, y) => y.skor - x.skor);
  return {hasil, T};
}
function jawab(q, lingkup){
  const {hasil, T} = cariKitab(q, lingkup);
  const atas = hasil[0];
  if(!atas || atas.cakup < .34 || atas.skor < 2.5) return {ada: false, T};
  const lain = hasil.slice(1, 6).filter(h => h.skor >= atas.skor * .55 && h.c.t !== atas.c.t).slice(0, 2);
  return {ada: true, utama: atas, lain, T};
}
/* ===== tampilan ===== */
let riwayatTanya = [], lingkupTanya = 'semua';
const CONTOH = ['Berapa lama haid paling sebentar dan paling lama?', 'Bagaimana cara menyucikan najis?', 'Apa yang diharamkan bagi wanita haid?', 'Berapa lama nifas?', 'Bagaimana shalat orang istihadhah?', 'Apa perbedaan najis ainiyah dan hukmiyah?'];
function tandai(teks, T){
  const set = new Set(T.semua);
  return teks.split(/([A-Za-z’']+)/).map(p => /^[A-Za-z’']+$/.test(p) && set.has(batang(p)) ? `<mark>${esc(p)}</mark>` : esc(p)).join('');
}
const rujuk = c => c.k === 'fq' ? `${SUMBER.fq.nama}, ${SUMBER.fq.ket}, hlm. ${c.h}` : `${SUMBER.rm.nama}, hlm. ${c.h}`;
function kutip(h, T, utama){
  return `<blockquote class="kutip ${h.c.k}">${tandai(h.c.t, T)}<footer>${ik('buku')} ${esc(rujuk(h.c))}</footer></blockquote>`;
}
function kartuTanya(r){
  if(!r.ada) return `<article class="kartu tj"><div class="tj-q">${esc(r.q)}</div>
    <p style="margin:0"><b>Belum ditemukan di dua kitab ini.</b></p>
    <p class="kecil lembut" style="margin:6px 0 0">Coba kata kunci lain yang lebih pendek (misalnya “nifas”, “mandi”, “istihadhah”), atau ubah lingkup pencarian. Kalau pertanyaanmu di luar bab najis dan haid, tanyakan langsung ke ustadz atau ustadzah.</p>
    <a class="btn garis" style="margin-top:10px" href="konsultasi.html?topik=tanya">${ik('telepon')} Konsultasi dengan ustadzah</a></article>`;
  return `<article class="kartu tj"><div class="tj-q">${esc(r.q)}</div>
    <div class="tj-label">Jawaban dari kitab</div>${kutip(r.utama, r.T)}
    ${r.lain.length ? `<details class="tj-lain"><summary>Rujukan terkait (${r.lain.length})</summary>${r.lain.map(h => kutip(h, r.T)).join('')}</details>` : ''}
    <p class="kecil lembut" style="margin:10px 0 0">Ini kutipan langsung dari kitab, bukan fatwa pribadi. Untuk kasus yang rumit, misalnya darah istihadhah yang tidak teratur, tanyakan ke ustadz atau ustadzah. <a href="konsultasi.html?topik=tanya">Buka konsultasi</a>.</p></article>`;
}
function daftarTanya(){ return riwayatTanya.map(kartuTanya).join(''); }
function vTanya(){
  const chip = (v, t) => `<button type="button" class="chip ${lingkupTanya === v ? 'aktif' : ''}" data-tanya="lingkup" data-v="${v}" aria-pressed="${lingkupTanya === v}">${t}</button>`;
  return `<div class="kepala"><div><h1>Tanya Jawab</h1><p>Jawaban diambil langsung dari dua kitab: Fathul Qorib untuk najis, Risalatul Mahidl untuk haid, nifas, dan istihadhah.</p></div></div>
  <div class="kartu" style="max-width:820px">
    <div class="tj-priv">${ik('user')}<span>Privat: pertanyaanmu diproses di perangkat ini saja. Tidak dikirim ke server dan tidak disimpan setelah halaman ditutup.</span></div>
    <div class="chips" role="group" aria-label="Lingkup pencarian">${chip('semua', 'Semua kitab')}${chip('fq', 'Najis (Fathul Qorib)')}${chip('rm', 'Haid (Risalatul Mahidl)')}</div>
    <div class="form-baris"><input type="text" id="tj-input" maxlength="200" placeholder="Tulis pertanyaanmu, misalnya: berapa lama nifas?" aria-label="Pertanyaan"><button class="btn" data-tanya="kirim">${ik('tanya')} Tanya</button></div>
    <div class="chips" style="margin-top:12px" aria-label="Contoh pertanyaan">${CONTOH.map(c => `<button type="button" class="chip kecil-chip" data-tanya="contoh" data-q="${esc(c)}">${esc(c)}</button>`).join('')}</div>
  </div>
  <div id="tj-hasil" style="max-width:820px;margin-top:16px" aria-live="polite">${daftarTanya()}</div>`;
}
function kirimTanya(q){
  q = (q || '').trim(); if(!q) return;
  const r = jawab(q, lingkupTanya); r.q = q;
  riwayatTanya.unshift(r); riwayatTanya = riwayatTanya.slice(0, 10);
  document.getElementById('tj-hasil').innerHTML = daftarTanya();
  const i = document.getElementById('tj-input'); i.value = ''; i.focus();
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-tanya]'); if(!el) return;
  const a = el.dataset.tanya;
  if(a === 'kirim') kirimTanya(document.getElementById('tj-input').value);
  else if(a === 'contoh') kirimTanya(el.dataset.q);
  else if(a === 'lingkup'){ lingkupTanya = el.dataset.v; document.querySelectorAll('[data-tanya="lingkup"]').forEach(b => { const on = b.dataset.v === lingkupTanya; b.classList.toggle('aktif', on); b.setAttribute('aria-pressed', on); }); }
});
document.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target && e.target.id === 'tj-input') kirimTanya(e.target.value); });
