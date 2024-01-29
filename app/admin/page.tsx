"use client";
import { useState, useEffect } from "react";
import { Admin } from "@/components";
import { authenticate } from "@/lib/firebase";
import { ModalContextProvider } from "@/context/ModalContext";

export default function AdminPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // testing para no tener que loggearse siempre
  useEffect(() => {
    const checkAuthentication = async () => {
      const storedPassword = localStorage.getItem("password");
      if (storedPassword) {
        const isAuthenticated = await authenticate(storedPassword);
        setUserIsAdmin(isAuthenticated);
      } else {
        setUserIsAdmin(false);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAuthenticated = await authenticate(password);
    if (isAuthenticated) {
      setUserIsAdmin(true);
      console.log("Autenticado correctamente");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (userIsAdmin) {
    return (
      <ModalContextProvider>
        {loading ? (
          <p>cargando</p>
        ) : (
          <main>
            <Admin />
          </main>
        )}
      </ModalContextProvider>
    );
  } else {
    return (
      <>
        {loading ? (
          <p>cargando</p>
        ) : (
          <>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Iniciar sesión</button>
            </form>
            {error && <p>{error}</p>}
          </>
        )}
      </>
    );
  }
}
// return (

//     {userIsAdmin ? (
//       <main>
//         <Admin />
//       </main>
//     ) : (
//       <>
//         <h1>Admin Panel</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Iniciar sesión</button>
//         </form>
//         {error && <p>{error}</p>}
//       </>
//     )}

// )
