const Description = ({ title, details, className, ...props }) => {
    return (
        <div className={className} {...props}>
            {title && <h4 className="text-base font-semibold mb-2">{title}</h4>}
            {details && <p className="text-sm text-body">{details}</p>}
        </div>
    )
}

export default Description
