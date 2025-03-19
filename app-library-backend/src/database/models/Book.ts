/* eslint-disable @typescript-eslint/no-empty-object-type */
import db from '../init';
import { Optional, DataTypes, Model } from 'sequelize';
import IBook from '../../modules/book/domain/IBook';
import Genre from './Genre';

export interface BookInput extends Optional<IBook, 'id'> { };
export interface BookOutput extends Required<IBook> { };

class Book extends Model<IBook, BookInput> implements IBook {
    public id!: string;
    public title!: string;
    public pages!: number;
    public genre!: number;
    public cover!: string;
    public year!: number;
    public ISBN!: string;
    public available!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Book.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        unique: true
    },
    pages: {
        type: DataTypes.INTEGER,
        validate: {
            min: 50,
            max: 1500
        }
    },
    genre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'genre',
            key: 'id'
        }
    },
    cover: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
            notEmpty: true
        }
    },
    year: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1950,
            max: 2025
        }
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        unique: true
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    sequelize: db,
    tableName: 'books',
    defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
});

Book.belongsTo(Genre, { foreignKey: 'genre' });

export default Book;
