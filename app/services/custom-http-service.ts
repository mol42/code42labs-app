export function doGet(endpoint: string, options: any) {

}

export function doPost(endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            resolve(data);
        });
    });
}

export default {
    doGet,
    doPost
}