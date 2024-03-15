import accounting from 'accounting'

export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function formatPercent(percent) {
  return `${accounting
    .formatMoney(percent, '', 1, ',', '.')
    .replace(/\.00$/g, '')}%`
}

export function formatCurrency(value) {
  return accounting.formatMoney(value, '$', 2, ',', '.').replace(/\.00$/g, '')
}

export function formatNumber(value) {
  return accounting.formatMoney(value, '', 2, ',', '.').replace(/\.00$/g, '')
}

export function formatDate(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${day}/${month}/${year}, ${hours}:${minutes}${amPm}`;
}
