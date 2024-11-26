import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./Products.css";

interface ProductType {
  productName: string;
  price: number;
  qty: number;
}

const Product: React.FC = () => {
  const { register, handleSubmit } = useForm<ProductType>();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const onSubmit: SubmitHandler<ProductType> = ({ price, qty }) => {
    setTotalAmount(price * qty);
  };

  return (
    <div className="container">
      <h1 className="title">Product Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register("productName", { required: true })}
            placeholder="Product Name"
          />
        </div>
        <div>
          <input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
            placeholder="Price"
          />
        </div>
        <div>
          <input
            type="number"
            {...register("qty", { required: true, valueAsNumber: true })}
            placeholder="Quantity"
          />
        </div>
        <button type="submit" hidden />
      </form>
      <div className="link-container">
        <a href="#" onClick={() => handleSubmit(onSubmit)()}>
          TotalAmntBtn
        </a>
      </div>
      {totalAmount !== null && (
        <p className="total-amt" data-testid="totalamnt">
          Total Amount: {totalAmount}
        </p>
      )}
    </div>
  );
};

export default Product;
