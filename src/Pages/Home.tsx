import Login from "./Login"

function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-main_bg">
      <div className="absolute inset-0">
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl top-20 -left-10"></div>
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl bottom-20 right-20"></div>
      </div>
      <Login />
    </div>
  );
}

export default Home;
