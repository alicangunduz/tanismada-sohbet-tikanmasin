// Değişkenler
let soruAlani = document.querySelector("#soruAlani");
let soruUret = document.querySelector("#soruUret");
let soruKopyala = document.querySelector("#soruKopyala");
let basarili = document.querySelector("#basarili");
const sorular = [];
function soruSayisiUret() {
    return Math.floor(Math.random() * sorular.length);
}
// XMLHttpRequest (XHR) kullanarak sorular.json dosyasını okuyoruz
const xhr = new XMLHttpRequest();
xhr.open('GET', 'sorular.json', true);
xhr.responseType = 'json';

xhr.onload = function() {
  // JSON verilerini bir objeye atıyoruz
  const sorularObj = xhr.response;

  // sorular dizisini oluşturuyoruz ve sorularObj içindeki verileri diziye aktarıyoruz
  for (let soru in sorularObj) {
    sorular.push(sorularObj[soru]);
  }
};

xhr.send();

// Site açıldığında 
window.onload = function() {
    sayi = soruSayisiUret();
    soruAlani.innerHTML = sorular[sayi];
}

// soruUret düğmesine tıklanıldığında rastgele bir soru gösterir
soruUret.addEventListener("click", function() {
  sayi = soruSayisiUret();
  soruAlani.innerHTML = sorular[sayi];
});

// soruKopyala düğmesine tıklanıldığında soruAlani içindeki metni panoya kopyalar
soruKopyala.addEventListener("click", function() {
    navigator.clipboard.writeText(soruAlani.innerHTML);
    basarili.style.display = "";
    setTimeout(function() {
        basarili.style.display = "none";
    }, 2000);
});






