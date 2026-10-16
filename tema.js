"use strict";
/* Tema tampilan SiklusKu: terang, gelap, atau ikuti perangkat.
   Dimuat di <head> supaya tema terpasang sebelum halaman tergambar (tidak ada kilatan terang saat mode gelap).
   Pilihan disimpan per perangkat/browser, bukan per akun, supaya halaman login juga mengikutinya. */
(function(){
  var KUNCI = 'fiqihku:tema', WARNA = {terang:'#FBEDEF', gelap:'#1D1217'};
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function baca(){ try{ var v = localStorage.getItem(KUNCI); return v === 'terang' || v === 'gelap' ? v : 'sistem'; }catch(e){ return 'sistem'; } }
  function efektif(m){ return m === 'gelap' || (m !== 'terang' && mq && mq.matches) ? 'gelap' : 'terang'; }
  function terapkan(m){
    var r = document.documentElement;
    if(m === 'gelap') r.setAttribute('data-theme', 'dark');
    else if(m === 'terang') r.setAttribute('data-theme', 'light');
    else r.removeAttribute('data-theme');
    var tc = document.querySelector('meta[name="theme-color"]');
    if(!tc){ tc = document.createElement('meta'); tc.name = 'theme-color'; document.head.appendChild(tc); }
    tc.content = WARNA[efektif(m)];
  }
  function simpan(m){
    if(m !== 'terang' && m !== 'gelap') m = 'sistem';
    try{ if(m === 'sistem') localStorage.removeItem(KUNCI); else localStorage.setItem(KUNCI, m); }catch(e){}
    terapkan(m);
  }
  window.TEMA = {baca: baca, simpan: simpan, terapkan: terapkan, efektif: efektif};
  terapkan(baca());
  if(mq){ var ubah = function(){ if(baca() === 'sistem') terapkan('sistem'); }; if(mq.addEventListener) mq.addEventListener('change', ubah); else if(mq.addListener) mq.addListener(ubah); }
  window.addEventListener('storage', function(e){ if(e.key === KUNCI) terapkan(baca()); });
})();

/* Layar pembuka (splash): tampil sekali per sesi browser, lalu memudar. Ketuk layar untuk melewati. */
(function(){
  var K = 'fiqihku:splash', r = document.documentElement;
  try{ if(sessionStorage.getItem(K)) return; sessionStorage.setItem(K, '1'); }catch(e){ return; }
  r.classList.add('splash-on');
  setTimeout(function(){ r.classList.remove('splash-on'); }, 4000);   // pengaman: konten tidak pernah tertahan
  var kurang = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bangun(){
    var d = document.createElement('div');
    d.id = 'splash'; d.setAttribute('role', 'status'); d.setAttribute('aria-label', 'Memuat aplikasi');
    if(window.TEMA && TEMA.efektif(TEMA.baca()) === 'gelap') d.className = 'gelap';
    d.innerHTML = (window.DUNIA ? window.DUNIA() : '') +
      '<img class="sp-masjid" src="gambar/masjid.svg" alt="">' +
      '<img class="sp-kiri" src="gambar/dekor-kiri.svg" alt="">' +
      '<img class="sp-kanan" src="gambar/dekor-kiri.svg" alt="">' +
      '<img class="sp-bulan" src="gambar/bulan.svg" alt="">' +
      '<img class="sp-gerbang" src="gambar/gerbang.svg" alt="">' +
      '<div class="sp-isi">' +
        '<svg class="sp-logo" viewBox="0 0 120 120" aria-hidden="true"><path d="M22 92V56Q22 38 40 29 55 21 60 6 65 21 80 29 98 38 98 56V92z" fill="none" stroke="#B5586F" stroke-width="4" stroke-linejoin="round"/><path d="M42 92V74q0-16 18-20 18 4 18 20v18z" fill="#B5586F"/><path d="M60 54V44" stroke="#E3B7A0" stroke-width="3" stroke-linecap="round"/><path d="M54 92V84a6 6 0 0 1 12 0v8z" fill="#FCE4E8"/><path d="M12 98Q38 90 60 101 82 90 108 98V108Q82 100 60 111 38 100 12 108z" fill="none" stroke="#B5586F" stroke-width="3.5" stroke-linejoin="round"/></svg>' +
        '<h1>SiklusKu</h1>' +
        '<p class="sp-tag">Belajar Fiqih, Jadi Lebih Dekat dengan Allah</p>' +
      '</div>' +
      '<div class="sp-muat"><div class="sp-trek"><i></i></div><span>Memuat aplikasi...</span></div>';
    document.body.appendChild(d);
    var tutup = function(){
      if(d.classList.contains('selesai')) return;
      d.classList.add('selesai'); r.classList.remove('splash-on');
      setTimeout(function(){ if(d.parentNode) d.parentNode.removeChild(d); }, 700);
    };
    d.addEventListener('click', tutup);
    setTimeout(tutup, kurang ? 500 : 1800);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bangun); else bangun();
})();

