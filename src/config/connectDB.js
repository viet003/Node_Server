import { Sequelize } from 'sequelize-cockroachdb';

// Kết nối đến cơ sở dữ liệu CockroachDB thông qua biến môi trường DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Sử dụng dialect 'postgres' cho CockroachDB
  logging: false // Tắt logging để tránh in ra các truy vấn SQL trong console
});

// config
// "test": {
//   "username": "root",
//   "password": null,
//   "database": "database_test",
//   "host": "127.0.0.1",
//   "dialect": "mysql"
// },

// Kiểm tra kết nối đến cơ sở dữ liệu
const ConnectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Hàm để thực hiện một truy vấn đơn giản
const executeQuery = async () => {
  try {
    const [results, metadata] = await sequelize.query("SELECT NOW()");
  } catch (err) {
    console.error("Error executing query:", err);
  }
};

(async () => {
  try {
    // Kết nối đến cơ sở dữ liệu khi khởi động ứng dụng
    await ConnectDB();

    // Thực hiện các truy vấn cơ sở dữ liệu khi cần thiết
    await executeQuery();
    await executeQuery(); // Các truy vấn khác

    // Không đóng kết nối sau mỗi truy vấn

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Đóng kết nối khi ứng dụng dừng hoặc khi không cần thiết nữa
    await sequelize.close();
  }
})();

export default ConnectDB