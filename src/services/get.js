import axios from 'axios';

const get = async (uri) => {
    let response = await axios.get(uri);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unable to get ${uri}`);
    }
}

export default get;