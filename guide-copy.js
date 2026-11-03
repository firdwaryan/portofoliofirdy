/* ============================================================
   Kustomisasi Posisi Kunang-Kunang per Halaman / Seksi. EDIT DI SINI.
   leftPct : posisi horizontal (persen dari lebar layar, 0% - 100%)
   topPx   : jarak vertikal dari tepi atas layar (piksel)
   desktop : layar laptop / PC (lebar >= 768px)
   mobile  : layar tablet / HP (lebar < 768px)
   ============================================================ */
window.FLY_POSITIONS = {
  intro:          { desktop: { leftPct: 84, topPx: 120 }, mobile: { leftPct: 76, topPx: 80 } },
  experience:     { desktop: { leftPct: 84, topPx: 105 }, mobile: { leftPct: 76, topPx: 80 } },
  certifications: { desktop: { leftPct: 84, topPx: 110 }, mobile: { leftPct: 76, topPx: 80 } },
  projects:       { desktop: { leftPct: 84, topPx: 105 }, mobile: { leftPct: 76, topPx: 80 } },
  organisasi:     { desktop: { leftPct: 84, topPx: 110 }, mobile: { leftPct: 76, topPx: 80 } },
  contact:        { desktop: { leftPct: 84, topPx: 110 }, mobile: { leftPct: 76, topPx: 80 } },
};

/* ============================================================
   Teks kunang-kunang pemandu — dua bahasa (id / en). EDIT DI SINI.
   hook  = satu kalimat saat tiba di bagian (jangan ulangi isi layar)
   story = muncul saat tombol "Ceritakan lebih" / "Tell me more" diklik
   nudge = ajakan setelah ±5 detik (diikuti tombol pilihan)
   Bahasa aktif dipilih oleh i18n.js, yang mengisi window.FLY_COPY.
   Urutan experience[] dan projects[] mengikuti urutan kartu di index.html.
   ============================================================ */
