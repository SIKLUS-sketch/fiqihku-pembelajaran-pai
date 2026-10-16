"use strict";
/* Fitur pendamping SiklusKu: Kalender Haid, Scan Warna Darah, Nomor Konsultasi.
   Semuanya diproses di perangkat pengguna (localStorage dan canvas). Tidak ada data atau foto yang dikirim ke server.
   Dimuat setelah data.js dan sebelum app.js. Memakai S, simpan, ik, esc, $, U dari app.js (dipanggil setelah app.js termuat). */

/* ================= alat tanggal ================= */
const p2 = n => String(n).padStart(2, '0');
const isoTgl = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
const hariIni = () => isoTgl(new Date());
const nHari = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const dariN = n => { const d = new Date(n * 864e5); return `${d.getUTCFullYear()}-${p2(d.getUTCMonth() + 1)}-${p2(d.getUTCDate())}`; };
const fmtT = (s, o) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('id-ID', o || {day:'numeric', month:'long', year:'numeric'}); };
const fmtPendek = s => fmtT(s, {day:'numeric', month:'short', year:'numeric'});
const rata2 = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null;
const med = a => { const b = a.slice().sort((x, y) => x - y); return b[b.length >> 1]; };

/* ================= KALENDER HAID ================= */
let kalBulan = null, kalPilih = null, kalPesan = {t:'', ok:true}, kalHapusId = null, kalHapusSemua = false;

const dataK = () => { S.kalender = S.kalender || {}; S.kalender.catatan = S.kalender.catatan || []; return S.kalender.catatan; };
const urutHaid = () => dataK().slice().sort((a, b) => a.mulai < b.mulai ? -1 : a.mulai > b.mulai ? 1 : 0);
const lamaHaid = c => (c.selesai ? nHari(c.selesai) : nHari(hariIni())) - nHari(c.mulai) + 1;

function ringkasK(){
  const L = urutHaid(), r = {L, jalan: L.find(c => !c.selesai) || null};
  const sik = []; for(let i = 1; i < L.length; i++) sik.push(nHari(L[i].mulai) - nHari(L[i - 1].mulai));
  r.siklus = rata2(sik.slice(-6));
  r.lama = rata2(L.filter(c => c.selesai).slice(-6).map(lamaHaid));
  r.suci = r.siklus && r.lama ? Math.max(r.siklus - r.lama, 0) : null;
  const akhir = L[L.length - 1];
  if(akhir && r.siklus){ r.prakMulai = nHari(akhir.mulai) + r.siklus; r.prakSelesai = r.prakMulai + (r.lama || 1) - 1; }
  return r;
}

/* Catatan fikih per catatan haid, memakai batas yang diajarkan di Bab Haid. */
function catatanFikih(c, prev){
  const n = [], lama = lamaHaid(c);
  if(lama > 15) n.push(`Darah tercatat ${lama} hari, melewati batas maksimal haid (15 hari 15 malam). Sebagian dihukumi istihadhah. Cara menentukannya bergantung keadaanmu, jadi sebaiknya dikonsultasikan.`);
  if(prev && prev.selesai){
    const suci = nHari(c.mulai) - nHari(prev.selesai) - 1;
    if(suci < 15) n.push(`Jarak dari haid sebelumnya ${suci} hari, kurang dari 15 hari (batas minimal suci di antara dua haid). Hukum darah ini perlu dirinci, tanyakan ke ustadzah.`);
  }
  if(lama === 1 && c.selesai) n.push('Tercatat 1 hari. Haid minimal sehari semalam (24 jam). Kalau darahnya kurang dari itu, belum dihukumi haid.');
  return n;
}

function statusK(r){
  const t = nHari(hariIni());
  if(r.jalan){
    const n = lamaHaid(r.jalan);
    return {kelas:'haid', judul:`Sedang haid, hari ke-${n}`,
      isi: n > 15 ? 'Darah sudah lebih dari 15 hari. Sebagian dihukumi istihadhah, segera konsultasikan.' : 'Selama haid tidak salat dan tidak puasa. Puasa wajib diqadha, salat tidak. Setelah darah berhenti, tandai selesai, lalu mandi wajib dan salat kembali.'};
  }
  const akhir = r.L[r.L.length - 1];
  if(!akhir) return {kelas:'', judul:'Belum ada catatan', isi:'Tekan “Haid mulai” saat darah pertama keluar. Setelah dua kali pencatatan, aplikasi bisa memperkirakan haid berikutnya.'};
  const sejak = t - nHari(akhir.selesai);
  let isi = 'Catat minimal dua kali haid supaya perkiraan haid berikutnya bisa dihitung.';
  if(r.prakMulai){
    const sisa = r.prakMulai - t, tgl = fmtT(dariN(r.prakMulai), {day:'numeric', month:'long'});
    isi = sisa > 0 ? `Perkiraan haid berikutnya ${tgl}, sekitar ${sisa} hari lagi.`
      : sisa === 0 ? 'Perkiraan haid dimulai hari ini. Kalau darah sudah keluar, tekan “Haid mulai”.'
      : `Perkiraan haid jatuh pada ${tgl}, sudah lewat ${-sisa} hari dan belum tercatat. Kalau darah sudah keluar, tekan “Haid mulai”.`;
  }
  return {kelas:'suci', judul: sejak <= 0 ? 'Haid selesai hari ini' : `Masa suci, ${sejak} hari sejak haid terakhir`, isi};
}

