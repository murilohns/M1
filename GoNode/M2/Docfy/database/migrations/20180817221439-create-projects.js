module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    queryInterface.dropTable('Projects');
  },
};
