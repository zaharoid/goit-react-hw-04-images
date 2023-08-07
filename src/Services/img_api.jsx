import axios from 'axios';

async function fetchImgs(query, page) {
  const KEY = '37265798-a554b97b0d8bd77968a94ecbb';
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await axios.get(URL);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImgs };
