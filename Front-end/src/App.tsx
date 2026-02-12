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
 
    const amounts = transactions.map((t) => Number(t.amount) || 0)  ;
    const balance = amounts.reduce((acc, item) => acc + item, 0) || 0;

    // income = revenus
    const income = amounts.filter((a) => a > 0).reduce((acc, item) => acc + item, 0) || 0;
    // expense = dépenses
    const expense = amounts.filter((a) => a < 0).reduce((acc, item) => acc + item, 0) || 0;
    const ratio = income > 0 ? Math.min((Math.abs(expense) / income) * 100, 100) : 0;

    const formatDate = (dateString: string) => {
      const d = new Date(dateString);
      return d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }


  return (
    <>
      <Toaster />
      

       <div className="w-2/3 flex flex-col gap-2">
        <div className="flex justify-between rounded-2xl border-2 border-warning border-dashed bg-warning/5 p-4">
            <div className="flex flex-col gap-1">
                <div></div>
                <div className='stat-value'>{balance.toFixed(2)}</div>
            </div>
        </div>
     </div>
      
    </>
  )
}

export default App
