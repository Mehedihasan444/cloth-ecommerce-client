import { Link, useParams } from "react-router-dom";


const PaymentSuccess = () => {
    const {tranId}=useParams()

    return (
        <div className="flex  justify-center items-center h-screen w-full">
            <div className="w-full">

            <h1 className="text-xl font-bold">Payment complete: {tranId}</h1>
            <Link to="/" className="">

            <span className="underline text-blue-500">Back to Home</span>
            </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;