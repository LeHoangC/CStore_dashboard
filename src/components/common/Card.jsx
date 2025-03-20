import { cn } from '../../utils/cn'

const Card = ({ children, className }) => {
    return <div className={cn('bg-gray-800 rounded p-5 shadow md:p-8', className)}>{children}</div>
}

export default Card
