import { useState } from "react";
import { Modal } from "../Modal";
import "./AddUser.css";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";


type Props = {
  addUser: any;
};

export const AddUser = ({addUser}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <button className="addButton" onClick={() => setIsOpen(true)}>
        הוספת הזמנה
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section className="addUserForm">
        <IoMdClose style={{cursor:'pointer', position:'absolute', fontSize:'25px'}} id="close-button"/>
          <form onSubmit={handleSubmit(data=>addUser.mutate(data))} className="form">
            <div className="input-section">
              <input placeholder="נועם" {...register("customer",{
                required: {value:true,message:"הכנס שם"},
                minLength:{value:2,message:'לפחות 2 אותיות'},
                maxLength: {value:15,message:'לפחות 15 אותיות'}
              })} className="inputField" type="text" />
              <label className="labelInput" htmlFor="">שם:</label>
            </div>
              {errors?.customer && <span className="error-message">{errors.customer.message?.toString()}</span>}
            <div className="input-section">
              <input placeholder="מטבח מקומי"
                {...register("branch",{
                  required: {value:true,message:"הכנס מקום"},
                  minLength:{value:2,message:'לפחות 2 אותיות'},
                  maxLength: {value:15,message:'לפחות 15 אותיות'}
                })}
              className="inputField" type="text" />
              <label className="labelInput" htmlFor="">מקום:</label>
            </div>
            {errors?.branch && <span className="error-message">{errors.branch.message?.toString()}</span>}
            <div className="input-section">
              <input placeholder="22/4/22" {...register("date",{
                  required: {value:true,message:"הכנס תאריך"},
                  minLength:{value:2,message:'לפחות 2 אותיות'},
                  maxLength: {value:15,message:'לפחות 15 אותיות'}
                })} className="inputField" type="text" />
              <label className="labelInput" htmlFor="">תאריך:</label>
            </div>
            {errors?.date && <span className="error-message">{errors.date.message?.toString()}</span>}
            <div className="input-section">
              <input placeholder="14:24" {...register("time",{
                  required: {value:true,message:"הכנס שעה"},
                  minLength:{value:2,message:'לפחות 2 אותיות'},
                  maxLength: {value:15,message:'לפחות 15 אותיות'}
                })} className="inputField" type="text" />
              <label className="labelInput" htmlFor="">שעה:</label>
            </div>
            {errors?.time && <span className="error-message">{errors.time.message?.toString()}</span>}
            <button className="addUserButton">הוסף</button>
          </form>
        </section>
      </Modal>
    </div>
  );
};
