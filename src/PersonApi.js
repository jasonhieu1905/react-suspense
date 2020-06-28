const fetchPerson = () => {
  return fetch("https://randomuser.me/api")
    .then((res) => res.json())
    .then((x) => x.results[0]);
};


const wrapPromise = (promise) => {
    let status = 'pending';
    let result = '';
    let suspender = promise.then(res => {
        status = 'success';
        result = res;    
    }, error => {
        status = 'error';
        result = error;
    });

    return {
        read() {
            if (status ===  'pending') {
                throw suspender;
            } else if( status === 'error') {
                throw result;
            }

            return result;
        }
    }
}

export const createResource = () => {
    return {
        person: wrapPromise(fetchPerson())
    }
} 

