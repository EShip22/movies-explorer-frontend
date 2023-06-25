class MainApi {
  constructor(options) {
		this._baseUrl = options.baseUrl;
  }

	_getResponseData(res) {
		if (!res.ok) {
				return Promise.reject(res.json().then((result) => result.message));
				//return Promise.reject(res.status);
		}
		return res.json();
	}

	register(formValues) {
		return fetch(`${mainApi._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        name: formValues?.name ?? '',
				password: formValues?.password ?? '',
				email: formValues?.email ?? ''
			})
		})
			.then(res => {
				return this._getResponseData(res);
			})
	}

	authorization(formValues) {
		return fetch(`${mainApi._baseUrl}/signin`, {
			method: 'POST',
			headers : {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: formValues?.password ?? '',
				email: formValues?.email ?? ''
			})
		})
			.then(res => {
				return this._getResponseData(res);
			})
	}

	getContent(jwt) {
		return fetch(`${mainApi._baseUrl}/users/me`, {
			method: 'GET',
			headers : {
				'Content-Type': 'application/json',
				Authorization : `Bearer ${jwt}`
			}
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then(data => data)
	}

	getUserInfo() {
		const token = localStorage.getItem('jwt');
		return fetch(`${mainApi._baseUrl}/users/me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}

	setUserInfo(formValues) {
		const token = localStorage.getItem('jwt');
		return fetch(`${mainApi._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: formValues.name,
				email: formValues.email
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}

	getMovies(jwt) {
		return fetch(`${mainApi._baseUrl}/movies`, {
			method: 'GET',
			headers : {
				'Content-Type': 'application/json',
				Authorization : `Bearer ${jwt}`
			}
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then(data => data)
	}

	addLike(movie) {
		const token = localStorage.getItem('jwt');
		return fetch(`${mainApi._baseUrl}/movies`, {
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: `https://api.nomoreparties.co/${movie.image.url}`,
				trailerLink: movie.trailerLink,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
				movieId: movie.id,
				thumbnail: `https://api.nomoreparties.co/${movie.image.previewUrl}`
			})
		})
			.then((res) => {
				return this._getResponseData(res);
			});
	}

	delLike(_id) {
		const token = localStorage.getItem('jwt');
		return fetch(`${mainApi._baseUrl}/movies/${_id}`, {
			method: 'DELETE',
			headers : {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
		})
			.then((res) => {
				return this._getResponseData(res);
			});
	}

}


export const mainApi = new MainApi({
  baseUrl: 'https://api.osetrdiplom.nomoredomains.monster'
});