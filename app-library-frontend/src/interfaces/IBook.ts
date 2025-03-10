export default interface IBook {
    id?: string,
    title: string,
    pages: number,
    genre: string,
    cover: string,
    year: number,
    ISBN: string,
    available?: boolean
}