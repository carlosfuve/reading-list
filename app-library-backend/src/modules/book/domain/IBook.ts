interface IBook {
    id?: string,
    title: string,
    pages: number,
    genre: number,
    cover: string,
    year: number,
    ISBN: string,
    available?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export default IBook;
