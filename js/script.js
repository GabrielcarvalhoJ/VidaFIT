function toggleMenu() {
  const menu = document.querySelector('nav ul');
  menu.classList.toggle('active');
}



const baseUrl = "http://74.163.97.16:8080"; // ALTERA SE NECESSÁRIO

let token = "";

// 🔐 LOGIN
async function login() {
  const response = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: "login2",
      password: "1234"
    })
  });

  const data = await response.json();
  token = data.token;

  console.log("Token:", token);

  carregarPosts();
}


// 📡 BUSCAR POSTS
async function carregarPosts() {
  try {
    const response = await fetch(`${baseUrl}/api/postagemFit`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    });

    const posts = await response.json();

    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    posts.forEach(post => {
      container.innerHTML += `
        <div class="card">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <img src="${post.imgUrl}" width="100%">
        </div>
      `;
    });

  } catch (erro) {
    console.error("Erro ao carregar posts:", erro);
  }
}


login();
