"use strict";
/* ========== DATA MATERI (sumber: Terjemah Fathul Qorib, hlm. 40-51) ========== */
const BAB = {
 najis:{ id:'najis', judul:'Najis', pendek:'Pengertian najis, jenis-jenis, dan cara menyucikannya', menit:45, ilus:'tetes', hlm:'hlm. 40–46', materi:[
  {judul:'Pengertian Najis', hlm:'hlm. 41',
   pembuka:'Sebelum belajar cara menyucikan najis, kita sepakati dulu apa itu najis. Fathul Qorib memberi definisi yang ketat supaya tidak semua barang haram ikut disebut najis.',
   blok:[
    'Secara bahasa, najis adalah sesuatu yang dianggap menjijikkan. Secara syara’, najis adalah setiap benda yang haram digunakan secara mutlak dalam keadaan normal, mudah dibedakan dari yang lain, dan keharamannya bukan karena kemuliaan benda itu, bukan karena menjijikkan, dan bukan karena membahayakan badan atau akal.',
    'Definisi ini berlapis. Setiap frasanya menyaring benda tertentu supaya tidak ikut digolongkan najis:',
    {t:'tabel', head:['Frasa dalam definisi','Yang dikecualikan atau dicakup'], rows:[
      ['Secara mutlak','Najis sedikit maupun banyak sama-sama termasuk.'],
      ['Dalam keadaan normal','Keadaan darurat dikecualikan, karena darurat membolehkan penggunaan najis.'],
      ['Mudah dipisahkan','Memakan ulat yang mati di dalam keju, buah, dan sejenisnya dikecualikan.'],
      ['Bukan karena kemuliaannya','Jenazah anak Adam (manusia) dikecualikan.'],
      ['Bukan karena menjijikkan','Sperma dikecualikan.'],
      ['Bukan karena membahayakan','Batu dan tanaman yang berbahaya bagi badan atau akal dikecualikan.']]},
    'Benda-benda yang dikecualikan itu tetap haram digunakan dalam hal tertentu, tetapi sebabnya bukan najis. Sebabnya adalah hal-hal yang disebut di tabel tadi.'
   ],
   penting:['Haram digunakan belum tentu najis. Batu atau tanaman berbahaya haram karena bahayanya, bukan karena najis.','Rasa jijik saja tidak menjadikan sesuatu najis: sperma dikecualikan dari definisi najis.']},
  {judul:'Najis yang Keluar dari Qubul dan Dubur', hlm:'hlm. 41–42',
   pembuka:'Setelah definisi, mushannif (penulis matan) langsung memberi batasan yang paling praktis: najis yang keluar dari dua jalan.',
   blok:[
    'Setiap benda cair yang keluar dari qubul (jalur depan) dan dubur (jalur belakang) hukumnya najis. Cakupannya luas: benda yang biasa keluar seperti kencing dan tinja, maupun yang jarang keluar seperti darah dan nanah.',
    'Ada satu pengecualian: sperma dari anak Adam, dan sperma dari hewan selain anjing, babi, serta peranakan keduanya (atau salah satunya) hasil perkawinan dengan hewan yang suci.',
    'Kata “benda cair” juga berfungsi menyaring. Ulat dan benda padat yang tidak diproses oleh lambung tidak najis, tetapi bisa terkena najis. Benda seperti itu suci kembali dengan dibasuh.'
   ],
   penting:['Hukum dasarnya najis. Pengecualiannya sperma, dengan syarat hewannya bukan anjing, babi, atau peranakannya.','Ulat dan benda padat yang keluar tanpa diproses lambung tidak najis. Cukup dibasuh kalau terkena najis.']},
  {judul:'Cara Menyucikan Najis', hlm:'hlm. 42–43',
   pembuka:'Cara menyucikan najis mengikuti satu pertanyaan sederhana: najisnya terlihat atau tidak?',
   blok:[
    'Kencing dan kotoran wajib dibasuh, termasuk yang berasal dari hewan yang halal dimakan dagingnya.',
    {t:'kartu2', items:[
      {judul:'Najis ainiyah', isi:'Najis yang terlihat oleh mata. Cara menyucikannya dengan menghilangkan bendanya dan sifat-sifatnya, yaitu rasa, warna, dan bau. Sisa warna atau bau yang memang sulit dihilangkan tidak jadi masalah.'},
      {judul:'Najis hukmiyah', isi:'Najis yang tidak terlihat oleh mata. Cukup dengan mengalirkan air pada tempat yang terkena najis, walau hanya satu kali aliran.'}]},
    {t:'catatan', isi:'Catatan penyusun: kalimat tentang rasa najis yang masih tersisa pada terjemahan hlm. 42 berbunyi “maka berbahaya”. Di sini dimaknai: najisnya belum dianggap hilang.'},
    'Soal air. Kalau airnya sedikit, airlah yang harus didatangkan atau dialirkan ke barang yang terkena najis. Kalau barangnya yang dimasukkan ke air sedikit, barang itu tidak menjadi suci. Untuk air yang banyak, tidak ada bedanya apakah air yang mendatangi atau didatangi.'
   ],
   penting:['Najis ainiyah: hilangkan wujud dan sifatnya. Najis hukmiyah: cukup dialiri air.','Air sedikit harus didatangkan ke barang, bukan barang dicelup ke air sedikit.']},
  {judul:'Najis Mukhaffafah', hlm:'hlm. 42–43',
   pembuka:'Mukhaffafah artinya diringankan. Dalam terjemahan yang kita pakai, judul ini memayungi satu kasus: kencing anak laki-laki kecil.',
   blok:[
    'Mushannif mengecualikan kencing anak laki-laki kecil yang belum pernah makan atau minum makanan untuk penguat badan. Kencing anak seperti ini sudah suci hanya dengan dipercikkan air, dan percikan itu tidak disyaratkan sampai mengalir.',
    {t:'tabel', head:['Kondisi anak','Cara menyucikan kencingnya'], rows:[
      ['Laki-laki, belum makan makanan penguat badan','Dipercikkan air; tidak harus mengalir'],
      ['Laki-laki, sudah makan makanan penguat badan','Dibasuh'],
      ['Perempuan','Dibasuh'],
      ['Khuntsa','Dibasuh']]}
   ],
   penting:['Keringanan hanya berlaku untuk anak laki-laki yang belum mengonsumsi makanan penguat badan.','Kencing anak lainnya tetap dibasuh.']},
  {judul:'Najis Ma’fu', hlm:'hlm. 43–44',
   pembuka:'Ma’fu berarti dimaafkan: najis yang tidak menghalangi sahnya ibadah.',
   blok:[
    'Menurut Fathul Qorib, tidak ada najis yang dima’fu kecuali darah dan nanah yang sedikit. Keduanya dima’fu di pakaian dan badan, sehingga sholat tetap sah walau membawa keduanya.',
    'Pengecualian kedua menyangkut bangkai binatang yang tidak memiliki darah mengalir, seperti lalat dan semut. Kalau binatang itu terjatuh sendiri ke wadah air lalu mati, bangkainya tidak menajiskan air di wadah tersebut.',
    {t:'daftar', judul:'Rincian tambahan', items:[
      'Kalau bangkai itu sengaja dimasukkan ke benda cair, benda cair itu najis. Ini pendapat yang dimantapkan Imam ar Rafi’i dalam kitab asy Syarh ash Shaghir.',
      'Kalau bangkainya banyak dan mengubah sifat cairan, cairan itu najis.',
      'Kalau bangkai itu muncul dari cairan itu sendiri, seperti ulat cuka dan buah-buahan, cairan tidak najis.']}
   ],
   penting:['Najis yang dima’fu: darah dan nanah sedikit di pakaian dan badan.','Bangkai lalat atau semut yang jatuh sendiri ke wadah air tidak menajiskan airnya.']},
  {judul:'Najis Mughallazah', hlm:'hlm. 44',
   pembuka:'Mughallazah artinya diberatkan. Najis jenis ini cara menyucikannya paling ketat.',
   blok:[
    'Semua hewan hukumnya suci, kecuali anjing, babi, dan peranakan keduanya atau salah satunya hasil perkawinan dengan hewan yang suci. Karena itu ulat yang muncul dari najis tetap suci.',
    'Bangkai hukumnya najis, kecuali bangkai ikan, belalang, dan anak Adam, yang hukumnya suci.',
    'Wadah yang terkena liur anjing atau babi wajib dibasuh tujuh kali dengan air suci yang menyucikan. Salah satu basuhannya dicampur dengan debu suci yang merata ke seluruh tempat yang terkena najis.',
    {t:'daftar', judul:'Rincian tambahan', items:[
      'Kalau dibasuh dengan air mengalir yang keruh, cukup air mengalir tujuh kali tanpa harus dicampur debu.',
      'Kalau najis anjing baru hilang setelah enam basuhan semisal, seluruh basuhan dihitung satu kali.',
      'Kalau najis mengenai tanah berdebu, tidak wajib diberi debu lagi menurut qaul al ashah.']}
   ],
   penting:['Liur anjing atau babi: tujuh kali basuhan, salah satunya dengan debu suci.','Bangkai yang suci: ikan, belalang, anak Adam. Bangkai lainnya najis.']},
  {judul:'Najis Mutawassithah, Air Basuhan, dan Khamer', hlm:'hlm. 44–46',
   pembuka:'Bagian terakhir Bab Najis mencakup najis “sisanya”, nasib air bekas basuhan, dan najis yang suci karena berubah sifat.',
   blok:[
    'Untuk najis-najis selain yang tadi (mutawassithah), cukup dibasuh satu kali dengan air yang dialirkan pada najis itu. Membasuh tiga kali lebih utama.',
    'Air basuhan najis, setelah tempat yang dibasuh menjadi suci, hukumnya suci jika air itu terpisah dalam keadaan tidak berubah dan ukurannya tidak bertambah dari ukuran sebelumnya, dengan memperhitungkan air yang terserap tempat basuhan. Syarat ini berlaku bila air basuhan belum mencapai dua qullah. Kalau sudah mencapai dua qullah, syaratnya cukup tidak berubah.',
    'Sebagian najis suci bukan karena dibasuh, melainkan karena istihalah, yaitu perubahan sesuatu dari satu sifat ke sifat lain. Contohnya khamer, minuman dari perasan anggur. Kalau khamer berubah menjadi cuka dengan sendirinya, ia suci, dan wadahnya ikut suci karena mengikuti khamernya.'
   ],
   penting:['Mutawassithah: sekali dialirkan sudah cukup, tiga kali lebih utama.','Istihalah: perubahan sifat yang menyucikan, contohnya khamer menjadi cuka dengan sendirinya.']},
  {judul:'Contoh Kasus', hlm:'hlm. 42–44', ilus:false,
   pembuka:'Coba jawab dulu dalam hati, baru buka jawabannya.',
   blok:[{t:'kasus', items:[
    {q:'Seorang anak laki-laki yang belum pernah diberi makanan penguat badan mengencingi bajumu. Bagaimana menyucikannya?', a:'Cukup dipercikkan air pada bagian yang terkena. Percikannya tidak harus sampai mengalir. Ini keringanan khusus anak laki-laki (hlm. 42).'},
    {q:'Bagaimana kalau yang mengencingi adalah anak perempuan?', a:'Harus dibasuh. Keringanan percikan tidak berlaku untuk anak perempuan dan khuntsa (hlm. 43).'},
    {q:'Seekor lalat jatuh sendiri ke wadah air minum dan mati. Apakah airnya najis?', a:'Tidak. Lalat tidak memiliki darah yang mengalir, dan bangkainya tidak menajiskan air di wadah itu (hlm. 43).'},
    {q:'Sebuah wadah terkena liur anjing. Berapa kali dibasuh?', a:'Tujuh kali dengan air suci yang menyucikan, dan salah satu basuhannya dicampur debu suci yang merata ke tempat yang terkena (hlm. 44).'},
    {q:'Ada setitik darah di bajumu. Apakah sholatmu sah?', a:'Sah. Darah yang sedikit termasuk najis yang dima’fu di pakaian dan badan (hlm. 43).'},
    {q:'Bajumu terkena najis, lalu langsung direndam di ember berisi sedikit air. Sucikah?', a:'Belum. Untuk air yang sedikit, airlah yang harus didatangkan ke barang yang terkena najis. Kalau barangnya yang dimasukkan ke air sedikit, barang itu tidak suci (hlm. 43).'},
    {q:'Najisnya sudah hilang, tetapi sedikit bau masih tersisa dan sulit dihilangkan. Bagaimana?', a:'Tidak masalah. Warna atau bau yang sulit dihilangkan dimaafkan. Yang perlu hilang adalah bendanya dan rasa najisnya (hlm. 42).'}]}],
   penting:null}
 ]},
 haid:{ id:'haid', judul:'Haid', pendek:'Haid, nifas, istihadlah, dan hal-hal yang dilarang karenanya', menit:40, ilus:'kalender', hlm:'hlm. 46–51', materi:[
  {judul:'Tiga Macam Darah Perempuan', hlm:'hlm. 46',
   pembuka:'Darah yang keluar dari vagina perempuan tidak semuanya sama hukumnya. Fathul Qorib membaginya menjadi tiga.',
   blok:[
    {t:'tabel', head:['Darah','Pengertian menurut Fathul Qorib'], rows:[
      ['Haid','Darah yang keluar dari vagina perempuan pada usia haid (sembilan tahun atau lebih), dalam keadaan sehat, yaitu bukan karena sakit tetapi pada batas kewajaran, dan bukan karena melahirkan.'],
      ['Nifas','Darah yang keluar dari vagina perempuan setelah melahirkan.'],
      ['Istihadlah','Darah yang keluar dari vagina perempuan di luar hari-hari haid dan nifas, bukan dalam keadaan sehat.']]},
    'Darah yang keluar bersamaan dengan bayi, atau sebelum bayi lahir, tidak disebut darah nifas.',
    'Sebagian redaksi matan menambahkan ciri darah haid: berwarna hitam, terasa panas, dan menyakitkan. Keterangan ini tidak ada di kebanyakan redaksi. Kitab as Shahhah menggambarkan darah haid sebagai darah yang sangat panas, merah pekat hingga kehitaman.'
   ],
   penting:['Haid: usia sembilan tahun ke atas, sehat, bukan karena melahirkan.','Nifas dihitung setelah melahirkan. Darah yang keluar bersamaan atau sebelum bayi bukan nifas.','Istihadlah: darah di luar hari haid dan nifas, bukan dalam keadaan sehat.']},
  {judul:'Masa Haid', hlm:'hlm. 47',
   pembuka:'Haid punya batas bawah, batas atas, dan masa yang lazim terjadi. Angka-angka ini jadi pegangan untuk membedakan haid dari istihadlah.',
   blok:[
    {t:'tabel', head:['Ukuran','Lamanya'], rows:[
      ['Minimal','Sehari semalam, yaitu 24 jam secara bersambung'],
      ['Maksimal','Lima belas hari lima belas malam'],
      ['Yang lumrah','Enam atau tujuh hari']]},
    'Sehari semalam berarti dua puluh empat jam bersambung yang biasa terjadi dalam haid. Darah tidak harus keluar deras terus-menerus.',
    'Kalau darah keluar melebihi masa maksimal, darah tersebut disebut darah istihadlah. Angka lumrah enam atau tujuh hari berpegang pada riset atau penelitian.'
   ],
   penting:['Minimal 24 jam, maksimal 15 hari 15 malam, lumrah 6 sampai 7 hari.','Melebihi masa maksimal berarti istihadlah.']},
  {judul:'Masa Nifas dan Masa Suci', hlm:'hlm. 47–48',
   pembuka:'Setelah haid, ada dua ukuran lain yang perlu dipegang: lamanya nifas dan jarak suci di antara dua haid.',
   blok:[
    {t:'tabel', head:['Ukuran','Lamanya'], rows:[
      ['Minimal nifas','Lahdhah (sebentar)'],
      ['Maksimal nifas','Enam puluh hari'],
      ['Nifas yang lumrah','Empat puluh hari'],
      ['Minimal suci di antara dua haid','Lima belas hari'],
      ['Maksimal suci','Tidak ada batas']]},
    'Awal masa nifas dihitung sejak keluarnya seluruh badan bayi. Seperti haid, angka maksimal dan lumrah nifas berpegang pada penelitian.',
    'Masa suci tidak punya batas maksimal, karena ada perempuan yang seumur hidup tidak pernah mengeluarkan darah haid. Masa suci yang lumrah menyesuaikan masa haid yang lumrah: haid enam hari berarti suci dua puluh empat hari, haid tujuh hari berarti suci dua puluh tiga hari.',
    {t:'catatan', isi:'Catatan penyusun: terjemahan hlm. 48 menulis “tiga belas hari” untuk haid tujuh hari. Di sini dipakai dua puluh tiga hari karena jumlahnya tiga puluh hari, sama seperti pola enam hari ditambah dua puluh empat hari.'},
    'Satu catatan khusus: batas lima belas hari berlaku untuk pemisah di antara dua haid. Menurut qaul al ashah, perempuan hamil bisa mengeluarkan darah haid, sehingga masa suci yang memisahkan haid dan nifas bisa kurang dari lima belas hari.'
   ],
   penting:['Nifas: minimal lahdhah, maksimal 60 hari, lumrah 40 hari.','Suci di antara dua haid minimal 15 hari, tanpa batas maksimal.','Suci di antara haid dan nifas bisa kurang dari 15 hari (qaul al ashah).']},
  {judul:'Usia Haid dan Masa Hamil', hlm:'hlm. 48',
   pembuka:'Dua ukuran terakhir dari kelompok “angka”: usia paling muda untuk haid dan lamanya hamil.',
   blok:[
    'Usia paling muda seorang perempuan bisa mengeluarkan darah haid adalah sembilan tahun hijriyah atau qomariyah.',
    'Kalau darah keluar sebelum genap sembilan tahun, selisih waktunya yang diperhatikan. Bila selisihnya tidak cukup untuk masa minimal suci ditambah masa minimal haid (sekitar sembilan tahun kurang 16 hari kurang sedikit), darah itu tetap darah haid. Kalau tidak demikian, bukan darah haid.',
    {t:'tabel', head:['Masa hamil','Lamanya'], rows:[
      ['Minimal','Enam bulan lebih dua lahdhah (waktu untuk jima’ dan melahirkan)'],
      ['Maksimal','Empat tahun'],
      ['Yang biasa terjadi','Sembilan bulan']]},
    'Pegangan untuk ukuran masa hamil adalah kejadian nyata.'
   ],
   penting:['Usia minimal haid: sembilan tahun hijriyah (qomariyah).','Hamil: minimal enam bulan lebih dua lahdhah, maksimal empat tahun, biasanya sembilan bulan.']},
  {judul:'Delapan Perkara yang Haram Sebab Haid dan Nifas', hlm:'hlm. 48–49',
   pembuka:'Haid dan nifas membawa larangan. Fathul Qorib menghitungnya ada delapan.',
   blok:[
    {t:'daftar', urut:true, items:[
      'Sholat, fardlu maupun sunnah, termasuk sujud tilawah dan sujud syukur.',
      'Puasa, fardlu maupun sunnah.',
      'Membaca Al Qur’an.',
      'Memegang mushaf. Membawa mushaf juga haram, kecuali kalau khawatir terhadap mushaf itu.',
      'Masuk masjid ketika dikhawatirkan mengotorinya.',
      'Thowaf, fardlu maupun sunnah.',
      'Wathi’ (bersenggama). Bagi yang wathi’ saat darah keluar deras, disunnahkan bersedekah satu dinar. Saat darah tidak deras, setengah dinar.',
      'Bersenang-senang dengan anggota tubuh perempuan haid yang berada di antara pusar dan lutut.']},
    'Bersenang-senang pada pusar dan lutut sendiri, dan pada anggota selain bagian di antara keduanya, tidak haram menurut qaul yang dipilih dalam kitab syarh al Muhadzdzab. Mushaf sendiri adalah nama benda yang bertuliskan firman Allah Swt di antara dua tepi.'
   ],
   penting:['Delapan perkara: sholat, puasa, membaca Al Qur’an, memegang mushaf, masuk masjid (jika dikhawatirkan mengotori), thowaf, wathi’, dan bersenang-senang di antara pusar dan lutut.']},
  {judul:'Yang Haram bagi Orang Junub', hlm:'hlm. 49–50',
   pembuka:'Keterangan ini sebenarnya lebih pas di fasal hal-hal yang mewajibkan mandi. Mushannif menyebutkannya di sini karena sama-sama hadats besar.',
   blok:[
    {t:'daftar', urut:true, judul:'Lima perkara yang haram bagi orang junub', items:[
      'Sholat, fardlu maupun sunnah.',
      'Membaca Al Qur’an, satu ayat bahkan satu huruf, pelan maupun keras. Dzikir yang kebetulan ada di Al Qur’an halal dibaca selama tidak bertujuan membaca Al Qur’an.',
      'Menyentuh mushaf, apalagi membawanya.',
      'Thowaf, fardlu maupun sunnah.',
      'Berdiam diri di masjid bagi orang junub yang muslim.']},
    'Kalau darurat, misalnya mimpi keluar sperma di dalam masjid dan sulit keluar karena khawatir pada diri atau hartanya, larangan berdiam diri dikecualikan. Lewat di dalam masjid tanpa berdiam diri tidak haram, bahkan tidak makruh menurut pendapat al ashah. Mondar-mandir di masjid disamakan dengan berdiam diri. Madrasah dan pondok tidak termasuk “masjid” dalam ketentuan ini.'
   ],
   penting:['Lima perkara untuk orang junub: sholat, membaca Al Qur’an, menyentuh mushaf, thowaf, berdiam diri di masjid.','Lewat di masjid tanpa berdiam diri tidak haram (al ashah).']},
  {judul:'Yang Haram bagi Orang Berhadats Kecil', hlm:'hlm. 50–51',
   pembuka:'Mushannif juga menyelipkan hukum hadats kecil di sini.',
   blok:[
    'Orang yang berhadats kecil haram melakukan tiga perkara: sholat, thowaf, serta memegang dan membawa mushaf. Kantong dan peti yang di dalamnya ada mushaf mengikuti hukum yang sama.',
    {t:'daftar', judul:'Keringanan yang disebut Fathul Qorib', items:[
      'Membawa mushaf bersamaan dengan harta benda dibolehkan.',
      'Dibolehkan juga pada kitab tafsir yang tulisan tafsirnya lebih banyak daripada ayat Al Qur’annya.',
      'Dibolehkan pada dinar, dirham, dan cincin yang berukirkan Al Qur’an.',
      'Anak yang sudah tamyiz dan berhadats tidak dilarang menyentuh mushaf dan papan tulis karena tujuan membaca dan belajar Al Qur’an.']}
   ],
   penting:['Hadats kecil: haram sholat, thowaf, serta memegang atau membawa mushaf.','Anak tamyiz yang berhadats boleh menyentuh mushaf dan papan untuk belajar.']},
  {judul:'Contoh Kasus', hlm:'hlm. 46–51', ilus:false,
   pembuka:'Sama seperti Bab Najis: jawab dulu dalam hati.',
   blok:[{t:'kasus', items:[
    {q:'Seorang remaja putri berusia sembilan tahun hijriyah melihat darah keluar bersambung selama sehari semalam, dalam keadaan sehat. Apakah ini haid?', a:'Bisa termasuk haid. Usianya sudah mencapai batas minimal usia haid dan lamanya mencapai minimal haid, yaitu sehari semalam bersambung (hlm. 47–48).'},
    {q:'Darah keluar hanya tiga jam lalu berhenti. Apakah itu haid?', a:'Belum memenuhi batas minimal haid, yaitu sehari semalam atau 24 jam bersambung (hlm. 47).'},
    {q:'Darah keluar bersamaan dengan lahirnya bayi. Apakah itu nifas?', a:'Bukan. Darah yang keluar bersamaan dengan bayi atau sebelumnya tidak disebut nifas. Masa nifas dihitung sejak keluarnya seluruh badan bayi (hlm. 46–47).'},
    {q:'Seorang ibu masih mengeluarkan darah pada hari ke-45 setelah melahirkan. Masih dalam batas nifas?', a:'Masih dalam batas maksimal. Maksimal nifas enam puluh hari, sedangkan empat puluh hari adalah yang lumrah (hlm. 47).'},
    {q:'Seorang perempuan haid ingin masuk masjid, dan dikhawatirkan mengotorinya. Boleh?', a:'Tidak boleh. Ini termasuk delapan perkara yang haram sebab haid (hlm. 49).'},
    {q:'Orang junub hanya ingin lewat di dalam masjid tanpa duduk. Haram?', a:'Tidak haram, bahkan tidak makruh menurut pendapat al ashah. Yang haram adalah berdiam diri di masjid (hlm. 50).'},
    {q:'Orang yang batal wudlu’nya ingin memegang mushaf. Bagaimana?', a:'Haram. Orang berhadats kecil dilarang sholat, thowaf, serta memegang dan membawa mushaf (hlm. 50).'},
    {q:'Anak tamyiz yang berhadats kecil ingin menyentuh mushaf untuk belajar membaca. Bagaimana?', a:'Tidak dilarang, karena tujuannya membaca dan belajar Al Qur’an (hlm. 50–51).'}]}],
   penting:null}
 ]}
};

