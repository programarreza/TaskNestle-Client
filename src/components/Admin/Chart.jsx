import { useQuery } from "@tanstack/react-query";
import Container from "../shared/Container/Container";
import { getTypeCount } from "../../api/auth";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Loading/Loading";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Chart = () => {
  const { user, loading } = useAuth();

  const { data: typeCount, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getTypeCount(user?.email),
    queryKey: ["type-count"],
  });

  if (loading || !typeCount) {
    return <Loading />;
  }

  console.log(typeCount);
  console.log(typeCount.nonReturnable)
  console.log(typeCount.returnableCount)

  

  const data = [
    { name: "Returnable", value: typeCount.nonReturnable},
    { name: "Non Returnable", value: typeCount.returnableCount},
  ];

  const COLORS = [ "#4579cc", "#D1A054",];

  // custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Container>
      <div className="h-screen shadow-lg rounded-lg border-t-2 flex " data-aos="zoom-in">
      
        <div className="flex items-center">
          <div className="md:w-1/2">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
			  <Legend></Legend>
            </PieChart>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
    </Container>
  );
};

export default Chart;
