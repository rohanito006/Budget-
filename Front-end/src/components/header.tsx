import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
        <div className="navbar bg-base-100 border-b border-base-content/10 px-4">
            {/* Logo */}
            <div className="flex-1">
                <span className="text-xl font-bold text-warning">MyBudget</span>
            </div>

            {/* Bouton Logout */}
            <div className="flex-none">
                <button
                    className="btn btn-sm btn-outline btn-error gap-2"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
}

export default Header;