import { Link, useParams } from "react-router-dom";

const PaymentFailed = () => {
    const {tranId}=useParams()
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl font-bold">Payment failed: {tranId}</h1>
            <Link to="/" className="">

            <span className="underline text-blue-500">Back to Home</span>
            </Link>
        </div>
    );
};

export default PaymentFailed;