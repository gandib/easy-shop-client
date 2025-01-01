import Container from "@/src/components/UI/Container";
import LineChartComponent from "@/src/components/UI/LineChart";
import PieCharts from "@/src/components/UI/PieChart";
import { getAllOrder } from "@/src/services/OrderService";

const VendorDashboard = async () => {
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
    </Container>
  );
};

export default VendorDashboard;
