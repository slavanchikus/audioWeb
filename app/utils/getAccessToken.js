export const getAccessToken = () => {
  const query = location.hash;
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === '#access_token') {
      const token = decodeURIComponent(pair[1]);
      localStorage.setItem('access_token_vkGallery', token);
    }
    if (decodeURIComponent(pair[0]) === 'user_id') {
      const userId = decodeURIComponent(pair[1]);
      localStorage.setItem('user_id_vkGallery', userId);
    }
  }
  return null;
};
