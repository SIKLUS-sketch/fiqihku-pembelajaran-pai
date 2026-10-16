"use strict";
/* Login & akun. Semua data tersimpan di browser perangkat ini (localStorage). Kata sandi tidak disimpan polos:
   di-hash dengan PBKDF2-SHA256 + garam acak. Progres belajar disimpan terpisah per akun. */
const AKUN = 'fiqihku:akun', SESI = 'fiqihku:sesi', INGAT = 'fiqihku:ingat', GAGAL = 'fiqihku:gagal';
const lsGet = k => { try{ return localStorage.getItem(k); }catch(e){ return null; } };
const lsSet = (k, v) => { try{ localStorage.setItem(k, v); return true; }catch(e){ return false; } };
const lsDel = k => { try{ localStorage.removeItem(k); }catch(e){} };
const bacaAkun = () => { try{ return JSON.parse(lsGet(AKUN)) || {}; }catch(e){ return {}; } };
let USER_AKTIF = '';
try{ USER_AKTIF = sessionStorage.getItem(SESI) || ''; }catch(e){}
if(!USER_AKTIF){ const i = lsGet(INGAT); if(i && bacaAkun()[i]) USER_AKTIF = i; }
if(USER_AKTIF && !bacaAkun()[USER_AKTIF]) USER_AKTIF = '';

