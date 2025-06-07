import { Table, Column, Model, DataType, Default } from "sequelize-typescript";  

@Table({
    tableName: "products",
    timestamps: true,
    underscored: true,
})
class product extends Model{
    @Column({
        type: DataType.STRING(50)
    })
    name!: string;

    @Column({
        type: DataType.STRING(50)
    })
    price!: string;
    @Column({
        type: DataType.BOOLEAN,
    })
    disponibility!: boolean;
}
export default product;