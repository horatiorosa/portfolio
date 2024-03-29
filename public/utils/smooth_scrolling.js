export const smoothScrolling = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (!href) return;
  const { offsetTop } = document.querySelector(href);
  scroll({
    top: offsetTop,
    behavior: 'smooth',
  });
};
