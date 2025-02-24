interface IBookUseCaseDeleteBook {
    delete(idBook: string): Promise<boolean | null>
}

export default IBookUseCaseDeleteBook;
