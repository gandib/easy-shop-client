import Container from "@/src/components/UI/Container";
import LineChartComponent from "@/src/components/UI/LineChart";
import OrderHistoryCard from "@/src/components/UI/OrderHistoryCard";
import PieCharts from "@/src/components/UI/PieChart";
import UserOverviewOrderCard from "@/src/components/UI/UserOverviewOrderCard";
import { getAllOrder } from "@/src/services/OrderService";

const UserDashboard = async () => {
  const { data: allOrder } = await getAllOrder([{ name: "limit", value: 10 }]);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid lg:grid-cols-2 gap-2">
        <div>
          <PieCharts data={allOrder} />
          <p>Pie Chart for Order</p>
        </div>
        <div>
          <LineChartComponent data={allOrder} />
          <p>Line Chart for Order</p>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-6">Lastest Ordered Products</h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {allOrder?.data[0]?.orderItem?.map((order: any) => (
            <UserOverviewOrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <OrderHistoryCard orders={allOrder} />
      </div>
    </Container>
  );
};

export default UserDashboard;
