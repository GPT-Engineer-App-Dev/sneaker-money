import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Sneaker Accounting</h1>
      <p className="mb-4">Track your sneaker transactions with ease.</p>
      <Button onClick={() => navigate("/transactions")}>View Transactions</Button>
    </div>
  );
};

export default Index;