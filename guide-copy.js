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
  asks: ['Ya? Ada yang mau kamu lihat?', 'Mau lanjut ke bagian mana?', 'Psst… mau lanjut menjelajah atau melihat cerita lainnya?'],
  end:  'Selesai deh tur kita! Terima kasih sudah ikut menjelajah.',

  intro: {
    hook:  'Kenalan dulu dengan Firdy, yuk. Aku tunggu di sini!',
    story: 'Firdy terbiasa menangani masalah dan menata pekerjaan sampai tuntas. Pengalaman berikutnya akan menunjukkan caranya bekerja.',
    nudge: 'Sudah kenalan? Sekarang, kita lihat pengalaman kerja Firdy!'
  },

  experience: [
    {
      hook:  'Website, email, dan media sosial fakultas: tiga kanal, satu informasi yang konsisten.',
      story: 'Ini pengalaman terbaru saya: memastikan informasi Fakultas Sains dan Teknologi sama dan rapi di semua kanal resmi.',
      nudge: 'Lanjut ke pengalaman berikutnya?'
    },
    {
      hook:  'Dari desain sampai kode, saya kerjakan sendiri.',
      story: 'Lima bulan membangun Bali Kuliner Finder dengan PHP untuk proyek nyata perusahaan. Semua tugas selesai dan dinilai “sangat baik”.',
      nudge: 'Lanjut ke pengalaman berikutnya?'
    },
    {
      hook:  'Di rumah sakit, gangguan IT tidak bisa menunggu, dan sayalah yang pertama dihubungi.',
      story: 'Di Brawijaya Hospital Tangerang, sekitar 9 tiket per hari masuk ke saya lebih dulu. Saya catat lewat ticketing, tangani dari jarak jauh dengan AnyDesk, dan hubungi vendor bila perlu.',
      nudge: 'Masih ada satu pengalaman lagi.'
    },
    {
      hook:  'Membantu pegawai ASN punya tanda tangan digital yang sah.',
      story: 'Di Diskominfo Lebak, saya membantu membuat tanda tangan digital dan memvalidasi dokumen elektronik sesuai prosedur, sambil belajar keamanan siber dan data.',
      nudge: 'Berikutnya: pelatihan dan sertifikasi.'
    }
  ],

  certifications: {
    hook:  'Enam bulan dan 910 jam belajar web front-end dan back-end, dengan nilai rata-rata 91,2.',
    story: 'Materinya mencakup dasar pemrograman, Git, dan JavaScript hingga capstone berbasis tim. Sembilan dari sebelas modul mendapat nilai A, dengan kehadiran 100%.',
    nudge: 'Berikutnya, kita lihat proyek-proyek yang pernah Firdy bangun.'
  },

  projects: [
    {
      hook:  'Skripsi: aplikasi yang membantu developer menyusun SRS dengan AI.',
      story: 'Aplikasi JavaScript yang terhubung ke lima model AI: GPT, Claude, Gemini, DeepSeek, dan Grok.',
      nudge: 'Geser ke proyek berikutnya?'
    },
    {
      hook:  'Bali Kuliner Finder: bantu wisatawan muslim cari makanan halal.',
      story: 'Proyek nyata perusahaan, saya kerjakan sendiri dari desain UI/UX sampai kode PHP.',
      nudge: 'Satu proyek lagi.'
    },
    {
      hook:  'BorobudurTales: kenali relief Karmawibhangga dari satu foto.',
      story: 'Unggah foto atau pakai kamera, lalu baca narasi hasil prediksinya. Saya mengerjakan front-end dan back-end, termasuk login dua peran dan dashboard admin.',
      nudge: 'Itu semua proyeknya. Selanjutnya kepanitiaan dan organisasi.'
    }
  ],

  organisasi: {
    hook:   'Mengatur pekerjaan dan bekerja bersama orang lain juga bagian dari pengalaman Firdy.',
    story: 'Dari koordinator logistik, bendahara, hingga sekretaris, Firdy pernah menangani kebutuhan logistik, anggaran, dan dokumen kegiatan.',
    nudge: 'Nah, kita sampai di bagian terakhir. Mau menyapa Firdy?'
  },

  contact: {
    hook:  'Sampai di sini tur kita. Mau menghubungi Firdy?',
    story: 'Kalau ingin balasan lebih cepat, WhatsApp bisa jadi pilihan. Email dan LinkedIn juga tersedia.',
    nudge: 'Pilih cara yang paling nyaman untuk menghubungi Firdy. Untuk balasan lebih cepat, coba tombol WhatsApp.'
  }
},
  en: {
  asks: ['Yes? What would you like to explore?', 'Where shall we go next?', 'Psst… ready to keep exploring or see another story?'],
  end:  'And that’s our tour! Thanks for exploring the portfolio with me.',

  intro: {
    hook:  'Let’s start by getting to know Firdy. I’ll be right here!',
    story: 'Firdy is used to troubleshooting problems and keeping work on track. The next sections will give you a closer look at how she works.',
    nudge: 'All caught up? Let’s take a look at Firdy’s work experience!'
  },

  experience: [
    {
      hook:  'The faculty’s website, email, and social media: three channels, one consistent message.',
      story: 'My most recent role: making sure the Faculty of Science and Technology’s information is the same and well organized across every official channel.',
      nudge: 'On to the next experience?'
    },
    {
      hook:  'From design to code, I built it all myself.',
      story: 'Five months building Bali Kuliner Finder in PHP for a real company project. Every task was completed and rated “very good”.',
      nudge: 'On to the next experience?'
    },
    {
      hook:  'In a hospital, IT problems can’t wait, and I was the first person called.',
      story: 'At Brawijaya Hospital Tangerang, about 9 tickets a day came to me first. I logged them in the ticketing system, fixed them remotely with AnyDesk, and called the vendor when needed.',
      nudge: 'One more experience to go.'
    },
    {
      hook:  'Helping civil servants get valid digital signatures.',
      story: 'At Diskominfo Lebak, I helped set up digital signatures and validate electronic documents following procedure, while learning cybersecurity and data security.',
      nudge: 'Next up: training and certifications.'
    }
  ],

  certifications: {
    hook:  'Six months and 910 hours of front-end and back-end web development training, with an average score of 91.2.',
    story: 'The training covered programming fundamentals, Git, and JavaScript, leading up to a team capstone. Nine of eleven modules received an A, with 100% attendance.',
    nudge: 'Next, let’s explore the projects Firdy has built.'
  },

  projects: [
    {
      hook:  'Thesis: an app that helps developers write an SRS with AI.',
      story: 'A JavaScript app connected to five AI models: GPT, Claude, Gemini, DeepSeek, and Grok.',
      nudge: 'Swipe to the next project?'
    },
    {
      hook:  'Bali Kuliner Finder: helping Muslim travelers find halal food.',
      story: 'A real company project, built on my own from UI/UX design to PHP code.',
      nudge: 'One more project to see.'
    },
    {
      hook:  'BorobudurTales: recognize a Karmawibhangga relief from one photo.',
      story: 'Upload a photo or use the camera, then read the narrative behind the prediction. I built the front-end and back-end, including two-role login and the admin dashboard.',
      nudge: 'That’s all the projects. Committees and organizations are next.'
    }
  ],

  organisasi: {
    hook:  'Organizing work and collaborating with others have also been part of Firdy’s experience.',
    story: 'From logistics coordinator to treasurer and secretary, Firdy has handled event logistics, budgets, and documentation.',
    nudge: 'And here we are at the final stop. Want to say hello to Firdy?'
  },

  contact: {
    hook:  'That’s the end of our tour. Would you like to get in touch with Firdy?',
    story: 'For a quicker reply, WhatsApp is a good option. Email and LinkedIn are available too.',
    nudge: 'Choose whichever way works best for you. For a quicker reply, try the WhatsApp button.'
  }
}
};
window.FLY_COPY = window.FLY_COPY_ALL.id;
