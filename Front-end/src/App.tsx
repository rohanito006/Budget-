import './index.css'
import { Activity, useEffect, useState } from 'react'; // Ne remets pas "use" ici
import api from './api';
import toast, { Toaster } from 'react-hot-toast';
import { ActivityIcon, ArrowDownCircle, ArrowUpCircle, PlusCircle, Trash, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
type Transaction = {
  id: string;
  text: string;
  amount: number;
  created_at: string;
}


function App() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [text, setText] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');

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

   const deleteTransaction = async (id: string) => {
    try {
         await api.delete<Transaction[]>(`transactions/${id}/`);
         getTransactions(); 
           toast.success('Transactions deleted successfully');
    } catch (error) {
        console.error('Error deleting transactions:', error);
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
      

       <div className="w-2/3 flex flex-col gap-4 mt-42 mx-auto">
        <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-4">

            <div className="flex flex-col gap-1">

                <div className='badge badge-soft flex flex-col gap-1 '>
                    <Wallet className='w-4 h-4'/>
                    votre solde
                </div>
                
                <div className='stat-value'>
                  {balance.toFixed(2)}
                   <select className="select-style">
                     <option value="$">$ </option>
                     <option value="€">fc</option>
                    </select>
                </div>
            </div>  
            
                {/* Revenus */}
              <div className="flex flex-col gap-1">
                 <div className='badge badge-soft badge-success'>
                    <ArrowUpCircle className='w-4 h-4'/>
                    vos revenus
                </div>

                <div className='stat-value'>
                  {income.toFixed(2)} 
                  <select className="select-style">
                     <option value="$">$ </option>
                     <option value="€">fc</option>
                    </select>
                </div>
              </div>

                {/* Dépenses */}
              <div className="flex flex-col gap-1">
                 <div className='badge badge-soft badge-error'>
                    <ArrowDownCircle className='w-4 h-4'/>
                    vos dépenses
                </div>

                <div className='stat-value'>
                  {expense.toFixed(2)} 
                  <select className="select-style">
                     <option value="$">$ </option>
                     <option value="€">fc</option>
                    </select>
                </div>

              </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-4">
            <div className='flex justify-between items-center mb-1'>
                <div className='badge badge-soft badge-warning gap-1'>
                  <ActivityIcon className='w-4 h-4'/>
                    Dépenses vs Revenus
                </div>
                <div>{ratio.toFixed(2)}%</div>
            </div>

            <progress 
            value={ratio}
            max="100"
            className='progress progress-warning w-full'
            >

            </progress>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button className="btn btn-warning" onClick={()=>(document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>
           <PlusCircle className='w-4 h-4' /> 
           ajouter une transaction 
          </button>

          <dialog id="my_modal_2" className="modal backdrop-blur">
              <div className="modal-box border-2 border-warning/10 border-dashed bg-warning/5">
                <h3 className="font-bold text-lg">Ajouter une transaction</h3>
              </div>
                <form method="dialog" className="modal-backdrop">
                 <button>close</button>
                </form>
          </dialog>


        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              {/* head */}
              <thead>
                 <tr>
                   <th>#</th>
                   <th>Description</th>
                   <th>Montant</th>
                   <th>Date</th>
                   <th>Action</th>
                 </tr>
              </thead>
           <tbody>
              {transactions.map((t, index) => (
                <tr key={t.id}>
                    <th>{index + 1}</th>
                    <td>{t.text}</td>
                    <td className='font-semibold flex items-center gap-2'>
                      {t.amount > 0 ? (<TrendingUp className="text-green-500 w-6 h-6" />):(<TrendingDown className="text-red-500 w-6 h-6" />)}
                      {t.amount > 0 ? `+${t.amount}`: `-${t.amount}`}
                    </td>
                    <td>{formatDate(t.created_at)}</td>
                    <td>
                      <button 
                        className='btn btn-sm btn-error btn-soft'
                        onClick={() => deleteTransaction(t.id)}
                        title='supprimer' >
                            <Trash className='w-4 h-4'/>
                      </button>
                    </td>
                </tr>
              ))}
           </tbody>
            </table>
        </div>

     </div>
      
    </>
  )
}

export default App
