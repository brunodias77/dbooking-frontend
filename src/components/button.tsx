interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    size = 'medium',
    className = '',
    ...buttonProps
}) => {

    const baseClasses = 'py-2 px-4 rounded focus:outline-none transition transform active:scale-95';
    const variantClasses = {
        primary: 'bg-green_500 text-white hover:brightness-90',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    };
    const sizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    const buttonClassNames = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button className={buttonClassNames} {...buttonProps}>
            {label}
        </button>
    );
};

export default Button;

