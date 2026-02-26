import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("token/", { username, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      toast.success("Connexion réussie !");
      navigate("/home");
    } catch (error: any) {
      const msg =
        error?.response?.data?.detail ||
        "Identifiants incorrects. Veuillez réessayer.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen px-4">
      <Toaster />
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center justify-center w-full max-w-6xl">

        {/* Texte de présentation */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-5 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Connectez-vous à votre compte
          </h1>
          <p className="py-6 text-sm sm:text-base hidden lg:block">
            Accédez à votre tableau de bord pour suivre vos dépenses,
            gérer vos objectifs d'épargne et optimiser votre budget.
          </p>
        </div>

        {/* Formulaire */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">

                  <label className="label">Nom d'utilisateur</label>
                  <input
                    type="text"
                    id="login-username"
                    className="input input-bordered w-full"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                  <label className="label mt-3">Mot de passe</label>
                  <input
                    type="password"
                    id="login-password"
                    className="input input-bordered w-full"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="text-right mt-4">
                    <Link to="/register" className="link link-hover text-primary text-sm">
                      Pas encore de compte ? Inscrivez-vous.
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-neutral mt-4 w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Se connecter"
                    )}
                  </button>

                </fieldset>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;