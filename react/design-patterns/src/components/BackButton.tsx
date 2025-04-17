import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

interface BackButtonProps {
    color: string
}

export const BackButton = ({ color }: BackButtonProps) => {
    return (
        <Link to="/" className={`font-bold text-${color} w-fit`}>
            <div className='flex flex-row items-center gap-2 cursor-pointer'>
                <ArrowLeft className={`w-8 h-8 text-${color}`} />
                Back
            </div>
        </Link>
    )
}