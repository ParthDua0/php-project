import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="bg-[#6c1d4f] py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-xs font-semibold text-white sm:gap-6 sm:text-sm">
          <NavLink to="mailto:info@gbu.ac.in">Email</NavLink>
          <NavLink to="">Facebook</NavLink>
          <NavLink to="">Twitter</NavLink>
          <NavLink to="">YouTube</NavLink>
          <NavLink to="">Instagram</NavLink>
        </div>
      </div>

      <div className="bg-[#efeff1] px-4 py-8 text-[#2f2f2f] sm:px-6 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Gautam Buddha University</h3>
            <p className="text-sm leading-6 text-gray-700">
              Greater Noida, Uttar Pradesh, India
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-semibold">Students</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><NavLink to="https://mygbu.in/schd/">Timetables</NavLink></li>
              <li><NavLink to="https://exams.gbu.ac.in/">Examinations</NavLink></li>
              <li><NavLink to="">Scholarship</NavLink></li>
              <li><NavLink to="https://ohms.gbu.ac.in/">Student Portal</NavLink></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-semibold">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><NavLink to="">Anti Ragging Committee</NavLink></li>
              <li><NavLink to="">IQAC</NavLink></li>
              <li><NavLink to="">NAAC</NavLink></li>
              <li><NavLink to="">NIRF</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;