/* ===== Wallpaper hidup: mata berkedip, tangan bergerak, bintang berkelip, bintang jatuh, kelopak, kunang-kunang ===== */
(function(){
  var W = 1672, H = 940, p = function(x, y){ return 'left:' + (x / W * 100).toFixed(2) + '%;top:' + (y / H * 100).toFixed(2) + '%'; };
  var BINTANG = [[238,78],[559,111],[681,304],[1176,155],[767,517],[1004,420],[1328,33],[1074,76],[893,200],[823,390],[1585,219],[18,154],[773,146]];
  var CAHAYA = [[117,212,'9%','rgba(255,196,110,.6)','2.6s'],[1309,201,'13%','rgba(255,232,205,.5)','5s'],[1315,436,'11%','rgba(255,190,120,.4)','3.6s']];
  var R = function(a, b){ return (a + Math.random() * (b - a)).toFixed(2); };
  window.DUNIA = function(){
    var s = '<div class="dunia" aria-hidden="true"><div class="dunia-isi"><img class="dasar" src="gambar/latar.jpg" alt="">';
    s += '<img class="dk mata" style="left:21.292%;top:43.617%;width:5.383%" src="gambar/hidup/mata-kiri.png" alt="">';
    s += '<img class="dk mata" style="left:27.512%;top:46.383%;width:4.545%" src="gambar/hidup/mata-kanan.png" alt="">';
    s += '<img class="dk tg tg-kiri" style="left:21.651%;top:74.468%;width:7.297%" src="gambar/hidup/tangan-kiri.png" alt="">';
    s += '<img class="dk tg tg-kanan" style="left:30.502%;top:73.404%;width:4.187%" src="gambar/hidup/tangan-kanan.png" alt="">';
    CAHAYA.forEach(function(c){ s += '<i class="gl" style="' + p(c[0], c[1]) + ';--s:' + c[2] + ';--w:' + c[3] + ';--t:' + c[4] + '"></i>'; });
    BINTANG.forEach(function(b, i){ s += '<i class="bt" style="' + p(b[0], b[1]) + ';--z:' + (1.5 + (i % 3) * .5) + '%;--d:' + (i * .37).toFixed(2) + 's;--l:' + (2.2 + (i % 4) * .6).toFixed(1) + 's"></i>'; });
    for(var i = 0; i < 14; i++) s += '<i class="bt kecil" style="left:' + R(2, 98) + '%;top:' + R(2, 44) + '%;--z:.8%;--d:' + R(0, 4) + 's;--l:' + R(2, 4.5) + 's"></i>';
    s += '<i class="air"></i></div><div class="dunia-lepas">';
    [[62,4,8,1],[84,9,13,4.5],[41,2,11,7.5]].forEach(function(m){ s += '<i class="mt" style="left:' + m[0] + '%;top:' + m[1] + '%;--t:' + m[2] + 's;--d:' + m[3] + 's"></i>'; });
    for(i = 0; i < 9; i++) s += '<i class="kp" style="left:' + R(0, 100) + '%;--t:' + R(13, 22) + 's;--d:-' + R(0, 20) + 's;--u:' + R(9, 15) + 'px;--g:' + R(-90, 90) + 'px"></i>';
    for(i = 0; i < 12; i++) s += '<i class="kk" style="left:' + R(2, 98) + '%;--t:' + R(8, 15) + 's;--d:-' + R(0, 14) + 's;--g:' + R(-40, 40) + 'px"></i>';
    return s + '</div></div>';
  };
  function pasang(){
    var h = document.body && document.body.getAttribute('data-halaman');
    if(!document.body || h === 'najis' || h === 'haid' || document.querySelector('.dunia')) return;
    document.body.insertAdjacentHTML('afterbegin', window.DUNIA());
    document.body.classList.add('ada-dunia');
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pasang); else pasang();
})();

/* ===== Transisi antar halaman/bab =====
   - dari halaman materi ke materi/bab lain: papan "membalik halaman"
   - halaman lain: tirai bulat dengan bulan sabit membuka dan menutup */
(function(){
  var r = document.documentElement, K = 'siklusku:tr';
  var kurang = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var jenis = null; try{ jenis = sessionStorage.getItem(K); sessionStorage.removeItem(K); }catch(e){}
  if(jenis === 'tirai' && !kurang){ r.classList.add('tr-tirai'); setTimeout(function(){ r.classList.remove('tr-tirai'); }, 800); }
  if(jenis === 'balik' && !kurang) document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){ var pn = document.querySelector('.papan'); if(pn){ pn.classList.add('balik-masuk'); setTimeout(function(){ pn.classList.remove('balik-masuk'); }, 700); } }, 0);
  });
  window.PINDAH = function(url){
    var pn = document.querySelector('.papan'), balik = !!pn && /(najis|haid)\.html/.test(url);
    if(kurang){ location.href = url; return; }
    try{ sessionStorage.setItem(K, balik ? 'balik' : 'tirai'); }catch(e){}
    if(balik) pn.classList.add('balik-keluar'); else r.classList.add('tr-keluar');
    setTimeout(function(){ location.href = url; }, balik ? 380 : 460);
    setTimeout(function(){ r.classList.remove('tr-keluar'); if(pn) pn.classList.remove('balik-keluar'); }, 2500);   // pengaman kalau navigasi gagal
  };
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download') || a.hasAttribute('data-aksi')) return;
    var h = a.getAttribute('href');
    if(!h || h.charAt(0) === '#' || /^(https?:|mailto:|tel:|javascript:)/i.test(h)) return;
    e.preventDefault(); window.PINDAH(a.href);
  });
  window.addEventListener('pageshow', function(e){ if(e.persisted) r.classList.remove('tr-keluar', 'tr-tirai'); });
})();
