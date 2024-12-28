export function setCookie(name, value, length) {
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${length.toUTCString()}; path=/`;
}

export function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  const targetCookie = cookies.find(row => row.startsWith(`${name}=`));
  return targetCookie ? decodeURIComponent(targetCookie.split('=')[1]) : null;
}

export function deleteCookie(name) {
  const expires = new Date(0);
  document.cookie = `${name}=; expires=${expires.toUTCString()}; path=/`;
}