function tambahHaid(mulai, selesai){
  const t = hariIni();
  if(!mulai) return 'Pilih tanggal mulai dulu.';
  if(mulai > t) return 'Tanggal mulai belum tiba.';
  if(selesai){
    if(selesai < mulai) return 'Tanggal selesai tidak boleh sebelum tanggal mulai.';
    if(selesai > t) return 'Tanggal selesai belum tiba.';
  }
  const L = dataK();
  if(!selesai && L.some(c => !c.selesai)) return 'Masih ada haid yang belum ditandai selesai. Tandai selesai dulu.';
  const a = nHari(mulai), b = selesai ? nHari(selesai) : nHari(t);
  const tabrak = L.find(c => a <= (c.selesai ? nHari(c.selesai) : nHari(t)) && nHari(c.mulai) <= b);
  if(tabrak) return `Tanggal itu bertumpuk dengan catatan haid ${fmtPendek(tabrak.mulai)}.`;
  L.push({id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), mulai, selesai: selesai || null});
  simpan();
  return null;
}

function riwayatK(r){
  if(!r.L.length) return '<p class="kecil lembut" style="margin:0">Belum ada catatan.</p>';
  return r.L.slice().reverse().slice(0, 12).map(c => {
    const i = r.L.indexOf(c), cat = catatanFikih(c, r.L[i - 1]), lama = lamaHaid(c);
    const hapus = kalHapusId === c.id
      ? `<button class="btn garis bahaya kecil-btn" data-f="hapus-ok" data-id="${c.id}">Ya, hapus</button><button class="btn garis kecil-btn" data-f="hapus-batal">Batal</button>`
      : `<button class="btn garis kecil-btn" data-f="hapus" data-id="${c.id}" aria-label="Hapus catatan ${fmtPendek(c.mulai)}">Hapus</button>`;
    return `<div class="kal-riw"><div class="kal-riw-atas"><div><b>${fmtPendek(c.mulai)}${c.selesai ? ' – ' + fmtPendek(c.selesai) : ' – sekarang'}</b>
      <div class="kecil lembut">${lama} hari${c.selesai ? '' : ' (masih berjalan)'}</div></div><div class="kal-riw-aksi">${hapus}</div></div>
      ${cat.map(x => `<div class="kal-cat">${ik('lampu')}<span>${esc(x)}</span></div>`).join('')}</div>`;
  }).join('');
}

function gridBulan(r){
  const {y, m} = kalBulan, jml = new Date(y, m + 1, 0).getDate(), off = (new Date(y, m, 1).getDay() + 6) % 7;
  const t = hariIni(), tn = nHari(t), rng = r.L.map(c => [nHari(c.mulai), c.selesai ? nHari(c.selesai) : tn]);
  const tampilPrak = r.prakMulai && r.prakSelesai >= tn;
  let h = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(x => `<div class="kal-h">${x}</div>`).join('');
  for(let i = 0; i < off; i++) h += '<span class="hr kosong" aria-hidden="true"></span>';
  for(let d = 1; d <= jml; d++){
    const s = `${y}-${p2(m + 1)}-${p2(d)}`, n = nHari(s);
    const haid = rng.some(([a, b]) => n >= a && n <= b);
    const prak = !haid && tampilPrak && n >= r.prakMulai && n <= r.prakSelesai;
    const ket = fmtT(s) + (haid ? ', haid' : prak ? ', perkiraan haid' : '') + (s === t ? ', hari ini' : '');
    h += `<button type="button" class="hr${haid ? ' haid' : ''}${prak ? ' prakiraan' : ''}${s === t ? ' ini' : ''}${s === kalPilih ? ' pilih' : ''}" data-f="hari" data-t="${s}" aria-label="${ket}" aria-pressed="${s === kalPilih}">${d}</button>`;
  }
  return h;
}

