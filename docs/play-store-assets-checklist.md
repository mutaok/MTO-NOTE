# Play Store Varlıkları Checklist

## Google Play Console - Mağaza Listeleme Gereksinimleri

Bu dokümant, NoteFlow uygulamasının Google Play Store'da yayınlanması için gerekli tüm varlık ve bilgileri içerir.

---

## 1. Uygulama Bilgileri (App Information)

### 1.1. Uygulama Adı (App Name)
- **Maksimum Karakter:** 30
- **Önerilen:** `NoteFlow: Notlar & Görevler`
- **Durum:** ✅ Hazır

### 1.2. Kısa Açıklama (Short Description)
- **Maksimum Karakter:** 80
- **Önerilen:** 
```
Notlarınızı, görevlerinizi ve listelerinizi düzenleyin. Basit, hızlı ve güvenli.
```
- **Karakter Sayısı:** 72
- **Durum:** ✅ Hazır

### 1.3. Uzun Açıklama (Full Description)
- **Maksimum Karakter:** 4000
- **Önerilen:**

```
NoteFlow ile notlarınızı ve görevlerinizi tek bir yerde organize edin!

📝 ÖZELLİKLER:

• NOTLAR: Hızlıca not alın, düzenleyin ve saklayın
• GÖREVLER: Yapılacaklar listesi oluşturun, tamamlananları işaretleyin
• KARARLI MOD: Karanlık ve aydınlık tema desteği
• ÇEVRİMDIŞI: İnternet olmadan çalışır, verileriniz cihazınızda kalır
• YEDİRLEME: Verilerinizi güvenle yedekleyin ve geri yükleyin
• BİLDİRİMLER: Görev hatırlatıcıları ile hiçbir şeyi unutmayın
• ÇOKLU DİL: Türkçe ve İngilizce dil desteği

🔒 GÜVENLİK:
• Tüm verileriniz cihazınızda şifreli olarak saklanır
• Gizliliğinize önem veriyoruz, veri satmıyoruz
• GDPR ve KVKK uyumlu

⭐ NEDEN NOTEFLOW?
• Reklamsız deneyim
• Kullanıcı dostu arayüz
• Hızlı ve hafif uygulama
• Düzenli güncellemeler ve destek

NoteFlow'u şimdi indirin, üretkenliğinizi artırın!

İletişim: support@noteflow.app
Web: https://noteflow.app
```

- **Karakter Sayısı:** ~850
- **Durum:** ✅ Hazır

---

## 2. Grafik Varlıklar (Graphic Assets)

### 2.1. Uygulama İkonu (App Icon)
- **Format:** PNG (32-bit with alpha)
- **Boyut:** 512 x 512 piksel
- **Maksimum Dosya Boyutu:** 1 MB
- **Arka Plan:** Düz renk veya şeffaf
- **Dosya:** `/workspace/assets/images/icon.png`
- **Kontrol:** ✅ 512x512 PNG mevcut

**İkon Gereksinimleri:**
- ❌ Metin içermemeli
- ❌ Kenarlık olmamalı
- ❌ Şeffaf olmamalı (düz arka plan)
- ✅ Okunabilir ve basit tasarım

### 2.2. Feature Graphic (Öne Çıkan Görsel)
- **Format:** PNG veya JPG
- **Boyut:** 1024 x 500 piksel
- **Maksimum Dosya Boyutu:** 1 MB
- **Dosya:** `/workspace/assets/images/feature-graphic.png`
- **Kontrol:** ✅ 1024x500 PNG mevcut

**Feature Graphic İpuçları:**
- Uygulamanın amacını görselle anlatmalı
- Metin minimum düzeyde olmalı
- Marka kimliğini yansıtmalı

### 2.3. Ekran Görüntüleri (Screenshots)
- **Telefon İçin:**
  - Minimum: 2 adet
  - Maksimum: 8 adet
  - Format: PNG veya JPG
  - Boyut: Her kenar 320 px - 3840 px arası
  
- **Tablet İçin (Opsiyonel):**
  - 7", 10" tablet ekran görüntüleri
  
**Önerilen Ekran Görüntüleri:**

1. **Ana Sayfa** - Uygulama açılış ekranı
2. **Notlar Listesi** - Notların gösterimi
3. **Not Detay** - Not düzenleme ekranı
4. **Görevler** - Görev listesi görünümü
5. **Ayarlar** - Tema ve tercihler ekranı
6. **Karanlık Mod** - Dark theme örneği

**Screenshot İpuçları:**
- Gerçek kullanıcı senaryoları gösterin
- Durum çubuğunu gizleyin (status bar)
- Türkçe metinler kullanın
- Yüksek çözünürlükte olsun

---

## 3. Video (Opsiyonel)

- **Platform:** YouTube
- **Maksimum Süre:** 30 saniye
- **Önerilen:** Uygulama tanıtım videosu
- **Durum:** ⏳ Opsiyonel, ilk sürümde gerekli değil

---

## 4. Kategori ve Yaş Derecelendirmesi

