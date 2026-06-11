-- Plan 1
Bangun fondasi design system reusable Naur sesuai file:/media/hdd/Project/UAS_WorkshopUI/read.md (section "Design System", "Layout System", dan "Komponen Reusable"), supaya semua halaman selanjutnya bisa langsung memakainya secara konsisten.

**Scope wajib:**

1. **Optimasi font loading**
  - Refactor file:/media/hdd/Project/UAS_WorkshopUI/src/app/layout.tsx: ganti `&lt;link&gt;` Google Fonts manual jadi `next/font/google` untuk `Syne`, `DM Sans`, `Space Mono`. Expose sebagai CSS variable yang nyambung ke `--font-display`, `--font-body`, `--font-label` di file:/media/hdd/Project/UAS_WorkshopUI/src/app/globals.css.
2. **Lengkapi design tokens di **file:/media/hdd/Project/UAS_WorkshopUI/src/app/globals.css**
  - Tambahkan utility/preset untuk:
    - Flat shadow `4px 4px 0px #1A1A1A` (mis. class `shadow-flat` atau `--shadow-flat`).
    - Border radius default 4px sebagai token (`--radius-flat: 4px`).
    - Container max-width 1280px helper.
  - Tambahkan utility halftone dots / grain ringan (CSS gradient/SVG inline) untuk hero.
3. **Komponen primitif reusable** di `src/components/ui/` (buat folder baru):
  - `FlatButton.tsx` — variant: `solid` (primary/dark/accent), `outline`, `ghost`. Size: `sm`, `md`, `lg`. Border-radius 4px, optional flat shadow.
  - `FlatShadowCard.tsx` — wrapper card putih + offset shadow hitam, prop `bg` untuk override warna (merah/oranye/kuning/navy).
  - `StatusBadge.tsx` — solid fill, varian status: `new`, `bestseller`, `limited`, `habis`, `pending`, `processing`, `shipped`, `done`, `cancelled`.
  - `QuantityControl.tsx` — `−` angka `+`, border tegas, controlled component.
  - `EmptyState.tsx` — slot untuk ilustrasi (SVG inline cangkir/api geometris) + judul + CTA.
  - `MarqueeTicker.tsx` — background hitam, teks oranye, animasi CSS infinite scroll. Terima `items: string[]`.
  - `SectionContainer.tsx` — wrapper max-width 1280px + padding horizontal konsisten.
4. **Layout shell global**
  - Refactor file:/media/hdd/Project/UAS_WorkshopUI/src/components/Navbar.tsx: ganti emoji 🔥/🔍/🛒 dengan SVG ikon geometris inline (atau komponen `Icon` sederhana). Tambah responsive: hamburger menu untuk breakpoint &lt; md.
  - Buat `src/components/Footer.tsx` (4 kolom: Logo+deskripsi, Menu, Kategori, Social+Newsletter; background navy/hitam, teks putih) sesuai brief Landing Page section "Footer".
  - Pasang `Navbar` + `Footer` di file:/media/hdd/Project/UAS_WorkshopUI/src/app/layout.tsx supaya konsisten di seluruh halaman publik. Halaman admin akan override layout di phase tersendiri.
5. **Setup folder structure**
  - `src/components/ui/` — primitive
  - `src/components/layout/` — Navbar, Footer, SectionContainer
  - `src/components/sections/` — disiapkan kosong untuk section-level components
6. **Showcase / sanity check**
  - Update file:/media/hdd/Project/UAS_WorkshopUI/src/app/page.tsx sementara untuk sekadar memanggil `&lt;MarqueeTicker&gt;` + 1 `&lt;FlatButton&gt;` + 1 `&lt;FlatShadowCard&gt;` agar kelihatan komponen render benar (akan ditimpa di phase berikutnya).

**Acceptance:**

- `npm run dev` jalan tanpa error.
- Semua komponen primitif bisa di-import via `@/components/ui/...`.
- Token warna &amp; font bisa dipakai sebagai class Tailwind (`bg-primary`, `text-secondary`, `font-display`, dll).


Relevant Files:

- file:/media/hdd/Project/UAS_WorkshopUI/read.md

- file:/media/hdd/Project/UAS_WorkshopUI/src/app/layout.tsx

- file:/media/hdd/Project/UAS_WorkshopUI/src/app/globals.css

- file:/media/hdd/Project/UAS_WorkshopUI/src/components/Navbar.tsx

- file:/media/hdd/Project/UAS_WorkshopUI/src/app/page.tsx



-- Plan 2