/* ========== BANK SOAL (jawaban benar selalu di indeks 0, diacak saat dipakai) ========== */
const SOAL = {
 najis:[
  {q:'Menurut Fathul Qorib, bagaimana hukum benda cair yang keluar dari qubul dan dubur?', o:['Najis, kecuali sperma anak Adam dan hewan selain anjing, babi, serta peranakannya','Suci, kecuali kencing dan tinja','Najis semuanya, termasuk sperma manusia','Suci selama jumlahnya sedikit'], e:'Setiap benda cair yang keluar dari dua jalan hukumnya najis, baik yang biasa keluar (kencing, tinja) maupun yang jarang (darah, nanah). Pengecualiannya sperma anak Adam dan hewan selain anjing, babi, dan peranakannya.', m:2, h:'hlm. 41–42'},
  {q:'Najis ainiyah adalah najis yang…', o:['terlihat oleh mata; menyucikannya dengan menghilangkan benda dan sifatnya (rasa, warna, bau)','tidak terlihat; cukup dialiri air sekali','hanya berasal dari anjing dan babi','dima’fu di pakaian dan badan'], e:'Najis ainiyah terlihat oleh mata. Menyucikannya berarti menghilangkan bendanya beserta sifat-sifatnya. Sisa warna atau bau yang sulit dihilangkan tidak masalah.', m:3, h:'hlm. 42'},
  {q:'Najis hukmiyah (tidak terlihat wujudnya) cukup disucikan dengan…', o:['mengalirkan air pada tempat yang terkena, walau hanya satu kali aliran','dibasuh tujuh kali dengan debu','dibasuh tiga kali secara wajib','dipercikkan air saja'], e:'Najis hukmiyah tidak terlihat oleh mata, sehingga cukup dengan mengalirkan air pada tempat yang terkena najis, walau hanya satu kali aliran.', m:3, h:'hlm. 42'},
  {q:'Seorang anak laki-laki yang belum pernah diberi makanan penguat badan mengencingi bajumu. Cara menyucikannya?', o:['Cukup dipercikkan air, tidak harus sampai mengalir','Dibasuh tujuh kali dengan debu','Dibasuh tiga kali secara wajib','Dibiarkan sampai kering'], e:'Kencing anak laki-laki yang belum mengonsumsi makanan penguat badan sudah suci dengan dipercikkan air, dan percikan itu tidak disyaratkan sampai mengalir.', m:4, h:'hlm. 42'},
  {q:'Kencing siapa yang tetap harus dibasuh, tidak cukup dipercikkan?', o:['Anak perempuan','Anak laki-laki yang belum makan makanan penguat badan','Semua anak kecil','Tidak ada, semuanya cukup dipercikkan'], e:'Keringanan percikan hanya untuk anak laki-laki yang belum mengonsumsi makanan penguat badan. Kencing anak perempuan dan khuntsa harus dibasuh.', m:4, h:'hlm. 43'},
  {q:'Najis apa yang dima’fu di pakaian dan badan sehingga sholat tetap sah?', o:['Darah dan nanah yang sedikit','Kencing yang sedikit','Liur anjing yang sedikit','Kotoran hewan yang halal dimakan'], e:'Menurut Fathul Qorib, tidak ada najis yang dima’fu kecuali darah dan nanah yang sedikit. Keduanya dima’fu di pakaian dan badan.', m:5, h:'hlm. 43'},
  {q:'Seekor lalat jatuh sendiri ke wadah air dan mati. Bagaimana hukum airnya?', o:['Tidak najis, karena lalat tidak memiliki darah yang mengalir','Najis dan harus dibuang','Najis kalau airnya sedikit','Najis dan wajib dibasuh tujuh kali'], e:'Bangkai binatang yang tidak memiliki darah mengalir, seperti lalat dan semut, tidak menajiskan wadah air yang dimasukinya bila jatuh sendiri.', m:5, h:'hlm. 43'},
  {q:'Wadah yang terkena liur anjing wajib dibasuh…', o:['tujuh kali, salah satunya dicampur debu suci','tiga kali dengan sabun','sekali dialirkan','tujuh kali tanpa debu'], e:'Wadah yang terkena liur anjing atau babi dibasuh tujuh kali dengan air suci yang menyucikan, dan salah satu basuhan dicampur debu suci yang merata. (Pengecualian: air mengalir yang keruh cukup tujuh kali mengalir tanpa debu.)', m:6, h:'hlm. 44'},
  {q:'Bangkai manakah yang hukumnya suci?', o:['Bangkai ikan, belalang, dan anak Adam','Bangkai ayam','Bangkai kambing','Bangkai anjing'], e:'Bangkai semuanya najis, kecuali bangkai ikan, belalang, dan anak Adam, yang suci.', m:6, h:'hlm. 44'},
  {q:'Najis mutawassithah (najis selain dari anjing dan babi) cukup dibasuh…', o:['sekali dengan air yang dialirkan; tiga kali lebih utama','tujuh kali secara wajib','tiga kali secara wajib','dua kali secara wajib'], e:'Untuk najis-najis yang lain, cukup dibasuh satu kali dengan air yang dialirkan pada najis tersebut. Tiga kali basuhan lebih utama.', m:7, h:'hlm. 45'},
  {q:'Khamer yang berubah menjadi cuka dengan sendirinya hukumnya…', o:['suci, dan wadahnya ikut suci','tetap najis','suci, tetapi wadahnya najis','suci hanya jika dicampur debu'], e:'Khamer yang menjadi cuka dengan sendirinya suci karena istihalah (perubahan sifat). Wadahnya ikut suci karena mengikuti khamernya.', m:7, h:'hlm. 45–46'},
  {q:'Membasuh barang dengan air yang sedikit, cara yang benar adalah…', o:['air didatangkan atau dialirkan ke barang yang terkena najis','barang dicelupkan ke dalam air yang sedikit','keduanya sama saja','cukup diusap dengan tangan basah'], e:'Untuk air yang sedikit, airlah yang harus didatangkan ke barang. Kalau barangnya yang dimasukkan ke air sedikit, barang itu tidak suci. Untuk air yang banyak, keduanya sama saja.', m:3, h:'hlm. 43'}
 ],
 haid:[
  {q:'Tiga macam darah yang keluar dari vagina perempuan menurut Fathul Qorib adalah…', o:['haid, nifas, dan istihadlah','haid, nifas, dan darah luka','haid, junub, dan nifas','haid, istihadlah, dan wiladah'], e:'Fathul Qorib membagi darah perempuan menjadi tiga: haid, nifas, dan istihadlah.', m:1, h:'hlm. 46'},
  {q:'Usia minimal seorang perempuan bisa mengeluarkan darah haid adalah…', o:['sembilan tahun hijriyah (qomariyah)','dua belas tahun hijriyah','sepuluh tahun hijriyah','tujuh tahun hijriyah'], e:'Minimal usia haid adalah sembilan tahun hijriyah atau qomariyah.', m:4, h:'hlm. 48'},
  {q:'Minimal masa haid adalah…', o:['sehari semalam (24 jam bersambung)','tiga hari tiga malam','enam jam','lima belas hari'], e:'Minimal masa haid adalah sehari semalam, yaitu dua puluh empat jam secara bersambung, dan darah tidak harus keluar deras terus-menerus.', m:2, h:'hlm. 47'},
  {q:'Maksimal masa haid adalah…', o:['lima belas hari lima belas malam','sepuluh hari sepuluh malam','tujuh hari tujuh malam','empat puluh hari'], e:'Maksimal masa haid adalah lima belas hari lima belas malam. Yang lumrah enam atau tujuh hari.', m:2, h:'hlm. 47'},
  {q:'Darah yang keluar melebihi masa maksimal haid disebut…', o:['darah istihadlah','darah nifas','darah haid yang panjang','darah wiladah'], e:'Jika darah keluar melebihi masa maksimal haid, darah tersebut disebut darah istihadlah.', m:2, h:'hlm. 47'},
  {q:'Maksimal masa nifas adalah…', o:['enam puluh hari (yang lumrah empat puluh hari)','empat puluh hari (yang lumrah enam puluh hari)','lima belas hari','sembilan puluh hari'], e:'Maksimal masa nifas enam puluh hari, dan yang lumrah empat puluh hari. Pegangannya penelitian.', m:3, h:'hlm. 47'},
  {q:'Minimal masa suci yang memisahkan dua haid adalah…', o:['lima belas hari','sehari semalam','tujuh hari','tiga puluh hari'], e:'Minimal masa suci yang memisahkan di antara dua haid adalah lima belas hari. Tidak ada batas maksimal masa suci.', m:3, h:'hlm. 47'},
  {q:'Berapa jumlah perkara yang haram sebab haid dan nifas?', o:['Delapan','Lima','Tiga','Sepuluh'], e:'Ada delapan perkara yang haram sebab haid dan nifas. Angka lima adalah jumlah perkara yang haram bagi orang junub.', m:5, h:'hlm. 48'},
  {q:'Darah yang keluar bersamaan dengan lahirnya bayi atau sebelumnya…', o:['tidak disebut darah nifas','disebut darah nifas','disebut darah nifas jika deras','disebut darah nifas jika lebih dari sehari'], e:'Nifas adalah darah yang keluar setelah melahirkan. Darah yang keluar bersamaan dengan bayi atau sebelumnya tidak disebut nifas.', m:1, h:'hlm. 46'},
  {q:'Manakah yang haram bagi orang junub?', o:['Berdiam diri di masjid','Lewat di masjid tanpa berdiam diri','Makan dan minum','Berbicara dengan orang lain'], e:'Berdiam diri di masjid termasuk lima perkara yang haram bagi orang junub. Lewat tanpa berdiam diri tidak haram, bahkan tidak makruh menurut pendapat al ashah.', m:6, h:'hlm. 49–50'},
  {q:'Tiga perkara yang haram bagi orang berhadats kecil adalah…', o:['sholat, thowaf, dan memegang atau membawa mushaf','sholat, puasa, dan thowaf','membaca Al Qur’an, sholat, dan thowaf','sholat, thowaf, dan masuk masjid'], e:'Orang yang berhadats kecil haram sholat, thowaf, serta memegang dan membawa mushaf.', m:7, h:'hlm. 50'},
  {q:'Bagi orang yang wathi’ saat darah haid keluar deras, yang disunnahkan adalah…', o:['bersedekah satu dinar','bersedekah setengah dinar','bersedekah dua dinar','tidak ada kesunnahan apa pun'], e:'Wathi’ saat darah keluar deras: disunnahkan sedekah satu dinar. Saat darah tidak deras: setengah dinar.', m:5, h:'hlm. 49'}
 ]
};
