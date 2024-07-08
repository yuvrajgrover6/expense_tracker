import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { CATEGORY_STATS } from "../graphql/queries/transaction.query";
import { useEffect, useState } from "react";
import GET_USER from "../graphql/queries/user.query";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const [logout, { client, loading }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const { data, loading: categoryLoading, error } = useQuery(CATEGORY_STATS);
  const { data: userData } = useQuery(GET_USER);

  const [chartData, setChartData] = useState<
    ChartData<"doughnut", never[], never>
  >({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((category: any) => {
        return category.category;
      });
      const amounts = data.categoryStatistics.map((category: any) => {
        return category.amount;
      });
      const backgroundColors: string[] = [];
      const borderColors: string[] = [];

      categories.forEach((category: any) => {
        if (category === "saving") {
          backgroundColors.push("rgba(54, 162, 235, 0.2)");
          borderColors.push("rgba(54, 162, 235, 1)");
        }
        if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132, 0.2)");
          borderColors.push("rgba(255, 99, 132, 1)");
        }
        if (category === "investment") {
          backgroundColors.push("rgba(75, 192, 192, 0.2)");
          borderColors.push("rgba(75, 192, 192, 1)");
        }
      });
      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: amounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (e) {
      console.error(e);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={userData?.authUser.profilePic || ""}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatistics.length > 0 ? (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          ) : (
            <></>
          )}

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
