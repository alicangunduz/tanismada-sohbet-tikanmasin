// Değişkenler
let soruAlani = document.querySelector("#soruAlani");
let soruUret = document.querySelector("#soruUret");
let soruKopyala = document.querySelector("#soruKopyala");
let basarili = document.querySelector("#basarili");
let soruAdeti = document.querySelector("#soruAdeti");
let oncekiSoru = document.querySelector("#oncekiSoru");
let genelAlan = document.querySelector("#genelAlan");
let sorularBitti = document.querySelector("#sorularBitti");
let video = document.querySelector("#video");
let gecilenSoruAdeti = document.querySelector("#gecilenSoruAdeti");
let header = document.getElementById("header");
let banner = document.getElementById("banner");
let bannerButton = document.getElementById("banner-button");
let whatsAppGonder = document.getElementById("whatsAppGonder");
let contributors = document.getElementById("contributors");

// Soruları tutacağımız dizi & soru indexlerini tutacağımız dizi
const sorular = [];
const soruIndexler = [];

// Soru sayısı üretir
function soruSayisiUret() {
  let index;
  if (sorular.length === soruIndexler.length) {
    // Sorular bittiğinde boşalt
    genelAlan.style.display = "none";
    sorularBitti.style.display = "";
    setInterval(function () {
      location.reload();
    }, 5000);
  } else {
    do {
      index = Math.floor(Math.random() * sorular.length);
    } while (soruIndexler.includes(index)); // daha önce üretilmişse tekrar dene
    soruIndexler.push(index);
    return index;
  }
}
// Önceki soru kontrolü
function oncekiSoruKontrol() {
  return soruIndexler.length === 0;
}
// Önceki soru butonunu kontrol eder
function oncekiButtonKontrol() {
  if (oncekiSoruKontrol()) {
    oncekiSoru.style.display = "none";
  } else {
    oncekiSoru.style.display = "block";
  }
}
// XMLHttpRequest (XHR) kullanarak sorular.json dosyasını okuyoruz
const xhr = new XMLHttpRequest();
xhr.open("GET", "../json/sorular.json", true);
xhr.responseType = "json";

xhr.onload = function () {
  // JSON verilerini bir objeye atıyoruz
  const sorularObj = xhr.response;

  // sorular dizisini oluşturuyoruz ve sorularObj içindeki verileri diziye aktarıyoruz
  for (let soru in sorularObj) {
    sorular.push(sorularObj[soru]);
  }

  // Site açıldığında rastgele bir soru gösterir
  soruAlani.innerHTML = sorular[soruSayisiUret()];
  soruAdeti.innerHTML = `<p>Güncel soru sayısı : <span class="soruSayisi"> ${sorular.length}</span>
  <br>
  Gösterilen soru sayısı : <span class="soruSayisi"> ${soruIndexler.length}</span></p>`;
};

xhr.send();

// düğmelere tıklandığında oncekiSoru kontrolü yapar
document.addEventListener("click", function (e) {
  oncekiButtonKontrol();
});

// soruUret düğmesine tıklanıldığında rastgele bir soru gösterir
soruUret.addEventListener("click", function () {
  sayi = soruSayisiUret();
  soruAlani.innerHTML = sorular[sayi];
  soruAdeti.innerHTML = `<p>Güncel soru sayısı : <span class="soruSayisi"> ${sorular.length}</span>
  <br>
  Gösterilen soru sayısı : <span class="soruSayisi"> ${soruIndexler.length}</span></p>`;
});

// soruKopyala düğmesine tıklanıldığında soruAlani içindeki metni panoya kopyalar
soruKopyala.addEventListener("click", function () {
  navigator.clipboard.writeText(soruAlani.innerHTML);
  // Toastify ile kopyalandı yazısı gösterir
  Toastify({
    text: "Kopyalandı 😉",
    style: {
      backgroundColor: "#B83051",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "10px",
      opacity: 0.95,
      transition: "opacity 0.3s ease-in-out",
      position: "absolute",
      top: "0",
      right: "0",
      marginRight: "10px",
      paddingRight: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      zIndex: 9999,
    },
  }).showToast();
});

// oncekiSoru düğmesine tıklanıldığında önceki soruyu gösterir
oncekiSoru.addEventListener("click", function () {
  soruIndexler.pop();
  if (oncekiSoruKontrol()) {
    soruAlani.innerHTML = "İyi anarya yaptın he :)";
  } else {
    soruAlani.innerHTML = sorular[soruIndexler[soruIndexler.length - 1]];
  }
});

// banner açıp kapatma
bannerButton.addEventListener("click", function () {
  banner.style.display = "none";
  header.style.paddingTop = "3rem";
});

// Whatsapp paylaşma
whatsAppGonder.addEventListener("click", function () {
  let whatsappLink = `https://api.whatsapp.com/send?text=${soruAlani.innerHTML}`;
  window.open(whatsappLink, "_blank");
});