Bangun ulang @page.tsx menjadi landing page lengkap sesuai brief "1. 🏠 Landing Page" di @read.md, memakai komponen primitif dari phase sebelumnya.
Section yang harus dibuat sebagai komponen di `src/components/sections/landing/`:


`HeroSection.tsx` — split 55/45, headline "Teh yang Menyala di Setiap Tegukan" dengan satu kata di-highlight `text-primary`. Visual kanan: SVG cangkir + uap api geometris (inline SVG bold). 2 CTA pakai `<FlatButton>`. Background putih + blok kuning sebagai aksen geometris (absolute positioned div). Tambah halftone texture overlay.

`MarqueeSection.tsx` — pakai `<MarqueeTicker items={["JASMINE","OOLONG","GREEN TEA","MILK TEA","COLD BREW","SINGLE ORIGIN"]} />`.

`FeaturedMenuSection.tsx` — 3 card horizontal besar; tiap card background berbeda (`bg-primary`, `bg-secondary`, `bg-accent`); nama menu, tasting notes, harga. Pakai `<FlatShadowCard>`.

`OriginStorySection.tsx` — background `bg-tertiary`, teks putih bold. Tambah ilustrasi SVG peta Indonesia bold (sederhana, highlight 3 titik: Kerinci, Wonosobo, Puncak).

`BestSellerSection.tsx` — grid 4 kolom produk merchandise (tumbler, tote bag, teh kemasan, merch). Pakai `ProductCard` placeholder sederhana (full `ProductCard` definitif dibuat di phase berikutnya — di sini cukup card minimal yang nanti tinggal diganti import-nya).

`LatestArticlesSection.tsx` — background `bg-accent`, 3 card putih dengan flat shadow.

`TestimonialSection.tsx` — background `bg-primary`, quote besar di tengah, teks putih.

`CtaBannerSection.tsx` — full width background `bg-secondary`, headline "Nyalakan harimu bersama Naur.", `<FlatButton variant="solid" color="dark">`.

Footer sudah ada di global layout.
Susun semua section di @page.tsx dengan urutan persis sesuai brief.
Data sementara: hardcode di file masing-masing section (akan dipisah ke `src/data/` di phase berikutnya).
Acceptance:


Landing page menampilkan 9 section sesuai brief, responsive dasar (mobile stack vertikal).

Tidak ada link rusak yang dipanggil dari landing (boleh `href="#"` placeholder untuk yang halamannya belum ada).

Relevant Files:
- @page.tsx
- @read.md


--Plan 3

Bangun layer data mock + dua halaman publik: Katalog Produk dan Detail Produk, sesuai brief "4. 🛍️ Katalog Produk" dan "5. 🎁 Detail Produk" di @read.md.
1. Mock data layer — buat folder `src/data/` dan `src/types/`:


`src/types/product.ts` — type `Product { id, slug, name, category, teaType, origin, price, images, tastingNotes, description, brewGuide, badges, stock }` dan enum kategori (Minuman RTD, Teh Kemasan, Alat Seduh, Merchandise, Bundling).

`src/data/products.ts` — minimal 16 produk lintas kategori sesuai contoh di brief (Jasmine Milk Tea, Oolong Latte, Matcha Series, Cold Brew, Single Origin Kerinci/Wonosobo/Puncak, teapot, infuser, tumbler, tote bag, kaos, topi, pin, Starter Kit, Gift Box, Travel Set).

Helper functions: `getAllProducts()`, `getProductBySlug(slug)`, `getRelatedProducts(product)`, `filterProducts({ category, priceRange, teaType, origin, sort })`.
2. Komponen final


`src/components/ui/ProductCard.tsx` — final version: thumbnail, badge, nama, tasting notes, harga (font `Space Mono`), flat shadow hitam. Prop `product: Product`.

`src/components/ui/PriceTag.tsx` — format Rp + font monospace.

Update `BestSellerSection` di landing untuk pakai `<ProductCard>` final.
3. Halaman Katalog — `src/app/products/page.tsx`:


Header: background `bg-secondary`, judul putih bold "Produk".

Layout 2 kolom: kiri sidebar filter (`Sidebar` component baru di `src/components/products/ProductFilterSidebar.tsx`) dengan filter Kategori, Harga (range), Jenis Teh, Asal Daun.

Kanan: bar sort (Terbaru, Terlaris, Harga Naik/Turun) + grid 4 kolom `<ProductCard>`.

State filter pakai `useState` + `useMemo`; URL query sync opsional.

