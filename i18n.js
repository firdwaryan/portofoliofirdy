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
      'modal.close': 'Tutup',
      'tip.start': 'Klik untuk memulai',

      /* ---- header ---- */
      'nav.intro': 'Perkenalan',
      'nav.tour': 'Pemandu Cerita',
      'tip.tour': 'Mulai Panduan Interaktif Kunang-kunang',
      'nav.experience': 'Pengalaman',
      'nav.certifications': 'Sertifikasi',
      'nav.projects': 'Proyek',
      'nav.organisasi': "Organisasi & Kepanitiaan",
      'nav.contact': 'Kontak',
      'aria.theme': 'Ganti tema',
      'aria.menu': 'Menu',
      'aria.lang': 'Ganti bahasa',
      'aria.langTitle': 'Bahasa: Indonesia (klik untuk English)',

      /* ---- hero ---- */
      'hero.hi': "HALO, SAYA FIRDY DWI ARYANI",
      'hero.role': 'IT Support',
      'hero.line1': "Dari memahami kebutuhan",
      'hero.line2': "hingga mewujudkan solusi.",
      'hero.bio': "Perjalanan kerja saya diwarnai oleh beragam peran, mulai dari pengembangan web dan dukungan IT hingga pengelolaan kanal digital dan koordinasi kegiatan. Dari setiap peran, saya belajar menata langkah kerja, memperhatikan detail, dan menyesuaikan pendekatan dengan kebutuhan yang ada. Saya menikmati proses mencari tahu apa yang perlu dilakukan, menentukan cara yang tepat, dan memastikan setiap pekerjaan terselesaikan dengan baik.",
      'hero.cv': 'Unduh CV ATS',
      'tip.cv': 'Unduh CV ATS (PDF)',
      'tip.linkedin': 'Profil LinkedIn',
      'tip.email': 'Kirim email',
      'tip.whatsapp': 'Hubungi via WhatsApp',
      'href.mail': "mailto:firdy.dwi@gmail.com?subject=Tawaran%20Pekerjaan",
      'href.waHero': "https://wa.me/6285894689454?text=Halo%20Firdy,%20saya%20tertarik%20dengan%20portofolio%20Anda",
      'href.waContact': "https://wa.me/6285894689454?text=Selamat%20pagi,%20saya%20ingin%20berdiskusi%20mengenai%20peluang%20kerja%20sama",
      'href.mailContact': 'mailto:firdy.dwi@gmail.com?subject=Peluang%20Kerja%20Sama',

      /* ---- pengalaman ---- */
      'exp.title': "Pengalaman Kerja",
      'exp.prev': 'Slide sebelumnya',
      'exp.next': 'Slide berikutnya',
      "exp.challenge": "Tantangan",
      "exp.results": "Hasil & Kontribusi",
      'exp.scope': "Ruang Lingkup",
      'exp.achievements': "Hasil & Pencapaian",
      'exp.viewAll': 'Lihat Semua',
      'exp.viewSlide': 'Mode Geser',
      'exp.allHint': 'Menampilkan semua 4 pengalaman kerja',
      "exp.hint": "Geser kartu, atau gunakan tombol (>) dan tombol panah pada keyboard",
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
      'proj.gallery': "Galeri proyek (klik untuk melihat foto):",
      'proj.photos': '3 Foto',
      'proj.need': "Tantangan & Kebutuhan",
      'proj.challenge': "Tantangan & Kebutuhan",
      'proj.solution': "Solusi & Arsitektur",
      'proj.impact': "Dampak & Kontribusi Nyata",
      'proj.liveDemo': "Buka Live Demo",

      /* ---- organisasi ---- */
      'org.title': "Organisasi & Kepanitiaan",
      'org.sub': "Memimpin divisi, mengelola anggaran, dan mengelola administrasi dokumen pada berbagai kegiatan kampus.",

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
      'form.messagePh': "Tuliskan posisi atau topik yang ingin didiskusikan...",
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
      'dots.organisasi': "Organisasi & Kepanitiaan",
      'dots.contact': 'Kontak',

      /* ---- toast ---- */
      'toast.dark': 'Mode gelap diaktifkan',
      'toast.light': 'Mode terang diaktifkan',
      'toast.lang': 'Bahasa diubah ke Indonesia',

      /* ---- lalat pemandu ---- */
      'fly.welcome': 'Selamat datang. Silakan gulir ke bawah.',
      'fly.skip': 'Lewati panduan \u2192',
      'fly.onb.hello': "Halo! Saya kunang-kunang pemandu yang siap menemani Anda menjelajahi portofolio Firdy. Siap berkeliling?",
      'fly.where': "Mau lanjut ke bagian mana?",
      'fly.end': "Tur panduan interaktif telah selesai. Terima kasih telah menjelajahi portofolio Firdy.",
      'chip.next': 'Lanjut \u2192',
      "chip.contact": "Hubungi Firdy",
      "chip.more": "Ceritakan lebih lanjut",
      'chip.top': 'Kembali ke atas',
      'chip.whatsapp': 'WhatsApp',
      'chip.email': 'Email',
      'chip.linkedin': 'LinkedIn',
      'fly.further.down': " Ada di bawah. Gulir ↓",
      'fly.further.up': " Ada di atas. Gulir ↑",
      'fly.exp.fallback': "Baca lebih lanjut tentang peran dan pekerjaan yang ditangani Firdy di sini.",
      'fly.exp.head': 'Pengalaman {i} dari {n}: {title}',
      "fly.exp.result": "Hasil utama: {text}",
      'fly.exp.read': "Ingin tahu lebih detail? Lihat tantangan operasional dan hasil kontribusi dari pengalaman ini.",
      'fly.exp.guideNext': "Sudah selesai membaca? Tekan tombol (>) untuk lanjut ke pengalaman berikutnya.",
      'fly.exp.guideLast': "Itu dia pengalaman kerjanya! Selanjutnya, mari kita lihat pelatihan dan sertifikasi Firdy.",
      'fly.intro.read': "Di sini Anda dapat melihat ringkasan profil Firdy, mengunduh CV, serta mengakses LinkedIn, email, dan WhatsApp.",
      'fly.onb.theme': "Sebelum mulai, mari kita lihat beberapa kontrol penting!",
      'fly.onb.themeDone': "Tampilan bisa diatur terang atau gelap sesuai kenyamanan Anda. Saya kembalikan dulu, ya.",
      'fly.onb.themeBack': "Ada satu fitur praktis lagi!",
      'fly.onb.lang': "Portofolio ini juga mendukung dua pilihan bahasa!",
      'fly.onb.langDone': "Bisa Bahasa Indonesia maupun English, pilih yang paling nyaman untuk Anda. Saya kembalikan ke awal, ya.",
      'fly.onb.langBack': "Sekarang, mari kita berkenalan langsung dengan Firdy!",
      'fly.intro.guide': "Gunakan tombol ↑ dan ↓ di sisi kanan untuk berpindah halaman. Tekan ↓ untuk melihat pengalaman kerja.",
      'fly.cert.read': "Di sini Anda dapat melihat sertifikasi resmi Firdy dan membuka dokumen sertifikat.",
      'fly.cert.guide': "Tekan tombol ↓ di sisi kanan untuk melihat proyek unggulan.",
      'fly.proj.read': "Ada {n} proyek unggulan di sini. Geser kartu atau gunakan tombol navigasi untuk melihat semuanya. Anda juga dapat mengeklik foto kecil untuk mengganti tampilan.",
      'fly.proj.guide': "Tiga proyek sudah Anda lihat. Sekarang, mari intip rekam jejak Firdy di organisasi dan kepanitiaan!",
      'fly.org.read': "Di bagian ini, Anda dapat meninjau peran aktif Firdy dalam kepemimpinan organisasi dan kepanitiaan.",
      'fly.org.guide': "Tekan tombol ↓ di sisi kanan untuk menuju halaman kontak.",
      'fly.contact.read': "Anda dapat menghubungi Firdy melalui WhatsApp, LinkedIn, email, atau formulir pesan di sebelah kanan.",
      'fly.contact.guide': "Pilih cara yang paling nyaman untuk menghubungi Firdy. Untuk respon tercepat, silakan gunakan tombol WhatsApp.",
      "fly.skill.every": "{name} muncul di setiap pengalaman di sini. Ini merupakan salah satu keahlian andalan Firdy.",
      "fly.skill.some": "{name} digunakan pada {n} dari {total} pengalaman di sini.",

      /* ---- isi kartu pengalaman kerja ---- */
      /* 1. UIN Sunan Kalijaga */
      "exp.1.title": "Pengelola Website, Email & Media Sosial",
      "exp.1.company": "Fakultas Sains dan Teknologi, UIN Sunan Kalijaga",
      "exp.1.period": "Feb 2026 — Agt 2026",
      "exp.1.p1": "Kebutuhan publikasi dan tata kelola informasi terintegrasi lintas 9 program studi serta 20+ agenda fakultas menuntut koordinasi jadwal yang ketat, standardisasi konten multi-kanal, dan komunikasi stakeholder yang responsif.",
      "exp.1.b1": "Mengelola kebutuhan publikasi 9 program studi serta 20+ agenda fakultas secara paralel dan end-to-end, mulai dari perancangan identitas visual, pembuatan materi promosi, hingga produksi konten digital, iklan, dan dokumentasi, dengan penjadwalan pekerjaan berdasarkan kalender kegiatan dan tenggat masing-masing program studi.",
      "exp.1.b2": "Mengkoordinasikan kebutuhan publikasi dan sistem informasi dengan dosen, staf, dan panitia kegiatan, mulai dari pengumpulan kebutuhan (requirement gathering), penentuan spesifikasi teknis, hingga memastikan delivery pekerjaan selesai sesuai jadwal.",
      "exp.1.b3": "Mengelola 4 kanal digital fakultas (website, Instagram, Facebook, dan YouTube), meliputi pembaruan informasi, pengelolaan konten, serta pengeditan dan pengembangan tampilan website.",

      /* 2. Vinix Seven Aurum */
      "exp.2.title": "Junior Web Developer & UI/UX Designer — Intern",
      "exp.2.company": "PT Vinix Seven Aurum",
      "exp.2.period": "Agt 2025 — Des 2025",
      "exp.2.p1": "Klien dan pengguna membutuhkan platform web komersial yang cepat, stabil, dan bebas kendala teknis saat peluncuran, terutama pada penanganan data kuliner dalam jumlah besar serta tampilan yang harus tetap rapi di berbagai jenis perangkat.",
      "exp.2.b1": "Menjaga stabilitas operasional platform web komersial agar siap diluncurkan sesuai jadwal melalui pengembangan modul backend berbasis PHP dan penataan alur logika sistem yang rapi.",
      "exp.2.b2": "Merancang dan mengelola struktur basis data relasional MySQL untuk direktori tempat makan, menu, dan ulasan guna memastikan proses pencarian serta filter informasi berjalan lancar.",
      "exp.2.b3": "Memperoleh predikat evaluasi Sangat Baik dari manajemen atas kinerja selama masa magang berkat ketepatan waktu dalam menyelesaikan setiap tugas teknis dan kerja sama aktif bersama tim.",

      /* 3. KAI Medika */
      "exp.3.title": "Staf IT Support",
      "exp.3.company": "PT KAI Medika Indonesia • Brawijaya Hospital Tangerang",
      "exp.3.period": "Jul 2025 — Agt 2025",
      "exp.3.p1": "Operasional rumah sakit di gedung 5 lantai menuntut keandalan seluruh infrastruktur IT, sistem informasi, dan konektivitas jaringan agar pelayanan medis berjalan tanpa hambatan.",
      "exp.3.b1": "Menangani lebih dari 15 tiket insiden IT per hari di 5 lantai operasional rumah sakit secara end-to-end, mulai dari diagnosis hingga penyelesaian, meliputi troubleshooting hardware, sistem operasi, dan jaringan (konfigurasi IP, konektivitas server), baik secara on-site maupun remote melalui AnyDesk.",
      "exp.3.b2": "Mengoptimalkan operasional mesin anjungan pendaftaran mandiri (kiosk check-in) dengan merancang panduan visual langsung pada fisik mesin sehingga berhasil mengurai antrean dan memperlancar registrasi pasien.",
      "exp.3.b3": "Menata ulang tata kelola 300+ aset IT rumah sakit menggunakan label barcode ber-ID unik, memproses pengajuan pengadaan perangkat baru, serta memasang instalasi komputer dan jaringan untuk operasional gedung baru.",

      /* 4. Diskominfo Lebak */
      "exp.4.title": "IT Helpdesk & Infrastructure Staff",
      "exp.4.company": "Bidang Statistika dan Persandian, Diskominfo Kab. Lebak",
      "exp.4.period": "Jul 2024 — Agt 2024",
      "exp.4.p1": "Pemerintah daerah membutuhkan pengawasan keamanan situs web secara berkala dari serangan siber serta penerapan tanda tangan digital resmi guna menjamin keaslian dokumen kedinasan aparatur sipil.",
      "exp.4.b1": "Memonitor situs resmi pemerintah daerah secara berkala dari insiden keamanan siber seperti peretasan tampilan situs (<em>defacement</em>) dan penyusupan konten ilegal, serta menyusun laporan teknis untuk eskalasi penanganan tim tanggap insiden.",
      "exp.4.b2": "Memproses registrasi dan verifikasi teknis tanda tangan digital bagi Aparatur Sipil Negara (ASN) bekerja sama dengan balai sertifikasi elektronik guna menjamin keaslian berkas kedinasan.",
      "exp.4.b3": "Melayani konsultasi teknis helpdesk bagi masyarakat sipil dan staf dinas dalam mengatasi kendala akun serta akses portal layanan sistem informasi daerah.",

      /* ---- Sertifikasi ---- */
      "cert.1.title": "Coding Camp powered by DBS Foundation",
      "cert.1.meta": "Dicoding Academy x DBS Foundation 2025",
      "cert.track": "Jalur Full-Stack Web Development",
      "tip.cert1": "Unduh sertifikat Coding Camp powered by DBS Foundation",
      "cert.s1": "Jam Intensif",
      "cert.s2.n": "12",
      "cert.s2": "Modul Kurikulum",
      "cert.s3": "Bulan Pelatihan",
      "cert.s4": "Kehadiran Penuh",
      "cert.badge": "Lulusan Terverifikasi Resmi",
      "cert.selectivity": "Terpilih Melalui Seleksi 63.000 Pendaftar Nasional",
      "cert.1.pitch": "Terpilih dari 63.356 pendaftar (tingkat penerimaan 5%) pada program beasiswa intensif kolaborasi DBS Foundation dan Dicoding Academy, dengan beban belajar 910 jam yang terakreditasi Kemendikbudristek. Kurikulumnya mencakup logika komputasi, front-end modern, RESTful API dengan Node.js dan Hapi, komputasi awan AWS, hingga komunikasi bisnis bersama The British Institute. Saya menyelesaikannya dengan predikat Grade A, Full Graduate, serta nilai proyek akhir Capstone 96,4 dari 100.",
      "cert.skills.title": "Keahlian Teruji:",
      "cert.docs.title": "Berkas Kredensial Resmi",
      "cert.vault.all": "Semua Sertifikat 14 Berkas",
      "cert.showcase.verified": "Terverifikasi Resmi",
      "cert.showcase.page1": "Halaman 1: Sertifikat Kelulusan",
      "cert.showcase.page2": "Halaman 2: Transkrip Nilai Resmi",
      "cert.showcase.zoom": "Klik untuk Perbesar",
      "cert.showcase.tab1": "Sertifikat Kelulusan",
      "cert.showcase.tab2": "Transkrip Nilai Lengkap",
      "cert.eval.title": "Hasil Evaluasi Kelulusan",
      "cert.eval.status": "Full Graduate",
      "cert.eval.pred": "Predikat",
      "cert.eval.predVal": "A",
      "cert.eval.predSub": "Sangat Memuaskan",
      "cert.eval.cap": "Proyek Akhir",
      "cert.eval.capVal": "96,4",
      "cert.eval.capSub": "Capstone Tested",
      "cert.eval.soft": "Soft Skills",
      "cert.eval.softVal": "93,2",
      "cert.eval.softSub": "Komunikasi Bisnis",
      "cert.skills.heading": "Keahlian & Materi 910 Jam Pembelajaran",
      "cert.skill.softTitle": "Soft Skills & Komunikasi",
      "cert.skill.collab": "Kolaborasi Tim",
      "cert.vault.grad": "Kelulusan & Transkrip 2 Berkas",
      "cert.vault.fe": "Front-End & Web 4 Berkas",
      "cert.vault.be": "JavaScript & Back-End 3 Berkas",
      "cert.vault.found": "Cloud, AI & Soft Skills 5 Berkas",
      "cert.vault.search": "Cari modul, skill, atau materi...",
      "cert.vault.view": "Buka Dokumen",
      "cert.vault.download": "Unduh PDF",
      "cert.vault.dirTitle": "12 Modul Pembelajaran",
      "cert.vault.inspectorTitle": "Inspektor Dokumen Resmi",
      "cert.vault.verified": "Lulusan Resmi Terverifikasi",
      "cert.vault.hint": "Pilih berkas dari silabus untuk melihat inspeksi detail dan mengunduh berkas fisik.",
      "cert.fan.all": "Semua Berkas 24",
      "cert.fan.dbs": "Beasiswa DBS x Dicoding 14 Berkas",
      "cert.fan.work": "Pengalaman Kerja & Magang 4 Berkas",
      "cert.fan.org": "Organisasi & Kampus 5 Berkas",
      "cert.fan.view": "Lihat Dokumen",
      "cert.fan.download": "Unduh PDF",
      "cert.fan.hint": "Pilih atau geser kartu di kipas untuk melihat & mengunduh berkas",
      "cert.fan.allList": "Pilihan Lengkap Seluruh 24 Berkas",
      "cert.fan.selected": "Sedang Dipilih",
      "cert.tab.grad": "Kelulusan & Transkrip 2 Berkas",
      "cert.tab.fe": "Front-End & Web 4 Berkas",
      "cert.tab.be": "JavaScript & Back-End 3 Berkas",
      "cert.tab.found": "Cloud, AI & Soft Skills 5 Berkas",
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

      /* ---- Proyek ---- */
      "proj.1.name": "Sistem Penyusunan Dokumen SRS (Multi-LLM)",
      "proj.1.tagline": "Platform Pemandu Penyusunan Dokumen Spesifikasi Software Standar IEEE Berbasis Multi-LLM",
      "proj.1.period": "Skripsi S1 • 2026",
      "proj.1.title": "Sistem Penyusunan SRS Berbasis Multi-LLM",
      "proj.1.meta": "Skripsi S1 • 2026",
      "proj.1.tag": "Full-Stack & AI",
      "proj.1.alt": "Tangkapan layar Sistem Penyusunan SRS dengan Dukungan Multi-LLM",
      "proj.1.need": "Banyak pengembang sistem dan akademisi menghadapi kendala dalam menyusun dokumen Software Requirements Specification (SRS) yang sesuai dengan standar IEEE. Penyusunan secara manual memerlukan waktu signifikan, rentan terjadi inkonsistensi format, dan penggunaan model AI generatif tanpa pembatasan (guardrail) ketat kerap memicu halusinasi yang menyimpang dari kebutuhan riil sistem.",
      "proj.1.role": "Full-Stack Developer & Prompt Engineer (Solo Project)",
      "proj.1.sol": "Membangun aplikasi web full-stack mandiri (JavaScript & Node.js Express REST API) yang berfungsi sebagai sistem pemandu langkah demi langkah: memandu pengguna mendefinisikan kebutuhan sistem, membatasi AI dengan guardrail dan aturan prompt ketat agar tidak berhalusinasi, serta fleksibel dihubungkan ke model AI mana pun (OpenAI, Claude, Gemini, DeepSeek, Groq, hingga LLM lokal) dengan konfigurasi API key langsung dari UI.",
      "proj.1.ph1": "Foto 1: Beranda & Alur Kerja",
      "proj.1.lb1": "1. Beranda",
      "proj.1.ph2": "Foto 2: Pilihan Provider LLM",
      "proj.1.lb2": "2. Provider LLM",
      "proj.1.ph3": "Foto 3: Hasil Generasi Dokumen SRS",
      "proj.1.lb3": "3. Hasil SRS",
      "proj.1.b1": "Memandu pengguna dari nol hingga menghasilkan dokumen SRS lengkap yang rapi dan konsisten sesuai standar resmi industri.",
      "proj.1.b2": "Aturan prompt ketat memastikan AI hanya menghasilkan spesifikasi fungsional dan teknis yang realistis, logis, dan dapat dieksekusi tim developer.",
      "proj.1.b3": "Mendukung penggunaan beragam model cloud berbayar, layanan tingkat gratis (free tier), maupun model lokal offline, serta ekspor hasil dokumen secara langsung ke format DOCX dan Markdown.",

      "proj.2.name": "Bali Kuliner Finder",
      "proj.2.tagline": "Platform Direktori & Panduan Kuliner Bali Interaktif dengan Kurasi Kategori & Navigasi Rute",
      "proj.2.role": "Web Developer & UI Designer",
      "proj.2.period": "PT Vinix Seven Aurum • 2025",
      "proj.2.title": "Bali Kuliner Finder • Platform Komersial Kurasi Kuliner Halal di Bali",
      "proj.2.meta": "PT Vinix Seven Aurum • Agt 2025 — Des 2025",
      "proj.2.tag": "Web App & UI/UX",
      "proj.2.alt": "Tangkapan layar platform komersial Bali Kuliner Finder",
      "proj.2.need": "Wisatawan di Bali sering kesulitan menemukan tempat makan yang tepat sesuai preferensi mereka—baik mencari kuliner halal yang terverifikasi, kuliner khas non-halal, tempat dengan pemandangan terindah (sunset/alam), maupun tempat terdekat dengan ulasan jujur.",
      "proj.2.sol": "Berkolaborasi bersama sesama tim pengembang magang di PT Vinix Seven Aurum untuk membangun platform direktori kuliner: merancang prototipe antarmuka interaktif di Figma, merancang database relasional MySQL, mengembangkan backend PHP, serta membuat sistem filter multi-kategori, fitur ulasan & favorit pengguna, dan peta navigasi rute.",
      "proj.2.ph1": "Foto 1: Beranda & Pencarian Cepat",
      "proj.2.lb1": "1. Beranda & Cari",
      "proj.2.ph2": "Foto 2: Hasil Pencarian & Filter Halal",
      "proj.2.lb2": "2. Hasil Pencarian",
      "proj.2.ph3": "Foto 3: Detail Merchant & Jam Buka",
      "proj.2.lb3": "3. Detail Merchant",
      "proj.2.ph4": "Foto 4: Peta Lokasi & Rute Restoran",
      "proj.2.lb4": "4. Peta Lokasi",
      "proj.2.photos": "4 Foto",
      "proj.2.b1": "Memisahkan kategori Halal dan Non-Halal secara transparan, serta menyediakan filter pencarian berdasarkan panorama pemandangan, penilaian tertinggi, daftar favorit, dan jarak terdekat.",
      "proj.2.b2": "Pengunjung dapat memberi rating bintang, menulis ulasan pengalaman bersantap, serta menyimpan restoran favorit ke daftar pribadi.",
      "proj.2.b3": "Terintegrasi peta interaktif agar pengguna dapat langsung membuka petunjuk arah jalan ke lokasi tempat makan dari browser.",

      "proj.3.name": "BorobudurTales",
      "proj.3.tagline": "Aplikasi Web Edukasi Budaya & Identifikasi Relief Karmawibhangga Berbasis Kamera AI",
      "proj.3.role": "Front-End Developer (Tim Capstone)",
      "proj.3.period": "Coding Camp • 2025",
      "proj.3.title": "BorobudurTales • Web Edukasi Relief Berbasis AI",
      "proj.3.meta": "Capstone Team • 2025",
      "proj.3.tag": "Front-End & AI",
      "proj.3.alt": "Tangkapan layar proyek web BorobudurTales",
      "proj.3.need": "Sebagian besar pengunjung Candi Borobudur menikmati keindahan arsitektur tanpa memahami narasi sejarah serta nilai filosofis pada reliefnya. Selain itu, referensi digital mengenai makna setiap panel relief Karmawibhangga masih sangat terbatas dan tersebar secara fragmentaris, sehingga menyulitkan proses pembelajaran mandiri.",
      "proj.3.sol": "Berperan sebagai Front-End Developer dalam tim Capstone: merancang dan membangun antarmuka web interaktif yang modern dan responsif (Tailwind CSS & Vite), membuat alur kamera real-time dan upload foto yang mulus, serta menghubungkan input visual pengguna ke endpoint API model Machine Learning tim untuk menampilkan narasi kisah budaya secara instan.",
      "proj.3.ph1": "Foto 1: Unggah Gambar & Kamera",
      "proj.3.lb1": "1. Unggah & Kamera",
      "proj.3.ph2": "Foto 2: Narasi Hasil Prediksi",
      "proj.3.lb2": "2. Narasi Prediksi",
      "proj.3.ph3": "Foto 3: Pustaka Kisah Budaya",
      "proj.3.lb3": "3. Pustaka Kisah",
      "proj.3.b1": "Mengubah wisata pasif menjadi eksplorasi edukatif interaktif dengan mengarahkan kamera ke relief candi untuk memunculkan narasi sejarah dan nilai moralnya seketika.",
      "proj.3.b2": "Menyediakan katalog digital panel relief Karmawibhangga lengkap yang dapat dicari melalui kata kunci maupun pencocokan foto visual.",
      "proj.3.b3": "Performa web mobile dioptimalkan agar tangkapan kamera, kompresi foto, dan rendering narasi berjalan mulus di perangkat ponsel pengguna.",

      /* ---- Organisasi (5 Item) ---- */
      "org.1.period": "Sep 2024 — Okt 2024",
      "org.1.role": "Koordinator Logistik",
      "org.1.context": "Dies Natalis ke-20 Fakultas Sains dan Teknologi (Symphony of Saintek) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">FST UIN Sunan Kalijaga</span>",
      "org.1.title": "Koordinator Logistik • Symphony of Saintek 20th Extravaganza",
      "org.1.desc": "Memimpin operasional divisi logistik untuk pengadaan perlengkapan teknis panggung Dies Natalis Fakultas ke-20. Menangani seleksi vendor, instalasi perangkat keras di lokasi acara, serta kontrol inventaris hingga seluruh rangkaian acara berjalan tanpa kendala teknis.",
      "org.2.period": "Jan 2023 — Des 2024",
      "org.2.role": "Staf Divisi Minat & Bakat",
      "org.2.context": "Himpunan Mahasiswa Informatika (HMPS Informatika) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.2.title": "Staf Divisi Minat & Bakat • HMPS Informatika",
      "org.2.desc": "Mengarahkan koordinasi operasional minat bakat mahasiswa Informatika dan mengawal kesiapan agenda divisi; mengelola alokasi anggaran belanja sebagai Bendahara acara orientasi serta menangani komunikasi dan alur registrasi peserta sebagai Humas turnamen tahunan hingga seluruh kegiatan terlaksana tepat waktu tanpa kendala operasional.",
      "org.3.period": "Apr 2023 — Nov 2023",
      "org.3.role": "Sekretaris Pelaksana",
      "org.3.context": "UIN Informatic Competition 5.0 (UINIC) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">HMPS Informatika UIN Sunan Kalijaga</span>",
      "org.3.title": "Sekretaris Pelaksana • UINIC 5.0",
      "org.3.desc": "Mengelola administrasi pendaftaran UIN IT Competition (UINIC), kompetisi IT tahunan himpunan tingkat DIY dengan banyak cabang lomba, dengan memverifikasi kelengkapan berkas seluruh peserta menggunakan spreadsheet sehingga data siap sebelum technical meeting. Menyusun surat perizinan kampus dan surat kerja sama dengan vendor eksternal, serta menerbitkan sertifikat digital peserta dan panitia sesuai jadwal acara.",
      "org.4.period": "Agt 2022 — Sep 2022",
      "org.4.role": "Humas & Kemitraan",
      "org.4.context": "Penyambutan Mahasiswa Baru (Welcoming Ceremony) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">BEM & Senat Mahasiswa Universitas (DEMA & SEMA UIN)</span>",
      "org.4.title": "Humas & Kemitraan • Welcoming Ceremony, DEMA & SEMA",
      "org.4.desc": "Memimpin komunikasi eksternal dan negosiasi teknis kemitraan dengan puluhan perusahaan serta vendor logistik; mengamankan 10+ kesepakatan sponsorship dan pasokan produk resmi guna mendukung kebutuhan operasional orientasi ribuan mahasiswa baru universitas.",
      "org.5.period": "Feb 2024 — Jan 2025",
      "org.5.role": "Staf Media dan Jaringan",
      "org.5.context": "Forum Kajian Islam dan Sains Teknologi (FKIST) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.5.title": "Staf Media dan Jaringan • FKIST",
      "org.5.desc": "Bertanggung jawab atas operasional website resmi, publikasi 4 media sosial, dan dokumentasi lapangan untuk seluruh program kerja organisasi, menjaga alur informasi kegiatan tetap aktif dan terarsip rapi, lewat produksi konten promosi berkala serta pelatihan praktis penggunaan tools digital bagi anggota."
    },

    en: {
      /* ---- meta ---- */
      'meta.title': 'Firdy Dwi Aryani — Portfolio',
      "meta.desc": "Portfolio of Firdy Dwi Aryani, an Informatics graduate applying for IT Support and Project Management roles. Experience handling IT incidents in a hospital, managing digital channels, and leading committee operations.",

      /* ---- opening modal ---- */
      'modal.eyebrow': 'PORTFOLIO',
      'modal.title': "<span class=\"block pb-0.5\"><span class=\"intro-line inline-block\">A small space for <span class=\"intro-hl font-extrabold\">my work</span></span></span><span class=\"block pb-1\"><span class=\"intro-line inline-block intro-hl font-extrabold\">and what I pursue.</span></span>",
      'modal.sub': "I’m Firdy, an Informatics graduate from UIN Sunan Kalijaga Yogyakarta. Here, you’ll find the projects I’ve built, the experiences I’ve had, and the technical lessons learned along the way.",
      'modal.cta': "Explore my work and experience",
      'modal.hint': "Follow this little firefly and let’s start exploring.",
      'modal.close': 'Close',
      'tip.start': 'Click to start',

      /* ---- header ---- */
      'nav.intro': 'About',
      'nav.tour': 'Story Guide',
      'tip.tour': 'Start Interactive Firefly Guide',
      'nav.experience': 'Experience',
      'nav.certifications': 'Certifications',
      'nav.projects': 'Projects',
      'nav.organisasi': "Organizations & Committees",
      'nav.contact': 'Contact',
      'aria.theme': 'Toggle theme',
      'aria.menu': 'Menu',
      'aria.lang': 'Change language',
      'aria.langTitle': 'Language: English (click for Indonesian)',

      /* ---- hero ---- */
      'hero.hi': "HELLO, I’M FIRDY DWI ARYANI",
      'hero.role': 'IT Support',
      'hero.line1': "From understanding needs",
      'hero.line2': "to building solutions.",
      'hero.bio': "My professional journey is shaped by diverse roles spanning web development, IT technical support, digital channel operations, and event coordination. Across every role, I have honed the ability to structure operational workflows, maintain rigorous attention to detail, and adapt technical solutions to stakeholder needs. I thrive on diagnosing technical challenges, executing precise resolutions, and ensuring operational reliability.",
      'hero.cv': 'Download ATS CV',
      'tip.cv': 'Download ATS CV (PDF)',
      'tip.linkedin': 'LinkedIn profile',
      'tip.email': 'Send an email',
      'tip.whatsapp': 'Message on WhatsApp',
      'href.mail': "mailto:firdy.dwi@gmail.com?subject=Job%20Opportunity",
      'href.waHero': "https://wa.me/6285894689454?text=Hello%20Firdy,%20I%27m%20interested%20in%20your%20portfolio",
      'href.waContact': "https://wa.me/6285894689454?text=Good%20morning,%20I%27d%20like%20to%20discuss%20a%20collaboration%20opportunity",
      'href.mailContact': 'mailto:firdy.dwi@gmail.com?subject=Collaboration%20Opportunity',

      /* ---- experience ---- */
      'exp.title': "Work Experience",
      'exp.prev': 'Previous slide',
      'exp.next': 'Next slide',
      "exp.challenge": "Challenge",
      "exp.results": "Results & Contributions",
      'exp.scope': "Scope of Work",
      'exp.achievements': "Key Achievements",
      'exp.viewAll': 'View All',
      'exp.viewSlide': 'Slide Mode',
      'exp.allHint': 'Showing all 4 work experiences',
      "exp.hint": "Swipe cards, or use the (>) button and keyboard arrow keys",
      'label.skill': 'Skills',
      "doc.cert": "View certificate",
      "doc.letter": "View employment letter",
      "doc.grad": "View graduation letter",
      "doc.gradBtn": "Graduation Letter",
      "doc.transcript": "Final Transcript",

      /* ---- certifications ---- */
      'cert.title': 'Training & Certifications',
      'cert.sub': "An intensive 6-month accredited program covering Full-Stack Web Development and industry readiness.",

      /* ---- projects ---- */
      'proj.title': "Featured Projects",
      'proj.prev': 'Previous project',
      'proj.next': 'Next project',
      'proj.gallery': "Project gallery (click to view photo):",
      'proj.photos': '3 Photos',
      'proj.need': "Challenge & Need",
      'proj.challenge': "Challenge & Need",
      'proj.solution': "Technical Architecture",
      'proj.impact': "Impact & Key Contributions",
      'proj.liveDemo': "Open Live Demo",

      /* ---- organization ---- */
      'org.title': "Organizations & Committees",
      'org.sub': "Leading operational divisions, managing budgets, and administering official records across campus activities.",

      /* ---- contact ---- */
      'contact.title': "Let’s Connect",
      'contact.sub': "Looking for a dedicated team member? Let’s discuss how I can contribute to your organization.",
      'contact.cvSub': 'Professional ATS summary, 1 page',
      'contact.cvOpen': 'Open CV',
      'form.title': 'Send a Message',
      'form.name': 'Full Name',
      'form.namePh': 'Your full name',
      'form.email': 'Email Address',
      'form.emailPh': 'name@company.com',
      'form.message': 'Message',
      'form.messagePh': "Write the position or topic you’d like to discuss...",
      'form.send': 'Send Message',
      'form.sending': "Sending...",
      'form.sent': "Message sent. Thank you for reaching out.",

      /* ---- scroll navigation ---- */
      'scroll.nav': 'Page scroll navigation',
      'scroll.top': 'Back to top',
      'scroll.bottom': 'Go to bottom',

      /* ---- dots ---- */
      'dots.intro': 'Profile',
      'dots.experience': 'Experience',
      'dots.certifications': 'Certifications',
      'dots.projects': 'Projects',
      'dots.organisasi': "Organizations & Committees",
      'dots.contact': 'Contact',

      /* ---- toast ---- */
      'toast.dark': 'Dark mode enabled',
      'toast.light': 'Light mode enabled',
      'toast.lang': 'Language set to English',

      /* ---- firefly guide ---- */
      'fly.welcome': 'Welcome. Please scroll down.',
      'fly.skip': 'Skip guide \u2192',
      'fly.onb.hello': "Hello! I’m your firefly guide, here to accompany you through Firdy’s portfolio. Ready to explore?",
      'fly.where': "Where shall we go next?",
      'fly.end': "Interactive guide tour complete. Thank you for exploring Firdy’s portfolio.",
      'chip.next': 'Next \u2192',
      "chip.contact": "Contact Firdy",
      'chip.more': 'Tell me more',
      'chip.top': 'Back to top',
      'chip.whatsapp': 'WhatsApp',
      'chip.email': 'Email',
      'chip.linkedin': 'LinkedIn',
      'fly.further.down': " Further down. Scroll ↓",
      'fly.further.up': " Further up. Scroll ↑",
      'fly.exp.fallback': "Read more about the responsibilities and technical tasks handled here.",
      'fly.exp.head': 'Experience {i} of {n}: {title}',
      "fly.exp.result": "Key result: {text}",
      'fly.exp.read': "Want more details? Explore the operational challenge and key contributions.",
      'fly.exp.guideNext': "Finished reading? Press (>) to move to the next experience.",
      'fly.exp.guideLast': "That covers the work experiences! Next, let’s explore Firdy’s training and certifications.",
      'fly.intro.read': "Here is an overview of Firdy’s profile, with quick access to CV download, LinkedIn, email, and WhatsApp.",
      'fly.onb.theme': "Before we start, let’s take a look at a couple of key controls!",
      'fly.onb.themeDone': "You can toggle between light and dark modes anytime. Returning it to your initial setting now.",
      'fly.onb.themeBack': "There is one more handy control!",
      'fly.onb.lang': "This portfolio is available in two languages!",
      'fly.onb.langDone': "Indonesian or English—choose whichever is most comfortable. Switching back to your selection now.",
      'fly.onb.langBack': "Now, let’s get to know Firdy!",
      'fly.intro.guide': "Use the ↑ and ↓ buttons on the right to navigate sections. Press ↓ to view work experiences.",
      'fly.cert.read': "Here you can inspect Firdy’s accredited credentials and download verified PDF certificates.",
      'fly.cert.guide': "Press ↓ on the right to explore featured software projects.",
      'fly.proj.read': "There are {n} featured software projects. Swipe cards or use navigation buttons to browse. You can also click thumbnails to change previews.",
      'fly.proj.guide': "You’ve seen all three featured projects. Now, let’s explore Firdy’s leadership in student organizations and committees!",
      'fly.org.read': "This section highlights Firdy’s active roles in campus leadership, event operations, and logistics coordination.",
      'fly.org.guide': "Press ↓ on the right to proceed to the contact section.",
      'fly.contact.read': "You can connect with Firdy directly via WhatsApp, LinkedIn, email, or through the inquiry form.",
      'fly.contact.guide': "Choose whichever channel is convenient. For the fastest response, try WhatsApp.",
      "fly.skill.every": "{name} is featured across every single experience here. It is one of Firdy’s core strengths.",
      "fly.skill.some": "{name} is applied across {n} of {total} experiences here.",

      /* ---- Work Experience Cards ---- */
      /* 1. UIN Sunan Kalijaga */
      "exp.1.title": "Website, Email & Social Media Administrator",
      "exp.1.company": "Faculty of Science & Technology, UIN Sunan Kalijaga",
      "exp.1.period": "Feb 2026 — Aug 2026",
      "exp.1.p1": "Centralized publication needs across 9 academic study programs and 20+ faculty events demanded strict scheduling, standardized multi-channel content, and responsive stakeholder coordination.",
      "exp.1.b1": "Managed publication needs for 9 study programs and 20+ faculty events in parallel and end-to-end, ranging from visual identity design and promotional materials to digital content production, advertising, and documentation, scheduled according to academic calendars and deadlines.",
      "exp.1.b2": "Coordinated publication and information system requirements with lecturers, staff, and event committees, from requirement gathering and technical specifications to ensuring on-time project delivery.",
      "exp.1.b3": "Managed 4 faculty digital channels (website, Instagram, Facebook, and YouTube), covering information updates, content management, as well as website front-end editing and enhancement.",

      /* 2. Vinix Seven Aurum */
      "exp.2.title": "Junior Web Developer & UI/UX Designer — Intern",
      "exp.2.company": "PT Vinix Seven Aurum",
      "exp.2.period": "Aug 2025 — Dec 2025",
      "exp.2.p1": "Clients and end users required a fast, stable, and production-ready commercial web directory capable of processing high-volume merchant data while maintaining seamless visual responsiveness across diverse devices.",
      "exp.2.b1": "Maintained commercial web platform operational stability for on-schedule deployment by developing PHP backend modules and structuring clean system logic.",
      "exp.2.b2": "Designed and managed relational MySQL database structures for merchant profiles, menus, and reviews to ensure smooth directory search and filtering workflows.",
      "exp.2.b3": "Received a Very Good performance rating from management for overall internship contributions by delivering technical tasks on time and collaborating actively with the team.",

      /* 3. KAI Medika */
      "exp.3.title": "IT Support Staff",
      "exp.3.company": "PT KAI Medika Indonesia • Brawijaya Hospital Tangerang",
      "exp.3.period": "Jul 2025 — Aug 2025",
      "exp.3.p1": "Hospital operations spanning a 5-story facility demanded maximum uptime for hardware, medical software, and network infrastructure to prevent any disruption in clinical services.",
      "exp.3.b1": "Resolved 15+ daily IT incident tickets end-to-end across a 5-story hospital facility from triage to resolution, covering hardware, operating systems, and network troubleshooting (IP configuration, server connectivity) both on-site and remotely via AnyDesk.",
      "exp.3.b2": "Optimized self-service check-in kiosk operations by designing on-device visual instruction guides, successfully easing queue congestion and streamlining patient registration.",
      "exp.3.b3": "Restructured inventory management for 300+ hospital IT assets using unique barcode IDs, processed hardware procurement requisitions, and completed workstation and network setups for the new building wing.",

      /* 4. Diskominfo Lebak */
      "exp.4.title": "IT Helpdesk & Infrastructure Staff",
      "exp.4.company": "Statistics & Cryptography Division, Diskominfo Lebak Regency",
      "exp.4.period": "Jul 2024 — Aug 2024",
      "exp.4.p1": "Local government operations required constant cybersecurity monitoring against digital defacement and official digital certificate management to validate official civil servant documentation.",
      "exp.4.b1": "Monitored official municipal web services against security incidents such as web defacement and unauthorized content injections, preparing incident escalation reports.",
      "exp.4.b2": "Processed registration and cryptographic verification for civil servant digital signatures in coordination with the National Electronic Certification Agency (BSrE).",
      "exp.4.b3": "Delivered technical helpdesk assistance to civil servants and citizens resolving account authentication and municipal e-service access issues.",

      /* ---- Certifications ---- */
      "cert.1.title": "Coding Camp powered by DBS Foundation",
      "cert.1.meta": "Dicoding Academy x DBS Foundation 2025",
      "cert.track": "Full-Stack Web Development Track",
      "tip.cert1": "Download Coding Camp certificate",
      "cert.s1": "Intensive Hours",
      "cert.s2.n": "12",
      "cert.s2": "Curriculum Modules",
      "cert.s3": "Months Training",
      "cert.s4": "Full Attendance",
      "cert.badge": "Officially Verified Graduate",
      "cert.selectivity": "Selected from 63,000 National Applicants",
      "cert.1.pitch": "Selected from 63,356 applicants (5% acceptance rate) for the intensive scholarship program in collaboration with DBS Foundation and Dicoding Academy, with a 910-hour curriculum accredited by Kemendikbudristek. The curriculum covered computational logic, modern front-end, RESTful APIs with Node.js and Hapi, AWS cloud computing, and business communication with The British Institute. I completed it with Grade A distinction, Full Graduate status, and a final Capstone project score of 96.4 out of 100.",
      "cert.skills.title": "Tested Competencies:",
      "cert.docs.title": "Official Credentials & Documents",
      "cert.vault.all": "All 14 Certificates",
      "cert.showcase.verified": "Officially Verified",
      "cert.showcase.page1": "Page 1: Graduation Certificate",
      "cert.showcase.page2": "Page 2: Official Academic Transcript",
      "cert.showcase.zoom": "Click to Enlarge",
      "cert.showcase.tab1": "Graduation Certificate",
      "cert.showcase.tab2": "Full Grade Transcript",
      "cert.eval.title": "Graduation Evaluation Summary",
      "cert.eval.status": "Full Graduate",
      "cert.eval.pred": "Grade Distinction",
      "cert.eval.predVal": "A",
      "cert.eval.predSub": "Highly Satisfactory",
      "cert.eval.cap": "Capstone Project",
      "cert.eval.capVal": "96.4",
      "cert.eval.capSub": "Out of 100",
      "cert.eval.soft": "Soft Skills",
      "cert.eval.softVal": "93.2",
      "cert.eval.softSub": "Business English",
      "cert.skills.heading": "Skills & Curriculum (910 Learning Hours)",
      "cert.skill.softTitle": "Soft Skills & Communication",
      "cert.skill.collab": "Team Collaboration",
      "cert.vault.grad": "Graduation & Transcript (2)",
      "cert.vault.fe": "Front-End & Web (4)",
      "cert.vault.be": "JavaScript & Back-End (3)",
      "cert.vault.found": "Cloud, AI & Soft Skills (5)",
      "cert.vault.search": "Search modules, skills, or curriculum...",
      "cert.vault.view": "Open Document",
      "cert.vault.download": "Download PDF",
      "cert.vault.dirTitle": "12 Learning Modules",
      "cert.vault.inspectorTitle": "Official Credential Inspector",
      "cert.vault.verified": "Officially Verified Graduate",
      "cert.vault.hint": "Select any module from the syllabus to inspect credentials and download original files.",
      "cert.fan.all": "All Documents (24)",
      "cert.fan.dbs": "DBS x Dicoding Scholarship (14)",
      "cert.fan.work": "Work & Internships (4)",
      "cert.fan.org": "Organizations & Campus (5)",
      "cert.fan.view": "View Document",
      "cert.fan.download": "Download PDF",
      "cert.fan.hint": "Select or swipe cards in the fan to inspect credentials and download PDFs",
      "cert.fan.allList": "Complete List of All 24 Documents",
      "cert.fan.selected": "Currently Selected",
      "cert.tab.grad": "Graduation & Transcript (2)",
      "cert.tab.fe": "Front-End & Web (4)",
      "cert.tab.be": "JavaScript & Back-End (3)",
      "cert.tab.found": "Cloud, AI & Soft Skills (5)",
      "cert.doc1.t": "Main Graduation Certificate",
      "cert.doc1.d": "Official certificate for the 6-month Full-Stack Web Development track, covering 910 hours of verified theory and hands-on coding.",
      "cert.doc2.t": "Official Completion Letter",
      "cert.doc2.d": "Official Letter from DBS Foundation",
      "cert.doc3.t": "Academic Grade Transcript",
      "cert.doc3.d": "Detailed grade record across all 12 modules completed with 100% attendance and all software project submissions passed.",
      "cert.toggle.btn": "Open 12 Accredited Module Certificates",
      "cert.sup.title": "12 Complete Accredited Module Certificates",
      "cert.sup.sub": "Each module is officially verified by Dicoding Academy, AWS, and The British Institute.",
      "cert.g1": "Front-End & Web",
      "cert.g2": "JavaScript & Back-End",
      "cert.g3": "Foundations & Electives",
      "doc.certBtn": "Certificate",

      /* ---- Projects ---- */
      "proj.1.name": "Multi-LLM SRS Document Authoring System",
      "proj.1.tagline": "AI-Guided IEEE-Compliant Software Requirements Specification Platform with Multi-LLM Support",
      "proj.1.period": "Undergraduate Thesis • 2026",
      "proj.1.title": "Multi-LLM SRS Authoring System",
      "proj.1.meta": "Bachelor Thesis • 2026",
      "proj.1.tag": "Full-Stack & AI",
      "proj.1.alt": "Screenshot of Multi-LLM SRS authoring web application",
      "proj.1.need": "Software engineers and academic researchers frequently struggle with structuring standardized Software Requirements Specification (SRS) documents compliant with IEEE standards (e.g., IEEE 830). Manual drafting requires days of effort, is prone to formatting discrepancies, and using unguided generative AI often yields hallucinations misaligned with technical requirements.",
      "proj.1.role": "Full-Stack Developer & Prompt Engineer (Solo Project)",
      "proj.1.sol": "Architected and built an independent full-stack web application (JavaScript & Node.js Express REST API) serving as an interactive step-by-step wizard: guiding users through system requirement definitions, constraining LLMs with rigorous guardrails to prevent hallucinations, and seamlessly integrating multi-LLM providers (OpenAI, Claude, Gemini, DeepSeek, Groq, and local models) with live UI key configuration.",
      "proj.1.ph1": "Photo 1: Home & Workflow",
      "proj.1.lb1": "1. Home",
      "proj.1.ph2": "Photo 2: LLM Provider Selection",
      "proj.1.lb2": "2. LLM Providers",
      "proj.1.ph3": "Photo 3: Generated SRS Document",
      "proj.1.lb3": "3. SRS Result",
      "proj.1.b1": "Guides users from scratch to generate a structured, industry-standard specification document with consistent formatting.",
      "proj.1.b2": "Strict system prompt guardrails ensure generated functional and non-functional specifications are realistic, technically feasible, and developer-ready.",
      "proj.1.b3": "Supports paid cloud LLMs, free-tier services, and offline local models, enabling instant one-click export to DOCX and Markdown formats.",

      "proj.2.name": "Bali Kuliner Finder",
      "proj.2.tagline": "Interactive Bali Culinary Directory & Guide with Smart Categorization and Turn-by-Turn Route Navigation",
      "proj.2.role": "Web Developer & UI Designer",
      "proj.2.period": "PT Vinix Seven Aurum • 2025",
      "proj.2.title": "Bali Kuliner Finder • Commercial Culinary Platform for Bali",
      "proj.2.meta": "PT Vinix Seven Aurum • Aug 2025 — Dec 2025",
      "proj.2.tag": "Web App & UI/UX",
      "proj.2.alt": "Screenshot of commercial Bali Kuliner Finder directory platform",
      "proj.2.need": "Travelers visiting Bali frequently struggle to discover dining spots matching their specific dietary needs—ranging from verified halal certifications and authentic local cuisines to scenic sunset viewpoints and trustworthy customer reviews.",
      "proj.2.sol": "Collaborated within the development team at PT Vinix Seven Aurum to build a comprehensive directory: developed interactive Figma UI prototypes, architected relational MySQL database structures, built PHP backend logic, and delivered multi-category filters, user review & bookmarking systems, and map navigation.",
      "proj.2.ph1": "Photo 1: Home & Quick Search",
      "proj.2.lb1": "1. Home & Search",
      "proj.2.ph2": "Photo 2: Filtered Halal Search Results",
      "proj.2.lb2": "2. Search Results",
      "proj.2.ph3": "Photo 3: Merchant Details & Hours",
      "proj.2.lb3": "3. Merchant Details",
      "proj.2.ph4": "Photo 4: Location Map & Driving Route",
      "proj.2.lb4": "4. Location Map",
      "proj.2.photos": "4 Photos",
      "proj.2.b1": "Distinct segregation of Halal and Non-Halal dining options, combined with multi-parameter filtering for scenic views, ratings, user bookmarks, and nearest distance.",
      "proj.2.b2": "Enables visitors to leave star ratings, publish authentic dining reviews, and bookmark preferred venues to personalized lists.",
      "proj.2.b3": "Integrated interactive mapping allowing users to immediately trigger driving directions to any dining destination directly in-browser.",

      "proj.3.name": "BorobudurTales",
      "proj.3.tagline": "AI Camera-Powered Cultural Education & Relief Identification Web Application",
      "proj.3.role": "Front-End Developer (Capstone Team)",
      "proj.3.period": "Coding Camp • 2025",
      "proj.3.title": "BorobudurTales • AI Cultural Heritage Web App",
      "proj.3.meta": "Capstone Team • 2025",
      "proj.3.tag": "Front-End & AI",
      "proj.3.alt": "Screenshot of BorobudurTales web application",
      "proj.3.need": "Most visitors to Borobudur Temple appreciate its architectural beauty without understanding the historical narratives and moral lessons carved into its stone reliefs. Furthermore, digital references for individual Karmawibhangga relief panels remain scarce and fragmented, hindering self-guided cultural discovery.",
      "proj.3.sol": "Served as Front-End Developer in an interdisciplinary Capstone team: engineered a modern, responsive web application (Tailwind CSS & Vite), implemented real-time camera capture workflows, and seamlessly connected user photo inputs to machine learning prediction endpoints for immediate cultural storytelling.",
      "proj.3.ph1": "Photo 1: Image Upload & Camera",
      "proj.3.lb1": "1. Upload & Camera",
      "proj.3.ph2": "Photo 2: Prediction Narrative",
      "proj.3.lb2": "2. Prediction Narrative",
      "proj.3.ph3": "Photo 3: Cultural Story Archive",
      "proj.3.lb3": "3. Story Archive",
      "proj.3.b1": "Transforms casual tourism into active cultural learning; visitors simply aim their device camera at a relief to instantly uncover its historical narrative and moral context.",
      "proj.3.b2": "Delivers a comprehensive digital catalog of Karmawibhangga reliefs searchable both through keyword queries and visual photo matching.",
      "proj.3.b3": "Optimized mobile web performance ensuring camera captures, image compression, and dynamic story rendering run smoothly on handheld devices.",

      /* ---- Organizations (5 Items) ---- */
      "org.1.period": "Sep 2024 — Oct 2024",
      "org.1.role": "Logistics Coordinator",
      "org.1.context": "Symphony of Saintek 20th Extravaganza <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">Faculty of Science & Technology, UIN Sunan Kalijaga</span>",
      "org.1.title": "Logistics Coordinator • Symphony of Saintek 20th Extravaganza",
      "org.1.desc": "Led logistics operations and stage equipment procurement for the Faculty's 20th Dies Natalis. Managed vendor selection, on-site hardware setup, and inventory control to ensure all events ran smoothly without technical delays.",

      "org.2.period": "Jan 2023 — Dec 2024",
      "org.2.role": "Interests & Talents Division Staff",
      "org.2.context": "Himpunan Mahasiswa Informatika (HMPS Informatika) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.2.title": "Interests & Talents Division Staff • HMPS Informatika",
      "org.2.desc": "Directed operational coordination for Informatics student talents and oversaw division events: managed budget allocations as Treasurer for student orientation, and handled participant communications and registration workflows as Public Relations for the annual tournament to ensure smooth, on-schedule execution.",

      "org.3.period": "Apr 2023 — Nov 2023",
      "org.3.role": "Executive Secretary",
      "org.3.context": "UIN Informatic Competition 5.0 (UINIC) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">HMPS Informatika, UIN Sunan Kalijaga</span>",
      "org.3.title": "Executive Secretary • UINIC 5.0",
      "org.3.desc": "Managed participant registration administration for UIN IT Competition (UINIC), an annual regional IT competition in Yogyakarta with multiple contest categories, verifying complete registration files across all teams using spreadsheets for technical meeting readiness; drafted official university permits and vendor agreements, and issued digital certificates for participants and committee members on schedule.",

      "org.4.period": "Aug 2022 — Sep 2022",
      "org.4.role": "Public Relations & Sponsorship",
      "org.4.context": "Penyambutan Mahasiswa Baru (Welcoming Ceremony) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">BEM & Senat Mahasiswa Universitas (DEMA & SEMA UIN)</span>",
      "org.4.title": "Public Relations & Sponsorship • Welcoming Ceremony, DEMA & SEMA",
      "org.4.desc": "Led external communications and technical sponsorship negotiations with corporate partners and logistics vendors; secured 10+ sponsorship agreements and official product supplies supporting orientation operations for thousands of university freshmen.",

      "org.5.period": "Feb 2024 — Jan 2025",
      "org.5.role": "Media & Network Staff",
      "org.5.context": "Islamic & Science Technology Study Forum (FKIST) <span class=\"text-slate-400 dark:text-slate-500 font-normal\">•</span> <span class=\"text-slate-500 dark:text-slate-400 font-normal\">UIN Sunan Kalijaga</span>",
      "org.5.title": "Media & Network Staff • FKIST",
      "org.5.desc": "Responsible for managing the official website, publications across 4 social media channels, and on-site event coverage for all organization initiatives, maintaining active and well-archived information workflows through regular promotional content production and practical digital tools training for members."
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
