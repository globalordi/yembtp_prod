    document.getElementById('year').textContent = new Date().getFullYear();
    if (window.self !== window.top || /[?&]embed=1/.test(window.location.search)) {
      document.documentElement.classList.add('embedded');
    }
