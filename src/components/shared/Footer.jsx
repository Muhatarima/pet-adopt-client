import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t bg-white py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-emerald-600">
              PetAdopt
            </h2>

            <p className="text-gray-600">
              Helping pets find loving homes.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 PetAdopt. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}