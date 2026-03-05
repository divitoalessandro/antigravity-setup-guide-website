// Clipboard copy for .code-box elements
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.closest('.code-box').querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.classList.add('copied');
      btn.textContent = 'Copied';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = 'Copy';
      }, 2000);
    });
  });
});
