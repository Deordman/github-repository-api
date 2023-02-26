const form = document.querySelector('#search-form');

const input = document.querySelector('#search-input');

const repoContainer = document.querySelector('.repo-container');

const errorContainer = document.querySelector('.error-container');

const loader = document.querySelector('.loader');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = input.value; // Kullanıcının arama yaptığı anahtar kelimeyi al

  // Github API'dan depoları getir
  fetch(`https://api.github.com/users/${keyword}/repos`)
    .then(response => {
      // HTTP yanıt kodunu kontrol et
      if (!response.ok) {
        throw Error('Depo bulunamadı');
      }
      return response.json();
    })
    .then(data => {
      // Depoların listesini temizle
      repoContainer.innerHTML = '';

      // Depoların listesini göster
      data.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        repoCard.innerHTML = `
          <img src="${repo.owner.avatar_url}" alt="${repo.owner.login} Profil Resmi" width="100" height="100" class="avatar">
          <h2>Proje Adı : ${repo.name}</h2>
          <p>Eklenme Tarihi : ${new Date(repo.created_at).toLocaleDateString()}</p>
          <p>Açıklama : ${repo.description || 'Açıklama Yok'}</p>
          <p>Dosya Boyutu : ${repo.size} byte</p>
          <a href="${repo.html_url}" target="_blank">Github'da Görüntüle</a>
        `;
        repoContainer.appendChild(repoCard);
      });

      // Loader'ı gizle
      loader.style.display = 'none';
    })
    .catch(error => {
      // Hata mesajını göster
      errorContainer.textContent = error.message;

      // Depoların listesini temizle
      repoContainer.innerHTML = '';

      // Loader'ı gizle
      loader.style.display = 'none';
    });

  // Loader'ı göster
  loader.style.display = 'block';
});

window.addEventListener('scroll', function() {
  var backToTopButton = document.querySelector('.back-to-top');
  if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
  } else {
      backToTopButton.style.display = 'none';
  }
});

document.querySelector('.back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});