window.FLY_COPY_ALL = {
  id: {
    asks: [
      'Ada bagian yang ingin Anda lihat?',
      'Ingin melanjutkan ke bagian mana?',
      'Ingin melanjutkan penelusuran atau melihat cerita lainnya?'
    ],
    end: 'Tur panduan interaktif telah selesai. Terima kasih telah menjelajahi portofolio Firdy.',

    intro: {
      hook:  'Mari mengenal Firdy lebih dekat. Saya siap memandu Anda!',
      story: 'Firdy terbiasa menangani tantangan teknis IT dan menata pekerjaan operasional secara terstruktur. Bagian selanjutnya akan menunjukkan bagaimana ia bekerja.',
      nudge: 'Setelah mengenal profil, mari kita lihat pengalaman kerja Firdy!'
    },

    experience: [
      {
        // 0. Brawijaya Hospital Tangerang (IT Support Intern)
        hook:  'Di rumah sakit 5 lantai, Firdy menangani lebih dari 15 tiket insiden IT harian di lokasi maupun secara remote.',
        story: 'Di Brawijaya Hospital Tangerang, Firdy menyelesaikan 15+ tiket insiden IT harian, mengoptimalkan mesin kiosk pendaftaran mandiri pasien, serta menata 300+ aset IT rumah sakit dengan sistem barcode ber-ID unik.',
        nudge: 'Lanjut ke pengalaman kerja Firdy berikutnya?'
      },
      {
        // 1. Diskominfo Kab. Lebak (Staf Magang Bidang Statistika & Persandian)
        hook:  'Firdy memfasilitasi penerbitan tanda tangan digital resmi ASN dan memantau keamanan siber portal web daerah.',
        story: 'Di Diskominfo Kab. Lebak, Firdy memproses penerbitan tanda tangan digital tersertifikasi BSrE untuk dokumen dinas ASN, memonitor situs pemda dari potensi insiden peretasan, serta mengedukasi puluhan aparatur sipil daerah.',
        nudge: 'Lanjut ke pengalaman kerja Firdy berikutnya?'
      },
      {
        // 2. Fakultas Sains dan Teknologi UIN Sunan Kalijaga (Digital Communication Officer)
        hook:  'Firdy mengelola komunikasi publik, publikasi digital, dan email dinas lintas 9 program studi fakultas.',
        story: 'Firdy mengoordinasikan publikasi terintegrasi 9 program studi dan 20+ agenda fakultas, merancang 50+ konten promosi multimedia, serta menata standarisasi email dinas hingga memangkas waktu respon layanan informasi publik sebesar 40%.',
        nudge: 'Masih ada satu pengalaman kerja lagi.'
      },
      {
        // 3. PT Vinix Seven Aurum (Junior Web Developer & UI/UX Designer — Intern)
        hook:  'Firdy berkolaborasi dalam tim pengembang untuk membangun platform web direktori kuliner komersial.',
        story: 'Di PT Vinix Seven Aurum, Firdy merancang prototipe antarmuka di Figma, menyusun database relasional MySQL, dan mengembangkan backend PHP untuk Bali Kuliner Finder hingga memperoleh evaluasi kinerja "Sangat Baik".',
        nudge: 'Berikutnya: pelatihan intensif dan sertifikasi Firdy.'
      }
    ],

    certifications: {
      hook:  'Firdy menuntaskan program beasiswa intensif 6 bulan (910 jam pembelajaran terakreditasi) dengan kurikulum Full-Stack Web berstandar industri.',
      story: 'Terpilih melalui seleksi nasional dari 63.356 pendaftar (penerimaan 5%), Firdy menyelesaikan 12 modul kurikulum berstandar industri dengan predikat kelulusan Grade A, kehadiran penuh 100%, serta nilai Capstone 96,4 dari skala 100.',
      nudge: 'Berikutnya, mari kita lihat proyek-proyek unggulan yang dibangun Firdy.'
    },

    projects: [
      {
        // 0. Skripsi S1 - Multi-LLM SRS
        hook:  'Proyek Skripsi S1: Firdy membangun aplikasi web wizard pemandu dokumen SRS terintegrasi Multi-LLM.',
        story: 'Aplikasi web full-stack mandiri (JavaScript & Node.js Express REST API) ini memandu perumusan kebutuhan perangkat lunak dengan guardrail prompt ketat, serta fleksibel dihubungkan ke OpenAI, Claude, Gemini, DeepSeek, Groq, hingga model lokal.',
        nudge: 'Geser ke proyek Firdy berikutnya?'
      },
      {
        // 1. Bali Kuliner Finder
        hook:  'Bali Kuliner Finder: platform direktori kurasi kuliner halal dengan filter cerdas dan peta rute.',
        story: 'Dalam proyek perusahaan di PT Vinix Seven Aurum, Firdy berkolaborasi merancang antarmuka interaktif di Figma, merancang arsitektur database MySQL, serta membangun fitur backend PHP dan peta navigasi rute.',
        nudge: 'Masih ada satu proyek unggulan lagi.'
      },
      {
        // 2. BorobudurTales
        hook:  'BorobudurTales: aplikasi web edukasi budaya yang mengidentifikasi relief candi melalui kamera AI.',
        story: 'Sebagai Front-End Developer dalam tim proyek Capstone (nilai akhir 96,4), Firdy membangun antarmuka web interaktif yang modern dan responsif, serta menghubungkan tangkapan kamera pengguna langsung ke endpoint API Machine Learning tim.',
        nudge: 'Itu seluruh proyeknya. Selanjutnya, mari lihat peran organisasi dan kepanitiaan Firdy.'
      }
    ],

    organisasi: {
      hook:  'Firdy memiliki rekam jejak kepemimpinan, koordinasi operasional, dan kepanitiaan yang solid.',
      story: 'Firdy aktif mengemban peran penting di lingkungan kampus—mulai dari Koordinator Logistik untuk perhelatan 20 tahun fakultas, Sekretaris Pelaksana kompetisi nasional UINIC 5.0, Humas & Kemitraan universitas, hingga divisi minat bakat dan publikasi media.',
      nudge: 'Kita telah sampai di bagian akhir. Ingin terhubung langsung dengan Firdy?'
    },

    contact: {
      hook:  'Firdy terbuka untuk peluang karier profesional dan kerja sama baru.',
      story: 'Firdy siap berkontribusi untuk posisi IT Support, Web Development, maupun peran operasional teknologi lainnya. Anda dapat menghubungi Firdy secara langsung melalui WhatsApp, LinkedIn, email, atau formulir kontak.',
      nudge: 'Silakan pilih cara yang paling nyaman untuk menghubungi Firdy. Untuk respon tercepat, tombol WhatsApp siap digunakan.'
    }
  },

  en: {
    asks: [
      'Is there a section you would like to explore?',
      'Where would you like to go next?',
      'Would you like to keep exploring or read another story?'
    ],
    end: 'Interactive guide tour complete. Thank you for exploring Firdy’s portfolio.',

    intro: {
      hook:  'Let’s get to know Firdy better. I’m ready to guide you!',
      story: 'Firdy is adept at resolving technical IT challenges and managing structured operational workflows. The following sections demonstrate her practical capabilities.',
      nudge: 'Now that you’ve seen the overview, let’s explore Firdy’s work experience!'
    },

    experience: [
      {
        // 0. Brawijaya Hospital Tangerang
        hook:  'Across a 5-story hospital, Firdy resolved 15+ daily IT incident tickets on-site and remotely.',
        story: 'At Brawijaya Hospital Tangerang, Firdy handled over 15 IT incident tickets per day across 5 floors, optimized patient self-service check-in kiosks, and cataloged 300+ hospital IT assets with unique barcode labels.',
        nudge: 'On to Firdy’s next work experience?'
      },
      {
        // 1. Diskominfo Kab. Lebak
        hook:  'Firdy facilitated official digital signatures for civil servants and monitored regional cyber safety.',
        story: 'At Diskominfo Lebak Regency, Firdy processed BSrE-certified digital signatures for official government records, monitored regional portals for cyber incidents, and trained civil service personnel on digital security.',
        nudge: 'On to Firdy’s next work experience?'
      },
      {
        // 2. Faculty of Science & Technology
        hook:  'Firdy led integrated digital communication, official email, and social media across 9 university departments.',
        story: 'Firdy coordinated centralized publications for 9 academic study programs and 20+ faculty events, created 50+ multimedia assets, and standardized official email workflows to reduce inquiry response times by 40%.',
        nudge: 'One more work experience to explore.'
      },
      {
        // 3. PT Vinix Seven Aurum
        hook:  'Firdy collaborated within a developer team to build a commercial culinary directory platform.',
        story: 'At PT Vinix Seven Aurum, Firdy developed interactive Figma UI prototypes, designed relational MySQL schemas, and engineered PHP backend functionality for Bali Kuliner Finder, earning a “Very Good” performance rating.',
        nudge: 'Next up: Firdy’s intensive training and certifications.'
      }
    ],

    certifications: {
      hook:  'Firdy completed an intensive 6-month, 910-hour accredited Full-Stack Web Development scholarship program.',
      story: 'Selected nationwide from 63,356 applicants (5% admission rate), Firdy mastered 12 industry-standard modules covering front-end, back-end Node.js, and AWS Cloud, graduating with Grade A honors, 100% attendance, and a 96.4 Capstone score.',
      nudge: 'Next, let’s explore the featured projects Firdy has built.'
    },

    projects: [
      {
        // 0. Thesis - Multi-LLM SRS
        hook:  'Bachelor Thesis: Firdy developed a guided web application for SRS document authoring powered by Multi-LLMs.',
        story: 'This independent full-stack system (JavaScript & Node.js Express REST API) guides users through software requirements with strict prompt guardrails, integrating multi-LLM providers including OpenAI, Claude, Gemini, DeepSeek, and Groq.',
        nudge: 'Swipe to Firdy’s next project?'
      },
      {
        // 1. Bali Kuliner Finder
        hook:  'Bali Kuliner Finder: a commercial culinary directory featuring smart category filtering and route navigation.',
        story: 'Within a company project at PT Vinix Seven Aurum, Firdy collaborated to design Figma UI prototypes, architect relational MySQL tables, and implement PHP backend search and map navigation.',
        nudge: 'One more featured project to see.'
      },
      {
        // 2. BorobudurTales
        hook:  'BorobudurTales: an AI cultural education web app that identifies temple reliefs from camera capture.',
        story: 'As Front-End Developer in an interdisciplinary Capstone team (96.4 final score), Firdy built a modern responsive interface and connected user camera captures directly to the team’s Machine Learning endpoints.',
        nudge: 'Those are all the projects. Next, let’s explore Firdy’s leadership in student organizations and committees.'
      }
    ],

    organisasi: {
      hook:  'Firdy has a solid track record in campus leadership, event operations, and logistics coordination.',
      story: 'Firdy has held key responsibilities across campus—including Logistics Coordinator for the faculty’s 20th anniversary, Executive Secretary for the national UINIC 5.0 competition, Public Relations for university ceremonies, and student media division staff.',
      nudge: 'We’ve arrived at the final section. Would you like to connect with Firdy directly?'
    },

    contact: {
      hook:  'Firdy is open to full-time career opportunities and professional collaborations.',
      story: 'Firdy is ready to contribute to IT Support, Web Development, and IT Operations roles. Feel free to reach out directly via WhatsApp, LinkedIn, email, or the contact form.',
      nudge: 'Choose whichever contact method is most convenient for you. For the fastest reply, try the WhatsApp button.'
    }
  }
};

window.FLY_COPY = window.FLY_COPY_ALL.id;
