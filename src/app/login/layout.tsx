

export default async function LoginLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="h-screen  bg-gray-100">
            {children}
        </div>
    );
}