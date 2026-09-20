# NoteFlow - Akıllı Not Defteri, Görev Yöneticisi ve Zihin Haritası

Bu proje, gördüğünüz NoteFlow web ve mobil uygulamasının **bütün kaynak kodlarını** içerir.

> **Önemli Not:** Bilgisayarınızdaki eski `Desktop\NOTEFLOW\noteflow` klasörü eski/farklı bir Flutter projesidir ve bu yüzden `flutter build apk` komutu bu uygulamayı değil, o eski uygulamanın APK'sını üretiyordu. **Bu zip arşivi**, çalışan gerçek NoteFlow uygulamasının güncel ve tam kaynak kodudur.

---

## 🚀 Bilgisayarınızda Çalıştırma (Hızlı Kurulum)

1. Bilgisayarınızda **Node.js** yüklü olduğundan emin olun (Node v18 veya üstü).
2. Bu klasörde bir terminal açın ve bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı yerel olarak başlatın:
   ```bash
   npm run dev
   ```
4. Tarayıcınızda açın: **http://localhost:3000** (veya terminalde çıkan adres)

---

## 📱 Android Cihaza Yükleme Seçenekleri

### 1. Hazır İmzalı APK (En Kolayı)
Proje içindeki `public/downloads/noteflow-release.apk` dosyasını doğrudan telefonunuza atıp kurabilirsiniz.

### 2. PWA Olarak Telefona Yükleme (Önerilen)
Uygulamayı telefonunuzdaki Google Chrome'da açın, sağ üstteki üç noktaya dokunup **"Uygulamayı Yükle"** veya **"Ana Ekrana Ekle"** seçeneğini seçin. Hiç derleme yapmadan telefonunuza tam ekran yerel bir uygulama gibi yüklenir.

### 3. Capacitor ile Kendi APK'nızı Derlemek İsterseniz
Bu React/Vite projesini Android Studio'da açıp APK üretmek için:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "NoteFlow" "com.noteflow.app" --web-dir dist
npm run build
npx cap add android
npx cap open android
```
Android Studio açıldığında **Build > Build Bundle(s) / APK(s) > Build APK(s)** tıklayarak APK'nızı üretebilirsiniz.

---

## 📂 Proje Yapısı

- `src/App.tsx`: Ana uygulama bileşeni ve sekme yönetimi
- `src/components/`: Defterler (Notebooks), Notlar, Zihin Haritası (MindMap), Görevler (Tasks), Arama ve Kurulum modülleri
- `src/components/notebooks/`: Akademik, Proje, Günlük, Toplantı, Kod, Tarif vb. özel defter çalışma alanları
- `src/lib/supabase.ts`: Supabase bulut senkronizasyonu
- `src/data/storage.ts`: Yerel veri depolama ve senkronizasyon motoru
- `public/downloads/`: Hazır APK ve kaynak kod zip arşivi
