import { Injectable } from '@angular/core';

export interface Kullanici {
  kullaniciAdi: string;
  sifre: string;
  email: string;
  ad: string;
  soyad: string;
}

@Injectable({
  providedIn: 'root'
})
export class KullaniciServisi {
  private readonly KULLANICILAR_KEY = 'kullanicilar';

  constructor() {
    // İlk kullanıcıyı oluşturma kısmı
    if (!this.kullanicilariGetir().length) {
      this.kullaniciKaydet({
        kullaniciAdi: 'dogukan',
        sifre: '12345',
        email: 'dogukan@example.com',
        ad: 'Doğukan',
        soyad: 'Bektas'
      });
    }
  }

  kullaniciKaydet(kullanici: Kullanici): boolean {
    const kullanicilar = this.kullanicilariGetir();
    
    // Kullanıcı adı veya email zaten var mı kontrol et
    if (kullanicilar.some(k => k.kullaniciAdi === kullanici.kullaniciAdi || k.email === kullanici.email)) {
      return false;
    }

    kullanicilar.push(kullanici);
    localStorage.setItem(this.KULLANICILAR_KEY, JSON.stringify(kullanicilar));
    return true;
  }

  kullanicilariGetir(): Kullanici[] {
    const kullanicilarJson = localStorage.getItem(this.KULLANICILAR_KEY);
    return kullanicilarJson ? JSON.parse(kullanicilarJson) : [];
  }

  girisKontrol(kullaniciAdi: string, sifre: string): boolean {
    const kullanicilar = this.kullanicilariGetir();
    return kullanicilar.some(k => k.kullaniciAdi === kullaniciAdi && k.sifre === sifre);
  }
} 