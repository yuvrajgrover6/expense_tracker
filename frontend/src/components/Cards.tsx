import { useQuery } from "@apollo/client";
import Card, { Transaction } from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = ({ picture }: { picture: string }) => {
  const { data, error, loading } = useQuery(GET_TRANSACTIONS);

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10 text-white">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {loading ? (
          <span className="text-3xl font-semibold text-center text-white my-5">
            Loading Transactions...
          </span>
        ) : (
          data?.transactions.map((transaction: Transaction) => (
            <Card
              transaction={transaction}
              key={transaction._id}
              picture={picture}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Cards;