### 4.1. Uygulama Kategorisi
- **Birincil Kategori:** Productivity (Üretkenlik)
- **İkincil Kategori (Opsiyonel):** Education (Eğitim)

### 4.2. İçerik Derecelendirmesi (Content Rating)
- **Anket:** IARC anketini doldurun
- **Beklenen Derece:** 3+ (Herkes)
- **Gereklilik:** Zorunlu

### 4.3. Hedef Kitle
- **Çocuklara Yönelik mi?** Hayır
- **13 Yaş Altı?** Hayır

---

## 5. İletişim Bilgileri

### 5.1. Geliştirici Bilgileri
- **Geliştirici Adı:** NoteFlow Teknoloji A.Ş.
- **E-posta:** support@noteflow.app
- **Web Sitesi:** https://noteflow.app
- **Fiziksel Adres:** [Şirket Adresi - Zorunlu]

### 5.2. Destek E-postası
- **URL:** mailto:support@noteflow.app
- **Durum:** ✅ Ayarlandı

### 5.3. Gizlilik Politikası URL'si
- **URL:** https://noteflow.app/privacy
- **Dosya:** `/workspace/docs/privacy-policy.md`
- **Durum:** ✅ Hazır

---

## 6. Fiyatlandırma ve Dağıtım

### 6.1. Fiyatlandırma
- **Uygulama:** Ücretsiz (Free)
- **Uygulama İçi Satın Alma:** Yok (ilk sürüm)
- **Reklamlar:** Yok

### 6.2. Dağıtım Bölgeleri
- **İlk Yayın:** Türkiye
- **Sonraki:** Tüm ülkeler (adımlarla genişletin)

### 6.3. Cihaz Uyumluluğu
- **Minimum Android:** 7.0 (API 24)
- **Hedef SDK:** 34 (Android 14)
- **CPU Mimarisi:** arm64-v8a

---

## 7. Yasal Uyumluluk

### 7.1. Zorunlu Politikalar
- ✅ Gizlilik Politikası
- ✅ Kullanım Şartları
- ✅ Veri Güvenliği Formu
- ⏳ COPPA (Çocuk Gizliliği) - Uygulanamaz
- ⏳ GDPR (AB) - Uyumlu
- ⏳ CCPA (Kaliforniya) - Uyumlu

### 7.2. İzin Beyanları (Permission Declarations)
- **POST_NOTIFICATIONS:** Bildirim göndermek için
- **Diğer:** Yok

---

## 8. Test ve Yayın Akışı

### 8.1. Yeni Hesap Gereksinimleri (2024+)
Google yeni geliştirici hesapları için şu şartları getiriyor:

1. **Kapalı Test (Closed Testing):**
   - En az 12 test kullanıcısı
   - 14 gün boyunca aktif test
   - Geribildirim mekanizması

2. **Test Akışı:**
   ```
   Internal Testing → Closed Testing (12 kullanıcı/14 gün) → Production
   ```

### 8.2. Test Kullanıcıları Bulma
- Arkadaşlar ve aile
- Sosyal medya grupları
- Beta test platformları (BetaFamily, TestFlight alternatifleri)

### 8.3. Yayın Kontrol Listesi
- [ ] AAB dosyası oluşturuldu
- [ ] Keystore ile imzalandı
- [ ] versionCode ve versionName ayarlandı
- [ ] Tüm grafikler yüklendi
- [ ] Açıklamalar girildi
- [ ] Gizlilik politikası eklendi
- [ ] Content Rating anketi tamamlandı
- [ ] Data Safety formu dolduruldu
- [ ] Kapalı test 14 gün sürdü
- [ ] Crash-free rate > %95

---

## 9. Mağaza Optimizasyonu (ASO)

### 9.1. Anahtar Kelimeler
- not defteri
- yapılacaklar listesi
- görev yönetimi
- not alma
- productivity
- organize
- planner

### 9.2. Yerelleştirme
- **İlk Diller:** Türkçe, İngilizce
- **Sonraki:** İspanyolca, Almanca, Fransızca

---

## 10. Yayın Sonrası İzleme

### 10.1. Metrikler
- **Crash-free users:** > %95 hedef
- **ANR rate:** < %0.5 hedef
- **Rating:** > 4.0 yıldız hedef
- **Installs:** İlk 30 gün takip

### 10.2. Güncellemeler
- İlk düzeltmeler: 2 hafta içinde
- Özellik güncellemeleri: Aylık
- Güvenlik yamaları: Acil

---

**Kontrol Tarihi:** 20 Ocak 2025  
**Hazırlayan:** NoteFlow Ekibi  
**Durum:** 🟡 Hazırlık aşamasında

---

## Hızlı Başvuru Tablosu

| Varlık | Boyut | Format | Durum |
|--------|-------|--------|-------|
| App Icon | 512x512 | PNG | ✅ |
| Feature Graphic | 1024x500 | PNG | ✅ |
| Screenshots (Min) | Değişken | PNG/JPG | ⏳ |
| Privacy Policy | Web sayfası | HTML | ✅ |
| Terms of Service | Web sayfası | HTML | ✅ |
| AAB Bundle | - | AAB | ⏳ |
