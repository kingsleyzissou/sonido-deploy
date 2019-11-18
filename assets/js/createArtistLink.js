const createArtistLink = artist => {
  return `<a href="/artists/${artist.id}">${artist.name}</a>`;
};

export default createArtistLink