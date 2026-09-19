import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
    return (
        <div className = "mx-auto max-w-lg px-5 py-32 text-center">
            <h1 className = "font-display text-5xl text-espresso-900">400</h1>
            <p className = "mt-3 text-espresso-700/80">
            Looks like this page wandered pff for a coffee break.
            </p>
            <Button as = {Link} to="/" calssName="mt-8">
            Back Home
            </Button>
        </div>
    );
}