function vKalender(){
  if(!kalBulan){ const d = new Date(); kalBulan = {y: d.getFullYear(), m: d.getMonth()}; }
  const r = ringkasK(), st = statusK(r), t = hariIni();
  const judulBulan = new Date(kalBulan.y, kalBulan.m, 1).toLocaleDateString('id-ID', {month:'long', year:'numeric'});
  const stat = (j, v, s) => `<div class="kartu kal-stat"><span class="lembut kecil">${j}</span><b>${v}</b><span class="lembut kecil">${s}</span></div>`;
  return `<div class="kepala"><div><h1>Kalender Haid</h1><p>Catat haid, lihat perkiraan berikutnya, dan cek batasnya menurut fikih.</p></div></div>
  <div class="kal-status ${st.kelas}" role="status"><span class="bulat">${ik('kalender')}</span><div><b>${esc(st.judul)}</b><p>${esc(st.isi)}</p></div></div>
  <div class="kal-layout">
    <div>
      <div class="kartu">
        <div class="kal-nav"><button class="ikon-btn" data-f="bulan" data-d="-1" aria-label="Bulan sebelumnya">${ik('kiri')}</button><h2 id="kal-judul">${judulBulan}</h2>
          <button class="ikon-btn" data-f="bulan" data-d="1" aria-label="Bulan berikutnya">${ik('kanan')}</button></div>
        <div class="kal-grid" id="kal-grid">${gridBulan(r)}</div>
        <div class="kal-legenda"><span><i class="hr haid"></i>Haid tercatat</span><span><i class="hr prakiraan"></i>Perkiraan</span><span><i class="hr ini"></i>Hari ini</span>
          <button class="link-btn-kal" data-f="hari-ini">Ke bulan ini</button></div>
      </div>
      <div class="kal-statistik">${stat('Siklus biasa', r.siklus ? r.siklus + ' hari' : '-', 'dari mulai ke mulai')}${stat('Lama haid biasa', r.lama ? r.lama + ' hari' : '-', 'kebiasaan (‘adat)')}${stat('Suci biasa', r.suci !== null ? r.suci + ' hari' : '-', 'di antara dua haid')}</div>
      <h2 class="seksi">Riwayat</h2><div class="kartu">${riwayatK(r)}</div>
    </div>
    <aside>
      <div class="kartu kal-form">
        <h2 style="font-size:16px;margin-bottom:8px">Catat haid</h2>
        <label for="kal-tgl"><b>Tanggal</b> <span class="lembut kecil">(ketuk tanggal di kalender atau pilih di sini)</span></label>
        <input type="date" id="kal-tgl" value="${kalPilih || t}" max="${t}">
        <div class="aksi" style="margin-top:12px"><button class="btn" data-f="mulai">Haid mulai</button><button class="btn garis" data-f="selesai">Haid selesai</button></div>
        <p class="kecil kal-pesan ${kalPesan.ok ? '' : 'salah'}" id="kal-pesan" role="status" aria-live="polite">${esc(kalPesan.t)}</p>
        <details class="kal-lama"><summary>Catat haid yang sudah lewat</summary>
          <label for="kal-l1"><b>Mulai</b></label><input type="date" id="kal-l1" max="${t}">
          <label for="kal-l2"><b>Selesai</b></label><input type="date" id="kal-l2" max="${t}">
          <button class="btn garis" data-f="tambah-lama" style="margin-top:10px">Simpan catatan</button></details>
      </div>
      <div class="kartu" style="margin-top:14px"><h2 style="font-size:16px;margin-bottom:8px">Batas haid menurut fikih</h2>
        <ul class="kal-batas"><li>Minimal sehari semalam (24 jam)</li><li>Maksimal 15 hari 15 malam</li><li>Yang lumrah 6 sampai 7 hari</li><li>Suci di antara dua haid minimal 15 hari</li></ul>
        <p class="kecil lembut" style="margin:8px 0 0">Kalender ini menghitung per hari, sedangkan fikih menghitung per jam. Perkiraan hanya alat bantu, bukan hukum. Pelajari selengkapnya di <a href="${U.bab('haid')}">Bab Haid</a>.</p></div>
      <div class="kartu" style="margin-top:14px"><div class="kal-priv">${ik('user')}<span>Catatan tersimpan di browser ini saja, hanya terlihat saat masuk ke akunmu.</span></div>
        ${kalHapusSemua ? `<p class="kecil" style="margin:10px 0 6px"><b>Hapus semua catatan kalender?</b> Tidak bisa dibatalkan.</p><div class="aksi" style="margin-top:0"><button class="btn garis bahaya" data-f="hapus-semua-ok">Ya, hapus</button><button class="btn garis" data-f="hapus-semua-batal">Batal</button></div>`
          : (r.L.length ? `<button class="btn garis bahaya" style="margin-top:10px" data-f="hapus-semua">Hapus semua catatan</button>` : '')}</div>
      <div class="kartu" style="margin-top:14px"><b>Darahmu tidak teratur atau ragu?</b><p class="kecil lembut" style="margin:4px 0 10px">Kirim ringkasan catatan ini ke ustadzah lewat fitur konsultasi.</p><a class="btn garis" href="konsultasi.html?topik=siklus">${ik('telepon')} Konsultasi</a></div>
    </aside></div>`;
}
const tampilK = () => { $('#isi').innerHTML = vKalender(); };
function setPesanK(t, ok = true){ kalPesan = {t, ok}; tampilK(); }

/* ================= SCAN WARNA DARAH ================= */
/* Lima warna dan urutan kekuatannya mengikuti Risalatul Mahidl hlm. 19:
   hitam > merah > merah semu kuning > kuning > keruh. */
const WARNA_DARAH = {
  hitam:       {nama:'Hitam', skala:5, label:'Sangat kuat', hex:'#2b1515', ciri:'Hitam pekat, atau merah yang sudah sangat gelap.'},
  merah:       {nama:'Merah', skala:4, label:'Kuat', hex:'#a5201f', ciri:'Merah segar sampai merah tua.'},
  merahkuning: {nama:'Merah semu kuning', skala:3, label:'Sedang', hex:'#c4592b', ciri:'Merah kecokelatan atau oranye kemerahan.'},
  kuning:      {nama:'Kuning', skala:2, label:'Lemah', hex:'#d3aa30', ciri:'Kuning, seperti cairan kekuningan.'},
  keruh:       {nama:'Keruh', skala:1, label:'Sangat lemah', hex:'#b7ab98', ciri:'Keruh keabu-abuan atau cokelat pucat, seperti air kotor.'}
};
const SC = {img:null, bersih:null, titik:null, putih:null, mode:'darah', kental:false, bau:false, pesan:''};

