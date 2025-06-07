import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "clients",
    timestamps: true,
    underscored: true,
})
class Client extends Model {
    @Column({
        type: DataType.STRING(50),
        unique: true,
        allowNull: false,
    })
    ticket!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
    plate!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    carModel!: string;

    @Column({
        type: DataType.ENUM("Pendiente", "Pagado"),
        allowNull: false,
    })
    paymentStatus!: string;
}

export default Client;