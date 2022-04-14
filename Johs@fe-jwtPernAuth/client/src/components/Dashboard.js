import { Fragment, useState, useEffect } from "react";
import{ toast } from "react-toastify"





const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function GetName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  const logout =e=>{
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully!")
  };
  useEffect(() => {
    GetName();
  }, []);
  return (
    <Fragment>
      <h1>Dashboard </h1>
      <h1>Welcome {name}</h1>

      <button className="btn btn-primary" onClick={e=>logout(e)}>Logout</button>
    </Fragment>
  );
};
export default Dashboard;