function rgbKeHsv(r, g, b){
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if(d){ h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if(h < 0) h += 360; }
  return [h, mx ? d / mx : 0, mx];
}

/* Perkiraan warna dari piksel. Hasilnya estimasi: cahaya, kamera, dan kalibrasi putih sangat memengaruhi. */
function klasifikasiDarah(r, g, b){
  const [h, s, v] = rgbKeHsv(r, g, b), merahH = h <= 14 || h >= 340;
  const hsl = {h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100)};
  const out = (kode, alt, yakin) => ({kode, alt, yakin, hsv: hsl});
  if(v < .20) return out('hitam', v < .14 ? null : 'merah', v < .14 ? 'tinggi' : 'sedang');
  if(s < .30 && v < .30) return out('hitam', 'keruh', 'rendah');
  if(s < .12 && v > .80) return out(null, null, 'rendah');             // hampir putih
  if(merahH){
    if(s >= .50) return out('merah', v < .32 ? 'hitam' : null, v >= .35 && s >= .65 ? 'tinggi' : 'sedang');
    if(s >= .30) return v > .65 ? out('keruh', 'merah', 'rendah') : out('merah', 'keruh', 'rendah');
    return out('keruh', null, 'sedang');
  }
  if(h > 14 && h <= 40){
    if(s >= .40){
      if(v < .40) return out('merah', 'merahkuning', 'rendah');          // cokelat tua
      if(h <= 28) return out('merahkuning', 'merah', s >= .55 ? 'sedang' : 'rendah');
      return out('kuning', 'merahkuning', 'rendah');
    }
    return out('keruh', 'kuning', s < .30 ? 'sedang' : 'rendah');
  }
  if(h > 40 && h <= 70) return s >= .30 ? out('kuning', null, s >= .50 ? 'tinggi' : 'sedang') : out('keruh', 'kuning', 'sedang');
  if(s < .20) return out('keruh', null, 'rendah');
  return out(null, null, 'rendah');                                      // hijau, biru, ungu: bukan warna darah
}

function ambilWarna(kanvas, x, y, rad = 9){
  const c = kanvas.getContext('2d', {willReadFrequently: true});
  const x0 = Math.max(0, Math.round(x - rad)), y0 = Math.max(0, Math.round(y - rad));
  const w = Math.max(1, Math.min(kanvas.width - x0, rad * 2 + 1)), h = Math.max(1, Math.min(kanvas.height - y0, rad * 2 + 1));
  const px = c.getImageData(x0, y0, w, h).data, R = [], G = [], B = [], L = [];
  for(let i = 0; i < px.length; i += 4){ R.push(px[i]); G.push(px[i + 1]); B.push(px[i + 2]); L.push(.299 * px[i] + .587 * px[i + 1] + .114 * px[i + 2]); }
  const lm = med(L);
  return {r: med(R), g: med(G), b: med(B), sebaran: med(L.map(v => Math.abs(v - lm)))};
}

function gambarSc(){
  const k = $('#sc-kanvas'); if(!k || !SC.bersih) return;
  const c = k.getContext('2d'); c.clearRect(0, 0, k.width, k.height); c.drawImage(SC.bersih, 0, 0);
  const tanda = (p, teks) => {
    if(!p) return;
    c.lineWidth = 5; c.strokeStyle = '#fff'; c.beginPath(); c.arc(p.x, p.y, 15, 0, 7); c.stroke();
    c.lineWidth = 2; c.strokeStyle = '#111'; c.beginPath(); c.arc(p.x, p.y, 15, 0, 7); c.stroke();
    c.font = '600 14px system-ui,sans-serif'; c.lineWidth = 4; c.strokeStyle = '#fff'; c.strokeText(teks, p.x + 20, p.y + 5);
    c.fillStyle = '#111'; c.fillText(teks, p.x + 20, p.y + 5);
  };
  tanda(SC.titik, 'Darah'); tanda(SC.putih, 'Putih');
}

