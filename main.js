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

const sorular = [];
const soruIndexler = []; // yeni dizi

function soruSayisiUret() {
    let index;
    if (sorular.length === soruIndexler.length) { // Sorular bittiğinde boşalt
        genelAlan.style.display = "none";
        sorularBitti.style.display = "";
        setInterval(function() {
            location.reload();
        }, 5000);

    }
    else {
      do {
        index = Math.floor(Math.random() * sorular.length);
    } while (soruIndexler.includes(index)); // daha önce üretilmişse tekrar dene
    soruIndexler.push(index);
    return index;
    }
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
  
  // Site açıldığında rastgele bir soru gösterir
  soruAlani.innerHTML = sorular[soruSayisiUret()];
  soruAdeti.innerHTML = "Güncel soru sayısı :  " + sorular.length;

};

xhr.send();

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

// oncekiSoru düğmesine tıklanıldığında önceki soruyu gösterir
oncekiSoru.addEventListener("click", function() {
  soruIndexler.pop();
  if (soruIndexler.length === 0) {
    soruAlani.innerHTML = "İyi anarya yaptın he :)";
  } else {
    soruAlani.innerHTML = sorular[soruIndexler[soruIndexler.length - 1]];
  }
});


