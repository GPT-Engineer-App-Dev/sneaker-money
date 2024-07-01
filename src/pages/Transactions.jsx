import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const placeholderTransactions = [
  { id: 1, date: "2023-10-01", amount: 200, type: "Expense", brand: "Nike" },
  { id: 2, date: "2023-10-05", amount: 150, type: "Expense", brand: "Adidas" },
  { id: 3, date: "2023-10-10", amount: 300, type: "Income", brand: "Resale" },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(placeholderTransactions);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }]);
  };

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)));
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Transaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
            </DialogHeader>
            <TransactionForm
              onSubmit={isEditing ? handleEditTransaction : handleAddTransaction}
              transaction={currentTransaction}
              setIsEditing={setIsEditing}
              setCurrentTransaction={setCurrentTransaction}
            />
          </DialogContent>
        </Dialog>
      </div>
      <TransactionList
        transactions={transactions}
        onEdit={(transaction) => {
          setCurrentTransaction(transaction);
          setIsEditing(true);
        }}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

const TransactionForm = ({ onSubmit, transaction, setIsEditing, setCurrentTransaction }) => {
  const [formData, setFormData] = useState(
    transaction || { date: "", amount: "", type: "Expense", brand: "Nike" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ date: "", amount: "", type: "Expense", brand: "Nike" });
    setIsEditing(false);
    setCurrentTransaction(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date">Date</label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleSelectChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <Select
          value={formData.brand}
          onValueChange={(value) => handleSelectChange("brand", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Adidas">Adidas</SelectItem>
            <SelectItem value="Resale">Resale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{transaction ? "Update" : "Add"} Transaction</Button>
    </form>
  );
};

const TransactionList = ({ transactions, onEdit, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Brand</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell>{format(new Date(transaction.date), "yyyy-MM-dd")}</TableCell>
          <TableCell>${transaction.amount}</TableCell>
          <TableCell>{transaction.type}</TableCell>
          <TableCell>{transaction.brand}</TableCell>
          <TableCell>
            <Button variant="outline" onClick={() => onEdit(transaction)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(transaction.id)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default Transactions;