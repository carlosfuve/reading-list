/* eslint-disable @typescript-eslint/no-empty-object-type */
import db from '../init';
import { Optional, DataTypes, Model } from 'sequelize';
import IGenre from '../../modules/genre/domain/IGenre';
import Book from './Book';

export interface GenreInput extends Optional<IGenre, 'id'> { };
export interface GenreOutput extends Required<IGenre> { };

class Genre extends Model<IGenre, GenreInput> implements IGenre {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static associate() {
        this.hasMany(Book, { foreignKey: 'genreId' });
    }
}

Genre.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'genre',
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
});

// Genre.hasMany(Book, { foreignKey: 'genreId' });

export default Genre;
