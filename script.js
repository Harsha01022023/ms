document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (logoutBtn) {
    if (isLoggedIn) {
      logoutBtn.style.display = 'inline-block';
      loginLink.style.display = 'none';
    }
    logoutBtn.addEventListener('click', () => {
      localStorage.setItem('loggedIn', 'false');
      location.href = 'login.html';
    });
  }

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value.trim();
      if (u === 'admin' && p === 'password') {
        localStorage.setItem('loggedIn', 'true');
        location.href = 'index.html';
      } else {
        document.getElementById('loginMessage').textContent = 'Invalid credentials';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop();
  const isLogged = localStorage.getItem('loggedIn') === 'true';

  if (path === 'dashboard.html') {
    if (!isLogged) {
      location.href = 'login.html';
      return;
    }
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.setItem('loggedIn', 'false');
      location.href = 'login.html';
    });
    return;
  }

  if (path === 'login.html') {
    if (isLogged) {
      location.href = 'dashboard.html';
      return;
    }
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value.trim();
      if (u === 'admin' && p === 'password') {
        localStorage.setItem('loggedIn', 'true');
        location.href = 'dashboard.html';
      } else {
        document.getElementById('msg').textContent = 'Invalid credentials';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.form-step'));
  let current = 0;

  document.querySelectorAll('.btn.next').forEach(btn => {
    btn.addEventListener('click', () => changeStep(1));
  });
  document.querySelectorAll('.btn.prev').forEach(btn => {
    btn.addEventListener('click', () => changeStep(-1));
  });

  function changeStep(delta) {
    steps[current].classList.remove('active');
    current = Math.max(0, Math.min(current + delta, steps.length - 1));
    steps[current].classList.add('active');
  }

  // File input display
  const fileInput = document.getElementById('fileUpload');
  const fileNameDisplay = document.getElementById('fileName');
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    fileNameDisplay.textContent = f ? f.name : 'No file selected';
  });

  // Submit behavior
  document.getElementById('animatedForm').addEventListener('submit', e => {
    e.preventDefault();
    alert([
      'Employee Name: ' + document.getElementById('empName').value,
      'Batch No.: ' + document.getElementById('batchNo').value,
      'No. of Batch: ' + document.getElementById('noOfBatch').value,
      'File: ' + (fileInput.files[0]?.name || 'None')
    ].join('\n'));
    e.target.reset();
    fileNameDisplay.textContent = 'No file selected';
    current = 0;
    steps.forEach(s => s.classList.remove('active'));
    steps[0].classList.add('active');
  });
});
