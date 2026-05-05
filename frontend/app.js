const API_URL = "http://127.0.0.1:8000";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const noteForm = document.getElementById("noteForm");

const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");

const meBtn = document.getElementById("meBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loadNotesBtn = document.getElementById("loadNotesBtn");

const userInfo = document.getElementById("userInfo");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");

let token = localStorage.getItem("token");

function showMessage(text) {
  message.textContent = text;
}

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: registerEmail.value,
      password: registerPassword.value
    })
  });

  if (!response.ok) {
    showMessage("Registration failed");
    return;
  }

  showMessage("Registration successful");
  registerForm.reset();
});

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  if (!response.ok) {
    showMessage("Login failed");
    return;
  }

  const data = await response.json();
  token = data.access_token;
  localStorage.setItem("token", token);

  showMessage("Login successful");
  loginForm.reset();
});

meBtn.addEventListener("click", async function () {
  if (!token) {
    showMessage("Please login first");
    return;
  }

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    showMessage("Could not load user");
    return;
  }

  const data = await response.json();
  userInfo.textContent = `${data.email} (id: ${data.id})`;
});

logoutBtn.addEventListener("click", function () {
  token = null;
  localStorage.removeItem("token");
  userInfo.textContent = "Not logged in";
  notesList.innerHTML = "";
  showMessage("Logged out");
});
noteForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!token) {
    showMessage("Please login first");
    return;
  }

  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title: noteTitle.value,
      content: noteContent.value
    })
  });

  if (!response.ok) {
    showMessage("Could not create note");
    return;
  }

  noteForm.reset();
  showMessage("Note created");
  loadNotes();
});


loadNotesBtn.addEventListener("click", function () {
  loadNotes();
});


async function loadNotes() {
  if (!token) {
    showMessage("Please login first");
    return;
  }

  const response = await fetch(`${API_URL}/notes`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    showMessage("Could not load notes");
    return;
  }

  const notes = await response.json();

  notesList.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];

    const li = document.createElement("li");
    li.textContent = note.title + ": " + (note.content || "");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  }
}


async function deleteNote(noteId) {
  if (!token) {
    showMessage("Please login first");
    return;
  }

  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    showMessage("Could not delete note");
    return;
  }

  showMessage("Note deleted");
  loadNotes();
}