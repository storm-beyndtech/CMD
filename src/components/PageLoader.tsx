import logo from "../assets/logo.svg";

export default function PageLoader() {
  return (
    <section className="flex items-center justify-center h-screen bg-primary">
      <div className="flex flex-col gap-5">
        <img src={logo} alt="logo" className="h-10 w-auto" />
        <span className="flex w-4 h-[2px] rounded-full slideLoad bg-secondary"></span>
      </div>
    </section>
  );
}
