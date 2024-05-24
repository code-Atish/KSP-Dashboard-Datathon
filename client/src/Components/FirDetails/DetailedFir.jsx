import { useState } from "react";
import { formatString } from "../../utils/utility";
import { useFetchData } from "./Firdetails";
import styles from "./firdetails.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Dropdown/Loader";
const apiUrl = import.meta.env.VITE_API_URL;

export default function DetailedFir() {
  const { FirNo ,FirYear} = useParams();
  const [editingId, setEditingId] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');
  const { data, isLoading, error } = useFetchData(
    `${apiUrl}/getfirdetails_withid`,
    {
      FirNo: `${FirNo}/${FirYear}`,
    },
    {
      headers: {
        jwt_token: localStorage.getItem("token"),
      },
    }
  );
    // const startEditing = (id, description) => {
    //   setEditingId(id);
    //   setEditingDescription(description);
    // };

    // const cancelEditing = () => {
    //   setEditingId(null);
    //   setEditingDescription('');
    // };

    // const saveEditing = async () => {
    //   if(!editingDescription){
    //     cancelEditing();
    //     return;
    //   }
    //   const res = await axios.put(`http://localhost:5000/api/todos/${editingId}`, { description: editingDescription });
    //   setTodos(todos.map(todo => (todo.id === editingId ? res.data : todo)));
    //   setEditingId(null);
    //   setEditingDescription('');
    // };
  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!data) {
    return <p>No data available.</p>;
  }
  return (
    <div className={styles.detailed_fir_bg_wrapper}>
      <div className={styles.detailed_fir_container}>
        {Object.entries(data[0]).map(([key, value]) => (
          <div className={styles.detailed_fir_cont}>
            <div className={styles.fir_col_heading}>{formatString( key) }</div>
            <div className={styles.fir_col_content}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
