
// Показати форму реєстрації
function showRegistrationForm() {
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
}

// Показати форму входу
function showLoginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
}

// Початкове відображення форми реєстрації
window.addEventListener('DOMContentLoaded', function () {
  showRegistrationForm();
});










// Функція для відправлення запитів на сервер
function sendRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => {
      reject('Помилка відправлення запиту на сервер');
    };
    xhr.send(JSON.stringify(data));
  });
}

// Реєстрація користувача
document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  sendRequest('POST', '/register', { username, email, password })
    .then(response => {
      alert('Реєстрація пройшла успішно!');
    })
    .catch(error => {
      alert('Помилка реєстрації: ' + error.message);
    });
});

// Вхід користувача
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  sendRequest('POST', '/login', { email, password })
    .then(response => {
      alert('Ви успішно увійшли!');
      // Якщо потрібно, можна виконати перенаправлення на сторінку з уроками тут
    })
    .catch(error => {
      alert('Помилка входу: ' + error.message);
    });
});

// Отримання списку уроків з сервера та виведення їх на сторінку
window.addEventListener('DOMContentLoaded', function () {
  sendRequest('GET', '/lessons')
    .then(lessons => {
      const lessonsList = document.getElementById('lessons-list');
      lessons.forEach(lesson => {
        const li = document.createElement('li');
        li.textContent = lesson.title;
        lessonsList.appendChild(li);
      });
    })
    .catch(error => {
      alert('Помилка отримання списку уроків: ' + error.message);
    });
});



