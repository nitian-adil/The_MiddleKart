
const AdminHome = () => {
  return (
    <>      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-3xl font-bold text-orange-500">128</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="text-3xl font-bold text-green-600">₹54,000</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-3xl font-bold text-blue-600">320</p>
        </div>
      </div>
      </>

  );
};

export default AdminHome;
