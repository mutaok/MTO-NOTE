# NoteFlow · GitHub Deposu Temizlik & Silme Rehberi

Bu dosya, NoteFlow projesinin **Supabase + Flutter** tekli mimariye geçişi sonrasında artık gerekmeyen, eski Expo (React Native) ve eski Express/Drizzle/Render sunucu dosyalarını GitHub deposundan güvenle silmek için hazırlanmıştır.

---

## 1. Silinmeye Hazır Dosyalar ve Klasörler

Aşağıdaki dosya ve klasörler eski mimarilere (Expo React Native, Drizzle ORM, Render tRPC sunucusu) ait olup, mevcut **Vite + React (Masaüstü & Mobil Web/PWA) + Supabase (Flutter ile ortak)** altyapısında hiçbir şekilde kullanılmamaktadır:

### A) Eski Expo / React Native Dosyaları (Flutter'a geçildiği için gereksiz)
- `app/` — Eski Expo Router sayfaları (`(tabs)`, `_layout.tsx`, `note-editor.tsx`, vb.)
- `dist-expo/` — Eski Expo derleme çıktıları
- `components/` (kök dizindeki) — Eski React Native bileşenleri (`haptic-tab.tsx`, `hello-wave.tsx`, `ui/`, vb.)
- `constants/` (kök dizindeki) — Eski React Native sabitleri (`oauth.ts`, `theme.ts`, `const.ts`)
- `hooks/` (kök dizindeki) — Eski React Native kancaları (`use-auth.ts`, `use-colors.ts`, vb.)
- `lib/` (kök dizindeki) — Eski tRPC istemcisi (`trpc.ts`, `theme-provider.tsx`)
- `app.config.ts` — Expo yapılandırması
- `eas.json` — Expo build yapılandırması
- `metro.config.js` — React Native bundler
- `babel.config.js` — React Native babel ayarı
- `nativewind-env.d.ts` — React Native Nativewind tipleri
- `template.json` — Eski şablon dosyası
- `theme.config.js` ve `theme.config.d.ts` — Eski Expo tema ayarı
- `.watchmanconfig` — React Native dosya izleyici
- `global.css` (kök dizindeki) — Eski React Native web stili (asıl stil `src/index.css` içindedir)

### B) Eski Express & Drizzle & Render Dosyaları (Supabase'e geçildiği için gereksiz)
- `server/` — Eski Express + tRPC sunucusu (`server/_core/`, `server/db.ts`, `server/routers.ts`, vb.)
- `drizzle/` — Eski Neon/PostgreSQL Drizzle şemaları ve migration'ları
- `drizzle.config.ts` — Drizzle ORM ayarı
- `render.yaml` — Eski Render backend deployment tanımı
- `bun.lock` — Eski Bun lock dosyası
- `tests/auth.logout.test.ts` — Eski tRPC cookie logout testi

### C) Eski Yapılandırmalar
- `firebase-applet-config.json` — Kullanılmayan Firebase dosyası

---

## 2. GitHub'dan Tek Komutla Silme

Yerel bilgisayarınızda veya terminalde bu depodayken şu komutu çalıştırarak tüm gereksiz dosyaları tek seferde Git'ten kaldırabilir ve temizleyebilirsiniz:

```bash
git rm -rf app components constants hooks lib server drizzle dist-expo eas.json metro.config.js babel.config.js app.config.ts nativewind-env.d.ts template.json theme.config.d.ts theme.config.js .watchmanconfig global.css drizzle.config.ts render.yaml bun.lock firebase-applet-config.json tests/auth.logout.test.ts
git commit -m "chore: remove deprecated expo, server, and drizzle files in favor of supabase-flutter stack"
git push
```

---

## 3. Depoda Kalan Asıl ve Aktif Yapı (Supabase + Flutter + Web/Desktop/Mobile)

Temizlikten sonra depoda kalan ve NoteFlow'un asıl gücünü oluşturan dosyalar:

- **`src/`**: Vite + React + Tailwind + `@supabase/supabase-js` web & mobil uygulaması.
  - `src/lib/supabase.ts`: Supabase istemcisi (`https://etqffrlbmtowfqfgibbx.supabase.co`).
  - `src/data/sync/`: Flutter ile %100 ortak çalışan `SyncEngine` ve `mappers`.
  - `src/components/`: 11 defter türü, zihin haritaları, görevler, takvim ve çalışma alanları.
- **`supabase/migrations/`**: Flutter uygulamasıyla paylaşılan SQL şeması (`20260914221052_web_shared_sync_schema.sql`).
- **`index.html` & `public/`**: Masaüstü ve Android mobil uyumlu PWA ve web giriş noktası.
- **`vite.config.ts` & `package.json`**: Standart, hafif Vite geliştirme ve derleme ortamı.
