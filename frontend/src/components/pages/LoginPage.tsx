import { useState, type FormEvent } from "react";
import Input from "../Input";
import Button from "../Button";
import { Link, useNavigate } from "react-router";
import { connect } from "../../queries";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    showIncorrectLoginIdentifierMessage,
    setShowIncorrectLoginIdentifierMessage,
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showServerErrorMessage, setShowServerErrorMessage] = useState(false);
  const [showLoginInputMissingMessage, setShowLoginInputMissingMessage] =
    useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (email && password) {
        setLoading(true);
        const status = await connect(email, password);
        setLoading(false);
        if (status === 200) {
          navigate("/");
        } else if (status === 401) {
          setShowIncorrectLoginIdentifierMessage(true);
        } else if (status === 500) {
          setShowServerErrorMessage(true);
          setTimeout(() => {
            setShowServerErrorMessage(false);
          }, 1200);
        }
      } else {
        setShowLoginInputMissingMessage(true);
        setTimeout(() => {
          setShowLoginInputMissingMessage(false);
        }, 1200);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center h-[100vh] justify-center">
      {showLoginInputMissingMessage && (
        <div className=" fixed top-5 right-4 bg-amber-50 py-2 px-2 border border-gray-400">
          <p className="text-lg text-blue-950">
            Tous les champs sont obligatoires !
          </p>
        </div>
      )}
      {showServerErrorMessage && (
        <div className=" fixed top-5 right-4 bg-amber-50 py-2 px-2 border border-gray-400">
          <p className="text-lg text-blue-950">
            Erreur interne ! Réessayez plus tard!
          </p>
        </div>
      )}
      <div>
        <h1 className="text-center text-2xl font-bold">Connectez-vous</h1>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center p-4"
        >
          <Input
            id="email"
            type="text"
            label="Email*"
            className="pl-1 py-1 rounded-md border-1 border-gray-400"
            placeholder="bradley@gmail.com"
            value={email}
            onChange={setEmail}
          />

          <Input
            id="password"
            label="Password*"
            className=" pl-1 py-1 rounded-md border-1 border-gray-400"
            type="password"
            placeholder="yourpass***d"
            value={password}
            onChange={setPassword}
          />
          {showIncorrectLoginIdentifierMessage && (
            <p className="text-red-600 text-sm font-medium my-2">
              Le mot de passe ou <br /> l'adresse email est incorrect !
            </p>
          )}
          <Button
            content={loading ? "Connexion.." : "Me connecter"}
            disabled={loading}
            className="px-1.5 py-1.5 mt-2 w-[80%] bg-sky-500 font-bold text-white rounded-3xl cursor-pointer disabled:opacity-40"
          />
        </form>
        <p className="text-sm">
          Vous n'avez pas de compte ?
          <Link className="text-blue-700 ml-1 underline" to="/register">
            Inscrivez vous
          </Link>
        </p>
      </div>
    </div>
  );
}