function muatFoto(f){
  if(!f) return;
  if(!/^image\//.test(f.type)){ SC.pesan = 'File itu bukan gambar. Pilih foto JPG atau PNG.'; perbaruiSc(); return; }
  const url = URL.createObjectURL(f), im = new Image();
  im.onload = () => {
    URL.revokeObjectURL(url);
    const maks = 720, sk = Math.min(1, maks / Math.max(im.width, im.height)), w = Math.round(im.width * sk), h = Math.round(im.height * sk);
    const b = document.createElement('canvas'); b.width = w; b.height = h; b.getContext('2d').drawImage(im, 0, 0, w, h);
    const k = $('#sc-kanvas'); k.width = w; k.height = h;
    Object.assign(SC, {img: im, bersih: b, titik: null, putih: null, mode: 'darah', pesan: ''});
    $('#sc-area').hidden = false; gambarSc(); perbaruiSc();
    $('#sc-area').scrollIntoView({behavior: 'smooth', block: 'nearest'});
  };
  im.onerror = () => { URL.revokeObjectURL(url); SC.pesan = 'Foto tidak bisa dibuka. Coba foto lain atau ambil ulang.'; perbaruiSc(); };
  im.src = url;
}

function hasilSc(){
  if(!SC.titik) return `<p class="lembut kecil" style="margin:0">Ketuk bagian foto yang berisi darah. Pilih area tengah noda yang rata, hindari pinggiran, bayangan, dan pantulan cahaya.</p>`;
  let {r, g, b} = SC.titik, kal = false;
  const peringatan = [];
  if(SC.putih){
    const lw = (SC.putih.r + SC.putih.g + SC.putih.b) / 3;
    if(lw < 110) peringatan.push('Area putih yang kamu pilih terlalu gelap, jadi tidak dipakai untuk kalibrasi. Pilih tisu atau pembalut putih yang terkena cahaya sama dengan noda.');
    else {
      const ke = c => Math.min(255, Math.round(SC.titik[c] * 235 / Math.max(1, SC.putih[c])));   // samakan putih ke 235: koreksi warna lampu dan terang-gelap
      r = ke('r'); g = ke('g'); b = ke('b'); kal = true;
    }
  }
  const k = klasifikasiDarah(r, g, b);
  let yakin = k.yakin;
  if(!kal && yakin === 'tinggi') yakin = 'sedang';
  if(SC.titik.sebaran > 28){ yakin = 'rendah'; peringatan.push('Area yang kamu pilih tidak rata (ada bayangan, gumpalan, atau pantulan). Coba ketuk bagian lain.'); }
  if(!kal) peringatan.push('Belum ada kalibrasi putih. Tanpa itu, warna lampu dan kamera bisa menggeser hasil. Pilih area putih (tisu atau pembalut bersih) di foto yang sama untuk hasil yang lebih dekat.');
  const sw = (c, j) => `<div class="sc-sw"><i style="background:rgb(${c[0]},${c[1]},${c[2]})"></i><span class="kecil lembut">${j}</span></div>`;
  const swatch = `<div class="sc-swatch">${sw([SC.titik.r, SC.titik.g, SC.titik.b], 'Warna di foto')}${kal ? sw([r, g, b], 'Setelah kalibrasi') : ''}</div>`;
  const warn = peringatan.length ? `<ul class="sc-warn">${peringatan.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
  if(!k.kode){
    return `${swatch}<h3 class="sc-judul">Warna belum bisa dipastikan</h3><p class="kecil">Warna yang terbaca tidak mirip warna darah (terlalu pucat, atau hijau/biru/ungu). Biasanya ini karena cahaya, filter kamera, atau area yang dipilih bukan darah. Coba foto ulang dengan cahaya siang tanpa flash.</p>${warn}`;
  }
  const w = WARNA_DARAH[k.kode], alt = k.alt ? WARNA_DARAH[k.alt] : null, n = (SC.kental ? 1 : 0) + (SC.bau ? 1 : 0);
  const meter = `<div class="sc-meter" role="img" aria-label="Tingkat kekuatan ${w.skala} dari 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= w.skala ? 'on' : ''}"></i>`).join('')}</div><div class="sc-meter-ket"><span>Lemah</span><span>Kuat</span></div>`;
  return `${swatch}
    <div class="sc-kepala"><h3 class="sc-judul">Perkiraan warna: ${w.nama}</h3><span class="lbl kuat${w.skala}">${w.label}</span><span class="lbl">Keyakinan ${yakin}</span></div>
    ${meter}
    <p class="kecil" style="margin:10px 0 0">Peringkat <b>${6 - w.skala} dari 5</b> menurut urutan kekuatan warna darah (1 = paling kuat). ${alt ? `Warnanya juga mendekati <b>${alt.nama}</b>, jadi bandingkan dengan panduan warna di bawah.` : ''}</p>
    <div class="sc-sifat"><b class="kecil">Sifat lain yang dicek sendiri</b>
      <div class="chips"><button type="button" class="chip ${SC.kental ? 'aktif' : ''}" data-f="sifat" data-v="kental" aria-pressed="${SC.kental}">Kental</button><button type="button" class="chip ${SC.bau ? 'aktif' : ''}" data-f="sifat" data-v="bau" aria-pressed="${SC.bau}">Berbau busuk</button></div>
      <p class="kecil lembut" style="margin:0">${n === 0 ? 'Cair dan tidak berbau busuk: tidak ada sifat penguat.' : `Ada ${n} sifat penguat. Menurut kitab, darah yang kental dan berbau busuk lebih kuat daripada yang cair dan tidak berbau.`} Kekuatan sebenarnya dinilai dari warna dan sifat sekaligus, dan itu perlu dibandingkan dengan darah lain yang keluar.</p></div>
    ${warn}
    <div class="penting" style="margin-top:14px"><h4>${ik('lampu')} Apa artinya hasil ini?</h4><ul>
      <li>Kuat dan lemahnya darah dipakai untuk memisahkan haid dari istihadhah ketika darah keluar lebih dari 15 hari 15 malam, dengan syarat-syarat yang dibahas di kitab.</li>
      <li>Kuat atau lemah itu relatif, dibandingkan dengan darah lain dalam satu rangkaian. Kalau darah lemah bercampur darah kuat, kitab menghukuminya sebagai darah kuat.</li>
      <li>Ini perkiraan dari foto, bukan fatwa dan bukan pemeriksaan medis. Kalau hukumnya belum jelas, tanyakan ke ustadzah.</li></ul></div>
    <div class="aksi"><a class="btn" href="konsultasi.html?topik=warna">${ik('telepon')} Tanya ustadzah</a><a class="btn garis" href="${U.tanya}">Cari di Tanya Jawab</a></div>`;
}

function perbaruiSc(){
  const L = $('#sc-langkah'), H = $('#sc-hasil'), P = $('#sc-pesan');
  if(P) P.textContent = SC.pesan;
  if(L) L.innerHTML = `<div class="chips" role="group" aria-label="Pilih yang mau ditandai">
    <button type="button" class="chip ${SC.mode === 'darah' ? 'aktif' : ''}" data-f="mode" data-v="darah" aria-pressed="${SC.mode === 'darah'}">1. Tandai darah ${SC.titik ? '✓' : ''}</button>
    <button type="button" class="chip ${SC.mode === 'putih' ? 'aktif' : ''}" data-f="mode" data-v="putih" aria-pressed="${SC.mode === 'putih'}">2. Tandai area putih ${SC.putih ? '✓' : '(disarankan)'}</button></div>
    <p class="kecil lembut" style="margin:4px 0 0">${SC.mode === 'darah' ? 'Ketuk foto di bagian darah.' : 'Ketuk foto di bagian putih bersih, misalnya tisu atau pembalut, yang terkena cahaya sama.'}</p>`;
  if(H) H.innerHTML = hasilSc();
}

function vScan(){
  const kartuWarna = Object.entries(WARNA_DARAH).map(([k, w]) => `<div class="sc-ref"><i style="background:${w.hex}"></i><div><b>${w.nama}</b> <span class="lembut kecil">· ${w.label}</span><div class="kecil lembut">${w.ciri}</div></div></div>`).join('');
  return `<div class="kepala"><div><h1>Scan Warna Darah</h1><p>Foto darah, lalu lihat perkiraan warnanya dan tingkat kekuatannya menurut kitab.</p></div></div>
  <div class="sc-layout"><div>
    <div class="kartu">
      <div class="tj-priv">${ik('user')}<span>Privat: foto hanya diproses di perangkat ini. Tidak diunggah dan tidak disimpan.</span></div>
      <div class="aksi" style="margin-top:12px"><button class="btn" data-f="kamera">${ik('kamera')} Ambil foto</button><button class="btn garis" data-f="galeri">Pilih dari galeri</button></div>
      <input type="file" id="sc-kamera" accept="image/*" capture="environment" hidden><input type="file" id="sc-galeri" accept="image/*" hidden>
      <p class="kecil salah-teks" id="sc-pesan" role="alert" style="min-height:18px;margin:8px 0 0"></p>
      <div id="sc-area" hidden>
        <div id="sc-langkah" style="margin-top:6px"></div>
        <canvas id="sc-kanvas" class="sc-kanvas" aria-label="Foto yang akan diperiksa. Ketuk untuk menandai area."></canvas>
      </div>
    </div>
    <div class="kartu" style="margin-top:16px" id="sc-hasil-kartu" aria-live="polite"><h2 style="font-size:16px;margin-bottom:10px">Hasil</h2><div id="sc-hasil"><p class="lembut kecil" style="margin:0">Ambil atau pilih foto dulu.</p></div></div>
  </div>
  <aside>
    <div class="kartu"><h2 style="font-size:16px;margin-bottom:6px">Panduan warna</h2><p class="kecil lembut">Dari yang terkuat ke terlemah (Risalatul Mahidl hlm. 19).</p>${kartuWarna}</div>
    <div class="kartu" style="margin-top:14px"><h2 style="font-size:16px;margin-bottom:6px">Biar hasilnya akurat</h2>
      <ul class="kal-batas"><li>Foto di cahaya siang atau lampu putih, tanpa flash dan tanpa filter.</li><li>Letakkan noda di atas tisu atau pembalut putih, lalu tandai area putihnya.</li><li>Pilih bagian tengah noda yang rata.</li><li>Foto dari dekat, kamera tegak lurus, tidak miring.</li></ul></div>
    <div class="kartu" style="margin-top:14px"><b>Perlu diingat</b><p class="kecil lembut" style="margin:4px 0 0">Fitur ini membantu mengenali warna untuk belajar fikih, bukan alat medis. Kalau ada keluhan kesehatan seperti nyeri hebat, darah sangat banyak, atau bau tidak biasa, periksakan ke dokter.</p></div>
  </aside></div>`;
}

/* ================= KONSULTASI ================= */
const nomorWA = n => { const d = String(n || '').replace(/\D/g, ''); return d ? d.replace(/^0/, '62') : ''; };
function ringkasanSiklus(){
  const L = urutHaid(); if(!L.length) return '';
  const r = ringkasK();
  return 'Catatan haid terakhir:\n' + L.slice(-3).map(c => `- ${fmtPendek(c.mulai)} s.d. ${c.selesai ? fmtPendek(c.selesai) : 'masih berjalan'} (${lamaHaid(c)} hari)`).join('\n') + (r.siklus ? `\nRata-rata siklus: ${r.siklus} hari` : '');
}
const SAPA_TOPIK = {
  warna: 'Saya ingin bertanya tentang warna darah yang keluar: ',
  siklus: 'Saya ingin bertanya tentang haid saya: ',
  tanya: 'Saya ingin bertanya, pertanyaan saya belum terjawab di aplikasi: '
};
function pesanWA(){
  const teks = ($('#ks-teks') || {}).value || '', ring = $('#ks-ringkas') && $('#ks-ringkas').checked ? ringkasanSiklus() : '';
  return `Assalamu’alaikum, saya pengguna SiklusKu.\n\n${teks.trim() || '(tulis pertanyaanmu di sini)'}` + (ring ? '\n\n' + ring : '');
}
function perbaruiWA(){
  const m = encodeURIComponent(pesanWA());
  document.querySelectorAll('a[data-wa]').forEach(a => { a.href = `https://wa.me/${a.dataset.wa}?text=${m}`; });
  const pv = $('#ks-pratinjau'); if(pv) pv.textContent = pesanWA();
}
function vKonsultasi(){
  const q = new URLSearchParams(location.search).get('topik'), awal = SAPA_TOPIK[q] || '';
  const ada = ringkasanSiklus() !== '', daftar = (typeof KONSULTASI !== 'undefined' && KONSULTASI.kontak) || [];
  const kartu = daftar.map((k, i) => {
    const n = nomorWA(k.nomor);
    return `<div class="kartu ks-kontak"><span class="bulat">${ik('user')}</span><div class="ks-info"><b>${esc(k.nama)}</b>
      <div class="kecil lembut">${esc(k.bidang || '')}</div><div class="kecil lembut">${ik('jam')} ${esc(k.jam || KONSULTASI.jam || '')}</div>
      ${n ? `<div class="kecil" style="margin-top:4px">Nomor: <b>+${n}</b></div>` : `<div class="kecil lembut" style="margin-top:4px">Nomor belum diisi oleh pengelola aplikasi.</div>`}</div>
      <div class="ks-aksi">${n ? `<a class="btn" data-wa="${n}" href="https://wa.me/${n}" target="_blank" rel="noopener">Chat WhatsApp</a><button class="btn garis" data-f="salin" data-n="+${n}">Salin nomor</button>` : `<button class="btn" disabled>Chat WhatsApp</button>`}</div></div>`;
  }).join('');
  return `<div class="kepala"><div><h1>Konsultasi</h1><p>Untuk masalah pribadi yang belum terjawab lewat Tanya Jawab.</p></div></div>
  <div class="ks-layout"><div>
    <h2 class="seksi" style="margin-top:0">Hubungi ustadz atau ustadzah</h2>${kartu || '<div class="kartu"><p class="kecil lembut" style="margin:0">Belum ada kontak konsultasi yang diatur.</p></div>'}
    <div class="kartu" style="margin-top:16px"><h2 style="font-size:16px;margin-bottom:6px">Siapkan pertanyaanmu</h2>
      <p class="kecil lembut">Tulis di sini, lalu tekan Chat WhatsApp. Pesan akan terisi otomatis, kamu tinggal mengirim.</p>
      <label for="ks-teks"><b>Pertanyaan</b></label>
      <textarea id="ks-teks" class="ks-teks" rows="4" maxlength="800" placeholder="Ceritakan dengan kata-kata: apa yang terjadi, sudah berapa hari, apa yang kamu bingungkan.">${esc(awal)}</textarea>
      <label class="ks-cek"><input type="checkbox" id="ks-ringkas" ${ada ? '' : 'disabled'}> Sertakan ringkasan catatan haid saya ${ada ? '' : '<span class="lembut">(belum ada catatan)</span>'}</label>
      <details class="kal-lama"><summary>Lihat pesan yang akan dikirim</summary><pre class="ks-pratinjau" id="ks-pratinjau"></pre></details>
      <p class="kecil lembut" style="margin:10px 0 0">Hanya isi di atas yang ikut terkirim. Nama akun dan data belajarmu tidak ikut.</p></div>
  </div><aside>
    <div class="kartu"><h2 style="font-size:16px;margin-bottom:6px">Kapan sebaiknya konsultasi?</h2>
      <ul class="kal-batas"><li>Darah keluar lebih dari 15 hari, atau nifas lebih dari 60 hari</li><li>Darah tidak teratur, putus-putus, atau berganti warna</li><li>Lupa kebiasaan haid, atau baru pertama haid</li><li>Ragu soal salat, puasa, atau mandi wajib setelah darah berhenti</li><li>Kasus yang tidak ketemu di Tanya Jawab</li></ul></div>
    <div class="kartu" style="margin-top:14px"><h2 style="font-size:16px;margin-bottom:6px">Catatan</h2>
      <ul class="kal-batas"><li>Ceritakan dengan kata-kata. Tidak perlu mengirim foto bagian tubuh.</li><li>Jam layanan: ${esc((typeof KONSULTASI !== 'undefined' && KONSULTASI.jam) || '-')}</li><li>${esc((typeof KONSULTASI !== 'undefined' && KONSULTASI.catatan) || 'Balasan bisa membutuhkan waktu.')}</li></ul>
      <p class="kecil lembut" style="margin:8px 0 0">Keluhan kesehatan yang mendesak sebaiknya langsung ke dokter atau layanan kesehatan.</p></div>
    <div class="kartu" style="margin-top:14px"><b>Sudah coba Tanya Jawab?</b><p class="kecil lembut" style="margin:4px 0 10px">Jawabannya langsung dari kitab, dan sering cukup untuk pertanyaan umum.</p><a class="btn garis" href="${U.tanya}">Buka Tanya Jawab</a></div>
  </aside></div>`;
}

/* ================= interaksi ================= */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-f]');
  if(el){
    const a = el.dataset.f, t = hariIni();
    if(a === 'hari'){ kalPilih = el.dataset.t; const i = $('#kal-tgl'); if(i) i.value = kalPilih; $('#kal-grid').innerHTML = gridBulan(ringkasK()); return; }
    if(a === 'bulan'){ const d = parseInt(el.dataset.d, 10); const x = new Date(kalBulan.y, kalBulan.m + d, 1); kalBulan = {y: x.getFullYear(), m: x.getMonth()}; tampilK(); return; }
    if(a === 'hari-ini'){ const d = new Date(); kalBulan = {y: d.getFullYear(), m: d.getMonth()}; tampilK(); return; }
    if(a === 'mulai'){
      const tg = ($('#kal-tgl') || {}).value, err = tambahHaid(tg, null);
      if(err) setPesanK(err, false); else { kalPilih = tg; const x = new Date(tg + 'T00:00:00'); kalBulan = {y: x.getFullYear(), m: x.getMonth()}; setPesanK(`Haid dimulai ${fmtT(tg)}. Selama haid tidak salat dan tidak puasa.`); }
      return;
    }
    if(a === 'selesai'){
      const tg = ($('#kal-tgl') || {}).value, jalan = dataK().find(c => !c.selesai);
      if(!jalan) return setPesanK('Belum ada haid yang berjalan. Tekan “Haid mulai” dulu, atau pakai “Catat haid yang sudah lewat”.', false);
      if(!tg) return setPesanK('Pilih tanggal selesai dulu.', false);
      if(tg < jalan.mulai) return setPesanK('Tanggal selesai tidak boleh sebelum tanggal mulai.', false);
      if(tg > t) return setPesanK('Tanggal selesai belum tiba.', false);
      jalan.selesai = tg; simpan(); setPesanK(`Haid selesai ${fmtT(tg)}, lamanya ${lamaHaid(jalan)} hari. Setelah darah berhenti, mandi wajib lalu salat kembali.`); return;
    }
    if(a === 'tambah-lama'){
      const m = ($('#kal-l1') || {}).value, s = ($('#kal-l2') || {}).value;
      if(!s) return setPesanK('Isi tanggal selesai. Untuk haid yang masih berjalan, pakai tombol “Haid mulai”.', false);
      const err = tambahHaid(m, s);
      if(err) setPesanK(err, false); else setPesanK('Catatan haid tersimpan.'); return;
    }
    if(a === 'hapus'){ kalHapusId = el.dataset.id; tampilK(); return; }
    if(a === 'hapus-batal'){ kalHapusId = null; tampilK(); return; }
    if(a === 'hapus-ok'){ S.kalender.catatan = dataK().filter(c => c.id !== el.dataset.id); kalHapusId = null; simpan(); setPesanK('Catatan dihapus.'); return; }
    if(a === 'hapus-semua'){ kalHapusSemua = true; tampilK(); return; }
    if(a === 'hapus-semua-batal'){ kalHapusSemua = false; tampilK(); return; }
    if(a === 'hapus-semua-ok'){ S.kalender = {catatan: []}; kalHapusSemua = false; simpan(); setPesanK('Semua catatan kalender dihapus.'); return; }
    if(a === 'kamera'){ $('#sc-kamera').click(); return; }
    if(a === 'galeri'){ $('#sc-galeri').click(); return; }
    if(a === 'mode'){ SC.mode = el.dataset.v; perbaruiSc(); return; }
    if(a === 'sifat'){ SC[el.dataset.v] = !SC[el.dataset.v]; perbaruiSc(); return; }
    if(a === 'salin'){
      const n = el.dataset.n, ok = () => { el.textContent = 'Tersalin'; setTimeout(() => { el.textContent = 'Salin nomor'; }, 1600); };
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(n).then(ok, () => { el.textContent = n; }); else el.textContent = n;
      return;
    }
  }
  if(e.target.id === 'sc-kanvas' && SC.bersih){
    const k = e.target, rc = k.getBoundingClientRect();
    const x = (e.clientX - rc.left) * k.width / rc.width, y = (e.clientY - rc.top) * k.height / rc.height;
    const w = ambilWarna(SC.bersih, x, y); w.x = x; w.y = y;
    if(SC.mode === 'putih') SC.putih = w; else SC.titik = w;
    gambarSc(); perbaruiSc();
  }
});
document.addEventListener('change', e => {
  if(e.target.id === 'sc-kamera' || e.target.id === 'sc-galeri'){ const f = e.target.files && e.target.files[0]; e.target.value = ''; muatFoto(f); }
  if(e.target.id === 'ks-ringkas') perbaruiWA();
  if(e.target.id === 'kal-tgl'){ kalPilih = e.target.value || null; const g = $('#kal-grid'); if(g) g.innerHTML = gridBulan(ringkasK()); }
});
document.addEventListener('input', e => { if(e.target.id === 'ks-teks') perbaruiWA(); });
document.addEventListener('DOMContentLoaded', () => { if(document.body.dataset.halaman === 'konsultasi') perbaruiWA(); });
