import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cafeteria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cafeteria-container">
      <div class="hero-section">
        <h1>MarketApp Kafeterya</h1>
        <p>Alışverişiniz sırasında keyifli bir mola</p>
      </div>
      
      <div class="container">
        <div class="info-section">
          <div class="info-card">
            <i class="bi bi-cup-hot"></i>
            <h3>Taze Kahve</h3>
            <p>Özenle seçilmiş kahve çekirdeklerinden hazırlanan içeceklerimiz</p>
          </div>

          <div class="info-card">
            <i class="bi bi-clock"></i>
            <h3>Çalışma Saatleri</h3>
            <p>Her gün 09:00 - 22:00 arası hizmetinizdeyiz</p>
          </div>

          <div class="info-card">
            <i class="bi bi-wifi"></i>
            <h3>Ücretsiz Wi-Fi</h3>
            <p>Yüksek hızlı internet bağlantısı ile çalışabilir veya sosyalleşebilirsiniz</p>
          </div>
        </div>

        <div class="features-section">
          <h2>Neler Sunuyoruz?</h2>
          <div class="features-grid">
            <div class="feature">
              <i class="bi bi-cup"></i>
              <h4>Kahve Çeşitleri</h4>
              <ul>
                <li>Türk Kahvesi</li>
                <li>Espresso</li>
                <li>Americano</li>
                <li>Latte</li>
                <li>Mocha</li>
              </ul>
            </div>

            <div class="feature">
              <i class="bi bi-cake2"></i>
              <h4>Tatlı & Atıştırmalık</h4>
              <ul>
                <li>Günlük Taze Pastalar</li>
                <li>Kurabiyeler</li>
                <li>Sandviçler</li>
                <li>Tostlar</li>
              </ul>
            </div>

            <div class="feature">
              <i class="bi bi-stars"></i>
              <h4>Özel Hizmetler</h4>
              <ul>
                <li>Toplantı Alanı</li>
                <li>Kitap Köşesi</li>
                <li>Çalışma Masaları</li>
                <li>Şarj İstasyonları</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="location-section">
          <h2>Bizi Ziyaret Edin</h2>
          <p>MarketApp AVM 2. Kat, Kafeterya Bölümü</p>
          <p>Rezervasyon ve bilgi için: (0212) 555 55 55</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cafeteria-container {
      min-height: 100vh;
    }

    .hero-section {
      background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/cafe-bg.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      text-align: center;
      padding: 6rem 0;
      margin-bottom: 4rem;
    }

    .hero-section h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .hero-section p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .info-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .info-card {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }

    .info-card:hover {
      transform: translateY(-5px);
    }

    .info-card i {
      font-size: 2.5rem;
      color: #2563eb;
      margin-bottom: 1rem;
    }

    .features-section {
      margin-bottom: 4rem;
    }

    .features-section h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature {
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .feature i {
      font-size: 2rem;
      color: #2563eb;
      margin-bottom: 1rem;
    }

    .feature ul {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0;
    }

    .feature li {
      padding: 0.5rem 0;
      color: #4b5563;
    }

    .location-section {
      text-align: center;
      padding: 3rem 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 4rem;
    }

    .location-section h2 {
      margin-bottom: 1rem;
    }

    .location-section p {
      color: #4b5563;
      margin: 0.5rem 0;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 4rem 0;
      }

      .hero-section h1 {
        font-size: 2.5rem;
      }

      .info-section,
      .features-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `]
})
export class CafeteriaComponent {} 