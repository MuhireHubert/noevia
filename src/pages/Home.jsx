import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import Feature from "../components/home/Feature";
import Button from "../components/common/Button";

export default function Home() {
  return (
    <>
      <Hero />
      <Feature />

      <section className="bg-latte-200/60 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-espresso-900 md:text-4xl">
            Hungry already?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-espresso-700/80">
            Browse the full menu and have your order ready before you even
            walk in — or send it to a friend.
          </p>
          <Button as={Link} to="/menu" className="mt-7">
            See the Menu
          </Button>
        </div>
      </section>
    </>
  );
}
