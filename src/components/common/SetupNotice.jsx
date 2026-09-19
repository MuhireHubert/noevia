export default function SetupNotice ({message}) {
    return (
        <div className = "flex min-h-screen items-center justify-center bg-espresso-950 px-5 text-center">
            <div className = "max-w-lg">
                <h1 className = "font-display text-2xl text-cream"></h1>
                <p className = "mt-4 text-xs text-latte-200/90">
                {message}
                </p>
                <p className ="mt-4 text text-latte-300/60">
                Follow full setup steps for firebase
                </p>
            </div>
        </div>
    );
}