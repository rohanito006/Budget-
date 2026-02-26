import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

type User = {
  username: string;
  email: string;
  password: string;
};




function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');



  const addUser = async () => {
    if(!username || !email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    } 

    try {
      await api.post<User[]>('users/', { username, email, password });
      
      toast.success('User added successfully');
      setUsername('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
            navigate('/login');
        }, 2000);
        
    } catch (error) {
        console.error('Error adding user:', error);
          toast.error('Toujours bloqué...');
    }

  }

  console.log(addUser);
  



  return (
      <>
       <Toaster />


    <div className="hero bg-base-200 min-h-screen px-4">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center justify-center w-full max-w-6xl">

        {/* Texte */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-5 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Inscrivez-vous dès maintenant !
          </h1>
          <p className="py-6 text-sm sm:text-base hidden lg:block">
            Prenez le contrôle de vos finances dès maintenant.
            Créez votre compte pour suivre vos dépenses, fixer vos objectifs d’épargne et optimiser votre budget intelligemment.
          </p>
        </div>

        {/* Formulaire */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">

                <label className="label">UserName</label>
                <input 
                type="text" 
                className="input input-bordered w-full" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />

                <label className="label">Email</label>
                <input 
                type="email" 
                className="input input-bordered w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />

                <label className="label">Password</label>
                <input 
                type="password" 
                className="input input-bordered w-full" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />

                <label className="label">Confirm Password</label>
                <input type="password" className="input input-bordered w-full" placeholder="Confirm Password" />

                <div className="text-right mt-2">
                  <Link to="/login" className="link link-hover text-primary ml-1">
                        Vous avez déjà un compte ? Connectez-vous.
                  </Link>
                </div>

                <button 
                 className="btn btn-neutral mt-4 w-full"
                 onClick={addUser}>
                  Register
                </button>

              </fieldset>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default Register;
