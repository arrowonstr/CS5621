export function showStepLabel(text) {
  const label = document.querySelector('.badge');
  if (label) label.textContent = text;
}
