export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 w-3/4 text-left">
      <h2 className="text-3xl text-center font-bold mb-6">About Us</h2>

      {/* Profile Section */}
      <div className="flex items-start mb-10">
        <img
          src="/sean-li.jpg"
          alt="Sean Li"
          className="w-32 h-32 mr-6"
        />
        <div>
          <p>
          Sean Li is the principal researcher at MoleClue.
          He is currently a final-year PhD candidate at the University of Western Australia, and a recipient of the prestigious Forrest Scholarship.
          His research lies on the intersection of chemistry and computer science, and involves the development of computational models, to allow for the de-novo (library-independent) identification of compounds from its mass spectrum.
          </p>
        </div>
      </div>

      {/* Research Section */}
      <div className="mb-8">
        <h3 className="text-2xl text-center font-semibold mb-4">Research</h3>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            Li, S., Bohman, B., and Jayatilaka D. &lsquo;Enumerating Possible Molecular Formulae in Mass Spectrometry Using a Generating Function Based Method&rsquo; MATCH Commun. Math. Comput. Chem 88(2), 321 (2022) <a href="https://doi.org/10.46793/match.88-2.321L" className="text-blue-600 underline">https://doi.org/10.46793/match.88-2.321L</a>
          </li>
          <li className="mb-2">
          Li, S., Bohman, B., Flematti, G.R. et al. Determining the parent and associated fragment formulae in mass spectrometry via the parent subformula graph. J Cheminform 15, 104 (2023). <a href="https://doi.org/10.1186/s13321-023-00776-y" className="text-blue-600 underline">https://doi.org/10.1186/s13321-023-00776-y</a>
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-2xl text-center font-semibold mb-4">Contact</h3>
        <p>
          To get in touch with MoleClue, please email Sean at{" "}
          <a
            href="mailto:sean.li@research.uwa.edu.au"
            className="text-blue-600 underline"
          >
            sean.li@research.uwa.edu.au
          </a>
          .
        </p>
      </div>
    </div>
  );
}