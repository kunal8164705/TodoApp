import React,{useState,useEffect} from 'react'
import '../App.css'

const getLocalData=() => {
    const lists=localStorage.getItem("todoList");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}

const Todos = () => {
    const [inputdata,setInputData]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);

    // additems function
    const addItem=(params) => {
        if(!inputdata){
            alert("plz fill the data");
        }else if(inputdata&&toggleButton){
                setItems(
                        items.map((currElem)=>{
                            if(currElem.id===isEditItem){
                                return {...currElem,name:inputdata}
                            }
                            return currElem;
                        })

                );
                setInputData("");
                setIsEditItem(null);
                setToggleButton(false);
        }
        else{
           const newInputData= {
                id:new Date().getTime().toString(),
                name:inputdata
            }
            setItems([...items,newInputData]);
            setInputData("");
        }
    }
        //delete todo items
        const deleteItem=(index) => {
            const updatedItem=items.filter((curElem)=>{
                return curElem.id!==index;
            });
            setItems(updatedItem);
        }

        //delete all todo items
        const removeAll=(params) => {
            setItems([]);
        }

        ///adding list to local storage
        useEffect(() => {    
           localStorage.setItem("todoList",JSON.stringify(items));
        }, [items]);

        ///edit items
        const editItem=(index) => {
            const toeditItem=items.find((currElem)=>{
                    return currElem.id===index;
            });
            setInputData(toeditItem.name);
            setIsEditItem(index);
            setToggleButton(true);
        }

    return (
        <>
         <div className="main-div">
             <div className="child-div">
               <figure>
                   <img src="./todoLogo.png" alt="TodoLogo" />
                   <figcaption>Add your list here</figcaption>
                   </figure>  
                   <div className="addItems">
                       <input type="text" placeholder="Add item" className="form-control"
                       value={inputdata}
                       onChange={(event)=>setInputData(event.target.value)}                       
                       />
                       {toggleButton?
                       <i className="far fa-edit add-btn" onClick={addItem}></i>
                    :<i className="fa fa-plus add-btn" onClick={addItem}></i>}
                       
                   </div>
                    
                    {/* show  items */}
                    <div className="showItems">
                        {items.map((currEle,index)=>{
                        return(
                            <div className="eachItem" key={currEle.id}>
                            <h3>{currEle.name}</h3>
                            <div className="todo-btn">
                            <i className="far fa-edit add-btn"
                            onClick={()=>editItem(currEle.id)}
                            ></i>
                            <i className="far fa-trash-alt add-btn"
                            onClick={()=>deleteItem(currEle.id)}></i>
                            </div>
                        </div>
                        );
                        })}                       
                    </div>



                   {/* remove all button */}
                   <div className="showItems">
                       <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>                        
                       </button>
                   </div>
             </div>
         </div>
        </>
    )
}

export default Todos;

