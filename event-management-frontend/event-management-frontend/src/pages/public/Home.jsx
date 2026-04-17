import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import EventList from "../../components/events/EventList";
import Notices from "../../components/events/Notices";
import { Link } from "react-router-dom";

// Reusable Link/Button Component
const NavButton = ({ link }) => {
  const baseClass =
    "rounded-md bg-[#b777a5] px-4 py-3 text-sm font-semibold text-white text-center shadow-sm transition hover:bg-[#9f648f]";

  return link.external ? (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClass}
    >
      {link.name}
    </a>
  ) : (
    <Link to={link.url} className={baseClass}>
      {link.name}
    </Link>
  );
};

const Home = () => {
  const links = [
    {
      name: "Research Publications",
      url: "https://www.gbu.ac.in/public/publications",
      external: true,
    },
    {
      name: "Timetables",
      url: "https://mygbu.in/schd/",
      external: true,
    },
    {
      name: "Examinations",
      url: "https://exams.gbu.ac.in/",
      external: true,
    },
    {
      name: "Campus News",
      url: "https://www.gbu.ac.in/public/newsletter",
      external: true,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f2]">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl grow px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-[#2f2f2f] sm:mb-8 sm:text-4xl">
          Important Links
        </h1>

        <div className="mb-8 grid gap-3 sm:mb-10 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <NavButton key={link.name} link={link} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Notices />
          <EventList />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;