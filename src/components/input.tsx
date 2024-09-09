type InputProps = React.ComponentProps<'input'> & {
    label: string;
    error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
    return (
        <div className="">
            <label className="" htmlFor={props.name}>
                {label}
            </label>
            <input className="" type="text" id={props.name} {...props} />
            {error && <p className="">{error}</p>}
        </div>
    );
}