# Lokma — Kurulum Rehberi

Bu klasör Lokma'nın claude.ai dışında çalışan bağımsız sürümü. Sunucu, abonelik ya da ödeme yok:

- Uygulama ücretsiz bir statik sitede durur (Netlify ya da GitHub Pages).
- Fotoğraf analizi **senin ücretsiz Google Gemini anahtarınla** yapılır.
- Kayıtların ve fotoğrafların **yalnızca telefonunda** saklanır.
- Ana ekrana eklenir, tam ekran açılır, internetsiz de kayıtlarını gösterir.

---

## 1. Ücretsiz Gemini anahtarı al (2 dakika)

1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) adresini aç, Google hesabınla giriş yap.
2. **Create API key** düğmesine bas, oluşan anahtarı kopyala (genelde `AIza…` ile başlar).

Kredi kartı gerekmez. **Faturalandırmayı (billing) açma:** açarsan ücretsiz katmandan çıkarsın ve kullanım ücretlendirilir.

## 2. Uygulamayı ücretsiz yayınla

Telefonun uygulamayı bir `https://` adresinden açması gerekiyor; dosyayı bilgisayarda çift tıklayıp açmak tam çalışmaz.

**Seçenek A — Netlify Drop (en kolay)**
1. Bilgisayardan [app.netlify.com/drop](https://app.netlify.com/drop) adresini aç.
2. `lokma-uygulama.zip` dosyasını (ya da açılmış klasörü) sayfaya sürükle.
3. Birkaç saniyede `https://bir-isim.netlify.app` gibi bir adres verir.
4. Sitenin kalıcı olması için ücretsiz hesap açıp siteyi **sahiplen (Claim)**. İsmi *Site configuration → Change site name* ile `lokma-efe` gibi bir şeye çevirebilirsin.

**Seçenek B — GitHub Pages**
1. GitHub'da yeni bir **public** depo oluştur, zip'in içindeki dosyaları yükle (`index.html` en üst düzeyde olmalı).
2. *Settings → Pages → Branch: main / (root) → Save*.
3. Adresin `https://kullanici-adin.github.io/depo-adi/` olur.

## 3. Telefona kur

- **iPhone:** Adresi **Safari** ile aç → alttaki **Paylaş** → **Ana Ekrana Ekle** → **Ekle**.
- **Android:** Adresi **Chrome** ile aç → uygulamada *Ayarlar → Ana ekrana ekle → Uygulamayı yükle* (ya da Chrome menüsü ⋮ → *Uygulamayı yükle*).

Bundan sonra Lokma'yı hep ana ekrandaki simgeden aç.

## 4. Anahtarı gir

Uygulamada **Ayarlar → Yapay zekâ** bölümüne anahtarı yapıştır ve **Kaydet**'e bas. Uygulama bağlantıyı hemen test eder; "Bağlantı çalışıyor" yazısını görürsen hazırsın.

Anahtarı girmeden fotoğraf çekersen uygulama anahtarı orada sorar ve fotoğrafı kaybetmeden analize devam eder.

## 5. claude.ai'deki eski kayıtlarını taşı

1. claude.ai'deki eski Lokma'da **Ayarlar → Yedeği indir**.
2. Yeni uygulamada **Ayarlar → Yedeği yükle** ve o dosyayı seç.

Öğünlerin, gramajların ve hedeflerin gelir. Eski sürüm fotoğrafları yedeğe koymadığı için eski öğünlerin fotoğraf önizlemeleri gelmez.

---

## Ücretsiz limitler

- Ücretsiz katmanın dakikalık ve günlük istek sınırları var. Hesabına özel sayıları Google AI Studio'da görebilirsin.
- Günlük limit gece yarısı Pasifik saatinde sıfırlanır: **Türkiye saatiyle yazın 10:00, kışın 11:00**.
- Ayarlar'da model **Otomatik** iken önce en yeni Flash modeli denenir; onun limiti dolarsa uygulama kendiliğinden Flash-Lite'a geçer (ayrı limiti var). Böylece günlük kullanımda limite takılman zor.
- **Hızlı** modu Flash-Lite'ı önce kullanır: daha çabuk cevap verir, porsiyon tahmini biraz daha kabadır.

## Gizlilik

- Kayıtların ve fotoğrafların telefonundaki uygulama deposunda durur; hiçbir sunucuya yüklenmez.
- Analiz için fotoğraf ya da yazdığın metin Google'a gönderilir. **Ücretsiz katmanda Google bu içerikleri ürünlerini geliştirmek için kullanabilir.** Tabağı çekerken yüzlerin ya da kişisel bilgilerin kadraja girmemesine dikkat et.
- Anahtarın yalnızca telefonunda saklanır ve yedek dosyasına **girmez**. Siteni başkası açarsa kendi anahtarını girmesi gerekir; senin kotanı kullanamaz.
- Anahtarını kimseyle paylaşma. Sızdığını düşünürsen AI Studio'dan silip yenisini oluştur.

## Yedek

Kayıtlar yalnızca telefonda olduğu için telefon değiştirmeden ya da tarayıcı verilerini silmeden önce **Ayarlar → Yedeği indir** ile yedek al. "Fotoğraf önizlemelerini de ekle" seçiliyse fotoğraflar da yedeğe girer.

iPhone'da ana ekrana eklenen uygulamanın deposu Safari'den ayrıdır. Safari'de kayıt eklediysen ana ekran uygulamasına yedekle taşı.

## Sorun giderme

| Uygulamada gördüğün | Ne yapmalı |
|---|---|
| Anahtar geçersiz / yetkili değil | Anahtarı AI Studio'dan yeniden kopyala; olmazsa yeni anahtar oluştur. |
| Ücretsiz limit doldu | Mesajdaki süre kadar bekle. Günlük limit dolduysa ertesi sabah 10–11'de sıfırlanır. |
| Bölge desteklenmiyor | VPN açıksa kapat. |
| Model bulunamadı | Ayarlar'da modeli **Otomatik** yap. |
| Gemini'ye ulaşılamadı | İnternet bağlantını kontrol et. |
| Uygulama güncellenmiyor | Uygulamayı tamamen kapatıp (arka plandan kaydırarak) yeniden aç. |

## Güncelleme

Dosyaları değiştirip aynı siteye yeniden yükle (Netlify'da *Deploys* sekmesine sürükle). Uygulama bir sonraki açılışta yeni sürümü alır. İkonları değiştirirsen `sw.js` içindeki `VERSION` değerini artır.

## Dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Uygulamanın tamamı (arayüz + kod) |
| `sw.js` | Çevrimdışı açılma ve otomatik güncelleme |
| `manifest.webmanifest` | Ana ekran adı, rengi ve ikonları |
| `icons/` | Uygulama ikonları |