const hexDari = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
async function hashSandi(pw, garamHex){
  const garam = Uint8Array.from(garamHex.match(/../g).map(h => parseInt(h, 16)));
  const kunci = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
  return hexDari(await crypto.subtle.deriveBits({name:'PBKDF2', salt:garam, iterations:150000, hash:'SHA-256'}, kunci, 256));
}
function setSesi(u, ingat){
  try{ sessionStorage.setItem(SESI, u); }catch(e){}
  if(ingat) lsSet(INGAT, u); else lsDel(INGAT);
}
function keluarAkun(){ try{ sessionStorage.removeItem(SESI); }catch(e){} lsDel(INGAT); location.href = 'index.html'; }
function hapusAkun(){
  const a = bacaAkun(); delete a[USER_AKTIF]; lsSet(AKUN, JSON.stringify(a));
  lsDel('fiqihku:v1:' + USER_AKTIF); keluarAkun();
}
let modeAuth = 'masuk';
function tampilLogin(pesan = ''){
  const ada = Object.keys(bacaAkun()).length > 0;
  if(!ada && modeAuth === 'masuk') modeAuth = 'daftar';
  const d = modeAuth === 'daftar';
  document.getElementById('app').innerHTML = `<main class="auth"><div class="auth-kartu">
    <div class="auth-logo">${LOGO}<b>SiklusKu</b><small>Belajar Najis dan Haid</small></div>
    <h1>${d ? 'Buat Akun' : 'Masuk'}</h1>
    <p class="kecil lembut">${d ? 'Akun menjaga catatan belajar dan pertanyaanmu tetap pribadi. Tidak perlu email atau nomor telepon.' : 'Masukkan nama pengguna dan kata sandimu.'}</p>
    <div class="auth-isi">
      <label for="au-u"><b>Nama pengguna</b></label>
      <input type="text" id="au-u" autocomplete="username" maxlength="20" placeholder="huruf kecil, angka, titik, garis bawah" autocapitalize="none" spellcheck="false">
      ${d ? `<label for="au-n"><b>Nama panggilan</b> <span class="lembut kecil">(opsional)</span></label><input type="text" id="au-n" maxlength="40" autocomplete="nickname">` : ''}
      <label for="au-p"><b>Kata sandi</b></label>
      <input type="password" id="au-p" autocomplete="${d ? 'new-password' : 'current-password'}" placeholder="${d ? 'minimal 6 karakter' : ''}">
      ${d ? `<label for="au-p2"><b>Ulangi kata sandi</b></label><input type="password" id="au-p2" autocomplete="new-password">` : ''}
      <label class="ingat"><input type="checkbox" id="au-i"><span>Tetap masuk di perangkat ini <span class="lembut kecil">(jangan dicentang di perangkat bersama)</span></span></label>
      <p class="auth-pesan" id="au-pesan" role="alert">${esc(pesan)}</p>
      <button class="btn" id="au-kirim" data-auth="kirim" style="width:100%">${d ? 'Daftar dan Mulai' : 'Masuk'}</button>
    </div>
    <p class="kecil" style="text-align:center;margin:14px 0 0">${d ? (Object.keys(bacaAkun()).length ? 'Sudah punya akun? <a href="#" data-auth="ganti">Masuk</a>' : '') : 'Belum punya akun? <a href="#" data-auth="ganti">Daftar</a>'}</p>
    <p class="auth-cat">Akun dan data belajarmu disimpan di browser perangkat ini, tidak dikirim ke server mana pun. Kalau data browser dihapus, akun ikut hilang, dan kata sandi tidak bisa dipulihkan.</p>
  </div></main>`;
  const u = document.getElementById('au-u'); if(u) u.focus();
}
async function kirimAuth(){
  const p = id => (document.getElementById(id) || {}).value || '';
  const set = t => { document.getElementById('au-pesan').textContent = t; };
  const tombol = document.getElementById('au-kirim');
  const u = p('au-u').trim().toLowerCase(), pw = p('au-p'), ingat = document.getElementById('au-i').checked;
  if(!window.crypto || !crypto.subtle){ set('Browser ini tidak mendukung penyimpanan kata sandi yang aman. Buka lewat alamat https atau browser yang lebih baru.'); return; }
  if(!/^[a-z0-9_.]{3,20}$/.test(u)){ set('Nama pengguna 3–20 karakter: huruf kecil, angka, titik, atau garis bawah.'); return; }
  const akun = bacaAkun();
  tombol.disabled = true;
  try{
    if(modeAuth === 'daftar'){
      if(akun[u]){ set('Nama pengguna itu sudah dipakai. Pilih yang lain.'); return; }
      if(pw.length < 6){ set('Kata sandi minimal 6 karakter.'); return; }
      if(pw !== p('au-p2')){ set('Kedua kata sandi belum sama.'); return; }
      const garam = hexDari(crypto.getRandomValues(new Uint8Array(16)));
      akun[u] = {garam, hash: await hashSandi(pw, garam), dibuat: Date.now()};
      if(!lsSet(AKUN, JSON.stringify(akun))){ set('Penyimpanan browser diblokir, akun tidak bisa dibuat. Izinkan penyimpanan situs lalu coba lagi.'); return; }
      const lama = lsGet('fiqihku:v1');   // pindahkan progres lama (sebelum ada akun) ke akun pertama
      const nama = p('au-n').trim();
      if(Object.keys(akun).length === 1 && lama){ lsSet('fiqihku:v1:' + u, lama); }
      if(nama){ let s = {}; try{ s = JSON.parse(lsGet('fiqihku:v1:' + u)) || {}; }catch(e){} s.nama = nama; lsSet('fiqihku:v1:' + u, JSON.stringify(s)); }
      setSesi(u, ingat); location.href = 'index.html'; return;
    }
    const g = (() => { try{ return JSON.parse(lsGet(GAGAL)) || {n:0, t:0}; }catch(e){ return {n:0, t:0}; } })();
    if(g.n >= 5 && Date.now() - g.t < 30000){ set(`Terlalu banyak percobaan. Coba lagi dalam ${Math.ceil((30000 - (Date.now() - g.t)) / 1000)} detik.`); return; }
    const a = akun[u];
    const ok = a && (await hashSandi(pw, a.garam)) === a.hash;
    if(!ok){ lsSet(GAGAL, JSON.stringify({n: (Date.now() - g.t < 30000 ? g.n : 0) + 1, t: Date.now()})); set('Nama pengguna atau kata sandi salah.'); return; }
    lsDel(GAGAL); setSesi(u, ingat); location.href = 'index.html';
  }finally{ tombol.disabled = false; }
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-auth]'); if(!el) return;
  e.preventDefault();
  if(el.dataset.auth === 'ganti'){ modeAuth = modeAuth === 'masuk' ? 'daftar' : 'masuk'; tampilLogin(); }
  else if(el.dataset.auth === 'kirim') kirimAuth();
});
document.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target && /^au-/.test(e.target.id || '')) kirimAuth(); });
