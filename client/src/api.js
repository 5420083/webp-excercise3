export async function fetchImages(breed) {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/12`
    );
    const data = await response.json();
    return data.message;
}
 
export async function fetchImages2() {
  const response = await fetch(
    `https://dog.ceo/api/breeds/image/random/12`
  );
  const data = await response.json();
  return data.message;
}

export async function fetchImages3() {
  const response = await fetch(
    `https://young-sierra-21537.herokuapp.com/ranking`
  );
  const res = await response.json();
  return res.data;
}

async function request(path, options = {}) {
  const url = `${process.env.REACT_APP_API_ORIGIN}${path}`;
  const response = await fetch(url, options);
  return response.json();
}

export async function getRanking() {
  return request(`/ranking`);
}

export async function postRanking(breedId) {
  const record={id:breedId};
  return request(`/ranking/vote`, {
    body: JSON.stringify(record),
    headers: {
      breed: `${breedId}`
    },
    method: "POST",
  });
}