Empty state pakai `<EmptyState>` jika tidak ada hasil.
4. Halaman Detail Produk — `src/app/products/[slug]/page.tsx`:


Generate via `generateStaticParams` dari `getAllProducts()`.

Kiri: gallery gambar dengan background warna solid per produk; thumbnail switcher.

Kanan: badge kategori + asal ("Oolong · Kerinci"), nama besar, tasting notes, harga merah besar, opsi Sugar Level (0/25/50/100%), Suhu (Hot/Iced), Ukuran (Regular/Large) — pakai radio group bergaya bold. `<QuantityControl>` + 2 tombol (Tambah ke Keranjang merah / Beli Sekarang hitam) pakai `<FlatButton>`.

Tabs (`src/components/ui/Tabs.tsx` baru): Deskripsi, Cara Seduh, Review (review boleh dummy 3 item).

Section "Produk Terkait" — scroll horizontal pakai `getRelatedProducts()`.
5. Routing


Pastikan `Navbar` link `/products` aktif. Tambah link dari `BestSellerSection` & `FeaturedMenuSection` ke detail produk masing-masing.
Acceptance:


Bisa browsing katalog, filter, sort, klik card → masuk halaman detail dengan data konsisten.

Tombol "Tambah ke Keranjang" cukup `console.log` / placeholder (cart state dibuat di phase berikutnya).

Relevant Files:
- @read.md

--Plan 4
Implementasikan flow belanja end-to-end: state keranjang global, halaman Keranjang, dan halaman Pembayaran 3-step, sesuai brief "6. 🛒 Keranjang" dan "7. 💳 Pembayaran" di @read.md.
1. Cart state global — `src/store/cart.tsx`:


React Context + reducer (atau Zustand jika sudah dipakai — kalau belum, pakai Context murni untuk hindari nambah dependency tanpa konfirmasi).

API: `addItem(product, options)`, `updateQty(itemId, qty)`, `removeItem(itemId)`, `clearCart()`, `applyVoucher(code)`. State: `items`, `subtotal`, `discount`, `total`.

Persist ke `localStorage` (custom hook `useLocalStorage`).

Pasang `<CartProvider>` di @layout.tsx.

Update badge `Navbar` agar baca `items.length` real-time.
2. Halaman Keranjang — `src/app/cart/page.tsx`:


Header: "Keranjang (N item)" — bold.

Layout 2 kolom: kiri list item (thumbnail, nama, varian, `<QuantityControl>`, harga, tombol hapus); kanan sticky `<OrderSummaryCard>` (subtotal, input voucher, total, tombol Checkout merah full-width).

Empty state pakai `<EmptyState>` dengan ilustrasi cangkir kosong + CTA "Yuk isi!" → ke `/products`.
3. Komponen baru


`src/components/ui/OrderSummaryCard.tsx` — sticky, list breakdown harga, slot tombol bawah.

`src/components/ui/StepIndicator.tsx` — progress 3 step (lingkaran hitam isi + garis tebal), prop `current: 1|2|3` dan `steps: string[]`.

`src/components/ui/Accordion.tsx` — untuk metode pembayaran.
4. Halaman Checkout — `src/app/checkout/page.tsx`:


Pakai `<StepIndicator>` di atas, dan render step berbeda berdasarkan state lokal `step` (1/2/3).

Step 1 — Pengiriman: form alamat (mock list alamat tersimpan + tombol "+ Tambah Alamat baru"); pilih ekspedisi (3 card, border hitam, hover background kuning).

Step 2 — Pembayaran: `<Accordion>` opsi Transfer Bank, Virtual Account, E-Wallet, COD, QRIS (ikon SVG bold).

Step 3 — Konfirmasi: summary semua data, tombol "Bayar Sekarang" full-width merah → trigger `clearCart()` + redirect ke `/orders/[mockId]/success` (atau halaman sukses inline sederhana untuk sekarang).

Kanan: mini `<OrderSummaryCard>` sticky sepanjang 3 step.
5. Integrasi


Tombol "Tambah ke Keranjang" di Detail Produk (phase sebelumnya) hubungkan ke `addItem`.

Toast / feedback singkat (boleh sederhana, mis. inline banner) saat item ditambahkan.
Acceptance:


User bisa menambah produk dari detail → keranjang ter-update → checkout 3 step → sukses & cart kosong.

Refresh browser tidak menghilangkan isi keranjang (localStorage works).

Relevant Files:
- @read.md
- @layout.tsx

--Plan 5
Bangun modul artikel publik sesuai brief "2. 📰 Arsip Artikel" dan "3. 📖 Detail Artikel" di @read.md.
1. Data layer


