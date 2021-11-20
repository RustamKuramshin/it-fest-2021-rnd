import {Book} from "./Book"

export const enum HttpRequest {
    GET= "GET", POST = "POST", PUT = "PUT", DELETE = "DELETE"
}

const baseUrl = `${window.location.protocol}//${window.location.host}/api/books`

const getRandomInt = () => Math.floor(Math.random() * (1000 - 1 + 1)) + 1

async function tryFetch(method: HttpRequest, url: string, body?: any) {

    const json = JSON.stringify(body)
    const rqId = getRandomInt()

    console.log(`rqId=${rqId} - Begin HTTP request: method=${method}, url=${url}, body=${json}`)

    const headers = {
        'Accept': '*/*'
    }

    if (body != null) {
        Object.assign(headers, {'Content-Type': 'application/json'})
    }

    const rawResp = await fetch(url, {
        method: `${method}`,
        headers: headers,
        body: json
    })

    const resp = await rawResp.json()

    console.log(`rqId=${rqId} - End HTTP request with response: ${JSON.stringify(resp)}`)

    return resp
}

export const getAllBooks = async () => {
    return tryFetch(HttpRequest.GET, baseUrl)
}

export const createBook = async (book: Book) => {
    return tryFetch(HttpRequest.POST, baseUrl, book)
}