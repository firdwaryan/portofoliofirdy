/* ============================================================
   i18n.js — sistem dua bahasa (Indonesia / English)

   Cara kerja:
   - Elemen HTML diberi atribut:
       data-i18n="kunci"              -> mengganti teks elemen
       data-i18n-html="kunci"         -> mengganti isi HTML elemen
       data-i18n-attr="title:kunci;aria-label:kunci2"
                                      -> mengganti atribut elemen
   - Teks yang dibuat lewat JavaScript memakai I18N.t('kunci', {var: nilai}).
   - Tombol ID/EN (atribut data-lang-toggle) mengganti bahasa; pilihan
     disimpan di localStorage ('porto_lang').
   - Setiap perubahan bahasa memicu event 'langchange' di document.
   - Isi kartu pengalaman, sertifikasi, proyek, dan organisasi sudah
     dua bahasa: kunci exp.N.*, cert.N.*, proj.N.*, org.N.* di kamus di bawah.
   ============================================================ */
(function () {
  'use strict';

  var SPAN = 'text-slate-900 dark:text-white font-semibold';

  var DICT = {
    id: {
      /* ---- meta ---- */
      'meta.title': 'Firdy Dwi Aryani — Portofolio',
      "meta.desc": "Portofolio Firdy Dwi Aryani, lulusan S1 Informatika yang melamar posisi IT Support dan Project Management. Pengalaman menangani gangguan IT di rumah sakit, membangun website, dan mengelola kepanitiaan.",

      /* ---- modal pembuka ---- */
      'modal.eyebrow': 'PORTOFOLIO',
      'modal.title': "<span class=\"block pb-0.5\"><span class=\"intro-line inline-block\">Ruang kecil untuk <span class=\"intro-hl font-extrabold\">karya</span></span></span><span class=\"block pb-1\"><span class=\"intro-line inline-block intro-hl font-extrabold\">dan hal yang saya tekuni.</span></span>",
      'modal.sub': "Saya Firdy, lulusan Informatika UIN Sunan Kalijaga Yogyakarta. Di sini, ada proyek yang saya kerjakan, pengalaman yang saya jalani, dan hal-hal yang saya pelajari sepanjang prosesnya.",
      'modal.cta': "Jelajahi karya dan pengalaman saya",
      'modal.hint': "Ikuti kunang-kunang kecil ini dan mari mulai menjelajah.",
      'tip.start': 'Klik untuk memulai',

      /* ---- header ---- */
      'nav.intro': 'Perkenalan',
      'nav.experience': 'Pengalaman',
      'nav.certifications': 'Sertifikasi',
      'nav.projects': 'Proyek',
      'nav.organisasi': "Organisasi",
      'nav.contact': 'Kontak',
      'aria.theme': 'Ganti tema',
      'aria.menu': 'Menu',
      'aria.lang': 'Ganti bahasa',
      'aria.langTitle': 'Bahasa: Indonesia (klik untuk English)',

      /* ---- hero ---- */
      'hero.hi': "HALO, SAYA FIRDY DWI ARYANI",
      'hero.line1': "Dari memahami kebutuhan",
      'hero.line2': "hingga mewujudkan solusi.",
      'hero.bio': "Pengalaman saya membentang dari pengembangan web dan dukungan IT hingga pengelolaan kanal digital dan koordinasi kegiatan. Dari setiap peran, saya belajar menata langkah kerja, memperhatikan detail, dan menyesuaikan pendekatan dengan kebutuhan yang ada. Saya menikmati proses mencari tahu apa yang perlu dilakukan, menentukan cara yang tepat, dan memastikan setiap pekerjaan terselesaikan dengan baik.",
      'hero.cv': 'Unduh CV ATS',
      'tip.cv': 'Unduh CV ATS (PDF)',
      'tip.linkedin': 'Profil LinkedIn',
      'tip.email': 'Kirim email',
      'tip.whatsapp': 'Hubungi via WhatsApp',
      'href.mail': "mailto:firdy.dwi@gmail.com?subject=Tawaran%20Pekerjaan",
      'href.waHero': "https://wa.me/6285894589454?text=Halo%20Firdy,%20saya%20tertarik%20dengan%20portofolio%20Anda",
      'href.waContact': "https://wa.me/6285894589454?text=Selamat%20pagi,%20saya%20ingin%20berdiskusi%20mengenai%20peluang%20kerja%20sama",
      'href.mailContact': 'mailto:firdy.dwi@gmail.com?subject=Peluang%20Kerja%20Sama',

      /* ---- pengalaman ---- */
      'exp.title': "Pengalaman Kerja",
      'exp.prev': 'Slide sebelumnya',
      'exp.next': 'Slide berikutnya',
      "exp.challenge": "Situasinya",
      "exp.solution": "Peran Saya",
      "exp.results": "Yang Saya Hasilkan",
      'exp.scope': "Tentang Programnya",
      'exp.achievements': "Hasilnya",
      "exp.hint": "Geser kartu, atau pakai tombol (>) dan tombol panah di keyboard",
      'label.skill': 'Skill',
      "doc.cert": "Lihat sertifikat",
      "doc.letter": "Lihat surat keterangan kerja",
      "doc.grad": "Lihat surat kelulusan",
      "doc.gradBtn": "Surat Kelulusan",
      "doc.transcript": "Transkrip Akhir",

      /* ---- sertifikasi ---- */
      'cert.title': 'Pelatihan & Sertifikasi',
      'cert.sub': "Program intensif 6 bulan untuk mendalami Full-Stack Web Development dan kesiapan industri.",

      /* ---- proyek ---- */
      'proj.title': "Proyek Unggulan",
      'proj.prev': 'Proyek sebelumnya',
      'proj.next': 'Proyek berikutnya',
      'proj.gallery': "Galeri proyek (klik untuk ganti tampilan):",
      'proj.photos': '3 Foto',
      'proj.need': "Tantangan & Kebutuhan",
      'proj.challenge': "Tantangan & Kebutuhan",
      'proj.solution': "Solusi & Arsitektur",
      'proj.impact': "Dampak & Kontribusi Nyata",
      'proj.liveDemo': "Buka Live Demo",

      /* ---- organisasi ---- */
      'org.title': "Kepanitiaan & Organisasi",
      'org.sub': "Memimpin divisi, mengatur anggaran, dan mengurus dokumen di berbagai acara kampus.",

      /* ---- kontak ---- */
      'contact.title': "Let’s Connect",
      'contact.sub': "Sedang membuka lowongan? Mari diskusikan bagaimana saya bisa berkontribusi untuk tim Anda.",
      'contact.cvSub': 'Ringkasan profesional, 1 halaman',
      'contact.cvOpen': 'Buka CV',
      'form.title': 'Kirim Pesan',
      'form.name': 'Nama Lengkap',
      'form.namePh': 'Nama lengkap Anda',
      'form.email': 'Email',
      'form.emailPh': 'nama@perusahaan.com',
      'form.message': 'Pesan',
      'form.messagePh': "Tulis posisi atau hal yang ingin dibahas...",
      'form.send': 'Kirim Pesan',
      'form.sending': "Mengirim...",
      'form.sent': "Pesan terkirim. Terima kasih sudah menghubungi saya.",

      /* ---- navigasi scroll ---- */
      'scroll.nav': 'Navigasi scroll halaman',
      'scroll.top': 'Ke paling atas',
      'scroll.bottom': 'Ke paling bawah',

      /* ---- titik navigasi section (depth.js) ---- */
      'dots.intro': 'Profil',
      'dots.experience': 'Pengalaman',
      'dots.certifications': 'Sertifikasi',
      'dots.projects': 'Proyek',
      'dots.organisasi': "Organisasi",
      'dots.contact': 'Kontak',

      /* ---- toast ---- */
      'toast.dark': 'Mode gelap diaktifkan',
      'toast.light': 'Mode terang diaktifkan',
      'toast.lang': 'Bahasa diubah ke Indonesia',

      /* ---- lalat pemandu ---- */
      'fly.welcome': 'Selamat datang. Silakan gulir ke bawah.',
      'fly.skip': 'Lewati panduan \u2192',
      'fly.onb.hello': "Hai! Aku kunang-kunang kecil yang bakal menemanimu menjelajahi portofolio ini. Siap berkeliling?",
      'fly.where': "Mau lanjut ke bagian mana?",
      'fly.end': "Selesai deh tur kita! Terima kasih sudah ikut menjelajah.",
      'chip.next': 'Lanjut \u2192',
      "chip.contact": "Hubungi saya",
      "chip.more": "Ceritakan lebih lanjut",
      'chip.top': 'Kembali ke atas',
      'chip.whatsapp': 'WhatsApp',
      'chip.email': 'Email',
      'chip.linkedin': 'LinkedIn',
      'fly.further.down': " Ada di bawah. Gulir ↓",
      'fly.further.up': " Ada di atas. Gulir ↑",
      'fly.exp.fallback': "Baca lebih lanjut tentang peran dan pekerjaan yang ditangani di sini.",
      'fly.exp.head': 'Pengalaman {i} dari {n}: {title}',
      "fly.exp.result": "Hasil utama: {text}",
      'fly.exp.read': "Ingin tahu lebih detail? Lihat situasi, peran, dan hasil dari pengalaman ini.",
      'fly.exp.guideNext': "Sudah selesai membaca? Tekan tombol (>) untuk lanjut ke pengalaman berikutnya.",
      'fly.exp.guideLast': "Itu dia pengalaman kerjanya! Selanjutnya, kita lihat pelatihan dan sertifikasi Firdy.",
      'fly.intro.read': "Di sini kamu bisa mengenal Firdy secara singkat. Ada juga tombol untuk mengunduh CV dan tautan ke LinkedIn, email, serta WhatsApp.",
      'fly.onb.theme': "Sebelum mulai, aku mau tunjukkan sesuatu!",
      'fly.onb.themeDone': "Bisa terang, bisa gelap. Pilih yang paling nyaman buatmu, ya! Aku kembalikan dulu.",
      'fly.onb.themeBack': "Oh, ada satu hal lagi!",
      'fly.onb.lang': "Portofolio ini juga bisa dinikmati dalam dua bahasa!",
      'fly.onb.langDone': "Bahasa Indonesia atau English, pilih yang paling nyaman buatmu. Aku kembalikan dulu, ya!",
      'fly.onb.langBack': "Nah, sekarang kita kenalan dengan pemilik portofolio ini!",
      'fly.intro.guide': "Gunakan tombol ↑ dan ↓ di sisi kanan untuk berpindah halaman. Tekan ↓ untuk melihat pengalaman kerja.",
      'fly.cert.read': "Di sini kamu bisa melihat sertifikasi Firdy dan mengunduh sertifikat yang tersedia.",
      'fly.cert.guide': "Tekan tombol ↓ di sisi kanan untuk melihat proyek unggulan.",
      'fly.proj.read': "Ada {n} proyek di sini. Geser kartu atau gunakan tombol panah untuk melihat semuanya. Kamu juga bisa mengeklik foto kecil untuk mengganti tampilan.",
      'fly.proj.guide': "Tiga proyek sudah kamu lihat. Sekarang, kita intip pengalaman Firdy di kepanitiaan dan organisasi!",
      'fly.org.read': "Di bagian ini, kamu bisa melihat pengalaman Firdy dalam kepanitiaan dan organisasi.",
      'fly.org.guide': "Tekan tombol ↓ di sisi kanan untuk menuju halaman kontak.",
      'fly.contact.read': "Kamu bisa menghubungi Firdy lewat WhatsApp, email, atau LinkedIn. Formulir di sisi kanan juga bisa digunakan.",
      'fly.contact.guide': "Pilih cara yang paling nyaman untuk menghubungi Firdy. Untuk balasan lebih cepat, coba tombol WhatsApp.",
      "fly.skill.every": "{name} muncul di setiap pengalaman di sini. Ini keahlian andalan saya.",
      "fly.skill.some": "{name} dipakai di {n} dari {total} pengalaman di sini.",

      /* ---- isi kartu (dari CV: Urutan Reverse-Chronological) ---- */
      /* 1. UIN Sunan Kalijaga (Terbaru: Feb 2026 — Agt 2026) */
      "exp.1.title": "Anggota Tim Pengelola Website, Email &amp; Media Sosial",
      "exp.1.company": "Fakultas Sains dan Teknologi, UIN Sunan Kalijaga",
      "exp.1.period": "Feb 2026 &mdash; Agt 2026",
      "exp.1.p1": "Informasi dan publikasi resmi Fakultas Sains dan Teknologi bagi mahasiswa, akademisi, dan publik membutuhkan tata kelola komunikasi yang terpusat, konsisten, dan akurat di setiap kanal.",
      "exp.1.p2": "Mengemban tanggung jawab operasional dalam pengelolaan <strong>website resmi</strong> fakultas, korespondensi <strong>email kelembagaan</strong>, dan publikasi <strong>media sosial</strong> fakultas secara terintegrasi.",
      "exp.1.b1": "<strong>Tiga Kanal Komunikasi Resmi:</strong> Mengelola pembaruan konten website, alur korespondensi email, dan media sosial fakultas secara konsisten dan terkoordinasi.",
      "exp.1.b2": "<strong>Apresiasi Sertifikat Resmi Dekan:</strong> Dianugerahi Sertifikat Penghargaan resmi oleh Dekan FST atas dedikasi dan kontribusi aktif selama Semester Genap TA 2025/2026.",

      /* 2. Vinix Seven Aurum (Agt 2025 — Des 2025) */
      "exp.2.title": "Junior Web Developer &amp; UI/UX Designer (Intern)",
      "exp.2.company": "PT Vinix Seven Aurum",
      "exp.2.period": "Agt 2025 &mdash; Des 2025",
      "exp.2.p1": "Wisatawan di Bali sering kesulitan menemukan tempat makan yang sesuai preferensi mereka—baik mencari kuliner halal yang terverifikasi, kuliner khas non-halal, tempat dengan pemandangan terbaik, maupun tempat terdekat dengan ulasan jujur.",
      "exp.2.p2": "Berkolaborasi dalam tim pengembang magang di PT Vinix Seven Aurum untuk membangun platform direktori kuliner: merancang prototipe antarmuka di <strong>Figma</strong>, merancang database <strong>MySQL</strong>, dan mengembangkan fitur web berbasis <strong>PHP</strong> (pemisahan kategori halal &amp; non-halal, sistem ulasan/rating, bookmark favorit, dan navigasi peta rute).",
      "exp.2.b1": "<strong>Evaluasi Kinerja 'Sangat Baik':</strong> Seluruh target pengembangan platform selesai tepat waktu dan dinilai \"Sangat Baik\" oleh manajemen perusahaan.",
      "exp.2.b2": "<strong>Kolaborasi Desain &amp; Teknis Tim:</strong> Bersama sesama rekan magang menerjemahkan kebutuhan bisnis menjadi antarmuka responsif dan alur sistem data yang rapi.",
      "exp.2.b3": "<strong>Fitur Interaktif Lengkap:</strong> Berhasil mengimplementasikan kurasi multi-kategori (halal &amp; non-halal), sistem rating &amp; ulasan pengunjung, daftar favorit, serta peta rute ke lokasi.",

      /* 3. KAI Medika (Jul 2025 — Agt 2025) */
      "exp.3.title": "Staf Magang IT Support (First Responder)",
      "exp.3.company": "PT KAI Medika Indonesia &bull; Brawijaya Hospital Tangerang",
      "exp.3.period": "Jul 2025 &mdash; Agt 2025",
      "exp.3.p1": "Di lingkungan rumah sakit yang beroperasi cepat, kelancaran workstation komputer, printer resep/label rekam medis, dan stabilitas jaringan sangat krusial bagi keselamatan pelayanan pasien. Kendala teknis sekecil apa pun harus ditangani secara tanggap.",
      "exp.3.p2": "Menjadi <strong>first responder</strong> dalam menerima dan mendiagnosis seluruh kendala IT pengguna: mengelola alur <strong>sistem ticketing</strong>, troubleshooting on-site ke unit poliklinik/administrasi maupun jarak jauh via <strong>AnyDesk</strong>, serta berkoordinasi dengan vendor saat membutuhkan pergantian suku cadang.",
      "exp.3.b1": "<strong>Sekitar 9 tiket per hari</strong> saya tangani sebagai kontak pertama, dari keluhan ringan sampai gangguan perangkat.",
      "exp.3.b2": "<strong>Menguasai beragam perangkat:</strong> printer, komputer dengan berbagai sistem operasi, dan koordinasi dengan vendor saat perlu eskalasi.",
      "exp.3.b3": "<strong>Penanganan jarak jauh dengan AnyDesk</strong> dari laptop, dan setiap kasus tercatat rapi di ticketing.",

      /* 4. Diskominfo Lebak (Jul 2024 — Agt 2024) */
      "exp.4.title": "Magang Keamanan Siber dan Persandian",
      "exp.4.company": "Diskominfo Kabupaten Lebak",
      "exp.4.period": "Jul 2024 &mdash; Agt 2024",
      "exp.4.p1": "Kebutuhan digitalisasi birokrasi pemerintahan daerah menuntut keabsahan dokumen kedinasan, keamanan otentikasi data, dan kepatuhan standar persandian agar terhindar dari pemalsuan dokumen elektronik.",
      "exp.4.p2": "Mendukung operasional teknis penerbitan dan verifikasi <strong>sertifikat elektronik / tanda tangan digital (TTE)</strong> bekerja sama dengan Balai Sertifikasi Elektronik (BSrE BSSN), memvalidasi kelayakan berkas kedinasan aparatur ASN, serta mendampingi sosialisasi keamanan siber.",
      "exp.4.b1": "<strong>Verifikasi Tanda Tangan Digital BSrE:</strong> Memvalidasi dan membantu penerbitan sertifikat digital resmi bagi pegawai ASN di lingkungan instansi daerah.",
      "exp.4.b2": "<strong>Kepatuhan Standar Persandian:</strong> Memastikan seluruh dokumen elektronik kedinasan tervalidasi sesuai prosedur tata kelola keamanan informasi resmi.",
      "exp.4.p1": "Wisatawan muslim sering kesulitan menemukan tempat makan halal di Bali.",
      "exp.4.p2": "Saya merancang UI/UX sekaligus membangun website <strong>Bali Kuliner Finder</strong> dengan <strong>PHP</strong>, sendirian selama 5 bulan.",
      "exp.4.b1": "<strong>Semua tugas selesai</strong> dan dinilai &ldquo;sangat baik&rdquo; oleh perusahaan.",
      "exp.4.b2": "<strong>Satu orang, dua peran:</strong> dari rancangan UI/UX sampai website berjalan.",
      "exp.4.b3": "<strong>Proyek nyata perusahaan,</strong> belum dipublikasikan karena milik perusahaan.",
      "cert.1.title": "Coding Camp powered by DBS Foundation",
      "cert.1.meta": "Dicoding Academy x DBS Foundation 2025",
      "cert.track": "Full-Stack Web Development Track (910 Jam Pembelajaran Terakreditasi)",
      "tip.cert1": "Unduh sertifikat Coding Camp powered by DBS Foundation",
      "cert.s1": "Jam Intensif",
      "cert.s2.n": "12",
      "cert.s2": "Modul Kurikulum",
      "cert.s3": "Bulan Pelatihan",
      "cert.s4": "Kehadiran Penuh",
      "cert.badge": "Lulusan Terverifikasi Resmi",
      "cert.1.pitch": "Program beasiswa 6 bulan dari DBS Foundation dan Dicoding Academy dengan total 910 jam belajar. Kurikulumnya mencakup pengembangan Full-Stack Web dari hulu ke hilir: dasar logika, front-end modern, REST API dengan Node.js, dasar cloud AWS, hingga komunikasi bahasa Inggris bisnis. Setiap modul diselesaikan lewat proyek coding langsung yang diperiksa oleh tim reviewer Dicoding.",
      "cert.skills.title": "Keahlian Teruji:",
      "cert.docs.title": "Berkas Kredensial Resmi",
      "cert.vault.all": "Semua Sertifikat (14)",
      "cert.vault.grad": "Kelulusan & Transkrip (2)",
      "cert.vault.fe": "Front-End & Web (4)",
      "cert.vault.be": "JavaScript & Back-End (3)",
      "cert.vault.found": "Cloud, AI & Soft Skills (5)",
      "cert.vault.search": "Cari modul, skill, atau materi...",
      "cert.vault.view": "Buka Dokumen",
      "cert.vault.download": "Unduh PDF",
      "cert.vault.dirTitle": "12 Modul Pembelajaran",
      "cert.vault.inspectorTitle": "Inspektor Dokumen Resmi",
      "cert.vault.verified": "Lulusan Resmi Terverifikasi",
      "cert.vault.hint": "Pilih berkas dari silabus untuk melihat inspeksi detail dan mengunduh berkas fisik.",
      "cert.fan.all": "Semua Berkas (24)",
      "cert.fan.dbs": "Beasiswa DBS x Dicoding (14)",
      "cert.fan.work": "Pengalaman Kerja & Magang (4)",
      "cert.fan.org": "Organisasi & Kampus (5)",
      "cert.fan.view": "Lihat Dokumen",
      "cert.fan.download": "Unduh PDF",
      "cert.fan.hint": "Pilih atau geser kartu di kipas untuk melihat & mengunduh berkas",
      "cert.fan.allList": "Pilihan Lengkap Seluruh 24 Berkas",
      "cert.fan.selected": "Sedang Dipilih",
      "cert.tab.grad": "Kelulusan & Transkrip (2)",
      "cert.tab.fe": "Front-End & Web (4)",
      "cert.tab.be": "JavaScript & Back-End (3)",
      "cert.tab.found": "Cloud, AI & Soft Skills (5)",
      "cert.doc1.t": "Sertifikat Kelulusan Utama",
      "cert.doc1.d": "Sertifikat kelulusan beasiswa 6 bulan alur Full-Stack Web Development, mencakup 910 jam materi teori dan praktik coding.",
      "cert.doc2.t": "Surat Keterangan Kelulusan",
      "cert.doc2.d": "Dokumen Keterangan Resmi DBS Foundation",
      "cert.doc3.t": "Transkrip Nilai Akademik",
      "cert.doc3.d": "Daftar nilai dari 12 modul teknis dan soft skills yang diselesaikan dengan kehadiran 100% serta seluruh tugas proyek dinyatakan lulus.",
      "cert.toggle.btn": "Buka Menu 12 Sertifikat Modul Silabus",
      "cert.sup.title": "12 Sertifikat Modul Terakreditasi Lengkap",
      "cert.sup.sub": "Setiap modul terverifikasi resmi oleh Dicoding Academy, AWS, dan The British Institute.",
      "cert.g1": "Front-End & Web",
      "cert.g2": "JavaScript & Back-End",
      "cert.g3": "Fondasi & Pelengkap",
      "doc.certBtn": "Sertifikat",
      "proj.1.name": "Sistem Penyusunan Dokumen SRS (Multi-LLM)",
      "proj.1.tagline": "Platform Pemandu Penyusunan Dokumen Spesifikasi Software Standar IEEE Berbasis Multi-LLM",
      "proj.1.period": "Skripsi S1 &bull; 2026",
      "proj.1.title": "Sistem Penyusunan SRS Berbasis Multi-LLM",
      "proj.1.meta": "Skripsi S1 &bull; 2026",
      "proj.1.tag": "Full-Stack &amp; AI",
      "proj.1.alt": "Tangkapan layar Sistem Penyusunan SRS dengan Dukungan Multi-LLM",
      "proj.1.need": "Banyak pengembang dan mahasiswa yang kebingungan memahami struktur baku dokumen Software Requirements Specification (SRS) standar resmi IEEE (seperti IEEE 830). Menulis dari nol memakan waktu berhari-hari, formatnya rawan tidak teratur, dan jika memakai AI biasa tanpa aturan ketat, AI sering berhalusinasi dan menghasilkan poin teknis yang melenceng dari kebutuhan nyata.",
      "proj.1.role": "Full-Stack Developer & Prompt Engineer (Solo Project)",
      "proj.1.sol": "Membangun aplikasi web full-stack mandiri (JavaScript &amp; Node.js Express REST API) yang berfungsi sebagai sistem pemandu langkah demi langkah: memandu pengguna mendefinisikan kebutuhan sistem, membatasi AI dengan guardrail dan aturan prompt ketat agar tidak berhalusinasi, serta fleksibel dihubungkan ke model AI mana pun (OpenAI, Claude, Gemini, DeepSeek, Groq, hingga LLM lokal) dengan konfigurasi API key langsung dari UI.",
      "proj.1.ph1": "Foto 1: Beranda & Alur Kerja",
      "proj.1.lb1": "1. Beranda",
      "proj.1.ph2": "Foto 2: Pilihan Provider LLM",
      "proj.1.lb2": "2. Provider LLM",
      "proj.1.ph3": "Foto 3: Hasil Generasi Dokumen SRS",
      "proj.1.lb3": "3. Hasil SRS",
      "proj.1.b1": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Hasil Standar IEEE &amp; Terstruktur:</strong> Memandu pengguna dari nol hingga menghasilkan dokumen SRS lengkap yang rapi dan konsisten sesuai standar resmi industri.",
      "proj.1.b2": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">AI Terarah Tanpa Halusinasi:</strong> Aturan prompt ketat memastikan AI hanya menghasilkan spesifikasi fungsional dan teknis yang realistis, logis, dan dapat dieksekusi tim developer.",
      "proj.1.b3": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Model-Agnostic &amp; Ekspor Instan:</strong> Bebas memakai model cloud berbayar, gratisan, maupun model lokal offline, lalu mengekspor hasilnya langsung ke format DOCX dan Markdown.",
      "proj.2.name": "Bali Kuliner Finder",
      "proj.2.tagline": "Platform Direktori &amp; Panduan Kuliner Bali Interaktif dengan Kurasi Kategori &amp; Navigasi Rute",
      "proj.2.role": "Web Developer & UI Designer (Tim Magang)",
      "proj.2.period": "Magang Tim Vinix &bull; 2025",
      "proj.2.title": "Bali Kuliner Finder &bull; Platform Komersial Kurasi Kuliner Halal di Bali",
      "proj.2.meta": "PT Vinix Seven Aurum &bull; Agt 2025 &mdash; Des 2025",
      "proj.2.tag": "Web App &amp; UI/UX",
      "proj.2.alt": "Tangkapan layar platform komersial Bali Kuliner Finder",
      "proj.2.need": "Wisatawan di Bali sering kesulitan menemukan tempat makan yang tepat sesuai preferensi mereka—baik mencari kuliner halal yang terverifikasi, kuliner khas non-halal, tempat dengan pemandangan terindah (sunset/alam), maupun tempat terdekat dengan ulasan jujur.",
      "proj.2.sol": "Berkolaborasi bersama sesama tim pengembang magang di PT Vinix Seven Aurum untuk membangun platform direktori kuliner: merancang prototipe antarmuka interaktif di Figma, merancang database relasional MySQL, mengembangkan backend PHP, serta membuat sistem filter multi-kategori, fitur ulasan &amp; favorit pengguna, dan peta navigasi rute.",
      "proj.2.ph1": "Foto 1: Beranda & Pencarian Cepat",
      "proj.2.lb1": "1. Beranda & Cari",
      "proj.2.ph2": "Foto 2: Hasil Pencarian & Filter Halal",
      "proj.2.lb2": "2. Hasil Pencarian",
      "proj.2.ph3": "Foto 3: Detail Merchant & Jam Buka",
      "proj.2.lb3": "3. Detail Merchant",
      "proj.2.ph4": "Foto 4: Peta Lokasi & Rute Restoran",
      "proj.2.lb4": "4. Peta Lokasi",
      "proj.2.photos": "4 Foto",
      "proj.2.b1": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Kategori Jelas &amp; Filter Lengkap:</strong> Memisahkan section Halal dan Non-Halal secara transparan, serta menyediakan filter cerdas berdasarkan view terindah, rating tertinggi, favorit, dan jarak terdekat.",
      "proj.2.b2": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Interaksi Pengguna Lengkap:</strong> Pengunjung dapat memberi rating bintang, menulis ulasan pengalaman bersantap, serta menyimpan restoran favorit ke daftar pribadi.",
      "proj.2.b3": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Navigasi Peta Rute Langsung:</strong> Terintegrasi peta interaktif agar pengguna dapat langsung membuka petunjuk arah jalan ke lokasi tempat makan dari browser.",
      "proj.3.name": "BorobudurTales",
      "proj.3.tagline": "Aplikasi Web Edukasi Budaya &amp; Identifikasi Relief Karmawibhangga Berbasis Kamera AI",
      "proj.3.role": "Front-End Developer (Tim Capstone)",
      "proj.3.period": "Coding Camp &bull; 2025",
      "proj.3.title": "BorobudurTales &bull; Web Edukasi Relief Berbasis AI",
      "proj.3.meta": "Capstone Team &bull; 2025",
      "proj.3.tag": "Front-End &amp; AI",
      "proj.3.alt": "Tangkapan layar proyek web BorobudurTales",
      "proj.3.need": "Banyak wisatawan datang ke Candi Borobudur hanya menjadikannya latar foto estetik tanpa memahami kisah dan nilai filosofis di balik reliefnya. Di internet pun, informasi makna tiap panel relief Karmawibhangga sangat terbatas dan tercerai-berai, membuat pengunjung sulit belajar secara mandiri.",
      "proj.3.sol": "Berkolaborasi dalam tim Capstone lintas disiplin (Web Dev &amp; Machine Learning) sebagai Full-Stack Developer: merancang RESTful API terstandarisasi untuk mengintegrasikan model Machine Learning tim, membangun antarmuka responsif (<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Tailwind CSS</strong> &amp; <strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Vite</strong>), integrasi input kamera real-time, serta sistem autentikasi (<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Laravel Breeze</strong> + <strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Sanctum</strong>) dengan Role-Based Access Control.",
      "proj.3.ph1": "Foto 1: Unggah Gambar & Kamera",
      "proj.3.lb1": "1. Unggah & Kamera",
      "proj.3.ph2": "Foto 2: Narasi Hasil Prediksi",
      "proj.3.lb2": "2. Narasi Prediksi",
      "proj.3.ph3": "Foto 3: Pustaka Kisah Budaya",
      "proj.3.lb3": "3. Pustaka Kisah",
      "proj.3.b1": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Ubah 'Sekadar Foto' Jadi Edukasi:</strong> Mengubah pengalaman berkunjung menjadi interaktif; pengunjung cukup membidik kamera ke relief untuk langsung membaca kisah dan makna moral di baliknya.",
      "proj.3.b2": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Pustaka Kisah &amp; Pencarian Interaktif:</strong> Menyediakan katalog digital lengkap relief Karmawibhangga yang dapat dicari lewat teks maupun dicocokkan via input gambar.",
      "proj.3.b3": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Performa Mobile Front-End yang Cepat:</strong> Mengoptimasi performa antarmuka web di perangkat mobile agar proses jepret kamera, kompresi foto, dan tampilan cerita berjalan ringan dan responsif.",
      "org.1.period": "Sep 2024 &mdash; Okt 2024",
      "org.1.role": "Koordinator Logistik",
      "org.1.context": "Symphony of Saintek 20th Extravaganza <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">FST UIN Sunan Kalijaga</span>",
      "org.1.title": "Koordinator Logistik &bull; Symphony of Saintek 20th Extravaganza",
      "org.1.desc": "Mengawal kesiapan operasional perayaan Dies Natalis Fakultas Sains dan Teknologi melalui perencanaan kebutuhan, pengadaan perlengkapan, pencarian vendor, serta koordinasi tim dan mitra eksternal. Berhasil memperoleh dukungan Indosat dan mengoordinasikan pemenuhan kebutuhan acara dengan mempertimbangkan kebutuhan operasional dan anggaran.",
      "org.2.period": "Agt 2023 &mdash; Okt 2023",
      "org.2.role": "Bendahara",
      "org.2.context": "Infonite (Informatics Night &amp; Orientation) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">HMPS Informatika UIN Sunan Kalijaga</span>",
      "org.2.title": "Bendahara &bull; Infonite &mdash; Informatics Night and Orientation, HMPS Informatika",
      "org.2.desc": "Bertanggung jawab atas perencanaan dan pengendalian anggaran kegiatan malam keakraban serta orientasi mahasiswa. Menetapkan batas biaya pengadaan, meninjau setiap pengajuan pengeluaran sebelum memberikan persetujuan, dan memastikan transaksi tercatat serta dapat dipertanggungjawabkan melalui laporan keuangan.",
      "org.3.period": "Apr 2023 &mdash; Nov 2023",
      "org.3.role": "Sekretaris",
      "org.3.context": "UIN Informatic Competition 5.0 (UINIC) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">HMPS Informatika UIN Sunan Kalijaga</span>",
      "org.3.title": "Sekretaris &bull; UIN Informatic Competition 5.0 (UINIC)",
      "org.3.desc": "Menjaga keteraturan administrasi dan arus informasi dalam penyelenggaraan kompetisi Informatika yang melibatkan peserta eksternal dan beberapa tahapan perlombaan. Mendokumentasikan rapat dan keputusan, memastikan informasi tersampaikan kepada seluruh anggota, serta menangani administrasi sertifikat peserta.",
      "org.4.period": "Okt 2024 &mdash; Des 2024",
      "org.4.role": "Humas",
      "org.4.context": "Sport and Art Informatics (Sportif) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">HMPS Informatika UIN Sunan Kalijaga</span>",
      "org.4.title": "Humas &bull; Sport and Art Informatics (Sportif), HMPS Informatika",
      "org.4.desc": "Menjembatani kebutuhan operasional berbagai kompetisi olahraga, seni, dan gaming dengan ketersediaan vendor serta anggaran kegiatan. Mencari penyedia yang sesuai untuk kebutuhan acara dan menjajaki dukungan sponsor agar pelaksanaan kegiatan dapat direncanakan secara realistis.",
      "org.5.period": "Agt 2022 &mdash; Sep 2022",
      "org.5.role": "Humas",
      "org.5.context": "Welcoming Ceremony <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">DEMA &amp; SEMA UIN Sunan Kalijaga</span>",
      "org.5.title": "Humas &bull; Welcoming Ceremony, DEMA &amp; SEMA UIN Sunan Kalijaga",
      "org.5.desc": "Mengupayakan dukungan eksternal untuk memenuhi kebutuhan acara melalui pendekatan kepada calon sponsor dan mitra. Berhasil memperoleh sekitar 10 dukungan dalam beragam bentuk, mulai dari potongan harga kebutuhan acara hingga voucher dan fasilitas bagi pemenang.",
      "org.6.period": "24 Jul 2024 &mdash; 2 Okt 2024",
      "org.6.role": "Staf Publikasi, Desain & Dokumentasi",
      "org.6.context": "Konferensi Integrasi &amp; Interkoneksi Islam dan Sains (KIIS) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">FST UIN Sunan Kalijaga</span>",
      "org.6.title": "Staf Publikasi, Desain, dan Dokumentasi &bull; Konferensi Integrasi dan Interkoneksi Islam dan Sains (KIIS), FST UIN Sunan Kalijaga",
      "org.6.desc": "Menangani kebutuhan komunikasi visual konferensi tingkat fakultas yang terbuka bagi peserta eksternal, dari materi promosi dan perlengkapan publikasi hingga materi peserta dan merchandise. Melanjutkan dokumentasi pascaacara melalui produksi film serta publikasi rangkuman kegiatan di Instagram, YouTube, dan website konferensi.",
      "org.7.period": "Feb 2024 &mdash; Jan 2025",
      "org.7.role": "Staf Media dan Jaringan",
      "org.7.context": "Forum Kajian Islam dan Sains Teknologi (FKIST) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.7.title": "Staf Media dan Jaringan &bull; Forum Kajian Islam dan Sains Teknologi (FKIST)",
      "org.7.desc": "Mengelola operasional empat kanal digital organisasi (website, Facebook, Instagram, dan YouTube) melalui pengembangan serta penyuntingan website dan pengelolaan konten lintas platform. Selain menjaga keberlangsungan publikasi digital organisasi, menyelenggarakan pelatihan multimedia dan pengelolaan media sosial untuk anggota serta masyarakat umum.",
      "org.8.period": "Jan 2023 &mdash; Jan 2024",
      "org.8.role": "Staf Departemen Minat dan Bakat",
      "org.8.context": "Himpunan Mahasiswa Program Studi Informatika <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.8.title": "Staf Departemen Minat dan Bakat &bull; Himpunan Mahasiswa Program Studi Informatika",
      "org.8.desc": "Mengoordinasikan kegiatan rutin lintas minat mahasiswa, mulai dari olahraga hingga seni dan rekreasi, dengan menyelaraskan jadwal, ketersediaan tempat, dan partisipasi anggota. Menjaga agar program departemen tetap berjalan sebagai wadah kegiatan mahasiswa di luar akademik."
    },

    en: {
      'meta.title': 'Firdy Dwi Aryani — Portfolio',
      "meta.desc": "Portfolio of Firdy Dwi Aryani, an Informatics graduate applying for IT Support and Project Management roles. Experience handling IT issues in a hospital, building websites, and running event committees.",

      'modal.eyebrow': 'PORTFOLIO',
      'modal.title': "<span class=\"block pb-0.5\"><span class=\"intro-line inline-block\">A small space for <span class=\"intro-hl font-extrabold\">my work</span></span></span><span class=\"block pb-1\"><span class=\"intro-line inline-block intro-hl font-extrabold\">and what I pursue.</span></span>",
      'modal.sub': "I’m Firdy, an Informatics graduate from UIN Sunan Kalijaga Yogyakarta. Here, you’ll find the projects I’ve worked on, the experience I’ve gained, and the things I’ve learned along the way.",
      'modal.cta': "Explore my work and experience",
      'modal.hint': "Follow this little firefly and let’s start exploring.",
      'tip.start': 'Click to start',

      'nav.intro': 'About',
      'nav.experience': 'Experience',
      'nav.certifications': 'Certifications',
      'nav.projects': 'Projects',
      'nav.organisasi': "Organizations",
      'nav.contact': 'Contact',
      'aria.theme': 'Toggle theme',
      'aria.menu': 'Menu',
      'aria.lang': 'Change language',
      'aria.langTitle': 'Language: English (click for Indonesian)',

      'hero.hi': "HELLO, I’M FIRDY DWI ARYANI",
      'hero.line1': "From understanding needs",
      'hero.line2': "to building solutions.",
      'hero.bio': "My experience spans web development and IT support to managing digital channels and coordinating activities. From each role, I’ve learned to organize my work steps, pay attention to detail, and adapt my approach to what’s needed. I enjoy figuring out what needs to be done, choosing the right way to do it, and making sure every task is completed well.",
      'hero.cv': 'Download ATS CV',
      'tip.cv': 'Download ATS CV (PDF)',
      'tip.linkedin': 'LinkedIn profile',
      'tip.email': 'Send an email',
      'tip.whatsapp': 'Message on WhatsApp',
      'href.mail': "mailto:firdy.dwi@gmail.com?subject=Job%20Opportunity",
      'href.waHero': "https://wa.me/6285894589454?text=Hello%20Firdy,%20I%27m%20interested%20in%20your%20portfolio",
      'href.waContact': "https://wa.me/6285894589454?text=Good%20morning,%20I%27d%20like%20to%20discuss%20a%20collaboration%20opportunity",
      'href.mailContact': 'mailto:firdy.dwi@gmail.com?subject=Collaboration%20Opportunity',

      'exp.title': "Work Experience",
      'exp.prev': 'Previous slide',
      'exp.next': 'Next slide',
      "exp.challenge": "The Situation",
      "exp.solution": "My Role",
      "exp.results": "What I Delivered",
      'exp.scope': "About the Program",
      'exp.achievements': "The Result",
      'exp.hint': "Swipe the card, or use the (>) button and the keyboard arrow keys",
      'label.skill': 'Skills',
      "doc.cert": "View certificate",
      "doc.letter": "View employment letter",
      "doc.grad": "View graduation letter",
      "doc.gradBtn": "Graduation Letter",
      "doc.transcript": "Final Transcript",

      'cert.title': 'Training & Certifications',
      'cert.sub': "A 6-month intensive program focused on full-stack web development and industry readiness.",

      'proj.title': "Featured Projects",
      'proj.prev': 'Previous project',
      'proj.next': 'Next project',
      'proj.gallery': "Project gallery (click to switch view):",
      'proj.photos': '3 Photos',
      'proj.need': "Challenge & Need",
      'proj.challenge': "Challenge & Need",
      'proj.solution': "Technical Architecture",
      'proj.impact': "Impact & Key Contributions",
      'proj.liveDemo': "Open Live Demo",

      'org.title': "Committees & Organizations",
      'org.sub': "Leading divisions, managing budgets, and keeping records across campus events.",

      'contact.title': "Let’s Connect",
      'contact.sub': "Hiring? Let’s talk about how I can help your team.",
      'contact.cvSub': 'Professional summary, 1 page',
      'contact.cvOpen': 'Open CV',
      'form.title': 'Send a Message',
      'form.name': 'Full Name',
      'form.namePh': 'Your full name',
      'form.email': 'Email',
      'form.emailPh': 'name@company.com',
      'form.message': 'Message',
      'form.messagePh': "Write the position or topic you’d like to discuss...",
      'form.send': 'Send Message',
      'form.sending': "Sending...",
      'form.sent': "Message sent. Thank you for reaching out.",

      'scroll.nav': 'Page scroll navigation',
      'scroll.top': 'Back to top',
      'scroll.bottom': 'Go to bottom',

      'dots.intro': 'Profile',
      'dots.experience': 'Experience',
      'dots.certifications': 'Certifications',
      'dots.projects': 'Projects',
      'dots.organisasi': "Organizations",
      'dots.contact': 'Contact',

      'toast.dark': 'Dark mode enabled',
      'toast.light': 'Light mode enabled',
      'toast.lang': 'Language set to English',

      'fly.welcome': 'Welcome. Please scroll down.',
      'fly.skip': 'Skip guide \u2192',
      'fly.onb.hello': "Hi! I’m a little firefly, and I’ll be your guide through this portfolio. Ready to explore?",
      'fly.where': "Where shall we go next?",
      'fly.end': "And that’s our tour! Thanks for exploring the portfolio with me.",
      'chip.next': 'Next \u2192',
      "chip.contact": "Contact me",
      'chip.more': 'Tell me more',
      'chip.top': 'Back to top',
      'chip.whatsapp': 'WhatsApp',
      'chip.email': 'Email',
      'chip.linkedin': 'LinkedIn',
      'fly.further.down': " Further down. Scroll ↓",
      'fly.further.up': " Further up. Scroll ↑",
      'fly.exp.fallback': "Take a closer look at the role and work involved here.",
      'fly.exp.head': 'Experience {i} of {n}: {title}',
      "fly.exp.result": "Key result: {text}",
      'fly.exp.read': "Want more detail? Explore the situation, Firdy’s role, and the outcome.",
      'fly.exp.guideNext': "Finished reading? Press (>) to move on to the next experience.",
      'fly.exp.guideLast': "That covers Firdy’s work experience! Next, let’s look at her training and certifications.",
      'fly.intro.read': "Here’s a quick introduction to Firdy. You can also download her CV or find her on LinkedIn, email, and WhatsApp.",
      'fly.onb.theme': "Before we begin, let me show you something!",
      'fly.onb.themeDone': "Light or dark. Choose whichever feels most comfortable for you! Let me switch it back.",
      'fly.onb.themeBack': "Oh, there’s one more thing!",
      'fly.onb.lang': "This portfolio is also available in two languages!",
      'fly.onb.langDone': "English or Indonesian, choose whichever feels more comfortable for you. Let me switch it back!",
      'fly.onb.langBack': "Now, let’s meet the person behind this portfolio!",
      'fly.intro.guide': "Use the ↑ and ↓ buttons on the right to move between sections. Press ↓ to see the work experience section.",
      'fly.cert.read': "Here, you can explore Firdy’s certifications and download the available certificates.",
      'fly.cert.guide': "Press ↓ on the right to explore the featured projects.",
      'fly.proj.read': "There are {n} projects here. Swipe through the cards or use the arrow buttons to browse them all. Click a thumbnail to change the preview.",
      'fly.proj.guide': "That’s a look at Firdy’s projects. Now, let’s explore her experience in committees and student organizations.",
      'fly.org.read': "This section highlights Firdy’s experience in committees and student organizations.",
      'fly.org.guide': "Press ↓ on the right to head to the contact page.",
      'fly.contact.read': "You can reach Firdy via WhatsApp, email, or LinkedIn. You can also use the form on the right.",
      'fly.contact.guide': "Choose whichever way works best for you. For a quicker reply, try the WhatsApp button.",
      "fly.skill.every": "{name} appears in every experience here. It’s one of my core skills.",
      "fly.skill.some": "{name} is used in {n} of {total} experiences here.",

      /* ---- card content (from CV: Reverse-Chronological Order) ---- */
      /* 1. UIN Sunan Kalijaga (Most Recent: Feb 2026 — Aug 2026) */
      "exp.1.title": "Website, Email &amp; Social Media Management Team Member",
      "exp.1.company": "Faculty of Science and Technology, UIN Sunan Kalijaga",
      "exp.1.period": "Feb 2026 &mdash; Aug 2026",
      "exp.1.p1": "Official faculty announcements and academic communications for students and the public required centralized, reliable, and consistent multi-channel operations.",
      "exp.1.p2": "Entrusted with managing the faculty's <strong>official website</strong>, handling institutional <strong>email correspondence</strong>, and driving <strong>social media</strong> releases with consistent, validated messaging.",
      "exp.1.b1": "<strong>Three Synchronized Channels:</strong> Delivered timely updates across web, email, and social platforms with clear, verified messaging.",
      "exp.1.b2": "<strong>Dean's Certificate of Commendation:</strong> Honored with an official Certificate of Appreciation by the Dean of FST for dedicated service throughout the Even Semester AY 2025/2026.",

      /* 2. Vinix Seven Aurum (Aug 2025 — Dec 2025) */
      "exp.2.title": "Junior Web Developer &amp; UI/UX Designer (Intern)",
      "exp.2.company": "PT Vinix Seven Aurum",
      "exp.2.period": "Aug 2025 &mdash; Dec 2025",
      "exp.2.p1": "Travelers in Bali often struggle to find dining spots suited to their preferences—ranging from verified halal options and signature local non-halal cuisines to scenic viewpoints with authentic reviews.",
      "exp.2.p2": "Collaborated within an intern development team at PT Vinix Seven Aurum: designed interactive UI prototypes in <strong>Figma</strong>, structured <strong>MySQL</strong> relational databases, and built web features with <strong>PHP</strong> (halal/non-halal sections, ratings/reviews, favorite bookmarks, and route maps).",
      "exp.2.b1": "<strong>'Very Good' Performance Evaluation:</strong> All platform deliverables were completed on schedule and awarded top marks by company leadership.",
      "exp.2.b2": "<strong>Team Design &amp; Tech Collaboration:</strong> Worked closely with fellow interns to translate business goals into responsive UI and robust data flows.",
      "exp.2.b3": "<strong>Full Interactive Features:</strong> Successfully delivered multi-category curation, user review &amp; rating systems, bookmarking, and integrated route mapping.",

      /* 3. KAI Medika (Jul 2025 — Aug 2025) */
      "exp.3.title": "IT Support Intern (First Responder)",
      "exp.3.company": "PT KAI Medika Indonesia &bull; Brawijaya Hospital Tangerang",
      "exp.3.period": "Jul 2025 &mdash; Aug 2025",
      "exp.3.p1": "In a fast-paced hospital environment, workstation uptime, medical prescription/label printers, and network stability are critical to patient care. Any technical malfunction must be addressed immediately.",
      "exp.3.p2": "Served as <strong>first responder</strong> for all user IT incidents: handled <strong>ticketing system</strong> workflows, performed on-site troubleshooting across clinic units and remotely via <strong>AnyDesk</strong>, and coordinated hardware escalations with vendors.",
      "exp.3.b1": "<strong>About 9 tickets a day</strong> handled as the first point of contact, from minor complaints to device failures.",
      "exp.3.b2": "<strong>Comfortable across many devices:</strong> printers, computers on different operating systems, and vendor coordination when an issue had to be escalated.",
      "exp.3.b3": "<strong>Remote support with AnyDesk</strong> from my laptop, with every case recorded in the ticketing system.",

      /* 4. Diskominfo Lebak (Jul 2024 — Aug 2024) */
      "exp.4.title": "Cybersecurity and Cryptography Intern",
      "exp.4.company": "Diskominfo Lebak Regency",
      "exp.4.period": "Jul 2024 &mdash; Aug 2024",
      "exp.4.p1": "Civil servants (ASN) needed digital signatures so their documents were valid and safe to process electronically.",
      "exp.4.p2": "I helped set up <strong>digital signatures</strong>, validated electronic documents following procedure, and took part in digitalization work.",
      "exp.4.b1": "<strong>Valid digital signatures</strong> for civil servants.",
      "exp.4.b2": "<strong>Electronic documents validated</strong> according to official procedure.",
      "exp.4.p1": "Muslim travelers often struggle to find halal food in Bali.",
      "exp.4.p2": "I designed the UI/UX and built the <strong>Bali Kuliner Finder</strong> website in <strong>PHP</strong>, on my own over 5 months.",
      "exp.4.b1": "<strong>Every assigned task completed</strong> and rated &ldquo;very good&rdquo; by the company.",
      "exp.4.b2": "<strong>One person, two roles:</strong> from UI/UX design to a working website.",
      "exp.4.b3": "<strong>A real company project,</strong> not yet public because it belongs to the company.",
      "cert.1.title": "Coding Camp powered by DBS Foundation",
      "cert.1.meta": "Dicoding Academy x DBS Foundation 2025",
      "cert.track": "Full-Stack Web Development Track (910 Accredited Learning Hours)",
      "tip.cert1": "Download the Coding Camp powered by DBS Foundation certificate",
      "cert.s1": "Intensive Hours",
      "cert.s2.n": "12",
      "cert.s2": "Curriculum Modules",
      "cert.s3": "Months Training",
      "cert.s4": "Full Attendance",
      "cert.badge": "Officially Verified Graduate",
      "cert.1.pitch": "A 6-month scholarship program by DBS Foundation and Dicoding Academy totaling 910 learning hours. The curriculum covers full-stack web development from end to end: programming logic, modern front-end, Node.js REST APIs, AWS cloud fundamentals, and business English. Every module was completed through hands-on coding projects reviewed directly by Dicoding reviewers.",
      "cert.skills.title": "Verified Competencies:",
      "cert.docs.title": "Official Credential Documents",
      "cert.vault.all": "All Certificates (14)",
      "cert.vault.grad": "Graduation & Transcript (2)",
      "cert.vault.fe": "Front-End & Web (4)",
      "cert.vault.be": "JavaScript & Back-End (3)",
      "cert.vault.found": "Cloud, AI & Soft Skills (5)",
      "cert.vault.search": "Search modules, skills, or topics...",
      "cert.vault.view": "Open Document",
      "cert.vault.download": "Download PDF",
      "cert.vault.dirTitle": "12 Learning Modules",
      "cert.vault.inspectorTitle": "Official Document Inspector",
      "cert.vault.verified": "Officially Verified Graduate",
      "cert.vault.hint": "Select any document from the syllabus to inspect credentials and download the original file.",
      "cert.fan.all": "All Documents (24)",
      "cert.fan.dbs": "DBS x Dicoding Scholarship (14)",
      "cert.fan.work": "Work & Internships (4)",
      "cert.fan.org": "Organizations & Campus (5)",
      "cert.fan.view": "View Document",
      "cert.fan.download": "Download PDF",
      "cert.fan.hint": "Select or swipe cards in the fan to inspect and download documents",
      "cert.fan.allList": "Full Directory of All 24 Documents",
      "cert.fan.selected": "Selected in Fan",
      "cert.tab.grad": "Graduation & Transcript (2)",
      "cert.tab.fe": "Front-End & Web (4)",
      "cert.tab.be": "JavaScript & Back-End (3)",
      "cert.tab.found": "Cloud, AI & Soft Skills (5)",
      "cert.doc1.t": "Main Graduation Certificate",
      "cert.doc1.d": "Official completion certificate for the 6-month Full-Stack Web Development scholarship, covering 910 hours of theory and hands-on coding.",
      "cert.doc2.t": "Official Completion Letter",
      "cert.doc2.d": "Official Letter from DBS Foundation",
      "cert.doc3.t": "Academic Grade Transcript",
      "cert.doc3.d": "Academic transcript covering all 12 technical and soft-skill modules, completed with 100% attendance and all project submissions passed.",
      "cert.toggle.btn": "Open 12 Accredited Course Certificates",
      "cert.sup.title": "12 Complete Accredited Course Certificates",
      "cert.sup.sub": "Each module is officially verified by Dicoding Academy, AWS, and The British Institute.",
      "cert.g1": "Front-End & Web",
      "cert.g2": "JavaScript & Back-End",
      "cert.g3": "Foundations & More",
      "doc.certBtn": "Certificate",
      "proj.1.name": "Multi-LLM SRS Document Authoring System",
      "proj.1.tagline": "Automating Industry-Standard Software Requirement Specifications with Multi-LLM",
      "proj.1.period": "Undergraduate Thesis &bull; 2026",
      "proj.1.title": "Multi-LLM SRS Document Authoring System",
      "proj.1.meta": "Bachelor Thesis &bull; 2026",
      "proj.1.tag": "Full-Stack &amp; AI",
      "proj.1.alt": "Screenshot of Multi-LLM SRS authoring web application",
      "proj.1.need": "Authoring Software Requirement Specification (SRS) documents manually takes days, is prone to structural inconsistencies, and makes aligning business needs with technical specifications tedious.",
      "proj.1.sol": "Architected and built a full-stack web application using <strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">HTML5, CSS3, JavaScript</strong>, and a <strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Node.js &amp; Express (REST API)</strong> backend that automates industry-standard SRS generation, integrating direct APIs across <strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">5 leading LLM providers</strong>: OpenAI GPT, Claude, Gemini, DeepSeek, and Groq.",
      "proj.1.ph1": "Photo 1: Home & Workflow",
      "proj.1.lb1": "1. Home",
      "proj.1.ph2": "Photo 2: LLM Provider Selection",
      "proj.1.lb2": "2. LLM Providers",
      "proj.1.ph3": "Photo 3: Generated SRS Document",
      "proj.1.lb3": "3. SRS Result",
      "proj.1.b1": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Significant Efficiency:</strong> Slashed draft specification creation time from days to minutes while enforcing strict, standardized documentation format.",
      "proj.1.b2": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Multi-Model AI Benchmarking:</strong> Enabled engineers to evaluate logical depth, consistency, and prompt fidelity across 5 AI models side-by-side.",
      "proj.1.b3": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Independent Full-Stack Engineering:</strong> Spearheaded frontend UI, backend REST API, prompt engineering, and automated document export (DOCX/Markdown), rigorously validated by industry practitioners.",
      "proj.2.name": "Bali Kuliner Finder",
      "proj.2.tagline": "Interactive Bali Dining Directory &amp; Guide with Smart Categorization and Route Navigation",
      "proj.2.role": "Web Developer & UI Designer (Internship Team)",
      "proj.2.period": "Vinix Intern Team &bull; 2025",
      "proj.2.title": "Bali Kuliner Finder &bull; Commercial Halal Dining Platform for Bali",
      "proj.2.meta": "PT Vinix Seven Aurum &bull; Aug 2025 &mdash; Dec 2025",
      "proj.2.tag": "Web App &amp; UI/UX",
      "proj.2.alt": "Screenshot of the commercial Bali Kuliner Finder directory platform",
      "proj.2.need": "Travelers in Bali frequently struggle to discover dining spots tailored to their preferences—whether searching for verified halal food, authentic local non-halal specialties, scenic/sunset views, or nearby locations with trustworthy reviews.",
      "proj.2.sol": "Collaborated within an internship developer team at PT Vinix Seven Aurum to build a culinary directory platform: crafted Figma UI prototypes, architected relational MySQL database schemas, developed PHP backend modules, and implemented multi-criteria filtering, user reviews &amp; favorites, and map route navigation.",
      "proj.2.ph1": "Photo 1: Home & Search",
      "proj.2.lb1": "1. Home & Search",
      "proj.2.ph2": "Photo 2: Filtered Halal Search Results",
      "proj.2.lb2": "2. Search Results",
      "proj.2.ph3": "Photo 3: Merchant Details & Hours",
      "proj.2.lb3": "3. Place Details",
      "proj.2.ph4": "Photo 4: Interactive Location Route Map",
      "proj.2.lb4": "4. Location Map",
      "proj.2.photos": "4 Photos",
      "proj.2.b1": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Transparent Categories &amp; Smart Filters:</strong> Clear segregation of Halal and Non-Halal dining sections, alongside filters for scenic views, top ratings, user favorites, and nearest distance.",
      "proj.2.b2": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Rich User Engagement:</strong> Visitors can leave star ratings, publish authentic dining reviews, and bookmark favorite eateries to personal lists.",
      "proj.2.b3": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Turn-by-Turn Route Navigation:</strong> Integrated interactive maps enabling users to open live turn-by-turn driving directions to any dining spot directly from their browser.",
      "proj.3.name": "BorobudurTales",
      "proj.3.tagline": "Cultural Education Web App with AI Camera Relief Identification",
      "proj.3.role": "Front-End Developer (Capstone Team)",
      "proj.3.period": "Coding Camp &bull; 2025",
      "proj.3.title": "BorobudurTales &bull; AI Cultural Web App",
      "proj.3.meta": "Capstone Team &bull; 2025",
      "proj.3.tag": "Front-End &amp; AI",
      "proj.3.alt": "Screenshot of the BorobudurTales web app",
      "proj.3.need": "Most visitors come to Borobudur Temple treating it merely as an aesthetic photo backdrop without understanding the profound philosophical stories carved on its reliefs. Online information regarding individual Karmawibhangga panels is scarce and fragmented, making self-guided cultural discovery nearly impossible.",
      "proj.3.sol": "Served as the Front-End Developer in a collaborative Capstone team: designed and built a modern, responsive web interface (Tailwind CSS &amp; Vite), implemented smooth real-time camera capture and image upload workflows, and connected user visual inputs to the team's Machine Learning API to serve rich cultural storytelling instantly.",
      "proj.3.ph1": "Photo 1: Image Upload & Camera",
      "proj.3.lb1": "1. Upload & Camera",
      "proj.3.ph2": "Photo 2: Prediction Narrative",
      "proj.3.lb2": "2. Prediction Story",
      "proj.3.ph3": "Photo 3: Story Archive Library",
      "proj.3.lb3": "3. Story Library",
      "proj.3.b1": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Transforming Sightseeing into Education:</strong> Turns casual sightseeing into active cultural learning; visitors point their camera at a relief to instantly discover its historical storyline and moral lesson.",
      "proj.3.b2": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">Story Library &amp; Visual Search:</strong> Delivers a comprehensive digital archive of Karmawibhangga reliefs searchable both through keyword queries and visual photo matching.",
      "proj.3.b3": "<strong class=\"text-slate-800 dark:text-slate-200 font-semibold\">High-Performance Mobile UX:</strong> Optimized mobile browser performance so camera captures, image compression, and narrative rendering execute quickly and smoothly on visitors' phones.",
      "org.1.period": "Sep 2024 &mdash; Oct 2024",
      "org.1.role": "Logistics Coordinator",
      "org.1.context": "Symphony of Saintek 20th Extravaganza <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Faculty of Science &amp; Technology, UIN Sunan Kalijaga</span>",
      "org.1.title": "Logistics Coordinator &bull; Symphony of Saintek 20th Extravaganza",
      "org.1.desc": "Kept the Faculty of Science and Technology anniversary celebration operationally ready through needs planning, equipment procurement, vendor sourcing, and coordination with the team and external partners. Secured support from Indosat and coordinated fulfilment of the event’s needs within operational and budget constraints.",
      "org.2.period": "Aug 2023 &mdash; Oct 2023",
      "org.2.role": "Treasurer",
      "org.2.context": "Infonite (Informatics Night &amp; Orientation) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Informatics Student Association, UIN Sunan Kalijaga</span>",
      "org.2.title": "Treasurer &bull; Infonite &mdash; Informatics Night and Orientation, HMPS Informatika",
      "org.2.desc": "Responsible for planning and controlling the budget for a student bonding night and orientation program. Set procurement cost limits, reviewed every expense request before approving it, and made sure transactions were recorded and accountable through financial reports.",
      "org.3.period": "Apr 2023 &mdash; Nov 2023",
      "org.3.role": "Secretary",
      "org.3.context": "UIN Informatic Competition 5.0 (UINIC) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Informatics Student Association, UIN Sunan Kalijaga</span>",
      "org.3.title": "Secretary &bull; UIN Informatic Competition 5.0 (UINIC)",
      "org.3.desc": "Kept administration and information flowing in an Informatics competition with external participants and multiple rounds. Documented meetings and decisions, made sure information reached all members, and handled participant certificate administration.",
      "org.4.period": "Oct 2024 &mdash; Dec 2024",
      "org.4.role": "Public Relations",
      "org.4.context": "Sport and Art Informatics (Sportif) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Informatics Student Association, UIN Sunan Kalijaga</span>",
      "org.4.title": "Public Relations &bull; Sport and Art Informatics (Sportif), HMPS Informatika",
      "org.4.desc": "Bridged the operational needs of sports, arts, and gaming competitions with vendor availability and the event budget. Sourced suitable providers and explored sponsor support so the event could be planned realistically.",
      "org.5.period": "Aug 2022 &mdash; Sep 2022",
      "org.5.role": "Public Relations",
      "org.5.context": "Welcoming Ceremony <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Student Executive &amp; Legislative Board, UIN Sunan Kalijaga</span>",
      "org.5.title": "Public Relations &bull; Welcoming Ceremony, DEMA &amp; SEMA UIN Sunan Kalijaga",
      "org.5.desc": "Sought external support to meet the event’s needs by approaching potential sponsors and partners. Secured around 10 forms of support, from discounts on event needs to vouchers and facilities for winners.",
      "org.6.period": "24 Jul 2024 &mdash; 2 Oct 2024",
      "org.6.role": "Publication, Design & Documentation Staff",
      "org.6.context": "Islam &amp; Science Integration &amp; Interconnection Conference (KIIS) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Faculty of Science &amp; Technology, UIN Sunan Kalijaga</span>",
      "org.6.title": "Publication, Design &amp; Documentation Staff &bull; Konferensi Integrasi dan Interkoneksi Islam dan Sains (KIIS), FST UIN Sunan Kalijaga",
      "org.6.desc": "Handled the visual communication for a faculty-level conference open to external participants, from promotional materials and publicity items to participant materials and merchandise. Continued with post-event documentation by producing a film and publishing event highlights on Instagram, YouTube, and the conference website.",
      "org.7.period": "Feb 2024 &mdash; Jan 2025",
      "org.7.role": "Media & Network Staff",
      "org.7.context": "Islamic and Science Technology Study Forum (FKIST) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.7.title": "Media &amp; Network Staff &bull; Forum Kajian Islam dan Sains Teknologi (FKIST)",
      "org.7.desc": "Ran the operations of the organization’s four digital channels (website, Facebook, Instagram, and YouTube) by developing and editing the website and managing content across platforms. Besides keeping the organization’s digital publishing going, delivered multimedia and social media management training for members and the general public.",
      "org.8.period": "Jan 2023 &mdash; Jan 2024",
      "org.8.role": "Interests & Talents Department Staff",
      "org.8.context": "Informatics Student Association <span class=\"text-slate-400 dark:text-slate-500 font-normal\">&bull;</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.8.title": "Interests &amp; Talents Department Staff &bull; Informatics Student Association",
      "org.8.desc": "Coordinated regular activities across student interests, from sports to arts and recreation, by aligning schedules, venue availability, and member participation. Kept the department’s programs running as an outlet for student activities beyond academics."
    }
  };

  var KEY = 'porto_lang';
  var lang = 'id';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'id' || saved === 'en') lang = saved;
  } catch (e) {}

  function t(key, vars) {
    var s = (DICT[lang] && DICT[lang][key]);
    if (s === undefined) s = DICT.id[key];
    if (s === undefined) return key;
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    }
    return s;
  }

  function apply(root) {
    root = root || document;
    var q = function (sel) { return root.querySelectorAll ? root.querySelectorAll(sel) : []; };

    q('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    q('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    q('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 1) return;
        el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim()));
      });
    });
  }

  function paintToggles() {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', t('aria.lang'));
      btn.setAttribute('title', t('aria.langTitle'));
      btn.setAttribute('data-lang', lang);
      btn.setAttribute('aria-checked', lang === 'en' ? 'true' : 'false');
      btn.querySelectorAll('[data-l]').forEach(function (o) {
        o.classList.toggle('is-on', o.getAttribute('data-l') === lang);
      });
    });
  }

  function setLang(next, opts) {
    if (next !== 'id' && next !== 'en') return;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    window.FLY_COPY = (window.FLY_COPY_ALL || {})[lang] || window.FLY_COPY;
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    apply(document);
    paintToggles();
    syncAllWidths();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang, silent: !!(opts && opts.silent) } }));
  }

  function syncIntroWidth() {
    var title = document.getElementById('firdy-intro-title');
    var sub = document.querySelector('[data-i18n-html="modal.sub"]');
    if (!title || !sub) return;

    function measureAndSet() {
      var lines = title.querySelectorAll('.intro-line');
      var maxW = 0;
      if (lines.length > 0) {
        lines.forEach(function (ln) {
          var w = ln.getBoundingClientRect().width;
          if (w > maxW) maxW = w;
        });
      } else {
        var blocks = title.querySelectorAll('span.block');
        blocks.forEach(function (ln) {
          var r = document.createRange();
          r.selectNodeContents(ln);
          var w = r.getBoundingClientRect().width;
          if (w > maxW) maxW = w;
        });
      }

      if (maxW > 100) {
        var px = Math.ceil(maxW);
        var parentW = sub.parentElement ? sub.parentElement.getBoundingClientRect().width : px;
        if (parentW > 50 && px > parentW) {
          px = Math.floor(parentW);
        }
        sub.style.setProperty('max-width', px + 'px', 'important');
        sub.style.setProperty('width', px + 'px', 'important');
      }
    }

    requestAnimationFrame(measureAndSet);
    setTimeout(measureAndSet, 150);
    setTimeout(measureAndSet, 600);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAndSet);
    }
  }

  function syncHeroWidth() {
    var title = document.getElementById('hero-title');
    var bio = document.getElementById('hero-bio') || document.querySelector('[data-i18n-html="hero.bio"]');
    if (!title || !bio) return;

    function measureAndSet() {
      var lines = title.querySelectorAll('.hero-line');
      var maxW = 0;
      if (lines.length > 0) {
        lines.forEach(function (ln) {
          var w = ln.getBoundingClientRect().width;
          if (w > maxW) maxW = w;
        });
      } else {
        var blocks = title.querySelectorAll('span.block');
        blocks.forEach(function (ln) {
          var r = document.createRange();
          r.selectNodeContents(ln);
          var w = r.getBoundingClientRect().width;
          if (w > maxW) maxW = w;
        });
      }

      if (maxW > 100) {
        var px = Math.ceil(maxW);
        var parentW = bio.parentElement ? bio.parentElement.getBoundingClientRect().width : px;
        if (parentW > 50 && px > parentW) {
          px = Math.floor(parentW);
        }
        bio.style.setProperty('max-width', px + 'px', 'important');
        bio.style.setProperty('width', px + 'px', 'important');
      }
    }

    requestAnimationFrame(measureAndSet);
    setTimeout(measureAndSet, 150);
    setTimeout(measureAndSet, 600);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAndSet);
    }
  }

  function syncAllWidths() {
    syncIntroWidth();
    syncHeroWidth();
  }

  window.addEventListener('resize', syncAllWidths);
  document.addEventListener('DOMContentLoaded', syncAllWidths);
  window.addEventListener('load', syncAllWidths);

  window.I18N = {
    t: t,
    apply: apply,
    setLang: setLang,
    syncWidths: syncAllWidths,
    get lang() { return lang; }
  };

  /* Tombol bahasa (ada di header dan di modal pembuka) */
  document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setLang(lang === 'id' ? 'en' : 'id');
    });
  });

  /* Terapkan bahasa tersimpan sebelum script lain berjalan */
  setLang(lang, { silent: true });
})();
