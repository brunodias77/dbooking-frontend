type InputProps = React.ComponentProps<'input'> & {
    label: string;
    error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
    return (
        <div className="w-full">
            <label className="" htmlFor={props.name}>
                {label}
            </label>
            <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green_500 focus:border-green_500 sm:text-sm" type="text" id={props.name} {...props} />
            {error && <p className="">{error}</p>}
        </div>
    );
}