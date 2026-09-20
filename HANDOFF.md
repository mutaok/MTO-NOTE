# NoteFlow — Oturum Devir Notu

> Bu dosya, bir Claude Code oturumundan diğerine bağlam aktarmak için yazıldı.
> İş bitince silinebilir.

**Tarih:** 2026-09-15
**Branch:** `feat/supabase-migration` (master'dan, `34a88a1` üzerine)
**Depo:** `mutaok/noteflow-mobile` — yerel kopya: `Desktop\NOTEFLOW\not uygulaması`

---

## 1. Önceki oturumlardan kalanlar (tamamlandı)

- Defterler 404, Vite proxy, mock DB deadlock düzeltmeleri — PR #1 ve #2 ile master'da.
- Render canlı servisi ayakta: `https://noteflow-api-lyhi.onrender.com/api/health` → 200 (2026-09-15, bu makineden doğrulandı).

---

## 2. Bu oturumda alınan kararlar

1. **Supabase'deki `profiles/notebooks/notes` tabloları starter şablon değil**, aynı klasördeki
   Flutter uygulamasının (`Desktop\NOTEFLOW\noteflow`) şeması. Flutter `config/env.json` bu projeye
   (`etqffrlbmtowfqfgibbx`) bağlı.
2. Kullanıcı üç seçenekten **"Flutter şemasını paylaş"**ı seçti: web uygulaması ve Flutter aynı hesabı ve
   aynı verileri kullanacak.
3. **Mimari:** web uygulaması Supabase'e **doğrudan** bağlanır (supabase-js + RLS), tıpkı Flutter gibi.
   Render backend'i veri için kullanılmaz; yalnızca statik web uygulamasını sunar.
   - Bu yüzden eski devir notundaki "sürücüyü `postgres-js`'e çevir, Render'a `DATABASE_URL` gir" adımı
     **yapılmadı ve gerekmiyor**. Render'a veritabanı parolası girilmez.
   - **Render'da `DATABASE_URL`'i Supabase'e çevirmeyin:** backend'in eski drizzle şeması
     (`notes`/`tasks` serial id, `users`, `sync_store`) Supabase'deki tablolarla çakışır.

---

## 3. Yapılanlar (commit edildi)

### Veritabanı — migration `20260914221052_web_shared_sync_schema` (Supabase'e uygulandı)
Dosya hem bu depoda (`supabase/migrations/`) hem Flutter projesinin `supabase/migrations/` klasöründe.
Flutter'ın sütunlarına dokunmaz, yalnızca ekler:
- `notebooks.meta`, `notes.tag`, `notes.note_date`, `notes.meta` (web'e özgü alanlar)
- Yeni tablolar: `tasks`, `mind_maps`, `app_documents` (çalışma alanı verileri: flashcard, bütçe vb.)
- Hepsinde RLS (yalnızca kendi satırın), `sync_row_guard` (last-write-wins), yumuşak silme, Realtime.
- Security advisor: uyarı yok. Performance advisor: yalnızca boş tablolardan "unused index" bilgisi.

### Web uygulaması
| Dosya | Görev |
|---|---|
| `src/lib/supabase.ts` | Supabase istemcisi. URL ve publishable key varsayılan olarak kodda (tarayıcıya açık olmak üzere tasarlanmış anahtar); `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` ile ezilebilir. |
| `src/data/sync/mappers.ts` | Varlık ⇄ satır dönüşümü, CHECK kısıtlarına uyum, içerik imzası |
| `src/data/sync/SyncEngine.ts` | Kuyruk + push (LWW) + pull (imleç) + Realtime; Flutter'daki `SupabaseSyncService` ile aynı kurallar |
| `src/data/sync/ids.ts` | UUID üretimi; eski sayısal kimlik → hesaba özgü deterministik UUID |
| `src/AuthGate.tsx`, `src/components/auth/AuthScreen.tsx` | Giriş/kayıt (Flutter ile aynı hesap), "Hesapsız devam et" modu, çıkış |
| `src/data/storage.ts` | `/api/sync` kaldırıldı; kayıtlar motora bildiriliyor |
| `src/types.ts` + bileşenler | Kimlikler `number` → `string` (UUID) |

Davranış notları:
- İlk girişte cihazdaki veri (hesapsız mod ya da eski sürüm) hesaba yüklenir; eski sayısal kimlikler
  `legacyUuid(userId, tablo, id)` ile dönüştüğü için aynı veriye sahip iki cihaz kopya oluşturmaz.
- Çıkışta bekleyen değişiklikler önce gönderilir; cihazdaki veri silinir (yalnızca bu tarayıcıdan çıkılır).
- Mevcut bir hata da düzeltildi: çalışma alanlarından oluşturulan notlar/görevler `notebookId` ve türe
  özel alanlarını kaybediyordu.

### Doğrulama
- `npx tsc --noEmit` temiz, `npx vitest run src/data/sync` 10/10, `npm run build` başarılı.
- Yerel sunucuda (`node dist/index.js`, port 3001): giriş ekranı açılıyor, hesapsız mod çalışıyor,
  eski sayısal kimlikli not doğru deftere bağlanıyor, yeni not UUID ile kaydediliyor, konsol hatası yok.

---

## 4. Açık işler

1. **Hesapla uçtan uca test yapılmadı.** Asistan parola giremez; kullanıcı web'de giriş yapmalı. Sonra
   Supabase'de satırlar SQL ile kontrol edilir ve aynı hesapla Flutter uygulamasında notların göründüğü
   doğrulanır.
2. **Supabase Auth → URL Configuration:** Site URL / Redirect URLs listesine
   `https://noteflow-api-lyhi.onrender.com` eklenmeli (kayıt doğrulama e-postasındaki bağlantı için).
3. **Expo native ekranlar** (`app/`, tRPC) hâlâ Render backend'ini kullanıyor; Supabase'e taşınmadı.
   Defterler sekmesi web uygulamasını WebView ile açtığı için oradaki giriş çalışır.
4. `bun.lock` güncel değil (`@supabase/supabase-js` eklendi; makinede bun yok). Render `npm install`
   kullandığı için etkilenmiyor.
5. Kullanıcının yerel kopyasındaki eski değişiklikler `git stash@{0}`'da (`.npmrc` silme,
   `package.json` allowScripts, `pnpm-lock.yaml`).

---

## 5. Ortam notları

- Yerel çalıştırma: `npm run build` ardından `node dist/index.js` (port 3001).
- Testler: `npx vitest run src/data/sync`
- Depo yolu Türkçe karakter içeriyor (`BİLGİSAYARIM`, `uygulaması`); PowerShell'de `-LiteralPath` kullanın.
- Depoda senkron dışında gerçek test paketi yok; değişiklikleri sunucuyu çalıştırıp tarayıcıda deneyin.