`src/types/article.ts` — type `Article { id, slug, title, category, excerpt, content (markdown), thumbnail, publishedAt, readMinutes, tags, author }`.

`src/data/articles.ts` — minimal 9 artikel mencakup 4 kategori (Brewing Guide, Origin Story, Review, Health). Helper: `getAllArticles()`, `getArticleBySlug()`, `getArticlesByCategory()`, `getRelatedArticles()`.
2. Komponen


`src/components/ui/ArticleCard.tsx` — putih + flat shadow hitam, thumbnail bold, badge kategori (warna per kategori), judul, excerpt, meta tanggal/baca.

`src/components/ui/CategoryBadge.tsx` — varian warna per kategori (merah/oranye/kuning/hijau navy).

`src/components/ui/Pagination.tsx` — angka besar, border tegas, prop `currentPage`, `totalPages`, `onChange`.

Update `LatestArticlesSection` di landing pakai `<ArticleCard>` final.
3. Halaman Arsip — `src/app/articles/page.tsx`:


Hero kecil: background `bg-primary`, judul "Artikel" bold putih besar.

Filter bar: chip Semua / Brewing Guide / Origin Story / Review / Health (state lokal).

Grid 3 kolom `<ArticleCard>`.

`<Pagination>` di bawah (paginate client-side, 9 item per page).
4. Halaman Detail Artikel — `src/app/articles/[slug]/page.tsx`:


`generateStaticParams` dari `getAllArticles()`.

Header: background warna solid sesuai kategori, judul putih besar.

Body: max-width 720px centered, typography bersih (`prose`-like custom — boleh manual styling karena Tailwind v4, hindari nambah `@tailwindcss/typography` kecuali sudah dipakai).

Blockquote custom: background `bg-accent`, border kiri 4px `border-primary`.

Sidebar sticky kanan: Table of Contents (generate dari heading di content) + Artikel Terkait (3 `<ArticleCard>` kecil).

Bawah: tag list, share button (mock), Section "Artikel Lainnya" (3 card).
5. Routing


Aktifkan link `/articles` di `Navbar`. Hubungkan `LatestArticlesSection` di landing → `/articles/[slug]`.
Acceptance:


Bisa browsing arsip, filter kategori, paginate, klik → baca detail dengan TOC sticky berfungsi.

Relevant Files:
- @read.md


--Plan 6
Bangun area user yang mencakup auth mock (frontend-only) dan halaman History Transaksi sesuai brief "8. 📋 History Transaksi" di @read.md, plus halaman Login/Register yang disebut di sitemap.
1. Auth state mock — `src/store/auth.tsx`:


React Context: `user | null`, `login(email, password)`, `register(...)`, `logout()`. Persist ke `localStorage`.

2 role: `user` dan `admin`. Seeding mock user di `src/data/users.ts` (mis. `user@naur.id` / `admin@naur.id`).

Pasang `<AuthProvider>` di @layout.tsx (di luar `CartProvider` atau sebaliknya — pilih yang konsisten).

Update `Navbar`: jika belum login tampilkan tombol "Login"; jika login tampilkan avatar + dropdown (Profil, History, Logout). Jika role `admin`, tambah link "Dashboard".
2. Halaman Auth


`src/app/login/page.tsx` & `src/app/register/page.tsx`: layout split kiri form, kanan visual brand (blok warna + ilustrasi api). Form bold dengan input border hitam tegas. Validasi sederhana (required, email format). Setelah sukses redirect ke `/` (atau `/admin` jika admin).

`src/components/auth/AuthForm.tsx` reusable.
3. Mock orders data


`src/types/order.ts` — type `Order { id, userId, items, total, paymentMethod, status, address, courier, trackingNumber?, timeline[], createdAt }`. Status: `pending | processing | shipped | done | cancelled`.

`src/data/orders.ts` — 8-12 order mock lintas status untuk user demo.

Saat checkout sukses (phase sebelumnya), tambahkan `createOrder()` yang push ke state orders runtime (simpan di localStorage juga).
4. Halaman History Transaksi — `src/app/orders/page.tsx`:


Protected: redirect ke `/login` jika belum login (cek di client component dengan `useEffect`).

Tab filter: Semua / Menunggu / Diproses / Dikirim / Selesai / Dibatalkan — indicator underline tebal `border-primary`.

