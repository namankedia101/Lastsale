import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./NewProduct.css";
import FileBase from "react-file-base64";
import { Link, useHistory } from 'react-router-dom';
import {createNewProduct} from "../../actions/products";

const NewProduct = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [form,setForm] = useState({
        title:"",
        description:"",
        price:"",
        imageFile:""
    });
    
    const handleChange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const newProduct =(e)=>{
        e.preventDefault();
        const byteSize = str => new Blob([str]).size;
        const size = byteSize(form.imageFile);
        if(form.description ==="" || form.imageFile==="" || form.price==="" || form.title===""){
            alert("Please fill all the required details");
        }else{
            if(size>200000){
                alert("Maximum file size allowed is 200kb");
                setForm({...form, imageFile:""})
            }
            else {
                let result= window.confirm("Are you sure to create new product?");
                if(result){
                    dispatch(createNewProduct(form,history));
                }
        }
    }
}

    return (
        <div className="form">
        <Link to="/">
            <img 
                className="form_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                alt=""
            />
        </Link>
        <div className="form_container">
            <h1>New Product</h1>
            <form autoComplete="off">
                <h5>Product Title</h5>
                <input name="title" type="text" value={form.title} onChange=
                    {handleChange} required={true}
                />
                <h5>Description</h5>
                <textarea name="description" type="text" value={form.description} onChange=
                    {handleChange} required={true} />
                <h5>Price(in Rs.)</h5>
                <input name="price" type="number" value={form.price} onChange=
                    {handleChange} required={true}
                />
                <h5>Add product image</h5>
                <FileBase type="file"  onDone={({base64})=>setForm({...form, imageFile:base64})} />
                <button type="submit" onClick={newProduct} 
                className="submit_FormButton">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default NewProduct;