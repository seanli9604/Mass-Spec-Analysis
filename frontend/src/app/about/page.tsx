export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 w-3/4 text-left">
      <h2 className="text-3xl text-center font-bold mb-6">About Us</h2>

      {/* Profile Section */}
      <div className="flex items-start mb-10">
        <img
          src="/sean-li.png"
          alt="Sean Li"
          className="w-32 h-32 mr-6"
        />
        <div>
          <p>
            Sean Li is the principal researcher at MoleClue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Duis euismod sapien ac augue consectetur, vitae consequat mauris varius.
            Fusce vitae nisi rhoncus turpis ullamcorper gravida.
            Donec rhoncus quam quis convallis iaculis.
            Nam fermentum posuere varius.
            Proin id leo vitae ante pulvinar rhoncus sit amet ut libero.
            Quisque porttitor nec arcu sit amet facilisis.
          </p>
        </div>
      </div>

      {/* Research Section */}
      <div className="mb-10">
        <h3 className="text-2xl text-center font-semibold mb-4">Research</h3>
        <ul className="list-disc pl-6">
          <li>
            Li, S., & Co-author. (Year). Title of Research Paper. <em>Journal Name</em>, Volume(Issue), pages. DOI
          </li>
          <li>
            Li, S., & Co-author. (Year). Title of Another Paper. <em>Journal Name</em>, Volume(Issue), pages. DOI
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="text-2xl text-center font-semibold mb-4">Contact</h3>
        <p>
          To get in touch with MoleClue, please email Sean at{" "}
          <a
            href="mailto:sean.li@uwa.edu.au"
            className="text-blue-600 underline"
          >
            sean.li@uwa.edu.au
          </a>
          .
        </p>
      </div>
    </div>
  );
}