import Cookies from 'universal-cookie';
import { getBaseUrl } from '../../utilites/CommonUtils'

// Build registry new user request.
function BuildRequest(email, password){
  const cookies = new Cookies();
  const private_info = cookies.get('private');
  const body = {
    email: email,
    password: password,
    name: private_info.name,
    surname: private_info.surname,
    patronymic: private_info.patronymic,
    birth_day: private_info.birth_day,
    city: private_info.city,
    address: private_info.address
  }
    
  const url = getBaseUrl() + "/signup";
  return new Request(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

// Parse response body JSON.
function parse(json){
  if (!json.hasOwnProperty("token")){
    return null;
  }

  return json["token"];
}

// Send registry new user request.
async function signUp(email, password){
    let request = BuildRequest(email, password);
    let response = await fetch(request);
    if (response.ok){
      return parse(await response.json());
    }

    return null;
}

export default signUp