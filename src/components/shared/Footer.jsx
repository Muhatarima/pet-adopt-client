import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-slate-950 py-10 text-white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-emerald-300">
              PetAdopt Haven
            </h2>

            <p className="text-slate-300">
              Helping pets find loving homes.
            </p>
            <p className="text-sm text-slate-400">
              Email: care@petadopt.com | Phone: +880 1711-223344
            </p>
          </div>

          <div className="text-center text-sm text-slate-400 md:text-right">
            <div className="mb-2 flex justify-center gap-4 md:justify-end">
              <a className="hover:text-emerald-300" href="https://facebook.com" target="_blank">Facebook</a>
              <a className="hover:text-emerald-300" href="https://instagram.com" target="_blank">Instagram</a>
              <a className="hover:text-emerald-300" href="https://x.com" target="_blank">X</a>
            </div>
            <p>© 2026 PetAdopt Haven. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
