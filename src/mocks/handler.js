import { rest } from 'msw';

const names = ['A', 'B', 'C', 'D']

export const getHandler = [
    rest.get('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(names))
    })
]

export const postHandler = [
    rest.post("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
        const a = [JSON.parse(req.body), 1, 2, 3, 4, 5]

        return res(ctx.status(200), ctx.json(a))
    })
]


export const errorHandler = [
    rest.get('https://jsonplaceholder.typicode.com/todos/2', (req, res, ctx) => {
        return res(ctx.status(500, "error"))
    })
]

export const handler = [
    ...getHandler, ...postHandler, ...errorHandler
]