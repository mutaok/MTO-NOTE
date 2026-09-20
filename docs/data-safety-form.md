# Veri Güvenliği Formu (Data Safety Form)

## Google Play Console - Data Safety Section

Bu belge, NoteFlow uygulaması için Google Play Console'da doldurulacak Veri Güvenliği formunun hazırlık notlarını içerir.

---

## 1. Veri Toplama Durumu

**Soru:** Uygulamanız kullanıcı verilerini topluyor veya paylaşıyor mu?

**Cevap:** ✅ **EVET** - Sınırlı veri toplama

---

## 2. Toplanan Veri Türleri

### 2.1. Kişisel Bilgiler (Personal Info)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| İsim | ❌ Hayır | - | - |
| E-posta Adresi | ⚠️ İsteğe Bağlı | Hesap yönetimi, şifre sıfırlama | ❌ Hayır |
| Kullanıcı Kimlikleri | ✅ Evet | Hesap tanımlama | ❌ Hayır |
| Adres/Telefon | ❌ Hayır | - | - |

**Açıklama:** E-posta yalnızca kullanıcı hesabı oluşturursa toplanır, zorunlu değildir.

### 2.2. Finansal Bilgiler (Financial Info)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Ödeme Bilgileri | ❌ Hayır | - | - |
| Satın Alma Geçmişi | ❌ Hayır | - | - |
| Kredi Bilgileri | ❌ Hayır | - | - |

**Açıklama:** Uygulama şu anda ücretli özellik içermemektedir.

### 2.3. Konum (Location)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Yaklaşık Konum | ❌ Hayır | - | - |
| Hassas Konum | ❌ Hayır | - | - |

**Açıklama:** Konum bilgisi toplanmamaktadır.

### 2.4. Kişisel İletişimler (Personal Communications)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| E-postalar | ❌ Hayır | - | - |
| SMS/MMS | ❌ Hayır | - | - |
| Diğer İletişimler | ❌ Hayır | - | - |

### 2.5. Fotoğraflar ve Videolar (Photos and Videos)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Fotoğraflar | ❌ Hayır | - | - |
| Videolar | ❌ Hayır | - | - |

### 2.6. Dosyalar ve Dokümanlar (Files and Docs)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Dosya/Doküman İçeriği | ✅ Evet | Kullanıcı notları ve görevleri | ❌ Hayır |

**Açıklama:** Kullanıcının oluşturduğu notlar ve görevler cihazda şifreli olarak saklanır. Bu veriler kullanıcının kendi içeriğidir, uygulama tarafından oluşturulmaz.

### 2.7. Uygulama Aktivitesi (App Activity)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Uygulama Etkileşimleri | ⚠️ Anonim | Crash raporları, performans | ❌ Hayır |
| Arama Geçmişi | ❌ Hayır | - | - |
| Yüklü Uygulamalar | ❌ Hayır | - | - |
| Diğer Kullanıcı İçeriği | ✅ Evet | Not/görev içeriği | ❌ Hayır |

**Açıklama:** Crash raporları Firebase Crashlytics üzerinden anonim olarak toplanır, kişisel bilgi içermez.

### 2.8. Web Taraması (Web Browsing)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Web Tarama Geçmişi | ❌ Hayır | - | - |

### 2.9. Uygulama Bilgileri ve Performans (App Info and Performance)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Çökme Günlükleri | ✅ Evet | Hata ayıklama | ⚠️ Firebase ile |
| Tanılama Verileri | ✅ Evet | Performans izleme | ⚠️ Firebase ile |
| Diğer Uygulama Performansı | ✅ Evet | Analitik | ❌ Hayır |

**Açıklama:** Teknik veriler Firebase Crashlytics ve Performance Monitoring ile toplanır.

### 2.10. Cihaz veya Diğer Kimlikler (Device or Other IDs)

| Veri Tipi | Toplanıyor mu? | Amaç | Paylaşılıyor mu? |
|-----------|---------------|------|-----------------|
| Cihaz Kimlikleri | ✅ Evet | Push bildirimleri, analiz | ⚠️ Firebase ile |

**Açıklama:** Firebase Cloud Messaging için cihaz token'ı kullanılır.

---

## 3. Veri Kullanım Amaçları

| Amaç | Açıklama |
|------|----------|
| **Uygulama İşlevselliği** | Not ve görev yönetimi temel işlev |
| **Analitik** | Uygulama performansı ve crash takibi |
| **Geliştirici İletişimi** | Destek talepleri için e-posta |
| **Hesap Yönetimi** | Kullanıcı hesabı ve tercihler |
| **Bildirimler** | Görev hatırlatıcıları |

---

## 4. Veri Güvenliği Uygulamaları

### 4.1. Veriler Aktarım Şifreleniyor mu?

✅ **EVET** - Tüm veriler HTTPS/TLS üzerinden şifrelenerek aktarılır

### 4.2. Veriler Saklanırken Şifreleniyor mu?

✅ **EVET** - Cihaz üzerinde AES-256 şifreleme kullanılır

### 4.3. Veriler Silinebilir mi?

✅ **EVET** - Kullanıcı hesabını sildiğinde tüm veriler silinir

### 4.4. Üçüncü Taraflarla Paylaşım

| Üçüncü Taraf | Veri Türü | Amaç |
|-------------|----------|------|
| Firebase (Google) | Crash logları, cihaz ID | Analitik ve stabilite |
| Bulut Depolama Sağlayıcısı* | Kullanıcı verileri (isteğe bağlı) | Yedekleme |

*Yalnızca kullanıcı bulut yedeklemeyi etkinleştirirse

---

## 5. Çocuklara Yönelik Bildirim

**Soru:** Uygulamanız öncelikli olarak 13 yaş altı çocuklara yönelik mi?

**Cevap:** ❌ **HAYIR**

**Açıklama:** Uygulama genel kitleye yöneliktir, 13 yaş altı çocuklardan bilinçli veri toplanmaz.

---

## 6. Özet Beyan

NoteFlow olarak:

1. ✅ Minimum veri toplama prensibini benimsiyoruz
2. ✅ Kullanıcı verilerini şifreliyoruz
3. ✅ Verileri kullanıcı kontrolünde tutuyoruz
4. ✅ Üçüncü taraflarla ticari amaçla paylaşmıyoruz
5. ✅ GDPR, CCPA ve KVKK uyumluyuz
6. ✅ Veri silme hakkını destekliyoruz

---

## 7. Play Console Doldurma Talimatları

1. **Google Play Console** → **App Content** → **Data Safety** bölümüne gidin
2. "Start" veya "Edit" butonuna tıklayın
3. Aşağıdaki soruları yukarıdaki tablolara göre yanıtlayın:
   - "Does your app collect or share any of the required user data types?" → **Yes**
   - Her veri türü için ilgili kutucukları işaretleyin
   - "Is all of the user data collected by your app encrypted in transit?" → **Yes**
   - "Do you provide a way for users to request that their data be deleted?" → **Yes**
4. Privacy Policy URL'sini girin: `https://noteflow.app/privacy`
5. Değişiklikleri kaydedin ve gönderin

---

**Son Güncelleme:** 20 Ocak 2025  
**Hazırlayan:** NoteFlow Ekibi  
**İletişim:** privacy@noteflow.app
