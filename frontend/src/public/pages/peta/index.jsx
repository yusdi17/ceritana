import { useNavigate } from "react-router-dom";
import PetaIndonesia from "../../components/petaIndonesia";
import Navbar from "../../components/navbar";

export default function Peta() {

    const navigate = useNavigate();

    return (
        <div className="p-4 bg-slate-600">
            <Navbar/>
            <PetaIndonesia/>
        </div>
    )
}