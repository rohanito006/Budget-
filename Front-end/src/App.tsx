import './index.css'
import { useEffect, useState } from 'react'; // Ne remets pas "use" ici
import api from './api';
import toast, { Toaster } from 'react-hot-toast';
type Transaction = {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
}


function App() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = async () => {
    try {
      const response = await api.get<Transaction[]>('transactions/');
         setTransactions(response.data);
           toast.success('Transactions fetched successfully');
    } catch (error) {
        console.error('Error fetching transactions:', error);
          toast.error('Toujours bloqué...');
    }
  }
  useEffect(() => {
    getTransactions();
  }, []);
  /*
    const amounts = transactions.map((t) => Number(t.amount) || 0)  ;
    const balance = amounts.reduce((acc, item) => acc + item, 0) || 0;
    const income = amounts.filter((a) => a > 0).reduce((acc, item) => acc + item, 0) || 0;
    const expense = amounts.filter((a) => a < 0).reduce((acc, item) => acc + item, 0) || 0;
    */
  return (
    <>
      <Toaster />
      <div className='btn btn-small flex items-center justify-center' onClick={getTransactions}>
        test
      </div>
      
     
    </>
  )
}

export default App