List card transaksi pakai `<FlatShadowCard>`: no order, tanggal, `<StatusBadge>`, thumbnail produk (max 3 + "+N lagi"), total, tombol aksi per status (Bayar / Lacak / Selesai / Ulas).
5. Halaman Detail Transaksi — `src/app/orders/[id]/page.tsx`:


Timeline bold dengan ikon geometris api di setiap step (SVG inline).

Info pengiriman, list produk, breakdown harga.
Acceptance:


Demo flow: register/login user → checkout → muncul di History → bisa lihat detail dengan timeline.

Logout membersihkan state auth (cart tidak ikut terhapus).

Relevant Files:
- @read.md
- @layout.tsx


--Plan 7
Bangun seluruh area admin sesuai brief "9. 📊 Dashboard Admin", "10. ✍️ Kelola Artikel", "11. 📦 Kelola Produk", "12. 👥 Kelola Pengguna", dan "13. 💰 Kelola Transaksi" di @read.md.
1. Layout admin terpisah


`src/app/admin/layout.tsx` — nested layout: kiri `<AdminSidebar>` background hitam (menu putih, active state `bg-primary`), kanan content. Header putih dengan border bottom hitam berisi judul halaman + avatar admin.

Protect route: cek `user?.role === 'admin'`, kalau tidak redirect ke `/login`.

`src/components/admin/AdminSidebar.tsx` — menu: Dashboard, Kelola Artikel, Kelola Produk, Kelola Pengguna, Kelola Transaksi.

`src/components/admin/AdminHeader.tsx`.
2. Komponen reusable admin


`src/components/ui/DataTable.tsx` — generic, props `columns`, `rows`, `actions`. Border hitam, header background `bg-accent`, row hover background light. Built-in: search input, sort per kolom, pagination.

`src/components/ui/StatCard.tsx` — background solid warna (prop `bg`), label kecil uppercase, angka besar `font-display`, optional icon + trend %.

`src/components/ui/Modal.tsx` — modal flat shadow, ukuran sm/md/lg.

`src/components/admin/RichTextEditor.tsx` — wrapper sederhana `<textarea>` + toolbar fake (B, I, H2, link, list) — kalau sudah ada library editor di codebase pakai itu, kalau tidak jangan tambah dependency baru tanpa konfirmasi, cukup textarea bold.

`src/components/admin/ImageUploader.tsx` — drag & drop area pakai `react` File API, preview thumbnail, multi-file untuk produk.
3. Halaman `/admin` (Dashboard) — `src/app/admin/page.tsx`:


4 `<StatCard>` (merah / oranye / kuning / hitam): Total Pendapatan, Total Order, Total Produk, Total Pengguna — angka di-derive dari mock data.

Grafik Pendapatan: bisa line chart custom SVG sederhana (jangan tambah chart library tanpa konfirmasi); plot 7 hari terakhir.

Tabel Produk Terlaris pakai `<DataTable>`.

Tabel Order Terbaru pakai `<DataTable>` + `<StatusBadge>`.
4. `/admin/articles` — list `<DataTable>` (thumbnail, judul, kategori, status badge, tanggal, aksi Edit/Hapus/Preview) + tombol "+ Tulis Artikel" merah → membuka `/admin/articles/new`. Form: judul, slug, `<RichTextEditor>`, upload thumbnail, pilih kategori, status Draft/Published. Edit di `/admin/articles/[id]/edit`. Operasi CRUD update mock data in-memory + localStorage.
5. `/admin/products` — `<DataTable>` (gambar, nama, kategori, harga, stok, status, aksi). Filter: kategori, jenis teh, status. Form add/edit di `/admin/products/new` & `/admin/products/[id]/edit`: `<ImageUploader>` multi-gambar, detail produk, varian (sugar, suhu, ukuran), jenis teh, asal daun, stok.
6. `/admin/users` — `<DataTable>` (avatar, nama, email, role badge, total order, status, aksi). Search + filter role + filter status. `<Modal>` detail: info akun + tab "Riwayat Order" + tab "Aktivitas".
7. `/admin/transactions` — `<DataTable>` (no order, pembeli, total, metode, status, tanggal, aksi). Filter: tanggal range, status, metode bayar, search no. order. `<Modal>` detail: info pembeli + list produk + timeline + form update status + input nomor resi (untuk status `shipped`).
Acceptance:


Login dengan akun admin demo bisa masuk `/admin` dan navigasi ke 4 modul kelola.

CRUD artikel & produk persist di localStorage, hasilnya kelihatan di halaman publik (`/articles`, `/products`).

Update status order di admin tercermin di History Transaksi user.

Relevant Files:
- @read.md