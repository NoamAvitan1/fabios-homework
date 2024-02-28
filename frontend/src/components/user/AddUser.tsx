import { useState } from "react";
import { Modal } from "../Modal";
import "./AddUser.css";
import { useForm } from "react-hook-form";

interface User {
  date: string;
  time: string;
  notes: string;
  branch: string;
  branch_id: number;
  recurrence: number;
  customer: string;
  customer_id: number;
  source: string;
  created_at: Date;
  updated_at: Date;
  status: string;
}

type Props = {
  addUser: any; //could not find the type expected here.
};

export const AddUser = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // const add = () => {
  //   const obj = {
  //     date: "2024-02-27",
  //     time: "23:59",
  //     notes: "",
  //     branch: "מטבח מרכזי",
  //     branch_id: 1,
  //     recurrence: 1,
  //     customer: "אורי וגל שכטר",
  //     customer_id: 14,
  //     source: "הוקלד ידנית",
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //     status: "AP",
  //   };
  //   addUser.mutate(obj);
  // };
  return (
    <div>
      <button className="addButton" onClick={() => setIsOpen(true)}>
        הוספת הזמנה
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section className="addUserForm">
          <form className="form">
            <div className="input-section">
              <input {...register("customer",{
                required: {value:true,message:"הכנס שם"},
                minLength:{value:2,message:'לפחות 2 אותיות'},
                maxLength: {value:15,message:'לפחות 15 אותיות'}
              })} className="inputField" type="text" />
              <label className="labelInput" htmlFor="">שם:</label>
            </div>
            <div className="input-section">
              <input className="inputField" type="text" />
              <label className="labelInput" htmlFor="">מקום:</label>
            </div>
            <div className="input-section">
              <input className="inputField" type="text" />
              <label className="labelInput" htmlFor="">תאריך:</label>
            </div>
            <div className="input-section">
              <input className="inputField" type="text" />
              <label className="labelInput" htmlFor="">שעה:</label>
            </div>
            <button className="addButton">הוסף</button>
          </form>
        </section>
      </Modal>
    </div>
  );
};
