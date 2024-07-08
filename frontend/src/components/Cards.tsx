import { useQuery } from "@apollo/client";
import Card, { Transaction } from "./Card";
import GET_USER, {
  GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";

const Cards = () => {
  const { data: authUser } = useQuery(GET_USER);
  const { data, error, loading } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser._id,
    },
  });
  console.log("data", data);

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10 text-white">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {loading ? (
          <span className="text-3xl font-semibold text-center text-white my-5">
            Loading Transactions...
          </span>
        ) : (
          data?.user.transactions.map((transaction: Transaction) => (
            <Card
              transaction={transaction}
              key={transaction._id}
              profilePic={data?.user?.profilePic || ""}
            />
          ))
        )}
      </div>
      {data?.user?.transactions?.length === 0 ? (
        <p className="text-2xl font-bold text-center text-white">
          No transactions to show
        </p>
      ) : null}
    </div>
  );
};
export default Cards;
